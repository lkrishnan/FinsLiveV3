import Vue from "vue"
import VueRouter from "vue-router"
import EsriMap from "./components/EsriMap.vue"
import Moment from "moment"
import store from "./store"
import ValidateString from "./js/validateString"

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
		const inpt = {
			startdate: Moment( startdate, "YYYY-MM-DDTHH:mmZ", true ),
			enddate: Moment( enddate, "YYYY-MM-DDTHH:mmZ", true ),

		}

		if( inpt.startdate.isValid( ) && inpt.enddate.isValid( ) && inpt.enddate.diff( inpt.startdate, "seconds" ) > 0 ){
			return { startdate: startdate, enddate: enddate, }

		}else{
			return {
				startdate: Moment( new Date( ) ).subtract( 1, "d" ).format( "YYYY-MM-DDTHH:mmZ" ),
				enddate: Moment( new Date( ) ).format( "YYYY-MM-DDTHH:mmZ" ),
	
			}

		}

	},
	getEndDate = ( enddate ) => {
		const inpt_enddate = Moment( enddate, "YYYY-MM-DDTHH:mmZ", true ) 

		if( inpt_enddate.isValid( ) ){
			return enddate

		}else{
			return Moment( new Date( ) ).format( "YYYY-MM-DDTHH:mmZ" )
	
		}

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
	storeGaugeCamRoute = ( from ) => {
		store.commit( "last_route", { name: from.name, params: from.params } )

		if( [ "AllPeriod", "AllRange", "AllDatePeriod", "AllCamera", "SelectedCamera", "SelectedPeriod", "SelectedRange", "SelectedDatePeriod" ].includes( from.name ) ){
			store.commit( "last_gauge_cam_route", { name: from.name, params: from.params } )

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
			path: "/camera",
			name: "AllCamera",
			component: EsriMap

		}, {
			path: "/camera/:uniqueid",
			name: "SelectedCamera",
			component: EsriMap,
			beforeEnter( to, from, next ){
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
		//base: "/finslive/"
		base: "/"
		
	} )



export default router