import axios from "axios"
import store from "../store"
import JSONToURL from "./jsontourl"
import * as txml from "txml"
import { parse, toSeconds } from "iso8601-duration"
import {FormatDate, SubtractFromDate} from "./vanillaMoment"

export async function GetAlertData( gauge, info, qrystr ){
	const axios_inst = axios.create( { 
			headers: { 
				"Cache-Control": "max-age=0, no-cache, no-store",
				"Pragma": "no-cache"  
			}
	  	} ),
	  	url = `${store.getters[ "ws" ].fins}v1/query/${gauge}/${info}`,
		response = await axios_inst.get( `${ url }?${ JSONToURL( qrystr ) }` )

	return response.data

}

export async function GetContrailData( systm, qrystr ){
	try{
		const url = `${ store.getters[ "ws" ][ systm ] }?${ JSONToURL( qrystr ) }`,
			response = await fetch( url )

		if( response.ok ){
			if( qrystr?.format ){
				const json_response = await response.json( )

				return json_response.response

			}else{
				const xml_str = await response.text( ),
					xml_response = txml.simplify( txml.parse( xml_str ) ).onerain.response

				return ( typeof xml_response.general === "object" ? xml_response.general.row : [ ] )

			}

							
		}else{
			throw Error( `${response.status} ${response.statusText}` )

		}

	}catch( error){
		console.log( error )
 
	}
	
}

export async function GetStoredContrailData( qrystr ){
	try{
		const axios_inst = axios.create( { 
			headers: { 
				"Cache-Control": "max-age=0, no-cache, no-store",
				"Pragma": "no-cache"  
			}
	  	} ),
		url = `${store.getters[ "ws" ].fins}v1/query/lcs/lastfive`,
		response = await axios_inst.get( `${ url }` )

		return response.data 

	}catch( error){
		console.log( error )
 
	}
	
}

export function getContrailParams( qrystr, site_info, system_key="c9254111-e6c8-4689-9171-685eac46496b" ){
	let ret_val = { 
		method: "GetSensorData", 
		system_key: system_key
		
	}

	if( qrystr.hasOwnProperty( "period" ) ){
		const duration_secs = toSeconds( parse( qrystr.period ) ) 

		ret_val = { 
			...ret_val, 
			site_id: site_info.site_id,
			format: "json",
			data_start: FormatDate( "YYYY-MM-DD HH:mm:ss", SubtractFromDate( duration_secs, "seconds", qrystr.enddate ), true ),
			data_end: FormatDate( "YYYY-MM-DD HH:mm:ss", qrystr.enddate, true ),  

		}
					
		
	}else if( qrystr.hasOwnProperty( "startdate" ) & qrystr.hasOwnProperty( "enddate" ) ){
		ret_val = { 
			...ret_val, 
			format: "json",
			data_start: FormatDate( "YYYY-MM-DD HH:mm:ss", qrystr.startdate, true ),
			data_end: FormatDate( "YYYY-MM-DD HH:mm:ss", qrystr.enddate, true ),  

		}

	}

	if( qrystr.hasOwnProperty( "uniqueid" ) ){
		ret_val = { 
			...ret_val, 
			//or_site_id: qrystr.uniqueid
			site_id: site_info.site_id,
			format: "json"
			//or_sensor_id: site_info.or_sensor_id, //or_sensor_is needs to be passed to get the readings with msl 

		}
		
	}
		
	return ret_val

}

export function getAlertParams( qrystr ){
	//calls made to the Alert API
	delete Object.assign( qrystr, { sites: qrystr.uniqueid } )[ "uniqueid" ]
	
	return qrystr

}

export async function GetNWSDetail( url ){
	const response = await fetch( url )
						  
	return await response.json( )

}

export function GetSnapshot( site_id, site_key ){
	return ( site_key ? 
		`${store.getters[ "ws" ].camera}?method=image&camera=${site_key}&api_key=55dcad90-e3ec-4954-b882-384bfd3bb9dd`: 
		`${store.getters[ "ws" ].fins}v1/creekcam/${site_id}` )
		
}

export async function GetSiteInfo( ){
	try{
		const axios_inst = axios.create( { 
			headers: { 
				"Cache-Control": "max-age=0, no-cache, no-store",
				"Pragma": "no-cache"  
			}
	  	} ),
		url = ( process.env.NODE_ENV == "development" ? "/" : "//" + window.location.hostname + "/" ) + "assets/gauge_info.json",
		response = await axios_inst.get( url )

		return response.data 

	}catch( error){
		console.log( error )
 
	}

}