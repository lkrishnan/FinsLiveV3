import store from "../store"

export default function getSearchParams( type, srch_obj ){
	const srch_params = {
		address: srch_str => {
			return {
					type: type,
					url:  store.getters[ "ws" ].gis + "v1/query/masteraddress_pt",
					params: {
						columns: `'ADDRESS'::text as tag, full_address as displaytext, num_addr as matid, full_address as address, 
									ST_Y( shape ) as y, ST_X( shape ) as x, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon, num_addr as param`,
						filter: `txt_street_number = '${srch_obj.addr_num}' and soundex(substring(full_address from 1 for ${srch_obj.address.length})) = soundex($$${srch_obj.address}$$) and txt_cdeuse not in ('METER', 'VALUE-IMPR', 'MINING', 'SIGN', 'MASTER ADDRESS', 'BRIDGE', 'CATV', 'PHONE', 'UTILITY', 'SAW SERVICE' )`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		intersection: srch_str => {
			return {
					type: type,
					url:  store.getters[ "ws" ].gis + "v1/query/streetintersections_pt",
					params: {
						columns: `'INTERSECTION'::text as tag, replace( streets, '_', ' & ' ) as displaytext, ST_x( shape ) as x, ST_y( shape ) as y, replace( streets, '_', ' & ' ) as param`,
						filter: `controltype in ( 3, 5 ) 
							and ( streets ~* '^(${srch_obj.street1})(\\s*\\w*)*_(${srch_obj.street2})(\\s*\\w*)*' OR streets ~* '^(${srch_obj.street2})(\\s*\\w*)*_(${srch_obj.street1})(\\s*\\w*)*' )`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		road: srch_str => {
			return {
					type: type,
					url:  store.getters[ "ws" ].gis + "v1/query/streetfile_tb",
					params: {
						columns: `'ROAD' as tag, regexp_replace(admkey, '\s*:.....', '') || 
							CASE WHEN municipality = 'CHAR' THEN ', CHARLOTTE'
								WHEN municipality = 'CORN' THEN ', CORNELIUS'
								WHEN municipality = 'DAVI' THEN ', DAVIDSON'
								WHEN municipality = 'HUNT' THEN ', HUNTERSVILLE'
								WHEN municipality = 'MATT' THEN ', MATTHEWS'
								WHEN municipality = 'MINT' THEN ', MINT HILL'
								WHEN municipality = 'PINE' THEN ', PINEVILLE'
								WHEN municipality = 'STAL' THEN ', STALLINGS'
								WHEN municipality = 'MECK' THEN ', MECKLENBURG'
								ELSE ''
							END as displaytext, 
							preaddrnum as prefix, streetname as stname, streettype as sttype, addrnumsuf as suffix,	municipality as juris,
							coalesce( preaddrnum, '' ) || '|' || coalesce( streetname, '' ) || '|' || coalesce( streettype, '' ) || '|' || coalesce( addrnumsuf, '' ) || '|' || coalesce( municipality, '' ) as param`,
						filter: `admkey ~* $$${srch_obj.road}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		park: srch_str => {
			return {
					type: type,
					url:  store.getters[ "ws" ].gis + "v1/query/parks_pt",
					params: {
						columns: `'PARK'::text as tag, UPPER(prkname) as displaytext, prkname || '<br />Type: ' || prktype || '<br />' || prkaddr as desc, ST_X( shape ) as x, ST_Y( shape ) as y`,
						filter: `prkname ~* $$${srch_obj.park_name}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		public_schools: srch_str => {
			return {
					type: type,	
					url:  store.getters[ "ws" ].gis + "v1/query/cms_schools_pt",
					params: {
						columns: `'SCHOOL'::text as tag, school as displaytext, coalesce( school, '' ) || '<br/>Type: PUBLIC - ' || coalesce( school_typ, '' ) || ' SCHOOL<br />' || coalesce( address, '' ) as desc, ST_X( shape ) as x, ST_Y( shape ) as y`,
						filter: `school ~* $$${srch_obj.school_name}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		charter_schools: srch_str => {
			return {
					type: type,	
					url:  store.getters[ "ws" ].gis + "v1/query/schools_charter_pt",
					params: {
						columns: `'SCHOOL'::text as tag, UPPER( name ) as displaytext, coalesce( UPPER( name ), '' ) || '<br/>Type: CHARTER SCHOOL<br />' || coalesce( grade_level, '' ) || '<br />' || coalesce( address, '' ) as desc, ST_X( shape ) as x, ST_Y( shape ) as y`,
						filter: `name ~* $$${srch_obj.school_name}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		private_schools: srch_str => {
			return {
					type: type,	
					url:  store.getters[ "ws" ].gis + "v1/query/schools_private_pt",
					params: {
						columns: `'SCHOOL'::text as tag, UPPER( school ) as displaytext, coalesce( UPPER( school ), '' ) || '<br/>Type: PRIVATE SCHOOL<br />' || coalesce( address, '' ) as desc, ST_X( shape ) as x, ST_Y( shape ) as y`,
						filter: `school ~* $$${srch_obj.school_name}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		library: srch_str => {
			return {
					type: type,						
					url:  store.getters[ "ws" ].gis + "v1/query/libraries_pt",
					params: {
						columns: `'LIBRARY'::text as tag, name as displaytext, name || '<br />' || address as desc, ST_X( shape ) as x, ST_Y( shape ) as y`,
						filter: `name ~* $$${srch_obj.library_name}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		business: srch_str => {
			return {
					type: type,	
					url:  store.getters[ "ws" ].gis + "v1/query/businesswise_businesses_pt",
					params: {
						columns: `'BUSINESS'::text as tag, company||' ,'||address as displaytext, company || '<br />' || address || '<br />' || city || ' ' || state || ' ' || zip as desc, ST_X( shape ) as x, ST_Y( shape ) as y`,
						filter: `company ~* $$${srch_obj.business_name}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		bus_stop: srch_str => {
			return {
					type: type,	
					url:  store.getters[ "ws" ].gis + "v1/query/cats_busstops_pt",
					params: {
						columns: `'BUS STOP'::text as tag, stopdesc as displaytext, stopdesc || '<br />Routes: ' || routes as desc, ST_X( shape ) as x, ST_Y( shape ) as y`,
						filter: `stopdesc ~* $$${srch_obj.bus_stop_name}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

		light_rail: srch_str => {
			return {
					type: type,	
					url:  store.getters[ "ws" ].gis + "v1/query/cats_blueline_stations_pt",
					params: {
						columns: `'LIGHT RAIL'::text as tag, name as displaytext, address as desc, ST_X( shape ) as x, ST_Y( shape ) as y`,
						filter: `name ~* $$${srch_obj.station_name}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

	}
	
	return srch_params[ type ]( srch_obj )

}