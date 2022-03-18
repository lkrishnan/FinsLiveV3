<template>
    <div id="map">
        <v-btn
            :class="is_mobile ? 'mx-2' : 'mx-4'"
            fab
            :small="is_mobile ? false : true"
            :x-small="is_mobile ? true : false"
            color="white"
            style="margin: 0; position: absolute; z-index: 1;"
            :style="is_mobile ? 'right: 0px; top: 80px;' : 'right: 0px; top: 94px;'"
            @click="overlay_drawer=!overlay_drawer"
        >
            <v-icon dark>
                mdi-layers-outline
            </v-icon>
        </v-btn>

        <v-btn
            :class="is_mobile ? 'mx-2' : 'mx-4'"
            fab
            :small="is_mobile ? false : true"
            :x-small="is_mobile ? true : false"
            color="white"
            style="margin: 0; position: absolute; z-index: 1;"
            :style="is_mobile ? 'right: 0px; top: 120px;' : 'right: 0px; top: 150px;'"
        >
            <v-icon dark>
                mdi-alert-outline
            </v-icon>
        </v-btn>

        <v-btn
            :class="is_mobile ? 'mx-2' : 'mx-4'"
            fab
            :small="is_mobile ? false : true"
            :x-small="is_mobile ? true : false"
            color="white"
            style="margin: 0; position: absolute; z-index: 1;"
            :style="is_mobile ? 'right: 0px; top: 160px;' : 'right: 0px; top: 206px;'"
        >
            <v-icon 
                color="light-blue accent-4"
            >
                mdi-crosshairs-gps
            </v-icon>
        </v-btn>

        <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :class="is_mobile ? 'mx-2' : 'mx-4'"
                    fab
                    :small="is_mobile ? false : true"
                    :x-small="is_mobile ? true : false"
                    color="white"
                    style="margin: 0; position: absolute; z-index: 1;"
                    :style="is_mobile ? 'right: 0px; top: 200px;' : 'right: 0px; top: 262px;'"
                    v-bind="attrs"
                    v-on="on"
                    @click="parseRoute"
                    v-show=" [ 'AllPeriod', 'AllRange', 'SelectedPeriod', 'SelectedRange' ].includes( $route.name )"
                >
                <v-icon 
                    dark
                    color="primary"
                >
                   mdi-cached
                </v-icon>
                </v-btn>
            </template>
            <span>{{last_refresh}}</span>
        </v-tooltip>

        <!-- Search Holder -->
        <v-container 
                fluid
                class="pa-2"
                style="position: absolute; z-index: 7; left: 0px;"
                :style="is_mobile ? 'width:100%; top: 0px;' : 'width:430px; top: 82px;'"
        >
            <GaugeList v-if="curr_qry_ctrl==='gauge_cam'" />
            <Search v-if="curr_qry_ctrl==='map_search'" />
                
        </v-container>

        <!-- Reading Filter Holder  -->
        <v-container 
            fluid
            class="pa-2"
            style="position: absolute; z-index: 3; left: 0px;"
            :style="is_mobile ? 'width:100%; top: 0px;' : 'width:430px; top: 82px;'"
            v-show="filter_holder && [ 0, 1 ].includes( top_tab )"
        >
           <ReadingFilter />

        </v-container>

        <!-- Radar Control Holder -->
        <v-container 
            fluid
            class="py-2 px-4"
            style="position: absolute; z-index: 3; right: 0px;"
            :style="is_mobile ? 'width:100%; bottom: 64px;' : 'width:430px; bottom: 10px;'"
            v-show="getSourceSwitch( 'radar' )"
        >
           <RadarControl />

        </v-container>
        
        <!-- Overlays Tab  -->
        <v-navigation-drawer
            id="overlay_drawer" 
            v-model="overlay_drawer" 
			absolute 
			:permanent="overlay_drawer" 
			stateless 
			right 
			:width=drawer_width
            v-touch="{ left: ( ) => { overlay_drawer=!overlay_drawer } }"
            style="z-index: 5 !important; padding-top: 80px;"

        >
            <v-row 
                class="d-flex justify-space-between pa-5"
            >
                <v-col
                    class="d-flex align-center text-h6"
                >
                    <span class="secondary--text">Map Layers</span>
            
                </v-col>

                <v-col
                    class="d-flex justify-end"
                >
                    <v-btn
                        icon
                        color="secondary"
                        @click="overlay_drawer=!overlay_drawer"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
            
                </v-col>
        
            </v-row>

            <v-divider />

            <Overlays />
            
		</v-navigation-drawer>

        <!-- Information Tab  -->
        <v-navigation-drawer
            id="info_drawer" 
            v-model="info_drawer" 
			absolute 
			:permanent="info_drawer" 
			stateless 
			left 
			:width=drawer_width
            v-touch="{ left: ( ) => { info_drawer=!info_drawer } }"
            style="z-index: 6 !important;"
            :style="is_mobile ? 'padding-top: 60px;' : 'padding-top: 140px;'"
        >
            <Site />                
            <WeatherForecast />                
		</v-navigation-drawer>

    </div>

</template>

<script>
    import esriConfig from "@arcgis/core/config"
    import Map from "@arcgis/core/Map"
    import MapView from "@arcgis/core/views/MapView"
    import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
    import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
    import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
    import { GetAlertData, GetContrailData } from "../js/getFINSData"
    import { FormatAsGeoJSON, GetGeoJSONURL, GetGeoJSONTemplate, GetGeoJSONRenderer, GetGeoJSONLabelInfo, InterpolatePrcp} from "../js/geoJSON"
    import { GetStrmXingTemplate } from "../js/strmXing"
    import Moment from "moment"
                            
    export default {
        name: "themap",

        components: {
            GaugeList: ( ) => import( /* webpackChunkName: "gaugelist"*/"./GaugeList.vue" ),
            Search: ( ) => import( /* webpackChunkName: "search"*/"./Search.vue" ),
            ReadingFilter: ( ) => import( /* webpackChunkName: "readingfilter"*/"./ReadingFilter.vue" ),
            Overlays: ( ) => import( /* webpackChunkName: "overlays"*/"./Overlays.vue" ),
            RadarControl: ( ) => import( /* webpackChunkName: "radarcontrol"*/"./RadarControl.vue" ),
            WeatherForecast: ( ) => import( /* webpackChunkName: "weatherforecast"*/"./WeatherForecast.vue" ),
            Site: ( ) => import( /* webpackChunkName: "site"*/"./Site.vue" ),

		},

        mounted: function( ){
            const _this = this

            //find if display is on mobile device
            _this.onResize( )
            window.addEventListener( "resize", _this.onResize, { passive: true } )

            //set the assets path. very important for ESRI JSAPI to load controls properly
            esriConfig.assetsPath = ( process.env.NODE_ENV == "development" ? "/assets" : "./assets" )
            
            //initialize map
            _this.initMap( )
            
            //do a search based on the passed query string
            _this.parseRoute( )
        
        },

        computed: {
            //app
			is_mobile: {
				set( payload ){
                    this.$store.commit( "is_mobile", payload )
					
				},
      			get( ){
					return this.$store.state.is_mobile
      			
				}

			},
            top_tab: {
                set( top_tab ){
                    this.$store.commit( "top_tab", top_tab )
                    
                },
                get( ){
                    return this.$store.state.top_tab
                
                }

            },
            tabs( ){
                return this.$store.state.tabs
                
            },
            ws( ){
          		return this.$store.state.ws

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
            overlay_switch: {
				set( overlay_switch ){
                    this.$store.commit( "overlay_switch", overlay_switch )
					
				},
      			get( ){
					return this.$store.state.overlay_switch
      			
				}

			},
            filter_holder( ){
				return this.$store.state.filter_holder
      			
			},

            //map
            map_sources: {
				set( payload ){
                    this.$store.commit( "map_sources", payload )
					
				},
      			get( ){
					return this.$store.state.map_sources
      			
				}

			},
            overlays( ){
                return this.$store.state.overlays

            },
           
            //query control
			gauge_cam_list: {
				set( payload ){
                    this.$store.commit( "gauge_cam_list", payload )
					
				},
      			get( ){
					return this.$store.state.gauge_cam_list
      			
				}

			},
            curr_qry_ctrl( ){
				return this.$store.state.curr_qry_ctrl

			},

            //custom
            drawer_width( ) {
                return ( this.is_mobile ? "100%" : "432px" )
                 
            },
            route_path( ){ //query string
				return this.$route.path
			
            },
            radar_text( ){
                const _this = this

                return ( _this.radar_tick < 12 ? 60 - ( _this.radar_tick * 5 ) : "Now" )
            },

        },
        
        watch: {
            //map
            overlays: {
                handler: function( new_vals ){
                    const _this = this

                    new_vals.forEach( new_val => {
                        if( new_val.hasOwnProperty( "sublayers" ) ){
                            _this.map_sources[ new_val.source ].sublayers.forEach( sublyr => {
                                if( new_val.sublayers.includes( sublyr.id ) ){
                                    sublyr.visible = new_val.switch

                                }

                            } )
                                                        
                        }else{
                            _this.map_sources[ new_val.source ].visible = new_val.switch
                            
                        }
                    
                    } )
                                        
                },
                deep: true
                
            },

            //custom
            route_path( ){ //change in query string
                const _this = this

                _this.parseRoute( )
			
            },

            //local
            /*radar_tick( ){
                const _this = this

                _this.map_sources.radar.timeExtent = {
                        start: Moment( ).subtract( 60 - ( _this.radar_tick * 5 ), "minutes" ).valueOf( ),
                        end: Moment( ).subtract( 60 - ( _this.radar_tick * 5 ), "minutes" ).valueOf( ),

                    }

            }*/

        },

        data: ( ) => ( {
            //map variables
            map: null,
            map_view: null,
            refreshid: null,
            last_refresh: null,

            //navigation drawer variables
            overlay_drawer: false,
            
            //weather radar
            /*radar_tick: 12,
            radar_plyng: false,
            radar_loop: null,*/
                   
        } ),
        
        methods: {
            /*radarAnimate( ){
                const _this = this

                if( _this.radar_plyng ){
                    //stop loop
                    window.clearInterval( _this.radar_loop )

                }else{
                    //start 1 second loop
                    _this.radar_loop = self.setInterval( ( ) => {
                        _this.radar_tick = ( _this.radar_tick < 12 ? ( _this.radar_tick + 1 ) : 0 )
                        console.log( _this.radar_tick )

				    }, 1500 )

                }

                //invert value
                _this.radar_plyng = !_this.radar_plyng
                
            },*/

            initMap( ){
                const _this = this

                _this.map_sources = {
                        opaque: new MapImageLayer( {
                            url: "https://maps.mecklenburgcountync.gov/agsadaptor/rest/services/stormwater/finslive/MapServer",
                            sublayers : _this.getSourceSwitch( "opaque" ),
                            
                        } ),

                        transparent: new MapImageLayer( {
                            url: "https://maps.mecklenburgcountync.gov/agsadaptor/rest/services/stormwater/finslive/MapServer",
                            sublayers: _this.getSourceSwitch( "transparent" ),
                            opacity: 0.5
                    
                        } ),
                        
                        strmxing: new FeatureLayer( {
                            url: "https://maps.mecklenburgcountync.gov/agsadaptor/rest/services/stormwater/finslive/MapServer/6",
                            visible: _this.getSourceSwitch( "strmxing" ),
                            popupTemplate: GetStrmXingTemplate( ),

                        } ),

                        radar: new MapImageLayer( {
                            url: "https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer",
                            sublayers: [ { id: 3 } ],
                            opacity: 0.7,
                            dpi: 96,
                            imageFormat: "png32",
                            refreshInterval: 3, // refresh the layer every 3 minutes
                            useViewTime: false, // layer sets its time extent and will ignore view's timeExtent.
                            visible: _this.getSourceSwitch( "radar" ),
                            
                        } ),

                        precip: null,

                        gauge_cam: null,

                    }

                _this.map = new Map( {
                    basemap: "gray-vector",
                    layers: [ _this.map_sources.opaque, _this.map_sources.transparent, _this.map_sources.strmxing, _this.map_sources.radar ], 
                    
                } )

                _this.map_view = new MapView( {
                    container: "map",
                    map: _this.map,
                    zoom: 9,
                    center: [ -80.837, 35.270 ] //lon, lat
                    		        
                } )

                _this.map_view.ui.remove( "attribution" )
                _this.map_view.ui.move("zoom", "bottom-left");

                // Event handler that fires each time an action is clicked in the map popup.
                _this.map_view.popup.on( "trigger-action", ( event ) => {
                    // Execute the measureThis() function if the measure-this action is clicked
                    switch( event.action.id ){
                        case "cam_snapshot":
                            //_this.viewSnapshot( )
                            console.log( "push route" )
                            break

                        case "strmxing_photos":
                            console.log( "show photo" )
                            break

                    }
                
                } )
                  
                /*_this.map_sources.radar.timeExtent = {
                    start: Moment( ).subtract( 60, "minutes" ),
                    end: Moment( ).subtract( 60, "minutes" )
                }*/

            },

            getSourceSwitch( src ){
                const _this = this,
                    lyrs = _this.overlays.filter( overlay => { return overlay.source === src } )

                if( lyrs.length > 1 ){ //mapimagelayer source
                    return lyrs.map( overlay => overlay.sublayers.map( idx => { return { id: idx, visible: overlay.switch } } ) ).flat( )
                    
                }else if( lyrs.length > 0 ){ //other source
                    return lyrs.map( lyr => lyr.switch )[ 0 ]

                }else{ //default
                    return false

                }

            },

            parseRoute( ){
                const _this = this,
                    name = _this.$router.currentRoute.name,
                    params = _this.$router.currentRoute.params
                
                _this.refreshid = window.clearInterval( _this.refreshid )

                switch( name ){
                    case "AllPeriod": case "AllRange": case "AllDatePeriod":
                    case "SelectedPeriod": case "SelectedRange": case "SelectedDatePeriod":
                        //setup the 3 minute refresh loop 
                        
	                    _this.refreshid = self.setInterval( ( ) => {
                            _this.addGaugesToMap( params )
                            _this.last_refresh = "Last Refresh " + Moment( ).format ( "MM/DD/YYYY hh:mm A" )

                        }, 180000 )    

                        _this.addGaugesToMap( params )
                        _this.last_refresh = "Last Refresh " + Moment( ).format ( "MM/DD/YYYY hh:mm A" )

                        break

                    case "AllCamera": case "SelectedCamera":
                        _this.addCamsToMap( )
                        break

                }

                //show the info panel
                _this.info_drawer = ( name.search( /Selected/ ) > -1 )

            },

            removeLyr( lyr ){
                const _this = this

                if( lyr ){
                    _this.map.remove( lyr )
                    lyr = null

                }

            },
        
            async addGaugesToMap( params ){
                const _this = this,
                    { gauges, ...qrystr } = params,
                    gauges_arr = gauges.split( "," ).map( gauge => gauge.trim( ).toLowerCase( ) ),
                    promises = await gauges_arr.map( async gauge => {
                        let row
                        
                        switch( gauge ){
                            case "lcs":
                                //unfortunately two calls needs to be made to the contrail API
                                row = { 
                                    meta: await GetContrailData( { method: "GetSiteMetaData", system_key: "c9254111-e6c8-4689-9171-685eac46496b" } ),
                                    data: await GetContrailData( { method: "GetSensorData", system_key: "c9254111-e6c8-4689-9171-685eac46496b" } )
                                    }
                            break

                        default:
                            //calls made to the Alert API
                            row = await GetAlertData( gauge, "default", qrystr )
                            break

                        }

                        return row

                    } ),
                    geojson_gauge = FormatAsGeoJSON( gauges_arr, await Promise.all( promises ) ),
                    intrpltn_results = ( gauges === "rain" ? InterpolatePrcp( geojson_gauge ) : null )
                    
                //remove the gauge_cam and precipitation
                _this.removeLyr( _this.map_sources.precip )
                _this.removeLyr( _this.map_sources.gauge_cam )

                // create new geojson layer using the blob url    
                _this.map_sources.gauge_cam = new GeoJSONLayer( {
                    url: GetGeoJSONURL( geojson_gauge ),
                    copyright: "Charlotte-Mecklenburg Storm Water Services",
                    popupTemplate: GetGeoJSONTemplate( gauges ),
                    renderer: GetGeoJSONRenderer( gauges ),
                    labelingInfo: [ GetGeoJSONLabelInfo( gauges ) ],
                    minScale: 800000,
                    visible: _this.getSourceSwitch( "gauge_cam" )
                
                } )

                if( intrpltn_results ){
                    _this.map_sources.precip = new GeoJSONLayer( {
                        url: GetGeoJSONURL( intrpltn_results.geojson ),
                        copyright: "Charlotte-Mecklenburg Storm Water Services",
                        renderer: intrpltn_results.renderer,
                        opacity: 0.3,
                        minScale: 800000,
                        
                        } )

                    _this.map.addMany( [ _this.map_sources.precip, _this.map_sources.gauge_cam ] )

                }else{
                    _this.map.add( _this.map_sources.gauge_cam )

                }

                _this.getGaugeCamList( )
                                                
            },

            addCamsToMap( ){
                const _this = this

                //remove layer
                _this.removeLyr( _this.map_sources.gauge_cam )

                //add layer
                _this.map_sources.gauge_cam = new GeoJSONLayer( {
                        url: `${_this.ws.dbopen}v1/geojson/stormwater_webcams?geom_column=the_geom&columns=site_id%2C%20name%2C%20key%2C%20'cam'%20as%20icon&precision=9`,
                        copyright: "Charlotte-Mecklenburg Storm Water Services",
                        popupTemplate: GetGeoJSONTemplate( "cam" ),
                        renderer: GetGeoJSONRenderer( "cam" ),
                        minScale: 800000,
                        visible: _this.getSourceSwitch( "gauge_cam" )
                    
                    } )

                _this.map.add( _this.map_sources.gauge_cam )

                _this.getGaugeCamList( )

            },

            getGaugeCamList( ){
				const _this = this

				let search_results = [ ]

				_this.map_sources.gauge_cam
					.queryFeatures( )
					.then( results => {
  						search_results.push( 
							...results.features.map( row => { 
								return { 
										text: `${row.attributes.site_id} : ${( row.attributes.hasOwnProperty( "site_name" ) ? row.attributes.site_name : row.attributes.name )}`,
										value: { 
											site_id: row.attributes.site_id, 
											site_name: row.attributes.site_name, 
											lat: row.geometry.latitude,
											lon: row.geometry.longitude,   

										}

									} 

							} )
						)
						
					} )

				_this.gauge_cam_list = search_results

			},  

            onResize( ){
                const _this = this

                _this.is_mobile = window.innerWidth < 600
                                
            },
            		    
	    }
    
    }
</script>

<style>
    #map {
        padding: 0;
        margin: 0;
        height: 100%;

    }

    .esri-view .esri-view-surface--inset-outline:focus::after {  outline: none !important;}

</style>