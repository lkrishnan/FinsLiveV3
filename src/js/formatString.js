import ValidateString from "./validateString"

export default function formatString( type, raw_val ){
	const format = {
		address: raw_val => { //params: addrno, prefix, stname, sttype, suffix, unit, juris, city, state, zip
			let addr = ""
			const keys = [ "addrno", "prefix", "stname", "sttype", "suffix", "unit", "juris", "city", "state", "zip" ]
			
			keys.forEach( key => {
				if( raw_val.hasOwnProperty( key ) && raw_val[ key ] ){
					addr += ( ( raw_val[ key ].trim( ).length > 0 ) ? ( ( addr.trim( ).length > 0 ) ? " " : "" ) + raw_val[ key ].trim( ) : "" )

				}
				
			 } )

			return addr
		
		},

		array2numlist: raw_val => { //params: arr
			let str = "";

			for( let l = raw_val.arr.length-1; l >= 0; l-- ){
				if( raw_val.arr[ l ].trim( ).length === 0 ){
					raw_val.arr.splice ( l, 1 )

				}	

			} 
	
			if( raw_val.arr.length > 1 ){
				for( let i = 0; i < raw_val.arr.length; i++ ){ 
					str += ( str.length > 0 ? '\n' : '' ) + parseInt( i + 1, 10 ) + ". " + raw_val.arr[ i ].trim( )

				}

			}else if( raw_val.arr.length > 0 ){	
				str += raw_val.arr[ 0 ].trim( )

			}
			
			return str

		},

		left_pad: ( raw_val ) => { //params: num, len
			let output = raw_val.num + ''

			while( output.length < raw_val.len ){ 
				output = '0' + output

			}
	
			return output

		},

		money: raw_val => { //params: price, date
			return "$" + ( raw_val.price ? parseFloat( raw_val.price ).toFixed( 2 ).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00" ) + ( raw_val.date ? " (" + raw_val.date + ")" : "" )

		},

		nullToEmpty: raw_val => {
			return ( ( !raw_val || ( typeof raw_val === "undefined" ) ) ? "" : raw_val.trim( ) )

		},

		number: raw_val => { //params: num , places
			raw_val.num = parseFloat( String( raw_val.num ).trim( ).replace( /,/g, "" ) );
			
			if( isNaN( raw_val.num ) ){
				raw_val.num = "";
			}else{
				raw_val.num = raw_val.num.toFixed( raw_val.places );
			}
			
			return raw_val.num
				
		},

		ucwords: raw_val => { //params: str
			//  discuss at: http://phpjs.org/functions/ucwords/
			// original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
			// improved by: Waldo Malqui Silva
			// improved by: Robin
			// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// bugfixed by: Onno Marsman
			//    input by: James (http://www.james-bell.co.uk/)
			//   example 1: ucwords('kevin van  zonneveld');
			//   returns 1: 'Kevin Van  Zonneveld'
			//   example 2: ucwords('HELLO WORLD');
			//   returns 2: 'HELLO WORLD'
	
			return ( raw_val.str + '' ).replace( /^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, $1 => { return $1.toUpperCase( ) } )
			
		},

	}
	
	return format[ type ]( raw_val )
		
}