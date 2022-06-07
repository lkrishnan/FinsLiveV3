<template>
    <v-card
        class="ma-3"
        outlined
        v-show="sel_gauge_cam"
    >
        <v-row
            no-gutters
        >
            <v-col
                class="d-flex justify-start text-subtitle-1 font-weight-medium pa-2 accent primary--text"
            >
                {{( sel_gauge_cam ? sel_gauge_cam.text : "NA" )}}
            </v-col>
        </v-row>
        <v-row
            no-gutters
            v-show="[ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod' ].includes( route_name )"
        >
            <v-col
                class="d-flex justify-start"
            >
                <v-tabs
                    v-model="site_tab" 
                >
                    <v-tab
                        v-for="(tab, i) in site_tabs.filter( obj => obj.show )"
                        :key="'tab'+ i"
                    >
                        <v-icon>{{tab.icon}}</v-icon>
                        <span class="ml-2">{{tab.label}}</span>
                    </v-tab>
                </v-tabs>
            
            </v-col>

        </v-row>    
        <v-row
			no-gutters
			class="mx-2"
            v-show="site_tab === 0 && site_tabs[ site_tab ].show && [ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod' ].includes( route_name )"
		>
            <v-col
                id="grph"
                class="d-flex justify-center px-5 pt-5"
            >
            </v-col>
            
        </v-row>
        <v-row
			no-gutters
			class="mx-2"
            v-show="site_tab === 0 && site_tabs[ site_tab ].show && [ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod' ].includes( route_name )"
		>
            <v-col
                cols="6"
                class="d-flex justify-start pa-5 caption"
                v-for="(ref_lbl, i) in ref_labels"
                :key="'ref_lbl'+ i"
            >
                {{i+1}} - {{ ref_lbl }}
            </v-col>
            
        </v-row>
        <v-row
            no-gutters
			class="mx-2"
            v-show="site_tab === 1 && site_tabs[ site_tab ].show && [ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod' ].includes( route_name )"
        >
            <v-data-table
                :headers="headers"
                :items="readings"
                hide-default-footer
                :page.sync="pg"
                :items-per-page="items_per_pg"
                @page-count="pg_count = $event"
            >
                <template v-slot:item.datetime="{item}">
					{{ formatTheDate( item.datetime ) }}
				</template>
                <template v-slot:item.reading="{item}">
					{{ parseFloat( item.reading ).toFixed( 3 ) }}
				</template>
				
            </v-data-table>
            <div class="text-center pt-2">
                <v-pagination
                    v-model="pg"
                    :length="pg_count"
                    :total-visible="5"
                    circle
                ></v-pagination>
      
            </div>
        </v-row>

        <!-- Reference Images -->
        <v-row
            no-gutters
			class="mx-2"
            v-show="site_tab === 2 && site_tabs[ site_tab ].show && [ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod' ].includes( route_name )"
        >
            <v-col
                class="d-flex justify-center pa-5"
            >
                <v-img
                    v-for="(ref_img, i) in ref_images"
                    :key="'ref_img'+ i"
                    :src="ref_img"
                ></v-img>    
            </v-col>
            
       </v-row>

       <!-- Creek Camera Snapshots -->
       <div
            v-show="[ 'SelectedCamera' ].includes( route_name )"
        >
            <v-row
                no-gutters
                class="mx-2"
            >
                <v-col
                    class="d-flex justify-end pt-5 px-5 subtitle-2"
                >
                    {{last_refresh}}
                    
                </v-col>
                
            </v-row>
            <v-row
                no-gutters
                class="mx-2"
            >
                <v-col
                    class="d-flex justify-center px-5 pb-5"
                >
                    <v-img
                        :src="snapshot"
                    ></v-img>    
                    
                </v-col>
                
            </v-row>

       </div>

  </v-card>

</template>

<script>
    import { GetAlertData, GetContrailData } from "../js/getFINSData"
    import { getContrailParams, getAlertParams, GetGaugeInfo } from "../js/getFINSData"
    import RoundNum from "../js/roundNum"
    import GetLineChart from "../js/getLineChart"
    import ValidateString from "../js/validateString"
    import * as d3 from "d3"
    import Moment from "moment"
    import gaugeInfo from "../assets/gauge_info.json"
    import { AsUCWords } from "../js/formatStr"

	export default{
      	name: "site",

        mounted: function( ){
            //get gauge/cam information based on the passed query string
            this.parseRoute( )
        
        },

		data: ( ) => ( {
            //refresh parameters
            refreshid: null,
            last_refresh: null,

            //table parameters
            site_tab: 0,
			site_tabs: [
			    { label: "Graph", icon: "mdi-chart-bell-curve-cumulative", value: "graph", show: true, },
			    { label: "Tabular", icon: "mdi-file-table-box-outline", value: "tablular",  show: true, },
			    { label: "Picture", icon: "mdi-panorama-outline", value: "picture",  show: false, },
				
		    ],
            headers: [ ],
            readings: [ ],
            ref_images: [ ],
            ref_labels: [ ],
            pg: 1,
            pg_count: 0,
            items_per_pg: 10,
            snapshot: null,
            
		} ),
      
      	computed: {
            //app
            ws( ){
          		return this.$store.state.ws

      		},
			//custom
            drawer_width( ) {
                return ( this.is_mobile ? "100%" : "432px" )
                 
            },
            route_path( ){ //query string
				return this.$route.path
			
            },
            route_name( ){
                return this.$route.name
			
            },

            sel_gauge_cam( ){
				return this.$store.state.sel_gauge_cam
			
			},

            //toggles
            info_drawer: {
				set( payload ){
                    this.$store.commit( "info_drawer", payload )
					
				},
      			get( ){
					return this.$store.state.info_drawer
      			
				}

			},
           
      	},

		watch: {
            //custom
            route_path( ){ //change in query string
                const _this = this

                _this.parseRoute( )
			
            },
            
		},

		methods: {
            formatTheDate( input_date ){
                return Moment( input_date ).format( "MM/DD/YYYY h:mm A" )
                
			},

            formatReading( input_num ){
        		return RoundNum( input_num, 2 )
      		
			},

			parseRoute( ){
                const _this = this,
                    name = _this.$router.currentRoute.name,
                    params = _this.$router.currentRoute.params

                //reset variables
                _this.refreshid = window.clearInterval( _this.refreshid )
                _this.headers = [ ]
                _this.readings = [ ]
                _this.ref_images = [ ]
                _this.site_tabs.forEach( elem => {
                    elem.show = false

                } )

                switch( name ){
                    case "SelectedPeriod": 
                        //setup the 3 minute refresh loop 
                        
	                    _this.refreshid = self.setInterval( ( ) => {
                            _this.showData( params )
                        
                        }, 180000 )    

                        _this.showData( params )
                        _this.addRefImages( params )
                        
                        break

                    case "SelectedRange": case "SelectedDatePeriod":
                        _this.showData( params )
                        _this.addRefImages( params )
                        break

                    case "SelectedCamera":
                        _this.refreshid = self.setInterval( ( ) => {
                            _this.showSnapshot( params )
                            _this.last_refresh = "Last Refresh " + Moment( ).format ( "MM/DD/YYYY hh:mm A" )
                        
                        }, 20000 ) 
                        
                        _this.showSnapshot( params )
                        _this.last_refresh = "Last Refresh " + Moment( ).format ( "MM/DD/YYYY hh:mm A" )
                        
                        break

                }

                //show the info panel
                _this.info_drawer = ( name.search( /Selected/ ) > -1 )

            },

            async showData( params ){
                const _this = this,
                    { gauges, ...qrystr } = params,
                    site_info = gaugeInfo[ qrystr.uniqueid ],
                    promises = await qrystr.uniqueid.split( ", ").map( async uniqueid => {
                        if( ValidateString( uniqueid, "isRainGauge" ) ){ 
                            
                            return { 
                                uniqueid: uniqueid, 
                                gauge: "rain", 
                                readings: await GetAlertData( "rain", "readings", getAlertParams( qrystr ) ) 

                            }
                        
                        }else if( ValidateString( uniqueid, "isStageGauge" ) ){ 
                            return { 
                                uniqueid: uniqueid, 
                                gauge: "stage", 
                                readings: await GetAlertData( "stage", "readings", getAlertParams( qrystr ) ) 

                            }
                                                    
                        }else if( ValidateString( uniqueid, "isLakeGauge" ) ){ 
                            return { 
                                uniqueid: uniqueid, 
                                gauge: "lake", 
                                readings: await GetAlertData( "lake", "readings", getAlertParams( qrystr ) ) 

                            }
                                                    
                        }else if( ValidateString( uniqueid, "isLCSGauge" ) ){
                            return { 
                                uniqueid: uniqueid, 
                                gauge: "lcs", 
                                readings: await GetContrailData( "contrail", getContrailParams( qrystr, site_info ) ) 

                            }

                        }

                    } ),
                    data = await Promise.all( promises ),
                    headers = {
                        rain: [ { text: "Date/Time", value: 'datetime' }, { text: "Rain (in)", value: "reading" } ],
                        stage: [ { text: "Date/Time", value: 'datetime' }, { text: "Stream Level (ft)", value: "reading" } ],
                        lcs: [ { text: "Date/Time", value: 'datetime' }, { text: "Stream Level (ft)", value: "reading" } ],
                        lake: [ { text: "Date/Time", value: 'datetime' }, { text: "Lake Level (ft)", value: "reading" } ],

                    }

                _this.ref_labels = ( site_info.hasOwnProperty( "ref_values" ) ? site_info.ref_values : [ ] )
                                .filter( elem => ![ "alert", "investigate", "emergency" ].includes( elem.label ) )
                                .map( elem => AsUCWords( elem.label ) )
                    
                if( data.length > 0 ){
                    const gauge_type = data[ 0 ].gauge,
                        readings = data[ 0 ].readings
                    
                    if( typeof( readings ) != "undefined" && readings.length > 0 ){
                        _this.headers = headers[ gauge_type ]

                        if( gauge_type === "lcs" ){
                            _this.readings = [ ...readings ]
                                            .reverse( )
                                            .map( a => {
                                                const date_time_arr = a.data_time.split( " " )

                                                return { 
                                                    datetime: date_time_arr[ 0 ] + "T" + date_time_arr[ 1 ] + "Z", 
                                                    reading: a.raw_value,
                                                    reading_with_msl: a.data_value, 
                                                }

                                            } )

                        }else if( gauge_type === "stage" ){
                            _this.readings = readings
                                                .map( a => {
                                                    return { 
                                                        datetime: a.datetime, 
                                                        reading: a.reading,
                                                        reading_with_msl: a.reading + site_info.msl, 
                                                }

                                            } )

                        }else{
                            _this.readings = readings
                            
                        }

                        _this.site_tabs[ 1 ].show = true
                        _this.addGraph( gauge_type, site_info )

                    }
                    
                }
                
            },

            addGraph( gauge_type, site_info ){
                const _this = this
                    
                let chart, 
                    chart_cont = null,
                    chart_params, 
                    ymin, ymax, new_ymin, new_ymax, yscale_nums

                switch( gauge_type ){
                    case "rain":
                        chart_params = { 
                            x: d => new Date( d.datetime ),
                            y: d => d.reading,
                            color: "#1976D2",
                            xType: d3.scaleTime, //xscale in local time (EST/EDT)

                        },
                        ymin = Math.min( ..._this.readings.map( r => r.reading ) )
                        ymax = Math.max( ..._this.readings.map( r => r.reading ) )
                        new_ymax = ( ymax === 0 ? .1 : ymax + ( ymax *.1 ) )

                        chart_params.yLabel = "Inches if Rain (in.)"
                        chart_params.yDomain = [ ymin, new_ymax ]
                        chart_params.width = 320
                        chart_params.height = 350
                        chart_params.unit = "in"
                        break

                    case "stage": case "lcs": 
                        chart_params = { 
                            x: d => new Date( d.datetime ),
                            y: d => d.reading_with_msl,
                            color: "#1976D2",
                            yLabel: "Stream Level above MSL (ft)",
                            width: 320,
                            height: 320,
                            unit: "ft",
                            xType: d3.scaleTime, //xscale in local time (EST/EDT)

                        }
                        
                        yscale_nums = [ 
                            Math.min(..._this.readings.map( r => r.reading_with_msl ) ), 
                            Math.max(..._this.readings.map( r => r.reading_with_msl ) ),
                            
                        ]

                        if( site_info.hasOwnProperty( "msl" ) ){
                            chart_params.msl = site_info.msl
                            yscale_nums.push( site_info.msl )

                        } 
                        
                        if( site_info.hasOwnProperty( "ref_values" ) ){
                            chart_params.refs = site_info.ref_values
                            yscale_nums.push( ...site_info.ref_values.map( ref => ref.value ) )
                            
                        }

                        if( site_info.hasOwnProperty( "alarms" ) ){
                            chart_params.alarms = site_info.alarms
                            yscale_nums.push( ...site_info.alarms.map( alarm => alarm.value ) )
                            
                        }

                        chart_params.yDomain = [ 
                            Math.floor( Math.min( ...yscale_nums ) ) - 5, 
                            Math.ceil( Math.max( ...yscale_nums ) ) + 5 
                            
                        ]

                        break

                    case "lake":
                        chart_params = { 
                            x: d => new Date( d.datetime ),
                            y: d => d.reading,
                            yDomain: [ 
                                Math.min( ..._this.readings.map( r => r.reading ) ) - 5, //ymin 
                                Math.max( ..._this.readings.map( r => r.reading ) ) + 5  //ymax
                            ],
                            color: "#1976D2",
                            yLabel: "Lake Level (ft)",
                            width: 320,
                            height: 320,
                            unit: "ft",
                            xType: d3.scaleTime, //xscale in local time (EST/EDT)

                        }
                        break

                }

                chart = GetLineChart( _this.readings, chart_params )

                //refresh/add the chart
                if( chart_cont ) chart_cont.remove( )
                
                d3.select( "#grph" ).selectAll( "*" ).remove( )
                chart_cont = d3.select( "#grph" ).append( ( ) => chart )

                _this.site_tabs[ 0 ].show = true

                //_this.addSwatch( )
                
            },

            addSwatch( ){
               


            },

            showSnapshot( params ){
                const _this = this

                if( ValidateString( params.uniqueid, "isCamera" ) ){
                    const site_info = gaugeInfo[ params.uniqueid ]

                    _this.snapshot = ( site_info.hasOwnProperty( "key" ) ? 
                        `${_this.ws.camera}?method=image&camera=${site_info.key}&api_key=55dcad90-e3ec-4954-b882-384bfd3bb9dd`: 
                        `${_this.ws.fins}v1/creekcam/${site_info.site_id}` 

                    )

                }
                
            },

            addRefImages( params ){
                const _this = this

                if( gaugeInfo[ params.uniqueid ].hasOwnProperty( "ref_images" ) ){
                    _this.ref_images = gaugeInfo[ params.uniqueid ][ "ref_images" ]
                                        .map( filename => `https://mecklenburgcounty.exavault.com/p/stormwater/Warning%20Sites/${params.uniqueid}/${filename}` )

                    _this.site_tabs[ 2 ].show = true

                }

            }
           
        },

  	}

//problem lcs gauges
//Stewart Creek at Parkway Ave - 991

</script>