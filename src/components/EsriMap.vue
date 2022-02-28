<template>
    <div id="map">
        <!--<v-btn
            :class="is_mobile ? 'mx-2' : 'mx-4'"
            fab
            :small="is_mobile ? false : true"
            :x-small="is_mobile ? true : false"
            color="white"
            style="margin: 0; position: absolute; z-index: 1;"
            :style="is_mobile ? 'right: 0px; top: 80px;' : 'right: 0px; top: 94px;'"
        >
            <v-icon dark>
                mdi-refresh
            </v-icon>
        </v-btn>-->
        <v-card
            :class="is_mobile ? 'mx-2' : 'mx-4'"
            class="px-2 subtitle-2"
            color="white"
            style="margin: 0; position: absolute; z-index: 1;"
            :style="is_mobile ? 'right: 0px; top: 80px;' : 'right: 0px; top: 94px;'"
        >
        {{last_refresh}}
        <v-btn
              icon
              color="primary"
            >
              <v-icon>mdi-cached</v-icon>
            </v-btn>
        </v-card>

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
            :style="is_mobile ? 'right: 0px; top: 160px;' : 'right: 0px; top: 206px;'"
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
            :style="is_mobile ? 'right: 0px; bottom: 64px;' : 'right: 0px; bottom: 10px;'"
        >
            <v-icon 
                color="light-blue accent-4"
            >
                mdi-crosshairs-gps
            </v-icon>
        </v-btn>

    </div>

</template>

<script>
    import axios from "axios"
    import esriConfig from "@arcgis/core/config"
    import Map from "@arcgis/core/Map"
    import MapView from "@arcgis/core/views/MapView"
    import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
    import JSONToURL from "../js/jsontourl"
    import { GetAlertData, GetContrailData } from "../js/getFINSData"
    import { FormatAsGeoJSON, GetGeoJSONTemplate, GetGeoJSONRenderer, GetGeoJSONLabelInfo} from "../js/geoJSON"
    import Moment from "moment"
                        
    export default {
        name: "themap",

        components: {
            
		},

        mounted: function( ){
            const _this = this

            //find if display is on mobile device
            _this.onResize( )
            window.addEventListener( "resize", _this.onResize, { passive: true } )

            //set the assets path. very important for ESRI JSAPI to load controls properly
            esriConfig.assetsPath = ( process.env.NODE_ENV == "development" ? "/assets" : "./assets" )
            
            _this.initMap( )
            
            //do a search based on the passed query string
            _this.parseRoute( )
        
        },

        computed: {
            is_mobile: {
				set( is_mobile ){
                    this.$store.commit( "is_mobile", is_mobile )
					
				},
      			get( ){
					return this.$store.state.is_mobile
      			
				}

			},

            //query string
            route_path( ){
				return this.$route.path
			
            },

            ws( ){
          		return this.$store.state.ws

      		}

        },
        
        watch: {
            //change in query string
            route_path( ){
                const _this = this

                _this.parseRoute( )
			
            },

        },

        data: ( ) => ( {
            axios_inst: axios.create( { 
				headers: { 
					"Cache-Control": "max-age=0, no-cache, no-store",
					"Pragma": "no-cache"  
				}
			} ),
			map: null,
            map_view: null,
            /*gauge_lyrs: {
                rain: null,
                stage: null,
                lcs: null,
                lake: null,

            }*/
            gauge_cam_lyr: null,
            refreshid: null,
            last_refresh: null,
                   
        } ),
        
        methods: {
            initMap( ){
                const _this = this;
                    
                _this.map = new Map( {
                    basemap: "gray-vector"
                    
                } )

                _this.map_view = new MapView( {
                    container: "map",
                    map: _this.map,
                    zoom: 9,
                    center: [ -80.837, 35.270 ] //lon, lat
                    		        
                } )

                _this.map_view.ui.remove( "attribution" )
                //_this.map_view.ui.move("zoom", "bottom-left");

                // Event handler that fires each time an action is clicked.
                _this.map_view.popup.on( "trigger-action", ( event ) => {
                    // Execute the measureThis() function if the measure-this action is clicked
                    if( event.action.id === "view-snapshot" ){
                        //_this.viewSnapshot( )
                        console.log( "push route" )

                    }
                
                } )
                  
            },

            parseRoute( ){
                const _this = this,
                    name = _this.$router.currentRoute.name,
                    params = _this.$router.currentRoute.params
                
                _this.refreshid = window.clearInterval( _this.refreshid )

                switch( name ){
                    case "AllPeriod":
                        //setup the 3 minute refresh loop 
	                    _this.refreshid = self.setInterval( ( ) => {
                            _this.addGaugesToMap( params )
                            _this.last_refresh = "Last Refresh " + Moment( ).format ( "MM/DD/YYYY hh:mm A" )

                        }, 180000 )    

                        _this.addGaugesToMap( params )
                        _this.last_refresh = "Last Refresh " + Moment( ).format ( "MM/DD/YYYY hh:mm A" )

                        break

                    case "Camera":
                        _this.addCamsToMap( )

                        break

                }

                //switch( name ){
                    //case "Home":
                        /*_this.$router.push( { name: "AllPeriod", params: { 
                                gauge: "rain", 
                                period: "P1D"
                            } } )
                        /*_this.$router.push( { name: "AllRange", params: { 
                                gauge: "rain", 
                                startDT: Moment( ).subtract( 1, "days" ).format( "YYYY-MM-DD HH:mm" ), 
                                endDT: Moment( ).format( "YYYY-MM-DD HH:mm" )
                            } } )*/
                        //break

                //}

            },

            

            removeLyr( lyr ){
                const _this = this

                if( lyr ){
                    _this.map.remove( lyr )
                    lyr = null

                }

            },

            addGeojsonLyr( gauge, qrystr ){
                const _this = this

                //remove layer
                _this.removeLyr( _this.gauge_lyrs[ gauge ] )

                //add layer
                _this.gauge_lyrs[ gauge ] = new GeoJSONLayer( {
                        url: `${_this.ws.fins}v1/query/${gauge}/geojson?${JSONToURL( qrystr )}`,
                        copyright: "Charlotte-Mecklenburg Storm Water Services",
                        popupTemplate: _this.getTemplate( gauge ),
                        renderer: _this.getRenderer( gauge ),
                    
                    } )

                _this.map.add( _this.gauge_lyrs[ gauge ] )

            },
        
            addGaugeLyrs( params ){
                const _this = this,
                    { gauges, ...qrystr } = params,
                    gauges_arr = gauges.split( "," ).map( gauge => gauge.trim( ).toLowerCase( ) ),
                    valid_gauge_types = [ "rain", "stage", "lake" ]
                                    
                //add rain gauge
                valid_gauge_types.forEach( gauge_type => { 
                    if( gauges_arr.includes( gauge_type ) ){
                        _this.addGeojsonLyr( gauge_type, qrystr )

                    } 
                    
                } ) 
                
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
                    geojson = FormatAsGeoJSON( gauges_arr, await Promise.all( promises ) ),
                    // create a new blob from geojson featurecollection
                    blob = new Blob( [ JSON.stringify( geojson ) ], {
                            type: "application/json"
                        } ),
                    // URL reference to the blob
                    geojson_url = URL.createObjectURL( blob )
                    
                //remove layer
                _this.removeLyr( _this.gauge_cam_lyr )

                // create new geojson layer using the blob url    
                _this.gauge_cam_lyr = new GeoJSONLayer( {
                    url: geojson_url,
                    copyright: "Charlotte-Mecklenburg Storm Water Services",
                    popupTemplate: GetGeoJSONTemplate( gauges ),
                    renderer: GetGeoJSONRenderer( gauges ),
                    labelingInfo: [ GetGeoJSONLabelInfo( gauges ) ],
                    opacity: 1.0,
                    minScale: 800000
                
                } )

                _this.map.add( _this.gauge_cam_lyr )
                                
            },

            addCamsToMap( ){
                const _this = this

                //remove layer
                _this.removeLyr( _this.gauge_cam_lyr )

                //add layer
                _this.gauge_cam_lyr = new GeoJSONLayer( {
                        url: `${_this.ws.dbopen}v1/geojson/stormwater_webcams?geom_column=the_geom&columns=site_id%2C%20name%2C%20key%2C%20'cam'%20as%20icon&precision=9`,
                        copyright: "Charlotte-Mecklenburg Storm Water Services",
                        popupTemplate: GetGeoJSONTemplate( "cam" ),
                        renderer: GetGeoJSONRenderer( "cam" ),
                    
                    } )

                _this.map.add( _this.gauge_cam_lyr )

            },

            onResize( ){
                const _this = this

                _this.is_mobile = window.innerWidth < 600
                                
            },
            		    
	    }
    
    }
</script>

<style>
    html { overflow-y: auto; }

    #map {
        padding: 0;
        margin: 0;
        height: 100%;
    }

    .esri-view .esri-view-surface--inset-outline:focus::after {  outline: none !important;}

</style>