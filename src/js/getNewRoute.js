import router from "../router"
import store from "../store"
import IsObjEqual from "./isObjEqual"

export default function getNewRoute( chg_params ){
    const old_params = router.currentRoute.params,
		getNewParams = ( ) => {
			const sel_tab = store.getters[ "top_tab" ]
			let new_params

			if( chg_params.hasOwnProperty( "gauges" ) ){ //gauge type change
				new_params = store.getters[ "tabs" ][ sel_tab ].last_param
 
			}else if( chg_params.hasOwnProperty( "site" ) ){ //site change
				const { site, ...keep_params } = old_params
				new_params = { ...chg_params, ...keep_params }

			}else{ //filter change
				const { period, startdate, enddate, ...keep_params } = old_params
				new_params = { ...chg_params, ...keep_params }

			}

			return new_params

		},
		getNewName = ( ) => {
			let ret_val = ( new_params.hasOwnProperty( "site" ) ? "Selected" : "All" )

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
			new_route = { name: getNewName( ), params: new_params } 

			//set last_param in store
			store.getters[ "tabs" ].forEach( tab => {
				if( tab.gauges.join( "," ) === old_params.gauges ){
					tab.last_param = old_params

				}

			} ) 

		}    
		
	return new_route

}