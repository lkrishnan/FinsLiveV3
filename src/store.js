import Vue from "vue"
import Vuex from "vuex"

Vue.use( Vuex )

export default new Vuex.Store( {
	state: {
		is_mobile: false,
		ws: {
			fins: "https://maps.mecklenburgcountync.gov/api/fins/",
      		gis: "https://maps.mecklenburgcountync.gov/api/gis/",
			tax: "https://maps.mecklenburgcountync.gov/api/tax/",
			contrail: "https://maps.mecklenburgcountync.gov/api/contrail",
			dbopen: "https://api.mcmap.org/",

  		},
		filter: { 
			gauge: null, 
			site: null, 
			period: null,
			startDT: null, 
			endDT: null

		},
		top_tab: null,
		tabs: [
			{ label: [ "Rain", "Gauge" ], icon: "mdi-weather-rainy", gauges: [ "rain" ] },
			{ label: [ "Stage & Lake", "Gauge" ], icon: "mdi-wave", gauges: [ "stage" , "lcs", "lake" ]  },
			{ label: [ "Creek", "Cam" ], icon: "mdi-camera-enhance-outline", gauges: [ "cam" ] },
				
		]

	},

	getters: {
		is_mobile: state => state.is_mobile,
		ws: state => state.ws,
		filter: state => state.filter,
		top_tab: state => state.top_tab,
		tabs: state => state.tabs,

	},

  	mutations: {
		is_mobile( state, payload ){
			state.is_mobile = payload

		},
		filter( state, payload ){
			state.filter = payload
		},
		top_tab( state, payload ){
			state.top_tab = payload
		},
			
	},
  
	actions: {
  	
	}

} )