export default function csvMaker( raw_data ){
    // Empty array for storing the values
    let csvRows = [ ]
        
    if( raw_data !== null ){
        // Push Object values into array with comma separation
        csvRows = raw_data
                    .map( row => { 
                        return Object.values( row )
                                    .map( val => ( typeof val === "string" ? val.replace( /,/g, '' ) : val ) )
                                    .join( "," ) 
                    } )
        
        if( raw_data.length > 0 ){
            // Add header
            const headers = Object.keys( raw_data[ 0 ] )
            // Use splice to insert as first element
            csvRows.splice( 0, 0, headers.join( "," ) )

        }
        
    }

    // Return the array joining with new line
    return csvRows.join( "\n" )

}