<template>
    <v-card
        class="ma-3"
        outlined
        v-if="sel_gauge_cam"
    >
        <!-- Gauge Camera title  -->
        <v-row
            no-gutters
        >
            <v-col
                class="d-flex justify-start text-subtitle-1 font-weight-medium pa-2 accent"
                data-cy="site_name"
            >
                {{( sel_gauge_cam ? sel_gauge_cam.text : "NA" )}}
            </v-col>
        </v-row>
        
        <!-- Progress -->
        <v-row
            no-gutters
            class="ma-5"
            v-show="show_progress"
        >    
            <v-col
                class="d-flex align-center justify-center text-h6"
            >
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
                
            </v-col>

        </v-row>

        <!-- No readings available -->
        <v-row
            no-gutters
            class="ma-5"
            v-show="[ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod', 'SelectedCamera' ].includes( route_name ) && readings.length == 0 && !snapshot && !show_progress"
        >    
            <v-col
                class="d-flex align-center justify-center text-h6"
            >
                <v-icon
                    x-large
                    color="orange darken-2"
                >
                    mdi-database-alert
                
                </v-icon>
                
                <span class="ml-2">
                    No readings were recorded
                
                </span>

            </v-col>

        </v-row>

        <!-- Tabs -->
        <v-row
            no-gutters
            v-show="[ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod' ].includes( route_name ) && readings.length > 0"
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
                        <span 
                            class="ml-2"
                        >{{tab.label}}</span>
                    </v-tab>
                </v-tabs>
            
            </v-col>

        </v-row>    

        <!-- Chart and Reference Labels -->
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
                class="d-flex justify-start px-5 pt-2 caption"
                v-for="(ref_lbl, i) in ref_labels"
                :key="'ref_lbl'+ i"
            >
                {{i+1}} - {{ ref_lbl }}
            </v-col>
            
        </v-row>

        <!-- Tabular data of readings and Pagination -->
        <v-row
            no-gutters
			class="mx-2"
            v-show="site_tab === 1 && site_tabs[ site_tab ].show && [ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod' ].includes( route_name )"
        >
            <v-col>
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
                        {{ parseFloat( use_msl ? item.reading_with_msl: item.reading ).toFixed( 3 ) }}
                    </template>
                    
                </v-data-table>

            </v-col>
        </v-row>
        <v-row
            no-gutters
			class="mx-2"
            v-show="site_tab === 1 && site_tabs[ site_tab ].show && [ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod' ].includes( route_name )"
        >
            <v-col
                class="text-center"
            >
                <v-pagination
                    v-model="pg"
                    :length="pg_count"
                    :total-visible="5"
                    circle
                ></v-pagination>
            </v-col>
        </v-row>

        <!-- Reference Images -->
        <v-row
            no-gutters
			class="px-2 pt-2"
            v-show="site_tab === 2 && site_tabs[ site_tab ].show && [ 'SelectedPeriod', 'SelectedRange', 'SelectedDatePeriod' ].includes( route_name )"
        >
            <v-col
                v-for="(ref_img, i) in ref_images"    
                :key="'ref_img'+ i"
                class="d-flex justify-center pb-2"
            >
                <v-img
                    :src="ref_img"
                ></v-img>    
            </v-col>
            
       </v-row>

       <!-- Creek Camera Snapshots -->
        <v-row
            no-gutters
            class="mx-0"
            v-show="[ 'SelectedCamera' ].includes( route_name )"
        >
            <v-col>
                <v-img
                    data-cy="site_snapshot"
                    :src="snapshot"
                />
                                
            </v-col>
            
        </v-row>
        <v-row
            no-gutters
            class="mx-2 mt-2"
        >
            <v-col
                class="d-flex justify-end subtitle-2"
            >
                {{last_refresh}}
                
            </v-col>
            
        </v-row>

       <!-- Add to dashboard button and MSL switch-->
       <v-row
            no-gutters
            class="mx-5"
        >
            <v-col
                class="d-flex align-center"
            >
                <v-switch
                    v-model="use_msl"
                    v-show="show_add_msl_switch"
                    label="MSL"
                ></v-switch>

            </v-col>
            <v-col
                class="d-flex justify-end align-center py-4"
            >
                <v-btn 
                    outlined
                    color="primary"
                    :disabled="(dash_sites.length>dash_limit-1 && !dash_sites.includes( sel_gauge_cam.value ) ? true : false)"
                    @click="toggleDashSite( sel_gauge_cam && dash_sites.includes( sel_gauge_cam.value ) )"
                >
                        <v-icon>{{((sel_gauge_cam && dash_sites.includes( sel_gauge_cam.value )) ? "mdi-minus" : "mdi-plus")}}</v-icon>
                        {{((sel_gauge_cam && dash_sites.includes( sel_gauge_cam.value )) ? "from" : "to")}} Dashboard
                </v-btn>
                                
            </v-col>
                
        </v-row>
        <v-row
            no-gutters
            class="mx-2"
            v-if="dash_sites.length>dash_limit-1"
        >
            <v-col
                class="d-flex justify-center"
            >
                <v-alert
                    outlined
                    dense
                    shaped
                    text
                    type="warning"
                >
                    Reached dashboard limit of {{dash_limit}} sites
                </v-alert>
                
            </v-col>
            
        </v-row>
       
  </v-card>

</template>

<script>
    import { GetAlertData, GetContrailData } from "../js/getFINSData"
    import { getContrailParams, getAlertParams } from "../js/getFINSData"
    import RoundNum from "../js/roundNum"
    import GetLineChart from "../js/getLineChart"
    import ValidateString from "../js/validateString"
    import * as d3 from "d3"
    import { FormatDate } from "../js/vanillaMoment"
    import { AsUCWords } from "../js/formatStr"

	export default{
      	name: "site",

        mounted: function( ){
            const _this = this

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
            items_per_pg: 6,
            snapshot: null,
            use_msl: false,
            show_add_msl_switch: false,
            show_progress: true
                        
		} ),
      
      	computed: {
            //app
            ws( ){
          		return this.$store.state.ws

      		},
            gauge_info(){
				return this.$store.state.gauge_info
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

            filter_holder( ){
                return this.$store.state.filter_holder

            },

            //query control
            dash_sites( ){
				return this.$store.state.dash_sites
      			
			},

            dash_limit( ){
				return this.$store.state.dash_limit
      			
			},

            dash_refreshid( ){
				return this.$store.state.dash_refreshid
      			
			},

           
      	},

		watch: {
            //custom
            route_path( ){ //change in query string
                const _this = this

                _this.parseRoute( )
			
            },

            use_msl( ){
                const _this = this

                _this.parseRoute( )

            }
            
		},

		methods: {
            formatTheDate( input_date ){
                return FormatDate( "MM/DD/YYYY hh:mm A", input_date )
                
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
                _this.show_progress = true
                _this.show_add_msl_switch = false

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
                            _this.last_refresh = "Refreshed: " + FormatDate( "MM/DD/YYYY hh:mm:ss A" )
                        
                        }, 20000 ) 
                        
                        _this.showSnapshot( params )
                        _this.last_refresh = "Refreshed: " + FormatDate( "MM/DD/YYYY hh:mm:ss A" )
                        
                        break

                }

                //show the info panel
                _this.info_drawer = ( name.search( /Selected/ ) > -1 || _this.filter_holder )

            },

            async showData( params ){
                const _this = this,
                    { gauges, ...qrystr } = params,
                    site_info = _this.gauge_info[ qrystr.uniqueid ],
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
                                readings: await GetContrailData( "contrail", getContrailParams( qrystr, site_info, (_this.use_msl ? "c57f3913-ac01-4aa7-b633-e8311f45f74a" : "a70cdf6d-8277-4840-9913-e87e2d195c0b" ) ) ) 

                            }

                        }

                    } ),
                    data = await Promise.all( promises ),
                    headers = {
                        rain: [ { text: "Date/Time", value: 'datetime' }, { text: "Rain (in)", value: "reading" } ],
                        stage: [ { text: "Date/Time", value: 'datetime' }, { text: "Stream Level" + ( _this.use_msl ? " above MSL": "" ) + "(ft)", value: "reading" } ],
                        lcs: [ { text: "Date/Time", value: 'datetime' }, { text: "Stream Level" + ( _this.use_msl ? " above MSL": "" ) + "(ft)", value: "reading" } ],
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
                                            .filter( a => a.sensor_class === ( _this.use_msl ? 382 : 20 ) )
                                            .reverse( )
                                            .map( a => {
                                                const date_time_arr = a.data_time.split( " " )

                                                return { 
                                                    datetime: date_time_arr[ 0 ] + "T" + date_time_arr[ 1 ] + "Z", 
                                                    reading: ( _this.use_msl ? null : a.data_value ),
                                                    reading_with_msl: ( _this.use_msl ? a.data_value : null ), 
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

                _this.show_progress = false
                                
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
                            //y: d => ( _this.use_msl ? parseFloat( d.reading ) + site_info.msl: parseFloat( d.reading ) ),
                            y: d => ( _this.use_msl ? parseFloat( d.reading_with_msl ): parseFloat( d.reading ) ),
                            color: "#1976D2",
                            yLabel: "Stream Level" + ( _this.use_msl ? " above MSL": "" ) + " (ft)",
                            width: 320,
                            height: 320,
                            unit: "ft",
                            xType: d3.scaleTime, //xscale in local time (EST/EDT)

                        }

                        yscale_nums = [ 
                            //Math.min(..._this.readings.map( r => ( _this.use_msl ? RoundNum( parseFloat( r.reading ) + site_info.msl, 2 ): parseFloat( r.reading ) ) ) ), 
                            //Math.max(..._this.readings.map( r => ( _this.use_msl ? RoundNum( parseFloat( r.reading ) + site_info.msl, 2 ): parseFloat( r.reading )) ) ),
                            Math.min(..._this.readings.map( r => ( _this.use_msl ? RoundNum( parseFloat( r.reading_with_msl ), 2 ): parseFloat( r.reading ) ) ) ), 
                            Math.max(..._this.readings.map( r => ( _this.use_msl ? RoundNum( parseFloat( r.reading_with_msl ), 2 ): parseFloat( r.reading )) ) ),
                            
                        ]

                        if( _this.use_msl ){
                            chart_params.msl = site_info.msl
                            yscale_nums.push( site_info.msl )

                        } 

                        if( site_info.hasOwnProperty( "ref_values" ) ){
                            chart_params.refs = site_info.ref_values.map( ref => {
                                return { ...ref, ...{ value : ( _this.use_msl ? ref.value : RoundNum( ref.value - site_info.msl, 2 ) ) } }  
                            } )

                            yscale_nums.push( ...site_info.ref_values.map( ref => ( _this.use_msl ? ref.value : RoundNum( ref.value - site_info.msl, 2 ) ) ) )
                            
                        }

                        if( site_info.hasOwnProperty( "alarms" ) ){
                            chart_params.alarms = site_info.alarms.map( alarm => {
                                return { ...alarm, ...{ value : ( _this.use_msl ? alarm.value : RoundNum( alarm.value - site_info.msl, 2 ) ) } }  
                            } )
                            yscale_nums.push( ...site_info.alarms.map( alarm => ( _this.use_msl ? alarm.value : RoundNum( alarm.value - site_info.msl, 2 ) ) ) )
                            
                        }

                        //setting yaxis max and min
                        chart_params.yDomain = [ 
                            ( _this.use_msl ? Math.floor( Math.min( ...yscale_nums ) ) - 5 : 0 ), 
                            Math.ceil( Math.max( ...yscale_nums ) ) + 5 
                            
                        ]

                        _this.show_add_msl_switch = true

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
                
            },

            showSnapshot( params ){
                const _this = this,
                isNumeric = function( str ){
		            const validChars = "0123456789."
			            

			        let isNumber = ( str.length > 0 ? true : false ), chr
				
                    for( let i = 0; i < str.length && isNumber == true; i++ ){ 
                        chr = str.charAt( i ); 
                            
                        if( validChars.indexOf( chr ) == -1 ){
                            isNumber = false;
                        }	
                    }
                        
                    return isNumber;
                }

                if( ValidateString( params.uniqueid, "isCamera" ) ){
                    const site_info = _this.gauge_info[ params.uniqueid ]

                    _this.snapshot = ( isNumeric(site_info.site_id  ) ? `${_this.ws.fins}v1/creekcam/${site_info.site_id}`: `${_this.ws.camera}?method=image&camera=${site_info.key}&api_key=55dcad90-e3ec-4954-b882-384bfd3bb9dd` )
                    
                }

                _this.show_progress = false
                
            },

            addRefImages( params ){
                const _this = this

                if( _this.gauge_info[ params.uniqueid ].hasOwnProperty( "ref_images" ) ){
                    _this.ref_images = _this.gauge_info[ params.uniqueid ][ "ref_images" ]
                                        .map( filename => `https://mecklenburgcounty.exavault.com/p/stormwater/Warning%20Sites/${params.uniqueid}/${filename}` )

                    _this.site_tabs[ 2 ].show = true

                }

            },

            toggleDashSite( remove ){
                const _this = this

                if( remove ){
                    //clear refresh loop
                    _this.$store.commit( "update_dash_refreshid", { [ _this.sel_gauge_cam.value ]: window.clearInterval( _this.dash_refreshid[ _this.sel_gauge_cam.value ] )  } )
                    _this.$store.commit( "remove_dash_site", _this.sel_gauge_cam.value )

                }else{
                    _this.$store.commit( "add_dash_site", _this.sel_gauge_cam.value )

                }

            },
           
        },

  	}

//problem lcs gauges
//Stewart Creek at Parkway Ave - 991

</script>