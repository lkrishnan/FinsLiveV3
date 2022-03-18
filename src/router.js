import Vue from "vue"
import VueRouter from "vue-router"
import EsriMap from "./components/EsriMap.vue"
import store from "./store"

Vue.use( VueRouter )

const routes = [
		{
			path: "/",
			name: "Home",
			component: EsriMap

		}, {
			path: "/period/:gauges/:period",
			name: "AllPeriod",
			component: EsriMap

		}, {
			path: "/range/:gauges/:startdate/:enddate",
			name: "AllRange",
			component: EsriMap

		}, {
			path: "/dateperiod/:gauges/:enddate/:period",
			name: "AllDatePeriod",
			component: EsriMap

		}, {
			path: "/period/:gauges/:period/:site",
			name: "SelectedPeriod",
			component: EsriMap

		}, {
			path: "/range/:gauges/:startdate/:enddate/:site",
			name: "SelectedRange",
			component: EsriMap

		}, {
			path: "/dateperiod/:gauges/:enddate/:period/:site",
			name: "SelectedDatePeriod",
			component: EsriMap

		}, {
			path: "/camera",
			name: "AllCamera",
			component: EsriMap

		}, {
			path: "/camera/:site",
			name: "SelectedCamera",
			component: EsriMap

		}, {
			path: "/about",
			name: "About",
			// which is lazy-loaded when the route is visited.
			component: ( ) => import( /* webpackChunkName: "about" */ "./components/About.vue" )

		}

	],

	router = new VueRouter( {
		mode: "history",
		//base: "/finslive3/",
		base: "/",
		routes

	} )

router.beforeEach( ( to, from, next ) => {
	switch( to.name ){
		case "Home":
			next( {	
				name: "AllPeriod", 
				params: { 
					gauges: "rain", 
					period: "P1D"

				} 

			} )
			break

		case "AllPeriod": case "AllRange": case "AllDatePeriod":
			let found_match = false

			store.getters[ "tabs" ].forEach( ( tab, idx ) => {
				//check if all gauges are included in the URL
				if( tab.gauges.every( r => to.params.gauges.split( "," ).includes( r ) ) ){
					//
					next( )
					store.commit( "top_tab", idx )
					found_match = true
				}


			} )

			if( !found_match ){
				const getParams = ( route_name, gauges ) => {
					let params
			
					switch( route_name ){
						case "AllPeriod": 
							params = { gauges: gauges, period: to.params.period } 
							break 
			
						case "AllRange":
							params = { gauges: gauges, startdate: to.params.startdate, enddate: to.params.enddate } 
							break

						case "AllDatePeriod":
							params = { gauges: gauges, enddate: to.params.enddate, period: to.params.period } 
							break
			
					}

					return params
			
				}

				store.getters[ "tabs" ].forEach( ( tab, idx ) => {
					//check if some gauges are included in the URL
					if( tab.gauges.some( r => to.params.gauges.split( "," ).includes( r ) ) ){
						//rewite the URL to include all gauges
						next( {	
							name: to.name, 
							params: getParams( to.name, tab.gauges.join( "," ) ) 
			
						} )

						store.commit( "top_tab", idx )
						found_match = true
	
					}
	
	
				} )

			}

			if( !found_match ){
				//bad URL fallback to default
				next( {	
					name: "AllPeriod", 
					params: { 
						gauges: "rain", 
						period: "P1D"

					} 

				} )
				store.commit( "top_tab", 0 )

			}
			break

		case "Camera":
			next( )
			store.commit( "top_tab", 2 )
			break

		default: 
			next( )

			break
	
	}	

} )

export default router