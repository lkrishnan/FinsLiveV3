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
			const street1 = srch_obj.street1.split( "|" ),
				street2 = srch_obj.street2.split( "|" ),
				first_where = ( street1[ 1 ].length > 0 ? street1[ 1 ] : "(N|E|W|S)*" ) + "\\s*" + 
								street1[ 2 ] + "\\s*" + 
								( street1[ 3 ] > 0 ? street1[ 3 ] : "(AL|AV|BV|BY|CR|CS|CT|CV|DR|EP|EX|FR|HY|LN|LP|PL|PY|RA|RD|RN|RW|ST|TC|TL|TR|WY)*" ) + "\\s*" +
								( street1[ 4 ] > 0 ? street1[ 4 ] : "(N|NW|SE|W|E|NE|S|SW|EXT|NB|SB|EB|WB|CONN)*" ),
				second_where = ( street2[ 1 ].length > 0 ? street2[ 1 ] : "(N|E|W|S)*" ) + "\\s*" + 
								street2[ 2 ] + "\\s*" + 
								( street2[ 3 ] > 0 ? street2[ 3 ] : "(AL|AV|BV|BY|CR|CS|CT|CV|DR|EP|EX|FR|HY|LN|LP|PL|PY|RA|RD|RN|RW|ST|TC|TL|TR|WY)*" ) + "\\s*" +
								( street2[ 4 ] > 0 ? street2[ 4 ] : "(N|NW|SE|W|E|NE|S|SW|EXT|NB|SB|EB|WB|CONN)*" )
			
			return {
					type: type,
					url:  store.getters[ "ws" ].gis + "v1/query/streetintersections_pt",
					params: {
						columns: `'INTERSECTION'::text as tag, replace( streets, '_', ' & ' ) as displaytext, ST_x( shape ) as x, ST_y( shape ) as y, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon, replace( streets, '_', ' & ' ) as intersection`,
						filter: `controltype in ( 3, 5 ) 
							and ( streets ~* '(${first_where}_${second_where})|(${second_where}_${first_where})' )`,
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
							coalesce( preaddrnum, '' ) || '|' || coalesce( streetname, '' ) || '|' || coalesce( streettype, '' ) || '|' || coalesce( addrnumsuf, '' ) || '|' || coalesce( municipality, '' ) as param,
							countystcode as stcode`,
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
						columns: `'PARK'::text as tag, UPPER(prkname) as displaytext, prkname as name, prktype as type, prkaddr as address, ST_X( shape ) as x, ST_Y( shape ) as y, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon`,
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
						columns: `'SCHOOL'::text as tag, school as displaytext, school as name, 'PUBLIC - ' || coalesce( school_typ, '' ) || ' SCHOOL' as type, address as address, ST_X( shape ) as x, ST_Y( shape ) as y, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon`,
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
						columns: `'SCHOOL'::text as tag, UPPER( name ) as displaytext, UPPER( name ) as name, 'CHARTER SCHOOL ' || coalesce( grade_level, '' ) as type, address, ST_X( shape ) as x, ST_Y( shape ) as y, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon`,
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
						columns: `'SCHOOL'::text as tag, UPPER( school ) as displaytext, UPPER( school ) as name, 'PRIVATE SCHOOL' as type, address, ST_X( shape ) as x, ST_Y( shape ) as y, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon`,
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
						columns: `'LIBRARY'::text as tag, name as displaytext, name, address, ST_X( shape ) as x, ST_Y( shape ) as y, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon`,
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
						columns: `'BUSINESS'::text as tag, company||' ,'||address as displaytext, company as name, address || ' ' || city || ' ' || state || ' ' || zip as address, ST_X( shape ) as x, ST_Y( shape ) as y, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon`,
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
						columns: `'BUS STOP'::text as tag, stopdesc as displaytext, stopdesc as name, routes, ST_X( shape ) as x, ST_Y( shape ) as y, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon`,
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
						columns: `'LIGHT RAIL'::text as tag, name as displaytext, name, address, ST_X( shape ) as x, ST_Y( shape ) as y, ST_y( ST_transform( shape, 4326 ) ) as lat, ST_x( ST_transform( shape, 4326 ) ) as lon`,
						filter: `name ~* $$${srch_obj.station_name}$$`,
						sort: `displaytext`,
						limit: 10
		
					}
		
				}
		
		},

	}
	
	return srch_params[ type ]( srch_obj )

}