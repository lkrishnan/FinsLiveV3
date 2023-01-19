import Vue from "vue"
import VueRouter from "vue-router"
import EsriMap from "./components/EsriMap.vue"
import store from "./store"
import ValidateString from "./js/validateString"
import { FormatDate, isValidDate, SubtractFromDate, GetDateDiffinSecs } from "./js/vanillaMoment"
import { GetSiteInfo } from "./js/getFINSData"

Vue.use( VueRouter )

const getGauges = ( input_list) => {
		let amended_list = "rain"

		store.getters[ "tabs" ].forEach( ( tab, idx ) => {
			if( tab.gauges.some( r => input_list.split( "," ).includes( r ) ) ){
				amended_list = tab.gauges.join( "," )
			}

		} )

		return amended_list 

	},
	getRangeDate = ( startdate, enddate ) => {
		let retval = {
				startdate: FormatDate( "YYYY-MM-DDTHH:mmZ", SubtractFromDate( 1, "days" ) ),
				enddate: FormatDate( "YYYY-MM-DDTHH:mmZ", new Date( ) ),

			}

		if( isValidDate( startdate ) && isValidDate( enddate ) ){
			startdate = new Date( Date.parse( startdate ) )
			enddate = new Date( Date.parse( enddate ) )
	
			if( GetDateDiffinSecs( startdate, enddate ) > 0 ){
				retval = { 
					startdate: ( enddate > startdate ? FormatDate( "YYYY-MM-DDTHH:mmZ", startdate ) : FormatDate( "YYYY-MM-DDTHH:mmZ", enddate ) ),
					enddate: ( enddate > startdate ? FormatDate( "YYYY-MM-DDTHH:mmZ", enddate ) : FormatDate( "YYYY-MM-DDTHH:mmZ", startdate ) ),
	
				}
	
			}
	
		}

		return retval

	},
	getEndDate = ( enddate ) => {
		return FormatDate( "YYYY-MM-DDTHH:mmZ", ( isValidDate( enddate ) ? new Date( Date.parse( enddate ) ) : new Date( ) ) )

	},
	getUniqueID = ( gauges, uniqueid ) => {
		let ret_uniqueid = null

		gauges.split( "," ).every( gauge => {
			switch( gauge ){
				case "rain":
					ret_uniqueid = ( ValidateString( uniqueid, "isRainGauge" ) ? uniqueid : null ) 
					break

				case "stage":
					ret_uniqueid = ( ValidateString( uniqueid, "isStageGauge" ) ? uniqueid : null ) 
					break

				case "lcs":
					ret_uniqueid = ( ValidateString( uniqueid, "isLCSGauge" ) ? uniqueid : null ) 
					break

				case "lake":
					ret_uniqueid = ( ValidateString( uniqueid, "isLakeGauge" ) ? uniqueid : null ) 
					break

			}

			//do this to break the every loop one a match is found
			return ( ret_uniqueid ? false : true )

		} )

		return ret_uniqueid

	},
	storeGaugeCamRoute = async ( from ) => {
		if( !store.getters.gauge_info ){
			store.commit( "gauge_info", await GetSiteInfo( ) )

		}

		if( store.getters.last_route.hasOwnProperty( "name" ) && store.getters.last_route.name ){
			store.commit( "last_route", { name: from.name, params: from.params } )

			if( [ "AllPeriod", "AllRange", "AllDatePeriod", "AllCamera", "SelectedCamera", "SelectedPeriod", "SelectedRange", "SelectedDatePeriod" ].includes( from.name ) ){
				store.commit( "last_gauge_cam_route", { name: from.name, params: from.params, } )

			}

		}

	},
	routes = [
		{
			path: "/",
			name: "Home",
			component: EsriMap,
			beforeEnter( to, from, next ){
				next( {	name: "AllPeriod", params: { gauges: "rain", period: "P1D" } } )
				
			},

		}, {
			path: "/period/:gauges/:period",
			name: "AllPeriod",
			component: EsriMap,
			beforeEnter( to, from, next ){
				const valid = {
					gauges: getGauges( to.params.gauges ),
					period: ( ValidateString( to.params.period, "isISO8601" ) ? to.params.period : "P1D" )

				}

				storeGaugeCamRoute( from )

				if( valid.gauges == to.params.gauges && valid.period == to.params.period ){
					next( )
					
				}else{
					//use adjusted period
					next( {	name: "AllPeriod", params: { gauges: valid.gauges, period: valid.period } } )
					
				}

			},

		}, {
			path: "/range/:gauges/:startdate/:enddate",
			name: "AllRange",
			component: EsriMap,
			beforeEnter( to, from, next ){
				const valid = {
					gauges: getGauges( to.params.gauges ),
					...getRangeDate( to.params.startdate, to.params.enddate )
					
				}

				storeGaugeCamRoute( from )

				if( valid.gauges == to.params.gauges && valid.startdate == to.params.startdate && valid.enddate == to.params.enddate ){
					next( )

				}else{
					//use adjusted range
					next( {	name: "AllRange", params: { gauges: valid.gauges, startdate: valid.startdate, enddate: valid.enddate } } )

				}

			},

		}, {
			path: "/dateperiod/:gauges/:enddate/:period",
			name: "AllDatePeriod",
			component: EsriMap,
			beforeEnter( to, from, next ){
				const valid = {
					gauges: getGauges( to.params.gauges ),
					enddate: getEndDate( to.params.enddate ),
					period: ( ValidateString( to.params.period, "isISO8601" ) ? to.params.period : "P1D" ),
					
				}

				storeGaugeCamRoute( from )

				if( valid.gauges == to.params.gauges && valid.enddate == to.params.enddate && valid.period == to.params.period ){
					next( )

				}else{
					//use adjusted date period
					next( {	name: "AllDatePeriod", params: { gauges: valid.gauges, enddate: valid.enddate, period: valid.period } } )

				}

			},

		}, {
			path: "/period/:gauges/:period/:uniqueid",
			name: "SelectedPeriod",
			component: EsriMap,
			beforeEnter( to, from, next ){
				const valid = {
					gauges: getGauges( to.params.gauges ),
					period: ( ValidateString( to.params.period, "isISO8601" ) ? to.params.period : "P1D" ),
										
				}

				storeGaugeCamRoute( from )

				valid.uniqueid = getUniqueID( valid.gauges, to.params.uniqueid )

				if( valid.gauges == to.params.gauges && valid.period == to.params.period && valid.uniqueid == to.params.uniqueid ){
					next( )
					
				}else{
					//use adjusted period
					next( {	name: "AllPeriod", params: { gauges: valid.gauges, period: valid.period } } )
					
				}

			},

		}, {
			path: "/range/:gauges/:startdate/:enddate/:uniqueid",
			name: "SelectedRange",
			component: EsriMap,
			beforeEnter( to, from, next ){
				const valid = {
					gauges: getGauges( to.params.gauges ),
					...getRangeDate( to.params.startdate, to.params.enddate ),
					
				}

				storeGaugeCamRoute( from )

				valid.uniqueid = getUniqueID( valid.gauges, to.params.uniqueid )

				if( valid.gauges == to.params.gauges && 
						valid.startdate == to.params.startdate && 
						valid.enddate == to.params.enddate &&
						valid.uniqueid == to.params.uniqueid ){
					next( )

				}else{
					//use adjusted range
					next( {	name: "AllRange", params: { gauges: valid.gauges, startdate: valid.startdate, enddate: valid.enddate } } )

				}

			},

		}, {
			path: "/dateperiod/:gauges/:enddate/:period/:uniqueid",
			name: "SelectedDatePeriod",
			component: EsriMap,
			beforeEnter( to, from, next ){
				const valid = {
					gauges: getGauges( to.params.gauges ),
					enddate: getEndDate( to.params.enddate ),
					period: ( ValidateString( to.params.period, "isISO8601" ) ? to.params.period : "P1D" ),
					
				}

				storeGaugeCamRoute( from )

				valid.uniqueid = getUniqueID( valid.gauges, to.params.uniqueid )

				if( valid.gauges == to.params.gauges && 
						valid.enddate == to.params.enddate && 
						valid.period == to.params.period &&
						valid.uniqueid == to.params.uniqueid ){
					next( )

				}else{
					//use adjusted date period
					next( {	name: "AllDatePeriod", params: { gauges: valid.gauges, enddate: valid.enddate, period: valid.period } } )

				}

			},

		}, {
			path: "/camera/",
			name: "AllCamera",
			component: EsriMap,
			beforeEnter( to, from, next ){
				storeGaugeCamRoute( from )
				next( )

			},

		}, {
			path: "/camera/:uniqueid",
			name: "SelectedCamera",
			component: EsriMap,
			beforeEnter( to, from, next ){
				storeGaugeCamRoute( from )
				
				if( ValidateString( to.params.uniqueid, "isCamera" ) ){
					next( )

				}else{
					//show all cameras
					next( {	name: "AllCamera" } )

				}

			},

		}, {
			path: "/help",
			name: "Help",
			// which is lazy-loaded when the route is visited.
			component: ( ) => import( /* webpackChunkName: "help" */ "./components/Help.vue" ),
			beforeEnter( to, from, next ){
				storeGaugeCamRoute( from )
				next( )

			},

		}, {
			path: "/dashboard",
			name: "Dashboard",
			// which is lazy-loaded when the route is visited.
			component: ( ) => import( /* webpackChunkName: "dashboard" */ "./components/Dashboard.vue" ),
			beforeEnter( to, from, next ){
				storeGaugeCamRoute( from )
				next( )

			},

		}, {
			path: "/login",
			name: "Login",
			// which is lazy-loaded when the route is visited.
			component: ( ) => import( /* webpackChunkName: "about" */ "./components/Login.vue" ),
			beforeEnter( to, from, next ){
				storeGaugeCamRoute( from )
				next( )

			},

		}

	],

	router = new VueRouter( {
		routes,
		mode: "history",
		base: process.env.NODE_ENV === "production" ? "/" : "/",
		
	} )



export default router