import Vue from "vue"
import Vuex from "vuex"

Vue.use( Vuex )

export default new Vuex.Store( {
	state: {
		is_mobile: false,
		top_tab: null,
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
			dbopen: "https://api.mcmap.org/",

  		},

		//toggles
		nav_drawer: false,
		info_drawer: false,
		overlay_switch: [ ],
		filter_holder: false,

		//map 
		map_sources: null,
		overlays: [
			{ label: "Weather Radar", value: "radar", source: "radar", switch: false },
			{ label: "Precipitation", value: "precip", source: "precip", switch: true },
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
		
		//query control
		gauge_cam_list: [ ],
		curr_qry_ctrl: "gauge_cam", 

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
		overlay_switch: state => state.overlay_switch,
		filter_holder: state => state.filter_holder,
	
		//map 
		map_sources: state => state.map_sources,
		overlays: state => state.overlays,
		
		//query control
		gauge_cam_list: state => state.gauge_cam_list,
		curr_qry_ctrl: state => state.curr_qry_ctrl,
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
		

		//query control
		gauge_cam_list( state, payload ){
			state.gauge_cam_list = payload
			
		},
		curr_qry_ctrl( state, payload ){
			state.curr_qry_ctrl = payload
			
		},
			
	},
  
	actions: {
  	
	}

} )