<template>
    <v-card
        class="ma-3"
        outlined
    >
        <v-row
			no-gutters
			class="mx-2"
            v-show="site_tab === 0"
		>
            <v-col
                id="grph"
                class="d-flex justify-center pa-5"
            >
                
            </v-col>
        </v-row>
        <v-row
            no-gutters
			class="mx-2"
            v-show="site_tab === 1"
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
        <v-row
            no-gutters
        >
            <v-col
                class="d-flex justify-start"
            >
                <v-tabs
                    v-model="site_tab" 
                >
                    <v-tab
                        v-for="(tab, i) in site_tabs"
                        :key="'tab'+ i"
                    >
                        <v-icon>{{tab.icon}}</v-icon>
                       
                    </v-tab>
                </v-tabs>
                <!--<v-tabs
                    v-model="site_tab" 
                    align-with-title
                    color="primary"
                    background-color="transparent"
                    light
                >
                    <v-tab
                        v-for="(tab, i) in site_tabs"
                        :key="'tab'+ i"
                    >
                        <v-icon>{{tab.icon}}</v-icon>
                       
                    </v-tab>
                    
                </v-tabs>-->
			</v-col>

        </v-row>    

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

	export default{
      	name: "site",

        mounted: function( ){
            //get gauge/cam information based on the passed query string
            this.parseRoute( )

            //this.generateArc( )
            //this.test( )
        
        },

		data: ( ) => ( {
            //refresh parameters
            refreshid: null,
            last_refresh: null,

            //table parameters
            site_tab: 0,
			site_tabs: [
			    { label: "Graph", icon: "mdi-chart-bell-curve-cumulative", value: "graph", },
			    { label: "Tabular", icon: "mdi-file-table-box-outline", value: "tablular", },
			    { label: "Picture", icon: "mdi-panorama-outline", value: "picture", },
				
		    ],
            headers: [ ],
            readings: [ ],
            gdp: [
                { country: "USA", value: 20.5 },
                { country: "China", value: 13.4 },
                { country: "Germany", value: 4.0 },
                { country: "Japan", value: 4.9 },
                { country: "France", value: 2.8 },

            ],
            pg: 1,
            pg_count: 0,
            items_per_pg: 10,
            
		} ),
      
      	computed: {
			//custom
            drawer_width( ) {
                return ( this.is_mobile ? "100%" : "432px" )
                 
            },
            grph_width( ){
                this.$refs.grph_cont.clientWidth

            },
            route_path( ){ //query string
				return this.$route.path
			
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
                
                _this.refreshid = window.clearInterval( _this.refreshid )

                switch( name ){
                    case "SelectedPeriod": 
                        //setup the 3 minute refresh loop 
                        
	                    _this.refreshid = self.setInterval( ( ) => {
                            _this.showData( params )
                        
                        }, 180000 )    

                        _this.showData( params )
                        
                        break

                    case "SelectedRange": case "SelectedDatePeriod":
                        _this.showData( params )
                        break

                    case "SelectedCamera":
                        _this.showSnapshot( params )
                        break

                }

                //show the info panel
                _this.info_drawer = ( name.search( /Selected/ ) > -1 )

            },

            async showData( params ){
                const _this = this,
                    { gauges, ...qrystr } = params,
                    promises = await qrystr.site.split( ", ").map( async site => {
                        if( ValidateString( site, "isRainGauge" ) ){ 
                            return { 
                                site: site, 
                                gauge: "rain", 
                                readings: await GetAlertData( "rain", "readings", getAlertParams( qrystr ) ) 

                            }
                        
                        }else if( ValidateString( site, "isStageGauge" ) ){ 
                            return { 
                                site: site, 
                                gauge: "stage", 
                                readings: await GetAlertData( "stage", "readings", getAlertParams( qrystr ) ) 

                            }
                                                    
                        }else if( ValidateString( site, "isLakeGauge" ) ){ 
                            return { 
                                site: site, 
                                gauge: "lake", 
                                readings: await GetAlertData( "lake", "readings", getAlertParams( qrystr ) ) 

                            }
                                                    
                        }else if( ValidateString( site, "isLCSGauge" ) ){
                            console.log( getContrailParams( qrystr ) )
                            return { 
                                site: site, 
                                gauge: "lcs", 
                                readings: await GetContrailData( getContrailParams( qrystr ) ) 

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

                _this.headers = headers[ data[ 0 ].gauge ]

                if( data[ 0 ].gauge === "lcs" ){
                                    /*.map( a => { 
                                        return { datetime: a.date_time.split( " ").map( parts => parts[ 0 ] + "T" + parts[ 1 ] + "Z" ) } 
                                    } )*/

                    _this.readings = [ ...data[ 0 ].readings ]
                                    .reverse( )
                                    .map( a => {
                                        const date_time_arr = a.data_time.split( " " )

                                        return { 
                                            datetime: date_time_arr[ 0 ] + "T" + date_time_arr[ 1 ] + "Z", 
                                            reading: a.raw_value 
                                        }

                                    } )

                }else{
                    _this.readings = data[ 0 ].readings
                    
                }

                _this.addGraph( data[ 0 ].gauge, data[ 0 ].site )
                
            },

            addGraph( gauge, site ){
                let chart, 
                    chart_cont = null,
                    chart_params = { 
                        x: d => new Date( d.datetime ),
                        y: d => d.reading,
                        color: "#99CDFF",

                    }

                const _this = this,
                    ymin = Math.min(..._this.readings.map( r => r.reading ) ),
                    ymax = Math.max(..._this.readings.map( r => r.reading ) )

                switch( gauge ){
                    case "rain":
                        const new_ymax = (ymax === 0 ? .1 : ymax + ( ymax *.1 ) ),
                                new_ymin = (ymin === 0 ? -.1 : 0 )

                        chart_params.yLabel = "Inches if Rain (in.)"
                        chart_params.yDomain = [ new_ymin, new_ymax ]
                        chart_params.width = 320
                        chart_params.height = 350
                        chart_params.unit = "in"
                        break

                    case "stage": case "lcs": 
                        const site_info = GetGaugeInfo( site )

                        chart_params.yLabel = "Stream Level (ft)"
                        chart_params.width = 320
                        chart_params.height = 320
                        chart_params.unit = "ft"

                        if( site_info.hasOwnProperty( "ref" ) && site_info.hasOwnProperty( "msl" ) ){
                            //sin = without in spanish
                            const ref_levels_sin_msl = site_info.ref.map( elem => RoundNum( elem.level - site_info.msl, 2 ) ),
                                new_ymax = Math.ceil( Math.max( ...[ ymax, ...ref_levels_sin_msl ] ) / 5 ) * 5,
                                new_ymin = ( ymin === 0 ? -5 : 0 )

                            chart_params.msl = site_info.msl
                            chart_params.ref = site_info.ref
                            chart_params.yDomain = [ new_ymin, new_ymax ]

                        }

                        break

                    case "lake":
                        chart_params.yLabel = "Lake Level (ft)"
                        chart_params.width = 320
                        chart_params.height = 320
                        chart_params.unit = "ft"
                        break

                }

                chart = GetLineChart( _this.readings, chart_params )

                //refresh/add the chart
                if( chart_cont ) chart_cont.remove( )
                
                d3.select( "#grph" ).selectAll( "*" ).remove( )
                chart_cont = d3.select( "#grph" ).append( ( ) => chart )
                
            },

            showSnapshot( params ){
                const _this = this

                if( ValidateString( params.site, "isCamera" ) ){
                    console.log( "yes" )

                }else{
                    console.log( "no" )
                }
                
            },
           
        },

  	}

</script>