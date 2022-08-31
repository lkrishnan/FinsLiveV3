import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import router from "./router"

Vue.use( Vuex )

export default new Vuex.Store( {
	state: {
		is_mobile: false,
		top_tab: 0,
		tabs: [
			{ 
				label: [ "Rain", "Gauge" ], 
				short_label: "Rain",
				icon: "mdi-weather-rainy", 
				gauges: [ "rain" ], 
				last_route_name: "AllPeriod", 
				last_param: { gauges: "rain", period: "P1D" },

			}, { 
				label: [ "Stage & Lake", "Gauge" ], 
				short_label: "Stage & Lake",
				icon: "mdi-wave", 
				gauges: [ "stage" , "lcs", "lake" ], 
				last_route_name: "AllPeriod", 
				last_param: { gauges: "stage,lcs,lake", period: "P1D" },

			}, { 
				label: [ "Creek", "Cam" ], 
				short_label: "Cam",
				icon: "mdi-camera-enhance-outline", 
				gauges: [ "cam" ], 
				last_route_name: "AllCamera", 
				last_param: { }, 
			
			},
				
		],
		last_route: { },
		last_gauge_cam_route: { name: "AllPeriod", params: { gauges: "rain", period: "P1D" } },
		ws: {
			fins: "https://maps.mecklenburgcountync.gov/api/fins/",
      		gis: "https://maps.mecklenburgcountync.gov/api/gis/",
			tax: "https://maps.mecklenburgcountync.gov/api/tax/",
			fm: "https://maps.mecklenburgcountync.gov/api/fm/",
			contrail: "https://maps.mecklenburgcountync.gov/api/contrail",
			alarm: "https://maps.mecklenburgcountync.gov/api/alarm",
			camera: "https://maps.mecklenburgcountync.gov/api/camera",
			dbopen: "https://api.mcmap.org/",
			
  		},
		svg_paths: {
			steady: "M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
			rising: "M13,18V10L16.5,13.5L17.92,12.08L12,6.16L6.08,12.08L7.5,13.5L11,10V18H13M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z",
			falling: "M11,6V14L7.5,10.5L6.08,11.92L12,17.84L17.92,11.92L16.5,10.5L13,14V6H11M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22Z",
			cam: "M12,10L11.06,12.06L9,13L11.06,13.94L12,16L12.94,13.94L15,13L12.94,12.06L12,10M20,5H16.83L15,3H9L7.17,5H4A2,2 0 0,0 2,7V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V7A2,2 0 0,0 20,5M20,19H4V7H8.05L8.64,6.35L9.88,5H14.12L15.36,6.35L15.95,7H20V19M12,8A5,5 0 0,0 7,13A5,5 0 0,0 12,18A5,5 0 0,0 17,13A5,5 0 0,0 12,8M12,16A3,3 0 0,1 9,13A3,3 0 0,1 12,10A3,3 0 0,1 15,13A3,3 0 0,1 12,16Z",
			loc: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",

		},
		svg_colors: {
			lake: "#BDBDBD",
			stage: "#B3E5FC",
			alert: "#B2FF59",
			investigate: "#FFA726",
			emergency: "#E53935",
			cam: "#000000",
			loc: "#D50000",

		},

		//toggles
		nav_drawer: false,
		info_drawer: false,
		overlay_drawer: false,
		dash_drawer: false,
		overlay_switch: [ ],
		filter_holder: false,
		show_overlays: false,
		show_alarms: false,

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
		flood_impact_details: [ 
			{ 
				type: "Buildings", 
				icon: "mdi-home-city",
				rows: [ ],
				headers: [
					{ text: "Address", value: "Address" },
					{ text: "Flood Category", value: "FldCatgry" },
							
				]
				
			}, { 
				type: "Stream Crossing", 
				icon: "mdi-align-horizontal-distribute",
				rows: [ ],
				headers: [
					{ text: "Xing Desc", value: "XingDesc" },
					{ text: "Flood Category", value: "FldCatgry" },
							
				]
				
			}, { 
				type: "Road Segments", 
				icon: "mdi-road-variant",
				rows: [ ],
				headers: [
					{ text: "Road", value: "wholestnam" },
							
				]
				
			},

		], 
		last_search_result: null,
		zoom_to_gauge: true,
		gauge_data: null,

		//misc
		alarm_colors: { 
			alert: {
				hex: "#00FF00",
				class: "light-green accent-4"
			},
			investigate: {
				hex: "#FFA500",
				class: "orange darken-3"
			},
			emergency: {
				hex: "#FF0000",
				class: "red darken-3"
			},
			other: {
				hex: "#1E88E",
				class: "blue darken-1"
			},
		
		},
		active_alarm_cnt: "0",
		
		//query control
		gauge_cam_list: [ ],
		sel_gauge_cam: null,
		curr_qry_ctrl: "gauge_cam", 
		dash_sites: [ ],
		dash_limit: 10,
		dash_refreshid: { },

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
		last_route: state => state.last_route,
		last_gauge_cam_route: state => state.last_gauge_cam_route,
		svg_paths: state => state.svg_paths,
		svg_colors: state => state.svg_colors,

		//toggles
		nav_drawer: state => state.nav_drawer,
		info_drawer: state => state.info_drawer,
		overlay_drawer: state => state.overlay_drawer,
		dash_drawer: state => state.dash_drawer,
		overlay_switch: state => state.overlay_switch,
		filter_holder: state => state.filter_holder,
		show_overlays: state => state.show_overlays,
		show_alarms: state => state.show_alarms,
	
		//map 
		map_sources: state => state.map_sources,
		overlays: state => state.overlays,
		map_center: state => state.map_center,
		impact_counts: state => state.impact_counts,
		flood_impact_details: state => state.flood_impact_details,
		last_search_result: state => state.last_search_result,
		zoom_to_gauge: state => state.zoom_to_gauge,
		gauge_data: state => state.gauge_data,

		//misc
		alarm_colors: state => state.alarm_colors,
		active_alarm_cnt: state => state.active_alarm_cnt,

		//query control
		gauge_cam_list: state => state.gauge_cam_list,
		sel_gauge_cam: state => state.sel_gauge_cam,
		curr_qry_ctrl: state => state.curr_qry_ctrl,
		dash_sites: state => state.dash_sites,
		dash_limit: state => state.dash_limit,
		dash_refreshid:state => state.dash_refreshid,

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
		last_route( state, payload ){
			state.last_route = payload

		},
		last_gauge_cam_route( state, payload ){
			state.last_gauge_cam_route = payload

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
		dash_drawer( state, payload ){
			state.dash_drawer = payload

		},
		overlay_switch( state, payload ){
			state.overlay_switch = payload
			
		},
		filter_holder( state, payload ){
			state.filter_holder = payload

		},
		show_overlays( state, payload ){
			state.show_overlays = payload

		},
		show_alarms( state, payload ){
			state.show_alarms = payload

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
			for( let key in payload ){
				state.flood_impact_details[ key ].rows = payload[ key ]
			
			}

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

		//misc
		active_alarm_cnt( state, payload ){
			state.active_alarm_cnt = payload

		},

		//query control
		gauge_cam_list( state, payload ){
			state.gauge_cam_list = payload
			
		},
		sel_gauge_cam( state, payload ){
			state.sel_gauge_cam = payload
			
		},
		curr_qry_ctrl( state, payload ){
			state.curr_qry_ctrl = payload
			
		},

		dash_sites( state, payload ){
			state.dash_sites = payload
			
		},

		dash_limit( state, payload ){
			state.dash_limit = payload
			
		},
				
		add_dash_site( state, payload ){
			state.dash_sites.push( payload )

		},
		
		remove_dash_site( state, payload ){
			state.dash_sites = state.dash_sites.filter( item => item !== payload )
		
		},

		update_dash_refreshid( state, payload ){
			state.dash_refreshid = { ...state.dash_refreshid, ...payload }
		
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
			let reply = ( await axios.post( "https://maps.mecklenburgcountync.gov/auth/v1/login_finslive", login_data ) ).data;
			
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

					router.go( -1 )

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