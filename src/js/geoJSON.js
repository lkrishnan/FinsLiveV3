import Moment from "moment"
import LabelClass from "@arcgis/core/layers/support/LabelClass"
import RainIcon from "../assets/rain.png"
import StageIcon from "../assets/stage.png"
import LakeIcon from "../assets/lake.png"
import NoReadingIcon from "../assets/noreading.png"
import CamIcon from "../assets/cam.png"
import Interpolate from "@turf/interpolate"
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"

export function FormatAsGeoJSON( gauge_arr, data_arr ){
	let geojson = { type: "FeatureCollection", features: [ ] }

	gauge_arr.forEach( ( gauge, idx ) => {
		if( [ "rain", "stage", "lake" ].includes( gauge ) ){

			data_arr[ idx ].forEach( row => {
				//const allowed = [ "site_id", "site_name", "gauge", "precipitation", "stream_level", 
				//	"lake_level", "lastreading_time", "lastreading_epoch", "usgs_id", "shef_id", "measure_unit" ],
				const allowed = [ "site_id", "site_name", "gauge", "precipitation", "stream_level", "lake_level", "lastreading_epoch", "measure_unit" ],
					prop = Object.keys( row )
							.filter( key => allowed.includes( key ) )
							.reduce( ( obj, key ) => {
								if( key === "lastreading_epoch" ){
									obj[ key ] = parseInt( row[ key ] )	 
		
								}else if( [ "precipitation", "stream_level", "lake_level" ].includes( key ) ){
									obj[ "reading" ] = ( isNaN( parseFloat( row[ key ] ) ) ? "" : parseFloat( row[ key ] ).toFixed( 2 ) )
									console.log( )
									obj[ "icon" ] = ( isNaN( parseFloat( row[ key ] ) ) ? "nr" : row.gauge )

								}else{
									obj[ key ] = row[ key ]

								}
					
								return obj

							}, { } )
		
				//Push features into the geojson layer
				geojson.features.push( {
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [ parseFloat( row.longitude ), parseFloat( row.latitude ) ]

					},
					properties: prop

				} )
		
			} )

		}else if( gauge === "lcs" ){
			let site_obj = { }

			//parse lcs meta and store in an object based on site_id
			data_arr[ idx ].meta.forEach( site => {
				site_obj[ site.site_id ] = { 
						gauge: "lcs",
						site_id: site.site_id,
						latitude: parseFloat( site.latitude_dec ),
						longitude: parseFloat( site.longitude_dec ),
						site_name: site.location,
						measure_unit: null,
						lastreading_epoch: null,
						reading: "",
						icon: "nr", 

				  	}

			} )

			//parse lcs data and store in an object based on site_id
			data_arr[ idx ].data.forEach( site => {
				if( site_obj.hasOwnProperty( site.site_id ) ){
					if( site.hasOwnProperty( "raw_value" ) ){
						site_obj[ site.site_id ].measure_unit = site.units,
						site_obj[ site.site_id ].lastreading_epoch = Moment( site.data_time ).valueOf( )
						site_obj[ site.site_id ].reading = ( isNaN( parseFloat( site.raw_value ) ) ? "" : parseFloat( site.raw_value ).toFixed( 2 ) )
						site_obj[ site.site_id ].icon = "stage" 

					}

				}
				
			} )

			for( let site in site_obj ){
				const { longitude, latitude, ...prop } = site_obj[ site ]

				//Push features into the geojson layer
				geojson.features.push( {
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [ longitude, latitude ]

					},
					properties: prop
					
				} )
				
			}

		}

	} )

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

				case "cam":
					const img_url = ( attrib.key ? `https://maps.mecklenburgcountync.gov/api/camera?method=image&camera=${attrib.key}&api_key=55dcad90-e3ec-4954-b882-384bfd3bb9dd` : `http://maps.co.mecklenburg.nc.us/rest/v1/ws_fins_creekcam.php?camid=${attrib.site_id}&cachebuster=${new Date( ).getTime( )}` )

					txt = `<img src='${img_url}&cachebuster=${new Date( ).getTime( )} width='400' height='180'/>`
					break
	

			}

			return txt

		},
		templates = {
			"rain": {
					title: "{site_id}: {site_name}",
					outFields: [ "*" ],
					content: getContentText,
					fieldInfos: [
						{
							fieldName: "lastreading_epoch",
							format: {
								dateFormat: "short-date-short-time"
							}
						}
					]
				},

			"stage,lcs,lake": {
					title: "{site_id}: {site_name}",
					outFields: [ "*" ],
					content: getContentText,
					fieldInfos: [
						{
							fieldName: "lastreading_epoch",
							format: {
								dateFormat: "short-date-short-time"
							}
						}
					]
				},

			"cam": {
					title: "{site_id}: {name}",
					outFields: [ "*" ],
					content: getContentText,
					actions: [ 
							{
								title: "View Snapshot",
								id: "cam_snapshot",
								image: NoReadingIcon
					  		} 

						]
					
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
		cam: "Creek Camera" 
	}
	return {
			type: "unique-value", // autocasts as new UniqueValueRenderer()
			field: "icon",
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
					value: "lake",
					symbol: {
						type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
						url: LakeIcon,
						width: "35px",
						height: "15px"
			
					},
					label: label[ gauge ] // used in the legend to describe features with this symbol
				}, {
					value: "stage",
					symbol: {
						type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
						url: StageIcon,
						width: "35px",
						height: "15px"
			
					},
					label: label[ gauge ] // used in the legend to describe features with this symbol
				}, {
					value: "rain",
					symbol: {
						type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
						url: RainIcon,
						width: "35px",
						height: "15px"
			
					},
					label: label[ gauge ] // used in the legend to describe features with this symbol
				}, {
					value: "cam",
					symbol: {
						type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
						url: CamIcon,
						width: "35px",
						height: "35px"
			
					},
					label: label[ gauge ] // used in the legend to describe features with this symbol
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
					haloSize: 0,
					haloColor: "white",
					font: {  // autocast as new Font()
						family: "Ubuntu Mono",
						size: 8
					  },

				},
				labelPlacement: "center-center",
				deconflictionStrategy: "none",
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