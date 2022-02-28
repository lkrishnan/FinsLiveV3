import axios from "axios"
import store from "../store"
import JSONToURL from "./jsontourl"
import * as txml from 'txml'

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

export async function GetContrailData( qrystr ){
	/*const response = await fetch( `${ store.getters[ "ws" ].contrail }?${ JSONToURL( { method: "GetSensorData", system_key: "c57f3913-ac01-4aa7-b633-e8311f45f74a" } ) }` ),
			xml_str = await response.text( ),
			parser = new DOMParser( )
	
	return parser.parseFromString( xml_str, "application/xml" )*/

	const response = await fetch( `${ store.getters[ "ws" ].contrail }?${ JSONToURL( qrystr ) }` ),
			xml_str = await response.text( )
						  
	return txml.simplify( txml.parse( xml_str ) ).onerain.response.general.row

}
