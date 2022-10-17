<template>
    <v-card
        class="mx-5"
        :class="card_margin"
        :data="data"
        :width="card_width"
        outlined
    >
        <!-- Site Label -->
        <v-row
            no-gutters
            class="primary"
        >
            <v-col
                cols="11"
                class="d-flex text-subtitle-1 font-weight-medium pa-2 white--text rounded-sm rounded-bl-0"
            >
                {{data.label}}
            </v-col>
            <v-col
                cols="1"
                class="d-flex justify-end align-center pa-1"
            >
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            small
                            color="white"
                            v-bind="attrs"
                            v-on="on"
                            @click="getData( )"
                        >
                            <v-icon>mdi-cached</v-icon>
                        </v-btn>
                    </template>
                    <span>{{last_refresh}}</span>
                </v-tooltip>

                <v-btn
                    icon
                    small
                    color="white"
                    @click="removeDashSite( data.unique_id )"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>

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
            v-show="readings.length == 0 && !snapshot && !show_progress"
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
            v-show="readings.length>0"
        >
            <v-col
                class="d-flex justify-start"
            >
                <v-tabs
                    v-model="sel_tab" 
                >
                    <v-tab
                        v-for="(tab, i) in site_tabs"
                        :key="'site_tab'+ i"
                    >
                        <v-icon>{{tab.icon}}</v-icon>
                        <span 
                            class="ml-2"
                        >{{tab.label}}</span>
                    </v-tab>
                </v-tabs>
            
            </v-col>
            
        </v-row>    

        <!-- All Chart controls -->
        
        <!-- Chart -->
        <v-row
            no-gutters
            class="mx-2 mt-2"
            v-show="readings.length>0 && sel_tab === 0"
        >
            <v-col
                :id="'dash_chart_' + data.unique_id"
                class="d-flex justify-center px-5"
            >
                
            </v-col>
            
        </v-row>

        <v-row
            no-gutters
            class="mx-5 mb-5"
            v-show="sel_tab===0"
        >
            <v-col
                class="d-flex justify-start align-start"
            >
                <v-switch
                    v-model="use_msl"
                    label="MSL"
                    hide-details
                    v-show="show_add_msl_switch"
                ></v-switch>
            </v-col>

        </v-row>

        <!-- Reference Labels -->
        <v-row
            no-gutters
            class="mx-2 mb-2"
            v-show="readings.length>0 && sel_tab === 0"
        >
            <v-col
                cols="6"
                class="d-flex justify-start px-5 pb-2 caption"
                v-for="(ref_lbl, i) in ref_labels"
                :key="'ref_lbl'+ i"
            >
                {{i+1}} - {{ ref_lbl }}
            </v-col>
            
        </v-row>
     
        <!-- Readings and Pagination -->
        <v-row
            no-gutters
            class="mx-2"
            v-show="readings.length>0 && sel_tab === 1"
        >
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="readings"
                    hide-default-footer
                    :page.sync="pg_no"
                    :items-per-page="per_pg"
                    @page-count="pg_cnt = $event"
                >
                    <template v-slot:item.datetime="{item}">
                        {{ formatTheDate( item.datetime ) }}
                    </template>
                    <template v-slot:item.reading="{item}">
                        {{ parseFloat( item.reading ).toFixed( 3 ) }}
                    </template>
                    
                </v-data-table>
                
            </v-col>
        </v-row>
        <v-row
            no-gutters
			class="mx-2 mb-2"
            v-show="readings.length>0 && sel_tab === 1"
        >
            <v-col
                class="text-center py-2"
            >
                <v-pagination
                    v-model="pg_no"
                    :length="pg_cnt"
                    :total-visible="per_pg"
                    circle
                ></v-pagination>

            </v-col>

        </v-row>
   
        <!-- Reference Images -->
        <v-row
            no-gutters
			class="mx-2"
            v-for="(ref_img, i) in ref_images"
            :key="'ref_img'+ i"
            v-show="ref_images.length>0 && sel_tab === 2"
        >
            <v-col
                class="d-flex justify-center pa-5"
            >
                <v-img
                    :src="ref_img"
                ></v-img>    
            </v-col>
        </v-row>    

        <!-- Creek Camera Snapshots -->
        <v-row
            no-gutters
            v-show="snapshot"
            class="px-5 pb-5"
        >
            <v-col
                class="d-flex justify-center align-stretch"
            >
                <v-img
                    :src="snapshot"
                    width="100"
                />
                
            </v-col>
            
        </v-row>
        
	</v-card>
	
</template>

<script>
	import * as d3 from "d3"
    import { FormatDate } from "../js/vanillaMoment"
    import ValidateString from "../js/validateString"
    import RoundNum from "../js/roundNum"
    import GetLineChart from "../js/getLineChart"
    import { AsUCWords } from "../js/formatStr"
    import { GetAlertData, GetContrailData, GetSnapshot } from "../js/getFINSData"
    import { getContrailParams, getAlertParams } from "../js/getFINSData"

  	export default{
    	name: "theSiteCard",

        props: {
            data: Object,

        },

        mounted: function( ){
            this.getData( )

        },
    
		computed: {
			tabs( ){
				return this.$store.state.tabs

			},

      		//custom
            padding( ){
                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "padding-top:70px;"
                    default: return "padding-top:90px;"

                }
                 
            },

            refresh_period( ){
                const _this = this

                switch( _this.data.gauge_type ){
                    case "rain": case "stage": case "lcs": case "lake":
                        return 180000
                    
                    case "camera":
                        return 20000

                }

            },

			card_width( ){
                const _this = this

                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": 
                        return "100%"
                    default: 
                        return (_this.data.gauge_type === "camera" ? "750px" : "530px" )

                }
                 
            },

            card_margin( ){
				switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "my-3"
                    default: return "my-5"

                }

			},

            is_mobile( ){
                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return true
                    default: return false

                }

            },

            headers( ){
                const _this = this,
                    headers = {
                            rain: [ { text: "Date/Time", value: 'datetime' }, { text: "Rain (in)", value: "reading" } ],
                            stage: [ { text: "Date/Time", value: 'datetime' }, { text: "Stream Level (ft)", value: "reading" } ],
                            lcs: [ { text: "Date/Time", value: 'datetime' }, { text: "Stream Level (ft)", value: "reading" } ],
                            lake: [ { text: "Date/Time", value: 'datetime' }, { text: "Lake Level (ft)", value: "reading" } ],

                        }

				return headers[ _this.data.gauge_type ]

            },

            ref_labels( ){
                const _this = this

                return ( _this.data.hasOwnProperty( "ref_values" ) ? _this.data.ref_values : [ ] )
                        .filter( elem => ![ "alert", "investigate", "emergency" ].includes( elem.label ) )
                        .map( elem => AsUCWords( elem.label ) )
                    
            },

			//query control			
			dash_sites: {
				set( payload ){
                    this.$store.commit( "dash_sites", payload )
					
				},
      			get( ){
					return this.$store.state.dash_sites
      			
				}
							
			},

			dash_limit( ){
				return this.$store.state.dash_limit
      			
			},

            dash_refreshid: {
				set( payload ){
                    this.$store.commit( "dash_refreshid", payload )
					
				},
      			get( ){
					return this.$store.state.dash_refreshid
      			
				}
							
			},

            dash_refreshid( ){
				return this.$store.state.dash_refreshid
      			
			},

			 //toggles
            dash_drawer: {
				set( payload ){
                    this.$store.commit( "dash_drawer", payload )
					
				},
      			get( ){
					return this.$store.state.dash_drawer
      			
				}

			},
			                	
		},
    
		watch: {
            use_msl( ){
                this.getData( )

            }
    
		},

		data: ( ) => ( {
			//info parameters
            readings: [ ],
            snapshot: null,
            ref_images: [ ],
            site_tabs: [ 
                { label: "Graph", icon: "mdi-chart-bell-curve-cumulative", value: "graph", },
                { label: "Tabular", icon: "mdi-file-table-box-outline", value: "tablular", } 
            ],
            sel_tab: 0,
            snapshot: null,
			pg_no: 1,
			pg_cnt: 0,
            per_pg: 6,

            use_msl: false,
            show_add_msl_switch: false,
            show_progress: true,

            //refresh parameters
            last_refresh: null,
            			
  		} ),
    
		methods: {
            getData( ){
                const _this = this,
                    uniqueid = _this.data.unique_id

                //refresh loop
                if( _this.dash_refreshid.hasOwnProperty( uniqueid ) ){
                    if( _this.dash_refreshid ){
                        _this.$store.commit( "update_dash_refreshid", { [ uniqueid ]: window.clearInterval( _this.dash_refreshid[ uniqueid ] ) } )

                    }

                }

                _this.$store.commit( "update_dash_refreshid", { 
                    [ uniqueid ]: self.setInterval( ( ) => { 
                            _this.getDynamicData( )
                            _this.last_refresh = "Refreshed: " + FormatDate( "MM/DD/YYYY hh:mm:ss A" ) 
                        }, _this.refresh_period )

                } )
               
                _this.getDynamicData( )
                _this.getStaticData( )
                _this.last_refresh = "Refreshed: " + FormatDate( "MM/DD/YYYY hh:mm:ss A" )

            },

            async getDynamicData( ){
	            const _this = this
                    					
                if( ValidateString( _this.data.unique_id, "isRainGauge" ) ){ 
					_this.readings = await GetAlertData( "rain", "readings", getAlertParams( { uniqueid: _this.data.unique_id, period: 'P1D' } ) )
                    						
				}else if( ValidateString( _this.data.unique_id, "isStageGauge" ) ){ 
					_this.readings = _this.formatStageReadings( await GetAlertData( "stage", "readings", getAlertParams( { uniqueid: _this.data.unique_id, period: 'PT12H' } ) ) )
                    													
				}else if( ValidateString( _this.data.unique_id, "isLakeGauge" ) ){ 
					_this.readings = await GetAlertData( "lake", "readings", getAlertParams( { uniqueid: _this.data.unique_id, period: 'P1D' } ) )
                    													
				}else if( ValidateString( _this.data.unique_id, "isLCSGauge" ) ){
					_this.readings = _this.formatLCSReadings( await GetContrailData( "contrail", getContrailParams( { uniqueid: _this.data.unique_id, period: 'PT12H' }, _this.data ) ) )
                    				
				}else if( ValidateString( _this.data.unique_id, "isCamera" ) ){
                    _this.snapshot = GetSnapshot( _this.data.site_id, ( _this.data.hasOwnProperty( "key" ) ? _this.data.key : null ) )
                                                        
                }

                if( _this.readings.length > 0 ){
                    //add the graph
                    _this.getGraph( )

                }

                _this.show_progress = false

            },

			getStaticData( ){
				const _this = this
                    
                _this.ref_images = ( _this.data.hasOwnProperty( "ref_images" ) ? _this.data.ref_images.map( filename => `https://mecklenburgcounty.exavault.com/p/stormwater/Warning%20Sites/${_this.data.unique_id}/${filename}` ) : [ ] )

                if( _this.ref_images.length > 0 ){
                    if( _this.site_tabs.length < 3 ){
                        _this.site_tabs.push( { label: "Picture", icon: "mdi-panorama-outline", value: "picture", } )

                    }

                }else{
                    if( _this.site_tabs.length > 2 ){
                        _this.site_tabs.pop( )

                    }

                } 

			},

            getGraph( ){
                const _this = this
                
                let chart, 
                    chart_cont = null,
                    chart_params, 
                    ymin, ymax, new_ymax, yscale_nums

                switch( _this.data.gauge_type ){
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
                        chart_params.width = 400
                        chart_params.height = 350
                        chart_params.unit = "in"

                        _this.show_add_msl_switch = false
                        break

                    case "stage": case "lcs": 
                        chart_params = { 
                            x: d => new Date( d.datetime ),
                            y: d => ( _this.use_msl ? parseFloat( d.reading ) + _this.data.msl: parseFloat( d.reading ) ),
                            color: "#1976D2",
                            yLabel: `Stream Level" ${( _this.use_msl ? " above MSL": "" )} (ft)`,
                            width: 400,
                            height: 320,
                            unit: "ft",
                            xType: d3.scaleTime, //xscale in local time (EST/EDT)

                        }

                        yscale_nums = [ 
                            Math.min(..._this.readings.map( r => ( _this.use_msl ? RoundNum( parseFloat( r.reading ) + _this.data.msl, 2 ): parseFloat( r.reading ) ) ) ), 
                            Math.max(..._this.readings.map( r => ( _this.use_msl ? RoundNum( parseFloat( r.reading ) + _this.data.msl, 2 ): parseFloat( r.reading )) ) ),
                            
                        ]
                        
                        if( _this.use_msl ){
                            chart_params.msl = _this.data.msl
                            yscale_nums.push( _this.data.msl )

                        } 
                        
                        if( _this.data.hasOwnProperty( "ref_values" ) ){
                            chart_params.refs = _this.data.ref_values.map( ref => {
                                return { ...ref, ...{ value : ( _this.use_msl ? ref.value : RoundNum( ref.value - _this.data.msl, 2 ) ) } }  
                            } )
                            yscale_nums.push( ..._this.data.ref_values.map( ref => ( _this.use_msl ? ref.value : RoundNum( ref.value - _this.data.msl, 2 ) ) ) )
                            
                        }

                        if( _this.data.hasOwnProperty( "alarms" ) ){
                            chart_params.alarms = _this.data.alarms.map( alarm => {
                                return { ...alarm, ...{ value : ( _this.use_msl ? alarm.value : RoundNum( alarm.value - _this.data.msl, 2 ) ) } }  
                            } )
                            yscale_nums.push( ..._this.data.alarms.map( alarm => ( _this.use_msl ? alarm.value : RoundNum( alarm.value - _this.data.msl, 2 ) ) ) )
                            
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
                            width: 400,
                            height: 350,
                            unit: "ft",
                            xType: d3.scaleTime, //xscale in local time (EST/EDT)

                        }

                        _this.show_add_msl_switch = false
                        break

                }

                chart = GetLineChart( _this.readings, chart_params )

                //refresh/add the chart
                if( chart_cont ) chart_cont.remove( )

                d3.select( "#dash_chart_" + _this.data.unique_id ).selectAll( "*" ).remove( )
                chart_cont = d3.select( "#dash_chart_" + _this.data.unique_id ).append( ( ) => chart )
                
            },

            formatTheDate( input_date ){
                return FormatDate( "MM/DD/YYYY hh:mm A", input_date )
                
			},

            formatReading( input_num ){
        		return RoundNum( input_num, 2 )
      		
			},

            formatLCSReadings( readings ){
                return [ ...readings ]
                        .reverse( )
                        .map( a => {
                            const date_time_arr = a.data_time.split( " " )

                            return { 
                                datetime: date_time_arr[ 0 ] + "T" + date_time_arr[ 1 ] + "Z", 
                                reading: a.raw_value,
                                reading_with_msl: a.data_value, 
                            }

                        } )

            },

            formatStageReadings( readings ){
                const _this = this

                return readings
						.map( a => {
                            return { 
                                datetime: a.datetime, 
                                reading: a.reading,
                                reading_with_msl: a.reading + _this.data.msl, 
                            }

						} )
            },

			removeDashSite( uniqueid ){
                const _this = this

                //clear refresh loop
                _this.$store.commit( "update_dash_refreshid", { [ uniqueid ]: window.clearInterval( _this.dash_refreshid[ uniqueid ] )  } )
                _this.$store.commit( "remove_dash_site", uniqueid )
                
            },
			
		},

  	}
</script>