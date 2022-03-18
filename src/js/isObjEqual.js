export default function isObjEqual( obj1, obj2 ){
	const props1 = Object.getOwnPropertyNames( obj1 ),
		props2 = Object.getOwnPropertyNames( obj2 ),
		isObject = object => object != null && typeof object === "object"

		if( props1.length != props2.length ){
			return false
		}

		for( let i = 0; i < props1.length; i++ ){
			let val1 = obj1[ props1[ i ] ],
				val2 = obj2[ props1[ i ] ],
				isObjects = isObject( val1 ) && isObject( val2 )

			if( isObjects && !isEqual( val1, val2 ) || !isObjects && val1 !== val2 ){
				return false

			}

		}

		return true
	
}