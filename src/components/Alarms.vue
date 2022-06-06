<template>
    <div
        class="pa-5"
        v-show="show_alarms"
    >
        <v-alert
            v-for="( alarm, i ) in active_alarms"
            :key="'active_alarm'+ i"
            :color="alarm.color"
            dark
            dense
            :icon="alarm.icon"
        >
            <v-row align="center">
                <v-col class="grow">
                    {{alarm.message}}
                </v-col>
                <v-col class="shrink">
                    <v-btn 
                        outlined
                        color="white"
                        @click="zoomToGauge( i )"
                    >
                        Zoom
                    </v-btn>
                </v-col>
            </v-row>
        </v-alert>

    </div>

</template>

<script>
    import GetNewRoute from "../js/getNewRoute"
    import { GetContrailData } from "../js/getFINSData"
    import gaugeInfo from "../assets/gauge_info.json" 

    export default {
        name: "thealarms",

         mounted: function( ){
            const _this = this

            _this.getAllAlarms( )
        
        },

        computed: {
            //map
			zoom_to_gauge: {
                set( payload ){
                    this.$store.commit( "zoom_to_gauge", payload )
					
				},
      			get( ){
					return this.$store.state.zoom_to_gauge
      			
				}

            },

            show_alarms( ){
				return this.$store.state.show_alarms
      			
			},
            alarm_colors( ){
				return this.$store.state.alarm_colors
      			
			},
            active_alarm_cnt: {
				set( active_alarm_cnt ){
                    this.$store.commit( "active_alarm_cnt", active_alarm_cnt )
					
				},
      			get( ){
					return this.$store.state.active_alarm_cnt
      			
				}

			},
            route_path( ){ //query string
				return this.$route.path
			
            },
            top_tab( ){
				return this.$store.state.top_tab
			
            },
            tabs( ){
				return this.$store.state.tabs
			
            },

        },

        data: ( ) => ( {
            refreshid: null,
            active_alarms: [ ],
           
        } ),

        methods: {
            async getActiveAlarms( all_alarms ){
                let response_array = [ ],
                    active_alarms = [ ]

                const _this = this,
                    response = await GetContrailData( "alarm", { 
                        method: "GetActiveAlarms", 
                        client_key: "b7624cc5-08f8-4716-8459-9630478f63f2" 

                    } ),
                    valid_or_site_ids = Object.values( gaugeInfo ).map( elem => elem.or_site_id )

                if( Array.isArray( response ) ){
                    response_array = [ ...response ]

                }else{
                    response_array.push( response )
                
                }
                
                //remove alarms that are not associated with sites
                active_alarms = response_array.filter( elem => valid_or_site_ids.indexOf( elem.or_site_id ) > -1 )
                
                //store active alarms
                _this.active_alarm_cnt = String( active_alarms.length )
                _this.active_alarms.length = 0

                active_alarms.forEach( alarm => {
                    const desc = all_alarms.filter( elem => elem.alarm_id === alarm.alarm_id )  

                    if( desc.length === 1 ){
                        _this.active_alarms.push( { 
                            alarm_id: alarm.alarm_id,
                            or_site_id: alarm.or_site_id,
                            trigger_time: alarm.trigger_time, 
                            message: desc[ 0 ].title, 
                            color: _this.getColor( desc[ 0 ].title ),
                            icon: _this.getIcon( desc[ 0 ].title ),

                        } )
                        
                    }

                } )

            },

            async getAllAlarms( ){
                const _this = this,
                    all_alarms = await GetContrailData( "alarm", { 
                        method: "GetRuleMetadata", 
                        client_key: "b7624cc5-08f8-4716-8459-9630478f63f2",
                        enabled: true 

                    } )

                _this.refreshid = window.clearInterval( _this.refreshid )

                //setup the 3 minute refresh loop 
                _this.refreshid = self.setInterval( ( ) => { _this.getActiveAlarms( all_alarms ) }, 180000 )    

                _this.getActiveAlarms( all_alarms )


            },

            getColor( message ){
                const _this = this

                if( message.search( /ALERT/ ) > -1 ){
                    return _this.alarm_colors.alert.class

                }else if( message.search( /INVESTIGATE/ ) > -1 ){
                    return _this.alarm_colors.investigate.class

                }else if( message.search( /EMERGENCY/ ) > -1 ){
                    return _this.alarm_colors.emergency.class

                }else{
                    return _this.alarm_colors.other.class

                }

            },

            getIcon( message ){
                const _this = this

                if( message.search( /ALERT/ ) > -1 ){
                    return "mdi-alert-outline"

                }else if( message.search( /INVESTIGATE/ ) > -1 ){
                    return "mdi-alert-rhombus-outline"

                }else if( message.search( /EMERGENCY/ ) > -1 ){
                    return "mdi-alert-octagon-outline"

                }else{
                    return "mdi-information-outline"

                }

            },

            zoomToGauge( idx ){
                const _this = this,
					active_alarm = _this.active_alarms[ idx ],
                    site = Object.values( gaugeInfo )
                                    .filter( elem => elem.or_site_id === active_alarm.or_site_id )

                if( site && site.length === 1 ){
                    const gauge_type = site[ 0 ].gauge_type, 
                        unique_id = site[ 0 ].unique_id

                    let chg_params = { uniqueid: unique_id }

                    if( !_this.tabs[ _this.top_tab ].gauges.includes( gauge_type ) ){
                        chg_params.gauges = gauge_type

                    }

                    const new_route = GetNewRoute( chg_params )

                    //go to new route
                    if( new_route ){
                        _this.zoom_to_gauge = true
                        _this.$router.push( new_route )

                    }

                }

            }

        },
        
    }
    
</script>

<style>
       
</style>