import router from "../router"
import store from "../store"
import IsObjEqual from "./isObjEqual"

export default function getNewRoute( chg_params ){
    const old_params = router.currentRoute.params,
		old_route_name = router.currentRoute.name,
		getNewParams = ( ) => {
			const sel_tab = store.getters[ "top_tab" ]
			let new_params

			if( chg_params.hasOwnProperty( "gauges" ) && chg_params.hasOwnProperty( "uniqueid" ) ){
				const { gauges, uniqueid, ...keep_params } = old_params,
					tab = store.getters[ "tabs" ].filter( tab => tab.gauges.includes( chg_params.gauges ) )
				
				new_params = { ...chg_params, ...{ gauges: tab[ 0 ].gauges.join( "," )  }, ...keep_params }

			}else if( chg_params.hasOwnProperty( "gauges" ) ){ //gauge type change
				new_params = store.getters[ "tabs" ][ sel_tab ].last_param
 
			}else if( chg_params.hasOwnProperty( "uniqueid" ) ){ //site change
				const { uniqueid, ...keep_params } = old_params
				new_params = { ...chg_params, ...keep_params }

			}else{ //filter change
				const { period, startdate, enddate, ...keep_params } = old_params
				new_params = { ...chg_params, ...keep_params }

			}
			
			return new_params

		},
		getNewName = ( ) => {
			let ret_val = ( new_params.hasOwnProperty( "uniqueid" ) ? "Selected" : "All" )

			if( new_params.hasOwnProperty( "startdate" ) && new_params.hasOwnProperty( "enddate" ) ){
				ret_val += "Range"

			}else if( new_params.hasOwnProperty( "enddate" ) && new_params.hasOwnProperty( "period" ) ){
				ret_val += "DatePeriod"

			}else if( new_params.hasOwnProperty( "period" ) ){
				ret_val += "Period"

			}else{
				ret_val += "Camera"
			}

			return ret_val

		}

	let new_route = null,
		new_params = getNewParams( )
		
	if( !IsObjEqual( old_params, new_params ) ){
		const new_route_name = getNewName( )

		new_route = { name: new_route_name, params: new_params } 

		//set last_param in store
		store.getters[ "tabs" ].forEach( tab => {
			if( tab.gauges.join( "," ) === old_params.gauges ){
				tab.last_route_name = old_route_name
				tab.last_param = old_params
				
			}

		} ) 

		store.commit( "last_route", { 
			name: router.currentRoute.name, 
			params: router.currentRoute.params 

		} )

		store.commit( "last_gauge_cam_route", { 
			name: router.currentRoute.name, 
			params: router.currentRoute.params

		} )

	}    
		
	return new_route

}