import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"

Vue.use( Vuex )

export default new Vuex.Store( {
	state: {
		is_mobile: false,
		top_tab: 0,
		tabs: [
			{ label: [ "Rain", "Gauge" ], icon: "mdi-weather-rainy", gauges: [ "rain" ], last_param: { gauges: "rain", period: "P1D" } },
			{ label: [ "Stage & Lake", "Gauge" ], icon: "mdi-wave", gauges: [ "stage" , "lcs", "lake" ], last_param: { gauges: "stage,lcs,lake", period: "P1D" }  },
			{ label: [ "Creek", "Cam" ], icon: "mdi-camera-enhance-outline", gauges: [ "cam" ], last_param: { } },
				
		],
		ws: {
			fins: "https://maps.mecklenburgcountync.gov/api/fins/",
      		gis: "https://maps.mecklenburgcountync.gov/api/gis/",
			tax: "https://maps.mecklenburgcountync.gov/api/tax/",
			contrail: "https://maps.mecklenburgcountync.gov/api/contrail",
			//contrail: "https://cs-059-exchange.onerain.com/OneRain/DataAPI",
			dbopen: "https://api.mcmap.org/",

  		},

		//toggles
		nav_drawer: false,
		info_drawer: false,
		overlay_drawer: false,
		overlay_switch: [ ],
		filter_holder: false,

		//map 
		map_sources: null,
		overlays: [
			{ label: "Weather Radar", value: "radar", source: "radar", switch: false },
			{ label: "Precipitation", value: "precip", source: "precip", switch: true },
			{ label: "NWS Warnings", value: "warn", source: "warn", switch: false },
			{ label: "NWS Watches", value: "watch", source: "watch", switch: false },
			{ label: "Storm Impacted Buildings", value: "rarrbldg", source: "rarrbldg", switch: true },
			{ label: "Storm Impacted Stream Crossings", value: "rarrstrmxing", source: "rarrstrmxing", switch: true },
			{ label: "Storm Impacted Roads", value: "rarrroad", source: "rarrroad", switch: true },
			{ label: "Gauges and Creek Cams", value: "gauge_cam", source: "gauge_cam", switch: true },
			{ label: "Stream Crossings", value: "strmxing", source: "strmxing", switch: false },
			{ label: "Creek and Streams", value: "crkstrm", source: "opaque", sublayers: [ 2 ], switch: false },
			{ label: "FEMA Streams", value: "femastrm", source: "opaque", sublayers: [ 1 ], switch: false },
			{ label: "Future Floodplains", value: "fldpln", source: "transparent", sublayers: [ 3 ], switch: false },
			{ label: "500 Yr Floodplains", value: "500fldpln", source: "opaque", sublayers: [ 4 ], switch: false },
			{ label: "Creek Basins", value: "crkbasin", source: "opaque", sublayers: [ 5 ], switch: false },
			{ label: "Rescue Creek Locations", value: "rsccrkloc", source: "opaque", sublayers: [ 0 ], switch: false },
			{ label: "Rescue Map Grid", value: "rscgrd", source: "opaque", sublayers: [ 7 ], switch: false },
			{ label: "Fixed Interval Monitoring", value: "fxdintmntr", source: "opaque", sublayers: [ 8 ], switch: false },

		],
		map_center: [ -80.837, 35.270 ],
		impact_counts: [ ],
		flood_impact_details: [ ], 
		last_search_result: null,
		zoom_to_gauge: true,
		gauge_data: null,
		
		//query control
		gauge_cam_list: [ ],
		curr_qry_ctrl: "gauge_cam", 

		//login
		progress: {
			login: 0
		
		},
		error_msgs: {
			login: null,
					
		},
		token: "",

	},

	getters: {
		//app
		is_mobile: state => state.is_mobile,
		ws: state => state.ws,
		top_tab: state => state.top_tab,
		tabs: state => state.tabs,

		//toggles
		nav_drawer: state => state.nav_drawer,
		info_drawer: state => state.info_drawer,
		overlay_drawer: state => state.overlay_drawer,
		overlay_switch: state => state.overlay_switch,
		filter_holder: state => state.filter_holder,
	
		//map 
		map_sources: state => state.map_sources,
		overlays: state => state.overlays,
		map_center: state => state.map_center,
		impact_counts: state => state.impact_counts,
		flood_impact_details: state => state.flood_impact_details,
		last_search_result: state => state.last_search_result,
		zoom_to_gauge: state => state.zoom_to_gauge,
		gauge_data: state => state.gauge_data,

		//query control
		gauge_cam_list: state => state.gauge_cam_list,
		curr_qry_ctrl: state => state.curr_qry_ctrl,

		//login
		progress: state => state.progress,
		error_msgs: state => state.error_msgs,
		auth: state => state.token,

	},

  	mutations: {
		//app
		is_mobile( state, payload ){
			state.is_mobile = payload

		},
		top_tab( state, payload ){
			state.top_tab = payload

		},
		
		//toggles
		nav_drawer( state, payload ){
			state.nav_drawer = payload

		},
		info_drawer( state, payload ){
			state.info_drawer = payload

		},
		overlay_drawer( state, payload ){
			state.overlay_drawer = payload

		},
		overlay_switch( state, payload ){
			state.overlay_switch = payload
			
		},
		filter_holder( state, payload ){
			state.filter_holder = payload

		},
				
		//map
		map_sources( state, payload ){
			state.map_sources = payload
			
		},
		overlays( state, payload ){
			state.overlays = payload

		},
		map_center( state, payload ){
			state.map_center = payload

		},
		impact_counts( state, payload ){
			state.impact_counts = payload

		},
		flood_impact_details( state, payload ){
			state.flood_impact_details = payload

		},
		last_search_result( state, payload ){
			state.last_search_result = payload

		},
		zoom_to_gauge( state, payload ){
			state.zoom_to_gauge = payload

		},
		gauge_data( state, payload ){
			state.gauge_data = payload

		},

		//query control
		gauge_cam_list( state, payload ){
			state.gauge_cam_list = payload
			
		},
		curr_qry_ctrl( state, payload ){
			state.curr_qry_ctrl = payload
			
		},

		//login
		progress( state, payload ){
			for( let key in payload ){
				state.progress[ key ] = payload[ key ]
			
			}
		
		},
		error_msgs( state, payload ){
			for( let key in payload ){
				state.error_msgs[ key ] = payload[ key ]
			
			}
		
		},
		auth(state, token) {
			state.token = token
		
		},
			
	},
  
	actions: {
		async login( { commit }, login_data ){
			let reply = ( await axios.post( "https://maps.mecklenburgcountync.gov/auth/v1/login", login_data ) ).data;
			
			if( reply.result === "success" ){
				if( reply.hasOwnProperty( "token") ){
					const now = new Date( ),
						item = {
							token: reply.token,
							expiry: now.getTime( ) + ( 43200000 ) //expires in 12 hours
						}
				
					localStorage.setItem( "token", JSON.stringify( item ) )
					commit( "auth", reply.token )
					commit( "error_msgs", { login: null } )

				}else{
					commit( "error_msgs", { login: "Unable to login, try again." } )
					commit( "auth", "" )

				}
							
			}else if( reply.result === "failure" ){
				commit( "error_msgs", { login: reply.error })
				commit( "auth", "" )

			}

			commit( "progress", { login: 0 } )
		
		},

	}

} )