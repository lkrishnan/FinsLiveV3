//const PreloadPlugin = require('@vue/preload-webpack-plugin')

module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
	
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
					"src": "./img/icons/72x72.webp",
					"sizes": "72x72",
					"type": "image/webp"

			  	},{
					"src": "./img/icons/96x96.webp",
					"sizes": "96x96",
					"type": "image/webp"

			  	},{
					"src": "./img/icons/128x128.webp",
					"sizes": "128x128",
					"type": "image/webp"
			  
				},{
					"src": "./img/icons/144x144.webp",
					"sizes": "144x144",
					"type": "image/webp"
			  
				},{
					"src": "./img/icons/152x152.webp",
					"sizes": "152x152",
					"type": "image/webp"
			  	
				},{
					"src": "./img/icons/192x192.webp",
					"sizes": "192x192",
					"type": "image/webp"
			  
				},{
					"src": "./img/icons/384x384.webp",
					"sizes": "384x384",
					"type": "image/webp"
			  
				},{
					"src": "./img/icons/512x512.webp",
					"sizes": "512x512",
					"type": "image/webp"
			  
				},{
					"src": "./img/icons/maskable_icon_x48.webp",
					"sizes": "48x48",
					"type": "image/webp",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/maskable_icon_x72.webp",
					"sizes": "72x72",
					"type": "image/webp",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/maskable_icon_x96.webp",
					"sizes": "96x96",
					"type": "image/webp",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/maskable_icon_x128.webp",
					"sizes": "128x128",
					"type": "image/webp",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/maskable_icon_x192.webp",
					"sizes": "192x192",
					"type": "image/webp",
					"purpose": "maskable"
			  
				},{
					"src": "./img/icons/maskable_icon_x384.webp",
					"sizes": "384x384",
					"type": "image/webp",
					"purpose": "maskable"
			  
				},{
					"src": "./img/icons/maskable_icon_x512.webp",
					"sizes": "512x512",
					"type": "image/webp",
					"purpose": "maskable"

			  	}
		  
		  	]
  
	  	},
		workboxOptions: {
			exclude: [ /\.htaccess$/, /web\.config$/, /\.(?:scss)$/, /\.(?:json)$/ ]
		
	  	},
	
  	},
  	
}