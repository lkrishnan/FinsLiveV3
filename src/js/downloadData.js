export default function downloadData( data, filename ){
    // Creating a Blob for having a csv file format
   // and passing the data with type
   const blob = new Blob( [ data ], { type: "text/csv" } )

   // Creating an object for downloading url
   const url = window.URL.createObjectURL( blob )

   // Creating an anchor(a) tag of HTML
   const a = document.createElement( "a" )

   // Passing the blob downloading url
   a.setAttribute( "href", url )

   // Setting the anchor tag attribute for downloading
   // and passing the download file name
   a.setAttribute( "download", filename ) 

   // Performing a download with click
   a.click( )

}