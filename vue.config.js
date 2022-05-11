module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/finslive/" : "/",
	
	css: {
	  sourceMap: true,
  	},
  	
	productionSourceMap: false,
  	
	transpileDependencies: [
	  	"vuetify"
	],
	
	chainWebpack: config => {
		config
		  .plugin( "html" )
		  .tap( args => {
			  args[ 0 ].title = "FINS Live"	// Replace your title here
			  args[ 0 ].themecolor = "#1B5E20"  
			  return args

		  } )
				
	},

	pwa: {
		manifestOptions: {
			name: "Flood Information Notification System Live",
			short_name: "FINS Live",
			theme_color: "#1B5E20",
			background_color: "#000000",
			start_url: ".",
			display:"standalone",
		  	icons: [
			  	{
				  	"src": "./img/icons/16x16.png",
				  	"sizes": "16x16",
				  	"type": "image/png"

			  	},{
				  	"src": "./img/icons/32x32.png",
				  	"sizes": "32x32",
				  	"type": "image/png"

			  	},{
				  	"src": "./img/icons/48x48.png",
				  	"sizes": "48x48",
				  	"type": "image/png"

			  	},{
					"src": "./img/icons/72x72.png",
					"sizes": "72x72",
					"type": "image/png"

			  	},{
					"src": "./img/icons/76x76.png",
					"sizes": "76x76",
					"type": "image/png"

			  	},{
					"src": "./img/icons/96x96.png",
					"sizes": "96x96",
					"type": "image/png"

			  	},{
					"src": "./img/icons/120x120.png",
					"sizes": "120x120",
					"type": "image/png"
			  
				},{
					"src": "./img/icons/144x144.png",
					"sizes": "144x144",
					"type": "image/png"
			  
				},{
					"src": "./img/icons/152x152.png",
					"sizes": "152x152",
					"type": "image/png"
			  	
				},{
					"src": "./img/icons/180x180.png",
					"sizes": "180x180",
					"type": "image/png"
			  	
				},{
					"src": "./img/icons/192x192.png",
					"sizes": "192x192",
					"type": "image/png"
			  
				},{
					"src": "./img/icons/270x270.png",
					"sizes": "270x270",
					"type": "image/png"
			  
				},{
					"src": "./img/icons/512x512.png",
					"sizes": "512x512",
					"type": "image/png"
			  
				},{
					"src": "./img/icons/48x48-maskable.png",
					"sizes": "48x48",
					"type": "image/png",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/72x72-maskable.png",
					"sizes": "72x72",
					"type": "image/png",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/96x96-maskable.png",
					"sizes": "96x96",
					"type": "image/png",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/144x144-maskable.png",
					"sizes": "144x144",
					"type": "image/png",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/192x192-maskable.png",
					"sizes": "192x192",
					"type": "image/png",
					"purpose": "maskable"
			  
				},{
					"src": "./img/icons/512x512-maskable.png",
					"sizes": "512x512",
					"type": "image/png",
					"purpose": "maskable"

			  	}
		  
		  	]
  
	  	},
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
		  	swSrc: "service-worker.js",
			exclude: [ /\.htaccess$/, /web\.config$/, /\.(?:scss)$/ ]
		
	  	},
	
  	},
  	
}