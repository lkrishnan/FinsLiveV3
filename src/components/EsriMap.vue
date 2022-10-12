<template>
    <div id="map">
        <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :class="is_mobile ? 'mx-2' : 'mx-4'"
                    fab
                    :small="is_mobile ? false : true"
                    :x-small="is_mobile ? true : false"
                    color="white"
                    style="margin: 0; position: absolute; z-index: 1;"
                    :style="is_mobile ? 'right: 0px; top: 80px;' : 'right: 0px; top: 94px;'"
                    v-bind="attrs"
                    v-on="on"
                    @click="takeAction( 'ToggleOverlayCtrl' )"
                >
                    <v-icon dark>
                        mdi-layers-outline
                    </v-icon>
                </v-btn>
            </template>
            <span>Map Layers</span>
        </v-tooltip>
    
        <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :class="is_mobile ? 'mx-2' : 'mx-4'"
                    fab
                    :small="is_mobile ? false : true"
                    :x-small="is_mobile ? true : false"
                    color="white"
                    style="margin: 0; position: absolute; z-index: 1;"
                    :style="is_mobile ? 'right: 0px; top: 120px;' : 'right: 0px; top: 150px;'"
                    v-bind="attrs"
                    v-on="on"
                    @click="takeAction( 'Geolocation' )"
                >
                    <v-icon 
                        color="light-blue accent-4"
                    >
                        mdi-crosshairs-gps
                    </v-icon>
                </v-btn>
            </template>
            <span>Geolocation</span>
        </v-tooltip>

        <v-badge
            :color="( parseInt( active_alarm_cnt ) > 0 ? 'red' : 'green' )"
            :content="active_alarm_cnt"
            offset-x="27"
            offset-y="12"
            style="margin: 0; position: absolute; z-index: 1;"
            :style="is_mobile ? 'right: 0px; top: 160px;' : 'right: 0px; top: 206px;'" 
            v-show="( auth !== '' )"
        >
            <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        :class="is_mobile ? 'mx-2' : 'mx-4'"
                        fab
                        :small="is_mobile ? false : true"
                        :x-small="is_mobile ? true : false"
                        color="white"
                        v-bind="attrs"
                        v-on="on"
                        @click="takeAction( 'ToggleAlarmCtrl' )"
                    >
                        <v-icon 
                            :color="( parseInt( active_alarm_cnt ) > 0 ? 'red' : 'green' )"
                        >
                            mdi-alert-outline
                        </v-icon>
                    </v-btn>
                </template>
                <span>Alerts</span>
            </v-tooltip>
            
        </v-badge>
        
        <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :class="is_mobile ? 'mx-2' : 'mx-4'"
                    fab
                    :small="is_mobile ? false : true"
                    :x-small="is_mobile ? true : false"
                    color="white"
                    style="margin: 0; position: absolute; z-index: 1;"
                    :style="is_mobile ? ( auth === '' ? 'right: 0px; top: 160px;' : 'right: 0px; top: 200px;' ) : ( auth === '' ? 'right: 0px; top: 206px;' : 'right: 0px; top: 262px;' )"  
                    v-bind="attrs"
                    v-on="on"
                    @click="parseRoute"
                    v-show=" [ 'AllPeriod', 'SelectedPeriod' ].includes( $route.name )"
                >
                <v-icon 
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

        <!-- Radar Control Holder -->
        <v-container 
            fluid
            :class="is_mobile ? 'py-2 pl-14 pr-4' : 'py-2 px-4'"
            style="position: absolute; z-index: 1; right: 0px;"
            :style="is_mobile ? 'width:100%; bottom: 38px;' : 'width:430px; bottom: 10px;'"
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
            style="z-index: 5 !important;"
            :style="is_mobile ? 'padding-top: 60px;' : 'padding-top: 80px;'"

        >
            <v-row 
                class="d-flex justify-space-between pa-5"
            >
                <v-col
                    class="d-flex align-center text-h6"
                >
                    <span class="secondary--text">{{ ( show_alarms ? "Active Alarms" : "Map Layers" )}}</span>
            
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
            <Alarms />
            
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
            <ReadingFilter v-if="filter_holder && [ 0, 1 ].includes( top_tab )" />
            <Site />                
            <FloodImpact />
            <WeatherForecast />  
            <About />              
		</v-navigation-drawer>

        <v-card
            class="d-flex d-md-none mb-2 mr-5"
            style="margin: 0; position: absolute; bottom: 0; right: 0; z-index: 4;"
            elevation="2"
            outlined
        >
            <v-btn-toggle
                v-model="top_tab" 
                tile
                color="primary"
                background-color="transparent"
                group
                @change="takeAction('Tab')"
            >
                <v-btn 
                    v-for="(tab, i) in tabs"
                	:key="'bottom_tab' + i"
                    class="ma-0"
                    :data-cy="'btmtab'+i"
                    small
                    >
                    {{tab.short_label}}
                    
                </v-btn>
            </v-btn-toggle>

        </v-card>

        <v-dialog
      		v-model="dialog.show"
      		:width=dialog_width
            transition="dialog-bottom-transition"
            scrollable
    	>
      		<v-card>
        		<v-card-title v-show="dialog.title">
          			{{ dialog.title }}
        		</v-card-title>
                <v-card-subtitle v-show="dialog.subtitle">
                    {{ dialog.subtitle }}
                </v-card-subtitle>

                <v-carousel
                    v-show="dialog.imgs.length > 0"
                >
                    <v-carousel-item
                        v-for="(img,i) in dialog.imgs"
                        :key="'carousel'+i"
                        :src="img"
                
                    ></v-carousel-item>
                
                </v-carousel>

        		<v-card-text>
                    <div class="text-body-2" v-show="dialog.headline">
          			    {{ dialog.headline }}
                    </div>
                    <div class="text-body-2" v-show="dialog.description">
          			    {{ dialog.description }}
                    </div>
                    <div class="text-h6" v-show="dialog.instruction">
                        Instruction
                    </div>
                    <div class="text-body-2" v-show="dialog.instruction">
          			    {{ dialog.instruction }}
                    </div>
        		</v-card-text>

        		<v-card-actions>
          			<v-spacer></v-spacer>

					<v-btn
						color="primary"
						text
						@click="dialog.show=false"
					>
            			Close
          			</v-btn>
        		</v-card-actions>
      		
			</v-card>
    
		</v-dialog>  

    </div>

</template>

<script>
    import esriConfig from "@arcgis/core/config"
    import Map from "@arcgis/core/Map"
    import MapView from "@arcgis/core/views/MapView"
    import Graphic from "@arcgis/core/Graphic"
    import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
    import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
    import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
    import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
    import Locate from "@arcgis/core/widgets/Locate"
    import { GetAlertData, GetNWSDetail, GetStoredContrailData } from "../js/getFINSData"
    import { FormatAsGeoJSON, GetGeoJSONURL, GetGeoJSONTemplate, GetGeoJSONRenderer, GetGeoJSONLabelInfo, InterpolatePrcp} from "../js/geoJSON"
    import { GetStrmXingTemplate, GetNWSWarnTemplate, GetNWSWatchTemplate, GetRARRBldgTemplate, GetRARRStrmXingTemplate, GetRARRRoadTemplate } from "../js/popupTemplate"
    import { FormatDate } from "../js/vanillaMoment"
    import GetNewRoute from "../js/getNewRoute"
    import gaugeInfo from "../assets/gauge_info.json" 
                            
    export default {
        name: "themap",

        components: {
            FloodImpact: ( ) => import( /* webpackChunkName: "floodimpact"*/"./FloodImpact.vue" ),
            GaugeList: ( ) => import( /* webpackChunkName: "gaugelist"*/"./GaugeList.vue" ),
            Overlays: ( ) => import( /* webpackChunkName: "overlays"*/"./Overlays.vue" ),
            Alarms: ( ) => import( /* webpackChunkName: "alarms"*/"./Alarms.vue" ),
            ReadingFilter: ( ) => import( /* webpackChunkName: "readingfilter"*/"./ReadingFilter.vue" ),
            RadarControl: ( ) => import( /* webpackChunkName: "radarcontrol"*/"./RadarControl.vue" ),
            Search: ( ) => import( /* webpackChunkName: "search"*/"./Search.vue" ),
            Site: ( ) => import( /* webpackChunkName: "site"*/"./Site.vue" ),
            WeatherForecast: ( ) => import( /* webpackChunkName: "weatherforecast"*/"./WeatherForecast.vue" ),
            About: ( ) => import( /* webpackChunkName: "about"*/"./About.vue" ),
            
		},

        mounted: function( ){
            const _this = this

            //set the assets path. very important for ESRI JSAPI to load controls properly
            //esriConfig.assetsPath = ( process.env.NODE_ENV == "development" ? "/assets" : "./assets" )
            esriConfig.assetsPath = ( process.env.NODE_ENV == "development" ? "/" : "//" + window.location.hostname + "/finslive/" ) + "assets"

            //find if display is on mobile device
            //_this.onResize( )
            //window.addEventListener( "resize", _this.onResize, { passive: true } )
            
            //initialize map
            _this.initMap( )
            
            //do a search based on the passed query string
            _this.parseRoute( )
        
        },

        computed: {
            //app
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
            last_route( ){
          		return this.$store.state.last_route

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
            overlay_drawer: {
				set( payload ){
                    this.$store.commit( "overlay_drawer", payload )
					
				},
      			get( ){
					return this.$store.state.overlay_drawer
      			
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
            show_overlays: {
				set( payload ){
                    this.$store.commit( "show_overlays", payload )
					
				},
      			get( ){
					return this.$store.state.show_overlays
      			
				}

			},
            show_alarms: {
				set( payload ){
                    this.$store.commit( "show_alarms", payload )
					
				},
      			get( ){
					return this.$store.state.show_alarms
      			
				}

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
            map_center: {
				set( payload ){
                    this.$store.commit( "map_center", payload )
					
				},
      			get( ){
					return this.$store.state.map_center
      			
				}

			},

            impact_counts: {
                set( payload ){
                    this.$store.commit( "impact_counts", payload )
					
				},
      			get( ){
					return this.$store.state.impact_counts
      			
				}

            },
            flood_impact_details: {
                set( payload ){
                    this.$store.commit( "flood_impact_details", payload )
					
				},
      			get( ){
					return this.$store.state.flood_impact_details
      			
				}
                
            },
            last_search_result( ){
                return this.$store.state.last_search_result
            },
            
            zoom_to_gauge: {
                set( payload ){
                    this.$store.commit( "zoom_to_gauge", payload )
					
				},
      			get( ){
					return this.$store.state.zoom_to_gauge
      			
				}

            },

            svg_paths( ){
                return this.$store.state.svg_paths

            },

            svg_colors( ){
                return this.$store.state.svg_colors
                
            },

            //misc
            active_alarm_cnt( ){
                return this.$store.state.active_alarm_cnt
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
            sel_gauge_cam: {
				set( payload ){
                    this.$store.commit( "sel_gauge_cam", payload )
					
				},
      			get( ){
					return this.$store.state.sel_gauge_cam
      			
				}

			},
            curr_qry_ctrl( ){
				return this.$store.state.curr_qry_ctrl

			},

            //custom
            drawer_width( ) {
                 switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "100%"
                    default: return "432px"

                }
                 
            },
            dialog_width( ){
                switch( this.$vuetify.breakpoint.name ){
                    case "xs": return "100%"
                    default: return "432px"

                }
            },
            route_path( ){ //query string
				return this.$route.path
			
            },
            radar_text( ){
                const _this = this

                return ( _this.radar_tick < 12 ? 60 - ( _this.radar_tick * 5 ) : "Now" )

            },
            is_mobile( ){
                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return true
                    default: return false

                }

            },

            //login
		    auth( ){
            	return this.$store.state.token

            }

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

            info_drawer( ){
                const _this = this

                _this.map_view.padding = { 
                    ..._this.map_view.padding, 
                    left: ( _this.info_drawer && !_this.overlay_drawer && !_this.is_mobile ? 420 : 0 ),
                    right: ( _this.overlay_drawer && !_this.info_drawer && !_this.is_mobile ? 420 : 0 ) 
                }
                                
            },

            overlay_drawer( ){
                const _this = this

                _this.map_view.padding = { 
                    ..._this.map_view.padding, 
                    right: ( _this.overlay_drawer && !_this.info_drawer && !_this.is_mobile ? 420 : 0 ), 
                    left: ( _this.info_drawer && !_this.overlay_drawer && !_this.is_mobile ? 420 : 0 ),
                }
                                
            },

            last_search_result( ){
                const _this = this

                _this.addLocPointer( )

            },

            //custom
            route_path( ){ //change in query string
                const _this = this

                _this.parseRoute( )
			
            },

        },

        data: ( ) => ( {
            //map variables
            map: null,
            map_view: null,
            refreshid: {
                gauge: null,

            },
            last_refresh: null,
            highlight_feature: null,
            highlight_the_feature: false,
            locate_widget: null,
            lyr_view: {
                gauge_cam: null,

            },

            dialog: {
                show: false,
                title: null,
                subtitle: null,
                imgs: [ ],
                headline: null,
                description: null,
                instruction: null,

            },
                   
        } ),
        
        methods: {
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

                        warn: new FeatureLayer( {
                            url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/0",
                            opacity: 0.5,
                            visible: _this.getSourceSwitch( "warn" ),
                            popupTemplate: GetNWSWarnTemplate( ),

                        } ),

                        watch: new FeatureLayer( {
                            url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/1",
                            opacity: 0.5,
                            visible: _this.getSourceSwitch( "watch" ),
                            popupTemplate: GetNWSWatchTemplate( ),

                        } ),

                        precip: null,

                        gauge_cam: null,

                        rarrbldg: new FeatureLayer( {
                            url: "https://edmsmapserver.mecklenburgcountync.gov/agsadaptor/rest/services/RARR_Storm/Evnt20201112_Bldgs/FeatureServer/0",
                            visible: _this.getSourceSwitch( "rarrbldg" ),
                            popupTemplate: GetRARRBldgTemplate( ),
                            outFields: [ "Address", "PID", "FEMAStrm", "FldCatgry", "MstrAddrID" ],
                            
                        } ),

                        rarrstrmxing: new FeatureLayer( {
                            url: "https://edmsmapserver.mecklenburgcountync.gov/agsadaptor/rest/services/RARR_Storm/Evnt20201112_RoadsXings/FeatureServer/0",
                            visible: _this.getSourceSwitch( "rarrstrmxing" ),
                            popupTemplate: GetRARRStrmXingTemplate( ),
                            outFields: [ "XingDesc", "XingClass", "XingType", "OvtpDpth", "FldCatgry" ],
                            
                        } ),

                        rarrroad: new FeatureLayer( {
                            url: "https://edmsmapserver.mecklenburgcountync.gov/agsadaptor/rest/services/RARR_Storm/Evnt20201112_RoadsXings/FeatureServer/1",
                            visible: _this.getSourceSwitch( "rarrroad" ),
                            popupTemplate: GetRARRRoadTemplate( ),
                            outFields: [ "UseCtgry", "FldCatgry", "AvgFldDpth", "MaxFldDpth", "ll_add", "lr_add", "ul_add", "ur_add", "wholestnam" ],
                            
                        } ),

                        loc: new GraphicsLayer( { opacity: 1.0 } ),

                    }

                _this.map = new Map( {
                    basemap: "gray-vector",
                    layers: [ 
                        _this.map_sources.opaque, 
                        _this.map_sources.transparent, 
                        _this.map_sources.strmxing, 
                        _this.map_sources.radar, 
                        _this.map_sources.warn, 
                        _this.map_sources.watch,
                        _this.map_sources.rarrbldg,
                        _this.map_sources.rarrroad,
                        _this.map_sources.rarrstrmxing, 
                        _this.map_sources.loc,
                        
                    ], 
                    
                } )

                _this.map_view = new MapView( {
                    container: "map",
                    map: _this.map,
                    zoom: 9,
                    center: [ -80.837, 35.270 ], //lon, lat
                         		        
                } )

                _this.map_view.ui.remove( "attribution" )
                _this.map_view.ui.move( "zoom", "bottom-left" )

                //initiate locate widget
                _this.locate_widget = new Locate( {
                    view: _this.map_view,   // Attaches the Locate button to the view
                    scale: 20000,

                } )
       
                //actions to be carried out when buttons are clicked in a popup box
                _this.popupAction( )

                _this.addFloodImpact( )

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

            getDataFromAPI( new_route_name, new_route_params ){
                const _this = this,
                    hasSimilarGauges = ( ) => {
                        const new_gauges = new_route_params.gauges.split( "," ).map( gauge => gauge.trim( ).toLowerCase( ) ),
                            last_gauges = _this.last_route.params.gauges.split( "," )

                        return new_gauges.some( gauge => last_gauges.includes( gauge ) )

                    }

                let ret_val = true

                if( _this.last_route.hasOwnProperty( "name" ) && _this.last_route.name ){
                    if( _this.last_route.name.search( /Camera/ ) > -1 && new_route_name.search( /Camera/ ) > -1 ){
                        ret_val = false

                    }else if( ( _this.last_route.name.search( /Range/ ) > -1 && new_route_name.search( /Range/ ) > -1 ) ){
                        if( hasSimilarGauges( ) && 
                            new_route_params.startdate === _this.last_route.params.startdate &&
                            new_route_params.enddate === _this.last_route.params.enddate ){
                            ret_val = false

                        }

                    }else if( _this.last_route.name.search( /DatePeriod/ ) > -1 && new_route_name.search( /DatePeriod/ ) > -1 ){
                        if( hasSimilarGauges( ) && 
                            new_route_params.period === _this.last_route.params.period &&
                            new_route_params.enddate === _this.last_route.params.enddate ){
                            ret_val = false

                        }

                    }else if( _this.last_route.name.search( /Period/ ) > -1 && new_route_name.search( /Period/ ) > -1 ){
                        if( hasSimilarGauges( ) && new_route_params.period === _this.last_route.params.period ){
                            ret_val = false

                        }
                        
                    }                      

                }

                return ret_val

            },

            parseRoute( ){
                const _this = this,
                    name = _this.$router.currentRoute.name,
                    params = _this.$router.currentRoute.params

                if( _this.getDataFromAPI( name, params ) ){
                    _this.refreshid.gauge = window.clearInterval( _this.refreshid.gauge )

                    switch( name ){
                        case "AllPeriod": case "SelectedPeriod": 
                            //setup the 3 minute refresh loop 
                            _this.refreshid.gauge = self.setInterval( ( ) => {
                                _this.addGaugesToMap( params )
                                _this.last_refresh = "Refreshed: " + FormatDate( "MM/DD/YYYY hh:mm:ss A" )

                            }, 180000 )
                            
                            _this.addGaugesToMap( params )
                            _this.last_refresh = "Refreshed: " + FormatDate( "MM/DD/YYYY hh:mm:ss A" )

                            break

                        case "AllRange": case "AllDatePeriod": case "SelectedRange": case "SelectedDatePeriod":
                            _this.addGaugesToMap( params )
                            _this.last_refresh = ""
                            break

                        case "AllCamera": case "SelectedCamera":
                            _this.addCamsToMap( params )
                            break

                    }

                }else{
                    if( params.hasOwnProperty( "uniqueid" ) ){
                        _this.zoomToGauge( gaugeInfo[ params.uniqueid ] )

                    }
                    
                }

                _this.map_view.popup.close( )
                                                
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
                                row = await GetStoredContrailData( { num_readings: 5 } )
                                break

                            case "stage": case "lake":
                                //calls made to the Alert API
                                row = await GetAlertData( gauge, "lastfive", qrystr )
                                break

                            default:
                                //calls made to the Alert API
                                row = await GetAlertData( gauge, "default", qrystr )
                                break

                            }

                        return row

                    } ),
                    all_gauge_info = Object.values( gaugeInfo ).filter( obj => { return gauges_arr.includes( obj.gauge_type ) } ),
                    geojson_gauge = FormatAsGeoJSON( gauges_arr, await Promise.all( promises ), all_gauge_info ),
                    intrpltn_results = ( gauges === "rain" ? InterpolatePrcp( geojson_gauge ) : null )

                //remove the gauge_cam and precipitation
                _this.removeLyr( _this.map_sources.precip )
                _this.removeLyr( _this.map_sources.gauge_cam )

                // create new gauge_cam geojson layer using the blob url    
                _this.map_sources.gauge_cam = new GeoJSONLayer( {
                    url: GetGeoJSONURL( geojson_gauge ),
                    copyright: "Charlotte-Mecklenburg Storm Water Services",
                    popupTemplate: GetGeoJSONTemplate( gauges ),
                    renderer: GetGeoJSONRenderer( gauges ),
                    labelingInfo: [ GetGeoJSONLabelInfo( gauges ) ],
                    minScale: 800000,
                    outFields: ["*"],
                    visible: _this.getSourceSwitch( "gauge_cam" )
                
                } )

                //add precipitation interpolation
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

                if( qrystr.hasOwnProperty( "uniqueid" ) ){
                    _this.zoomToGauge( gaugeInfo[ qrystr.uniqueid ] )

                }                
                                                                
            },

            addCamsToMap( params ){
                const _this = this

                //remove layer
                _this.removeLyr( _this.map_sources.gauge_cam )

                //add layer
                _this.map_sources.gauge_cam = new GeoJSONLayer( {
                        url: `${_this.ws.dbopen}v1/geojson/stormwater_webcams?geom_column=the_geom&columns=CASE WHEN key is NULL THEN 'CAM'||site_id ELSE site_id END as unique_id, name, key, 'cam' as icon, 'na' as site_trend&precision=9`,
                        copyright: "Charlotte-Mecklenburg Storm Water Services",
                        popupTemplate: GetGeoJSONTemplate( "cam" ),
                        renderer: GetGeoJSONRenderer( "cam" ),
                        outFields: ["*"],
                        minScale: 800000,
                        visible: _this.getSourceSwitch( "gauge_cam" )
                    
                    } )

                _this.map.add( _this.map_sources.gauge_cam )

                if( params.hasOwnProperty( "uniqueid" ) ){
                    //zoom and camera
                    _this.zoomToGauge( gaugeInfo[ params.uniqueid ] )

                }

            },

            addLocPointer( ){
                const _this = this,
                    pointGraphic = new Graphic({
                        geometry: { 
                            type: "point", 
                            longitude: _this.last_search_result.lon, 
                            latitude: _this.last_search_result.lat 
                        },
                        symbol: {
                            type: "simple-marker",
                            color: _this.svg_colors.loc,
                            size: "30px",
                            outline: {
                                color: [ 0, 0, 0, 1 ],
                                width: "2px",
                            },
                            path: _this.svg_paths.loc,
                        
                        }

                    } )

                _this.map_sources.loc.removeAll( )
                _this.map_sources.loc.add( pointGraphic )
                _this.map_view.goTo( { center: [ _this.last_search_result.lon, _this.last_search_result.lat ], zoom: 13 } )

            },

            zoomToGauge( site_info ){
                const _this = this 

                if( _this.zoom_to_gauge ){
                    //zoom to the selected gauge
                    _this.zoomTo( site_info.lat, site_info.lon )

                }

            },

            zoomTo( lat, lon ){
                this.map_view.goTo( 
                    { center: [ lon, lat ], zoom: 13 },
                    { duration: 2000, easing: "in-out-expo" }

                )

            },

            popupAction( ){
                const _this = this

                // Event handler that fires each time an action is clicked in the map popup.
                _this.map_view.popup.on( "trigger-action", async( event ) => {
                    const attrb = _this.map_view.popup.selectedFeature.attributes
                    let new_route

                    //reset digalog object
                    _this.dialog = {
                        show: false,
                        title: null,
                        subtitle: null,
                        imgs: [ ],
                        headline: null,
                        description: null,
                        instruction: null,

                    }
                    
                    switch( event.action.id ){
                        case "cam_snapshot":
                            new_route = GetNewRoute( { uniqueid: attrb.unique_id, } )

				            //go to new route
				            if( new_route ){
                                _this.zoom_to_gauge = false
					            _this.$router.push( new_route )

				            }

                            break

                        case "strmxing_photos":
                            const photo_attrbs = [ "photo_dsc", "photo_dsf", "photo_usc", "photo_usf", "sketch_i_1" ]
                            _this.dialog.title = `${attrb.strm_name} CROSSING ${attrb.xing_desc}`

                            photo_attrbs.forEach( photo_file => {
                                if( photo_file != "noimage" ){
                                    _this.dialog.imgs.push( "https://mecklenburgcounty.exavault.com/p/stormwater/Stream%20Crossing/Images/" + 
                                        attrb[ photo_file ].toUpperCase( ) + 
                                        ( attrb[ photo_file ].toUpperCase( ).indexOf( ".jpg" ) == -1 ? ".jpg" : "" ) )

                                }

                            } )

                            //show dialog
                            _this.dialog.show = true
                            break

                        case "watch_detail": case "warn_detail":
                            const details = await GetNWSDetail( `https://api.weather.gov/alerts/${ attrb.cap_id }` )
                            
                            _this.dialog.title = attrb.prod_type
                            _this.dialog.subtitle = `${ FormatDate( "M/D/YYYY h:mmA", Date.parse( attrb.issuance ) ) } through ${FormatDate( "M/D/YYYY h:mmA", Date.parse( attrb.expiration ) ) }`
                            _this.dialog.headline = details.properties.headline
                            _this.dialog.description = details.properties.description
                            _this.dialog.instruction = details.properties.instruction
                            
                            //show dialog
                            _this.dialog.show = true
                            break

                        case "rarr":
                            _this.map_view.whenLayerView(  _this.map_sources.rarrbldg ).then( function( layerView ){
                                return layerView.queryFeatureCount( )

                            } ).then( function( count ){  
                                console.log( count )  // prints the total number of client-side graphics to the console
                            
                            } )

                            break

                        case "gauge_detail":
                            new_route = GetNewRoute( { uniqueid: attrb.unique_id, } )

				            //go to new route
				            if( new_route ){
                                _this.zoom_to_gauge = false
					            _this.$router.push( new_route )

				            }

                            break

                    }
                
                } )

            },

            addFloodImpact( ){
                const _this = this
                    
                Promise.all( [
                    _this.map_view.whenLayerView( _this.map_sources.rarrbldg ),
                    _this.map_view.whenLayerView( _this.map_sources.rarrstrmxing ),
                    _this.map_view.whenLayerView( _this.map_sources.rarrroad )
                ] ).then( ( [ bldg_lyr_view, stmxing_lyr_view, road_lyr_view ] ) => {
                    bldg_lyr_view.watch( "updating", value => {
                        if( !value ){
                            bldg_lyr_view.queryFeatures(  )
                                .then( bldg_rows => { 
                                    _this.flood_impact_details = { 0: bldg_rows.features.map( elem => elem.attributes ) } 
                                    
                                } )

                        }

                    } )

                    stmxing_lyr_view.watch( "updating", value => {
                        if( !value ){
                            stmxing_lyr_view.queryFeatures(  )
                                .then( stmxing_rows => {
                                    _this.flood_impact_details = { 1: stmxing_rows.features.map( elem => elem.attributes ) }

                                } )

                        }

                    } )

                    road_lyr_view.watch( "updating", value => {
                        if( !value ){
                            road_lyr_view.queryFeatures(  )
                                .then( road_rows => {
                                    _this.flood_impact_details = { 2: road_rows.features.map( elem => elem.attributes ) }

                                } )

                        }

                    } )
                    
                } )

            },

            takeAction( action ){
                const _this = this

                switch( action ){
                    case "ToggleOverlayCtrl":
                        _this.overlay_drawer = !_this.overlay_drawer
                        _this.show_overlays = true
                        _this.show_alarms = false
                        break

                    case "ToggleAlarmCtrl":
                        _this.overlay_drawer = !_this.overlay_drawer
                        _this.show_alarms = true
                        _this.show_overlays = false
                        break

                    case "Geolocation":
                        _this.locate_widget.locate( )
                        break

                    case "Tab":
                        _this.sel_gauge_cam = null
                        _this.$router.push( GetNewRoute( { gauges: _this.tabs[ _this.top_tab ].gauges.join( "," ) } ) )
                        break

                }
    
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