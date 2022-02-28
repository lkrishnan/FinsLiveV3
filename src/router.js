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
			path: "/:gauges/:period",
			name: "AllPeriod",
			component: EsriMap

		}, {
			path: "/:gauges/:startdate/:enddate",
			name: "AllRange",
			component: EsriMap

		}, {
			path: "/:gauges/:period/:site",
			name: "SelectedPeriod",
			component: EsriMap

		}, {
			path: "/:gauges/:startdate/:enddate/:site",
			name: "SelectedRange",
			component: EsriMap

		}, {
			path: "/camera",
			name: "Camera",
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

		case "AllPeriod":
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
				store.getters[ "tabs" ].forEach( ( tab, idx ) => {
					//check if some gauges are included in the URL
					if( tab.gauges.some( r => to.params.gauges.split( "," ).includes( r ) ) ){
						//rewite the URL to include all gauges
						next( {	
							name: "AllPeriod", 
							params: { 
								gauges: tab.gauges.join( "," ), 
								period: to.params.period
			
							} 
			
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