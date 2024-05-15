export default function validateString( str, type ){
	const validator = {
		isStreetName: str => {
			return ( str.match( /^(\d*\s*[A-Z]+)$/ ) ? true : false )
			
		},
		isNumeric: str => {
			return ( str.match( /^\d+$/ ) ? true : false )
		
		},

		isTaxPIDAtleast7: str => {
			return ( ( str.match( /^[0-2]\d{6}[0-9]?([A-Z])?$/ ) || str.match( /^[0-2]\d{2}-\d{3}-\d{1}[0-9]?([A-Z])?$/ ) ) ? true : false ) 
		},

		isCNumber: str => {
			return ( str.match( /^[0-2]\d{4}(C|c|)\d{2}$/ ) ? true : false )

		},

		isTaxPID: str => {
			return ( str.match( /^[0-2]\d{7}([A-Z])?$/ ) ? true : false )  

		},

		isGroundPID: str => {
			return ( str.match( /^[0-2]\d{4}(A|C|I|L|M|N|R|S|W|X|[0-9])\d{2}$/ ) ? true : false )
		
		},

		isIntersection: str => {
			//return ( str.match( /^\s*\w+(\s*\w+\s*)*(AND|&)\s*\w+(\s*\w+\s*)*$/ ) ? true : false )
			return ( str.match( /^(\w+\s*){3}(AND|&)(\s*\w*)$/ ) ? true : false )

		},

		isOwnerName: str => {
			return ( str.match( /^[A-Za-z]+\s*(,)\s*[A-Z]+$/ ) ? true : false )

		},
				
		isEmail: str => {
			return ( str.match( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ) ? true : false )
		
		},

		// Checks a string to see if it in a valid date format of (D)D/(M)M/(YY)YY and returns true/false
		isDate: str => {
			// format D(D)/M(M)/(YY)YY
			const dateFormat = /^\d{1,4}[\.|\/|-]\d{1,2}[\.|\/|-]\d{1,4}$/

			if( dateFormat.test( str ) ){
				// remove any leading zeros from date values
				str = str.replace( /0*(\d*)/gi, "$1" )
				let dateArray = str.split( /[\.|\/|-]/ )

				// correct month value
				dateArray[ 1 ] = dateArray[ 1 ] - 1

				// correct year value
				if( dateArray[ 2 ].length < 4 ){
					// correct year value
					dateArray[ 2 ] = ( parseInt( dateArray[ 2 ] ) < 50 ) ? 2000 + parseInt( dateArray[ 2 ] ) : 1900 + parseInt( dateArray[ 2 ] )

				}

				const testDate = new Date( dateArray[ 2 ], dateArray[ 1 ], dateArray[ 0 ] )
				
				if( testDate.getDate( ) != dateArray[ 0 ] || testDate.getMonth( ) != dateArray[ 1 ] || testDate.getFullYear( ) != dateArray[ 2 ] ){
					return false

				}else{
					return true

				}
				
			}else{
				return false

			}

		},
    
		isCountyYear: str => {
    		let retval = false
    
    		const yr = parseInt( str )
        
    		if( !isNaN( yr ) && ( yr >= 0 && yr <= new Date( ).getFullYear( ) ) ){
        		retval = true

    		}
    
    		return retval

		},
    
		isLatLon: str => {
			//[{"xmin":"-81.0562802910356","ymin":"34.9991000096838"}]
			//[{"xmax":"-80.5567016747919","ymax":"35.5560858870075"}]
				
			let retval = false,
				coords = str.split( "," );
					
			for( var i = 0; i < coords.length; i++ ){
				coords[ i ] = parseFloat( coords [ i ].trim( ) );
			}	
			
			if( ( ( coords[ 0 ] >= -81.0562802910356 && coords[ 0 ] <= -80.5567016747919 ) && ( coords[ 1 ] >= 34.9991000096838 && coords[ 1 ] <= 35.5560858870075 ) ) || 
					( ( coords[ 1 ] >= -81.0562802910356 && coords[ 1 ] <= -80.5567016747919 ) && ( coords[ 0 ] >= 34.9991000096838 && coords[ 0 ] <= 35.5560858870075 ) ) ){
				retval = true

			}
				
			return retval
			
		},
    
		isStatePlane: str => {
			//[{"xmin":"1384251.24585599","ymin":"460978.995855999"}]
			//[{"xmax":"1537013.50075424","ymax":"660946.333333335"}]
							
			let retval = false,
				coords = str.split( "," );
					
			for( var i = 0; i < coords.length; i++ ){
				coords[ i ] = parseInt( coords [ i ].trim( ) )

			}	

			if( ( ( coords[ 0 ] >= 1384251 && coords[ 0 ] <= 1537013 ) && ( coords[ 1 ] >= 460978 && coords[ 1 ] <= 660946 ) ) || 
					( ( coords[ 1 ] >= 1384251 && coords[ 1 ] <= 1537013 ) && ( coords[ 0 ] >= 460978 && coords[ 0 ] <= 660946 ) ) ){
				retval = true

			} 
				
			return retval
			
		},

		isRainGauge: str => {
			return ( str.match( /^[4][5]\d{2}?$/ ) ? true : false ) 

		},

		isStageGauge: str => {
			return ( str.match( /^[6][5]\d{2}?$/ ) ? true : false ) 

		},

		isLCSGauge: str => {
			return ( str.match( /^\d{3}|[1][0-1]\d{2}?$/ ) ? true : false ) 

		},

		isLakeGauge: str => {
			return ( str.match( /^[8][5][9]\d{1}?$/ ) ? true : false ) 

		},

		isCamera: str => {
			return ( str.match( /(^CAM[1-9][0-4]?$|\bM([C|Y]|OBILE)|BD2A*|WBRR)/ ) ? true : false ) 

		},

		isISO8601: str => {
			return ( str.match( /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/ ) ? true : false )
			
		}
		
	}
	
	return validator[ type ]( str )

}