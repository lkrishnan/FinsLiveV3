import axios from "axios"
import store from "../store"
import JSONToURL from "./jsontourl"

export default async function getAlertData( params, qrystr ){
	const axios_inst = axios.create( { 
			headers: { 
				"Cache-Control": "max-age=0, no-cache, no-store",
				"Pragma": "no-cache"  
			}
	  	} ),
	  	url = `${store.getters[ "ws" ].fins}v1/query/${params.gauge}/${params.info}`,
		response = await axios_inst.get( `${ url }?${ JSONToURL( qrystr ) }` );

	return response.data

}