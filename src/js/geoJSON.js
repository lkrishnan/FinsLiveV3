import Moment from "moment"
import LabelClass from "@arcgis/core/layers/support/LabelClass"
import Interpolate from "@turf/interpolate"
import RainIcon from "../assets/rain.png"
import NoReadingIcon from "../assets/noreading.png"
import CamIcon from "../assets/cam.png"
import DetailsIcon from "../assets/tablelarge.png"
import store from "../store"

export function FormatAsGeoJSON( gauge_arr, data_arr, gauge_info ){
	let geojson = { type: "FeatureCollection", features: [ ] },
		gauge_data = [ ],
		site_obj = { },
		last_five = { },
		storeLastFive = ( unique_id, reading ) => {
			if( last_five.hasOwnProperty( unique_id ) )
				last_five[ unique_id ].push( reading )
			else
				last_five[ unique_id ] = [ reading ]

		}

	//initiate site_obj array using the gauge information from the locally stored json file
	gauge_info.forEach( site => { 
		site_obj[ site.unique_id ] = {
			unique_id: site.unique_id,  
			gauge: site.gauge_type,
			site_id: site.site_id,
			latitude: site.lat,
			longitude: site.lon,
			site_name: site.site_name,
			label: site.label,
			measure_unit: null,
			lastreading_epoch: null,
			reading: "",
			icon: "nr", 
			site_trend: "na"

		}

	} )

	

	//loop through gauge data consumed through APIs
	gauge_arr.forEach( ( gauge, idx ) => {
		if( [ "rain" ].includes( gauge ) ){ //USGS gauges site_id is used as the unique id
			const allowed = [ "precipitation", "stream_level", "lake_level", "lastreading_epoch", "measure_unit" ]

			data_arr[ idx ].forEach( row => {
				allowed.forEach( key => {
					if( key === "lastreading_epoch" ){
						site_obj[ row.site_id ][ key ] = parseInt( row[ key ] )	 
				
					}else if( [ "precipitation", "stream_level", "lake_level" ].includes( key ) ){
						if( row.hasOwnProperty( key ) ){
							site_obj[ row.site_id ][ "reading" ] = ( isNaN( parseFloat( row[ key ] ) ) ? "" : parseFloat( row[ key ] ).toFixed( 2 ) )
							site_obj[ row.site_id ][ "icon" ] = ( isNaN( parseFloat( row[ key ] ) ) ? "nr" : row.gauge )

						}
						
					}else{
						site_obj[ row.site_id ][ key ] = row[ key ]
				
					}
				
				} )

			} )

		}else if( [ "stage", "lcs", "lake" ].includes( gauge ) ){
			data_arr[ idx ].forEach( site=> {
				const unique_id = ( gauge === "lcs" ? site.or_site_id : site.site_id ),
					site_info = gauge_info.filter( row => row.unique_id === unique_id )[ 0 ]
				
				if( parseInt( site.rank ) === 1 ){
					site_obj[ unique_id ].measure_unit = "ft"
					site_obj[ unique_id ].lastreading_epoch = Moment( site.data_time ).valueOf( )
					site_obj[ unique_id ].reading = ( isNaN( parseFloat( site.reading ) ) ? "" : parseFloat( site.reading ).toFixed( 2 ) )
					site_obj[ unique_id ][ "icon" ] = ( isNaN( parseFloat( site.reading ) ) ? "nr" : ( gauge === "lcs" ? "stage" : gauge  ) ) 

					if( site_info.hasOwnProperty( "alarms" ) ){
						site_info.alarms.forEach( alarm => {
							if( parseFloat( site.reading ) > alarm.value ){
								site_obj[ unique_id ].icon += "_" + alarm.label

							}
						} )
						
					}

				}

				if( !isNaN( parseFloat( site.reading ) ) )
					storeLastFive( unique_id, parseFloat( site.reading ) )

			} )

		}
		
	} )

	//store trend for stage gauges in the icon property
	for( let unique_id in last_five ){
		const max = Math.max( ...last_five[ unique_id ] ), 
			min = Math.min( ...last_five[ unique_id ] )

		if( max - min > 0.1 ){
			site_obj[ unique_id ].site_trend = "rising"

		}else if( Math.abs( min - max ) > 0.1 ){
			site_obj[ unique_id ].site_trend = "falling"

		}else{
			site_obj[ unique_id ].site_trend = "steady"

		}

	}
	
	//push features into the geojson feature collection
	for( let unique_id in site_obj ){
		const { longitude, latitude, ...prop } = site_obj[ unique_id ]

		//Push features into the geojson layer
		geojson.features.push( {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [ longitude, latitude ]

			},
			properties: prop
			
		} )

		gauge_data.push( site_obj[ unique_id ] )
		
	}

	//store gauge data in the store for CSV data download
	store.commit( "gauge_data", gauge_data )

	return geojson

}

export function GetGeoJSONTemplate( gauge ){
	const getPopupContent = ( lastreading_epoch, reading, measure_unit ) =>{
			return `{Last reported level on<br/>${lastreading_epoch} was ${reading} ${measure_unit}.}`
		},
		/*getSnapshot = target => {
			const attrib = target.graphic.attributes
			// Create the ImageMediaInfoValue
			let imageValue = new ImageValue( {
					sourceURL: ( attrib.key ? `https://camera.onerain.com/api/?method=image&camera=${attrib.key}` : `http://maps.co.mecklenburg.nc.us/rest/v1/ws_fins_creekcam.php?camid=${attrib.site_id}&cachebuster=${new Date( ).getTime( )}` )

					} ),
  				// Create the ImageMediaInfo
				imageElement = new ImageMediaInfo({
					title: "<b>Mexican Fan Palm</b>",
					caption: "tree species",
					value: imageValue

					} )
   				// Create the MediaContent
  				mediaElement = new MediaContent({
					mediaInfos: [ imageElement ]
  					} )

			return mediaElement
			//return `<img src='http://maps.co.mecklenburg.nc.us/rest/v1/ws_fins_creekcam.php?camid=${target.graphic.attributes.cam_id}&cachebuster=${new Date( ).getTime( )} width='100%' height='100%'/>`
			
		},*/
		
		getContentText = target => {
			const attrib = target.graphic.attributes

			let txt = ""

			switch( attrib.icon ){
				case "rain":
					txt = ( attrib.reading.length > 0 ? "{reading} {measure_unit} of rain was reported.<br/>Last reported on {lastreading_epoch}." : "No readings were reported." )
					break
				
				case "stage": case "lcs":
					txt = ( attrib.reading.length > 0 ? "Last reported stream level on<br/>{lastreading_epoch} was {reading} {measure_unit}." : "No readings were reported." )
					break

				case "lake":
					txt = ( attrib.reading.length > 0 ? "Last reported lake level on<br/>{lastreading_epoch} was {reading} {measure_unit}." : "No readings were reported." )
					break

				/*case "cam":
					const img_url = ( attrib.key ? `https://maps.mecklenburgcountync.gov/api/camera?method=image&camera=${attrib.key}&api_key=55dcad90-e3ec-4954-b882-384bfd3bb9dd` : `http://maps.co.mecklenburg.nc.us/rest/v1/ws_fins_creekcam.php?camid=${attrib.site_id}&cachebuster=${new Date( ).getTime( )}` )

					txt = `<img src='${img_url}&cachebuster=${new Date( ).getTime( )} width='400' height='180'/>`
					break*/
	

			}

			return txt

		},
		templates = {
			"rain": {
				title: "{label}",
				outFields: [ "*" ],
				content: getContentText,
				fieldInfos: [
					{
						fieldName: "lastreading_epoch",
						format: {
							dateFormat: "short-date-short-time"
						}
					}

				],
				actions: [ 
					{
						title: "View Details",
						id: "gauge_detail",
						image: DetailsIcon
					} 

				],

			},

			"stage,lcs,lake": {
				title: "{label}",
				outFields: [ "*" ],
				content: getContentText,
				fieldInfos: [
					{
						fieldName: "lastreading_epoch",
						format: {
							dateFormat: "short-date-short-time"
						}
					}

				],
				actions: [ 
					{
						title: "View Details",
						id: "gauge_detail",
						image: DetailsIcon
					} 

				],

			},

			"cam": {
				title: "{name}",
					outFields: [ "*" ],
					content: getContentText,
					actions: [ 
						{
							title: "View Snapshot",
							id: "cam_snapshot",
							image: CamIcon
						} 

					],
					
				},

			}
		
	return templates[ gauge ]

}

export function GetGeoJSONRenderer( gauge ){
	const label = {
			rain: "Rain Gauge",
			stage: "Stage Gauge",
			lcs: "Stage Gauge",
			lake: "Lake Gauge",
			cam: "Creek Camera", 

		},
		svg_path = {
			steady: "M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
			rising: "M13,18V10L16.5,13.5L17.92,12.08L12,6.16L6.08,12.08L7.5,13.5L11,10V18H13M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z",
			falling: "M11,6V14L7.5,10.5L6.08,11.92L12,17.84L17.92,11.92L16.5,10.5L13,14V6H11M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22Z",
			cam: "M12,10L11.06,12.06L9,13L11.06,13.94L12,16L12.94,13.94L15,13L12.94,12.06L12,10M20,5H16.83L15,3H9L7.17,5H4A2,2 0 0,0 2,7V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V7A2,2 0 0,0 20,5M20,19H4V7H8.05L8.64,6.35L9.88,5H14.12L15.36,6.35L15.95,7H20V19M12,8A5,5 0 0,0 7,13A5,5 0 0,0 12,18A5,5 0 0,0 17,13A5,5 0 0,0 12,8M12,16A3,3 0 0,1 9,13A3,3 0 0,1 12,10A3,3 0 0,1 15,13A3,3 0 0,1 12,16Z",

		},
		svg_colors = {
			lake: "#BDBDBD",
			stage: "#B3E5FC",
			alert: "#B2FF59",
			investigate: "#FFA726",
			emergency: "#E53935",
			cam: "#000000",

		}

	return {
			type: "unique-value", // autocasts as new UniqueValueRenderer()
			field: "icon",
			field2: "site_trend",
			fieldDelimiter: ", ",
			defaultSymbol: {
				type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
				url: NoReadingIcon,
				width: "19px",
				height: "14px"
		
			},
			defaultLabel: label[ gauge ], //  used in the legend for all other types not specified
			// used for specifying unique values
			uniqueValueInfos: [
				{
					value: "rain, na",
					symbol: {
						type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
						url: RainIcon,
						width: "35px",
						height: "15px"
			
					},
					label: "Rain Gauge" // used in the legend to describe features with this symbol
				}, {
					value: "stage, steady",
					symbol: {
						type: "simple-marker",
						color: svg_colors.stage,
						size: "20px",
						outline: { 
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.steady,
					},
					label: "Stage Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage_alert, steady",
					symbol: {
						type: "simple-marker",
						color: svg_colors.alert,
						size: "20px",
						outline: { 
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.steady,
					},
					label: "Stage Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage_investigate, steady",
					symbol: {
						type: "simple-marker",
						color: svg_colors.ivestigate,
						size: "20px",
						outline: {
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.steady,
					},
					label: "Stage Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage_emergency, steady",
					symbol: {
						type: "simple-marker",
						color: svg_colors.emergency,
						size: "20px",
						outline: {
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.steady,
					},
					label: "Stage Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage, rising",
					symbol: {
						type: "simple-marker",
						color: svg_colors.stage,
						size: "20px",
						outline: {
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.rising,
					},
					label: label[ gauge ], // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage_alert, rising",
					symbol: {
						type: "simple-marker",
						color: svg_colors.alert,
						size: "20px",
						outline: {
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.rising,
					},
					label: label[ gauge ], // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage_investigate, rising",
					symbol: {
						type: "simple-marker",
						color: svg_colors.investigate,
						size: "20px",
						outline: {
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.rising,
					},
					label: label[ gauge ], // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage_emergency, rising",
					symbol: {
						type: "simple-marker",
						color: svg_colors.emergency,
						size: "20px",
						outline: {  // autocasts as new SimpleLineSymbol()
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.rising,
					},
					label: label[ gauge ], // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage, falling",
					symbol: {
						type: "simple-marker",
						color: svg_colors.stage,
						size: "20px",
						outline: {  // autocasts as new SimpleLineSymbol()
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.falling,
					},
					label: "Stage Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage_alert, falling",
					symbol: {
						type: "simple-marker",
						color: svg_colors.alert,
						size: "20px",
						outline: {  // autocasts as new SimpleLineSymbol()
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.falling,
					},
					label: "Stage Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage_investigate, falling",
					symbol: {
						type: "simple-marker",
						color: svg_colors.investigate,
						size: "20px",
						outline: {  // autocasts as new SimpleLineSymbol()
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.falling,
					},
					label: "Stage Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "stage_emergency, falling",
					symbol: {
						type: "simple-marker",
						color: svg_colors.emergency,
						size: "20px",
						outline: {  // autocasts as new SimpleLineSymbol()
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.falling,
					},
					label: "Stage Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "lake, steady",
					symbol: {
						type: "simple-marker",
						color: svg_colors.lake,
						size: "20px",
						outline: {  // autocasts as new SimpleLineSymbol()
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.steady,
					},
					label: "Lake Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "lake, rising",
					symbol: {
						type: "simple-marker",
						color: svg_colors.lake,
						size: "20px",
						outline: {  // autocasts as new SimpleLineSymbol()
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.rising,
					},
					label: "Lake Gauge", // used in the legend to describe features with this symbol
  					
				}, {
					value: "lake, falling",
					symbol: {
						type: "simple-marker",
						color: svg_colors.lake,
						size: "20px",
						outline: {  // autocasts as new SimpleLineSymbol()
							color: [ 0, 0, 0, 1 ],
							width: "2px",
						},
						path: svg_path.falling,
					},
					label: "Lake Gauge", // used in the legend to describe features with this symbol
  					
				},  {
					value: "cam, na",
					symbol: {
						type: "simple-marker",
						color: svg_colors.cam,
						size: "20px",
						outline: null,
						path: svg_path.cam,
					},
					label: "Creek Camera" // used in the legend to describe features with this symbol
				}
				
			]

		}

}

export function GetGeoJSONLabelInfo( gauge ){
	const labelClass = {  // autocasts as new LabelClass()
		"rain": new LabelClass( {
				labelExpressionInfo: { expression: "$feature.reading" },
				symbol: {
					type: "text",  // autocasts as new TextSymbol()
					color: "black",
					haloSize: 0,
					haloColor: "white",
					font: {  // autocast as new Font()
						family: "Ubuntu Mono",
						size: 8,
					  },

				},
				labelPlacement: "center-center",
				deconflictionStrategy: "none"
			} ),

		"stage,lcs,lake": new LabelClass({
				labelExpressionInfo: { expression: "$feature.reading" },
				symbol: {
					type: "text",  // autocasts as new TextSymbol()
					color: "black",
					haloSize: 2,
					haloColor: "white",
					font: {  // autocast as new Font()
						family: "Ubuntu Mono",
						size: 8
					},
					xoffset: 15,
					yoffset: 7,

				},
				labelPlacement: "center-center",
				deconflictionStrategy: "none",
				minScale: 48000,
			} ),
	
	}

	return labelClass[ gauge ]

}

export function InterpolatePrcp( pt_geojson ){
	const _this = this,
		getClassBreak = ( min, max ) => {
			let brks 

			if( min > 2 ){
				const inc = parseFloat( ( max - min / 4 ).toFixed( 2 ) )
		
				brks = [ 
					{ lower: min, upper: ( min + inc ) - 0.01, color: "#8dd5fc" }, 
					{ lower: ( min + inc ), upper: ( min + 2*inc ) - 0.01, color: "#4791fb" }, 
					{ lower: ( min + 2*inc ), upper: ( min + 3*inc ) - 0.01, color: "#4559bd" }, 
					{ lower: ( min + 3*inc ), upper: ( min + 4*inc ) - 0.01, color: "#0000ff" }, 
					{ lower: ( min + 4*inc ), upper: ( max > ( min + 5*inc ) - 0.01 ? max : ( min + 5*inc ) - 0.01 ), color: "#970002" }, 
					
				]
		
			}else{
				brks = [ 
					{ lower: 0.01, upper: 1.99, color: "#8dd5fc" }, 
					{ lower: 2.00, upper: 2.99, color: "#4791fb" }, 
					{ lower: 3.00, upper: 3.99, color: "#4559bd" }, 
					{ lower: 4.00, upper: 4.99, color: "#0000ff" }, 
					{ lower: 5.00, upper: ( max > 5.99 ? max : 5.99 ), color: "#970002" }, 
					
				]
		
			}

			return brks.map( brk => {
				return {
						minValue: brk.lower,
						maxValue: brk.upper,
						symbol: {
							type: "simple-fill",  // autocasts as new SimpleFillSymbol()
							color: brk.color,
							outline: { width: 0 }, // remove outlines
							style: "solid",
	
						}

					}

			} )

		}

	let geojson = Interpolate( pt_geojson, 1, { 
			gridType: "hex", 
			property: "reading", 
			units: "miles" 

		} ),
		min = 0, 
		max = 0
				
	geojson.features.forEach( feature => {
		feature.properties.reading = parseFloat( feature.properties.reading.toFixed( 2 ) )

		if( feature.properties.reading > 0 ){
			max = ( feature.properties.reading > max ? feature.properties.reading : max )
			min = ( min == 0 ? feature.properties.reading : ( feature.properties.reading < min ? feature.properties.reading : min ) )

		}

	} )

	return { 
			geojson: geojson, 
			renderer: {
				type: "class-breaks",  // autocasts as new UniqueValueRenderer()
				field: "reading",
				defaultSymbol: { 
					type: "simple-fill", 
					color: "#ffffff",
					outline: { width: 0 },
					style: "none",

				},  // autocasts as new SimpleFillSymbol()
				classBreakInfos: getClassBreak( min, max )

		}

	}

}

export function GetGeoJSONURL( geojson ){
 	// create a new blob from geojson featurecollection
 	const blob = new Blob( [ JSON.stringify( geojson ) ], {
			type: "application/json"
		} ),
		// URL reference to the blob
		url = URL.createObjectURL( blob )

	return url

}