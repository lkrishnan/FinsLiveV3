/**
 * Service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 */

workbox.core.setCacheNameDetails( { prefix: "finslive" } );

//Change this value every time before you build
const LATEST_VERSION = "v3.3.2"

self.addEventListener( "install", event => {
	console.log( "Service worker is Installing." );
	
} );

//The activate handler takes care of cleaning up old caches
self.addEventListener( "activate", ( event ) => {
	console.log( `%c ${LATEST_VERSION} `, "background: #ddd; color: #0000ff" )
       
	if( caches ){
		caches.keys( ).then( ( arr ) => {
			  arr.forEach( ( key ) => {
				if( key.indexOf( "finslive-precache" ) < -1 ){
					  caches.delete( key ).then( ( ) => console.log( `%c Cleared ${key}`, "background: #333; color: #ff0000" ) )
				
				}else{
					  caches.open( key ).then( ( cache ) => {
						cache.match( 'version' ).then( ( res ) => {
							  if( !res ){
								cache.put( 'version', new Response( LATEST_VERSION, { status: 200, statusText: LATEST_VERSION } ) )
							  
							}else if( res.statusText !== LATEST_VERSION ){
								caches.delete( key ).then( ( ) => console.log( `%c Cleared Cache ${LATEST_VERSION}`, "background: #333; color: #ff0000" ) )
							  
							}else{
								console.log( `%c Great you have the latest version ${LATEST_VERSION}`, "background: #333; color: #00ff00" )
							
							} 
						
						} )
					  
					} )
				
				}
	  
			} )
		
		} )

	  }

} )

self.addEventListener( "message", ( event ) => {
	if( event.data && event.data.hasOwnProperty( "type" ) ){
		if( event.data.type === "SKIP_WAITING" ){
			self.skipWaiting( );
		}
	}

} );

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
//workbox.core.skipWaiting( )
workbox.core.clientsClaim( )

// The precaching code provided by Workbox.
self.__precacheManifest = [ ].concat( self.__precacheManifest || [ ] )
//workbox.precaching.suppressWarnings( ) // Only used with Vue CLI 3 and Workbox v3.
workbox.precaching.precacheAndRoute( self.__precacheManifest, { } )

// Start of CachFirst Strategy##################
// all the api request which matchs the following pattern will use CacheFirst strategy for caching
workbox.routing.registerRoute(
	new RegExp( '\\.(?:css|js)' ),
	new  workbox.strategies.CacheOnly( )

);

workbox.routing.registerRoute(
	new RegExp('\\.(?:woff|woff2|eot|ttf|png|svg|gif|jpg|jpeg)'),
	new  workbox.strategies.CacheFirst( )

);

/*workbox.routing.registerRoute(
	"https://maps.mecklenburgcountync.gov/api",
	workbox.strategies.networkFirst( {
		networkTimeoutSeconds: 3,
		cacheName: "dirt-api",
		plugins: [
		  new workbox.expiration.Plugin( {
			maxEntries: 50,
			maxAgeSeconds: 5 * 60, // 5 minutes
		  } ),
		],
	
	} )

);*/
// End of CachFirst Strategy####################