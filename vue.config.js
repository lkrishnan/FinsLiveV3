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

	/*configureWebpack: { 
		externals: {
			myDataFileVariable: [ "./resources" ]
		},

	},*/
	
	chainWebpack: config => {
		config
		  .plugin( "html" )
		  .tap( args => {
			  args[ 0 ].title = "FINS Live"	// Replace your title here
			  args[ 0 ].themecolor = "#1B5E20"  
			  return args

		  } )

		/*config
		  	.plugin('preload')
		  	.use(PreloadPlugin, [{
				rel: 'preload',
				//include: 'initial',
				//fileBlacklist: [/\.map$/, /hot-update\.js$/],
				as(entry) {
			  		//if (/\.css$/.test(entry)) return 'style';
			  		if (/\.webp$/.test(entry)) return 'image';
	
			  		return 'script';
				}
		  	}]).after('html')*/
				
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
				  	"src": "./img/icons/16x16.webp",
				  	"sizes": "16x16",
				  	"type": "image/webp"

			  	},{
				  	"src": "./img/icons/32x32.webp",
				  	"sizes": "32x32",
				  	"type": "image/webp"

			  	},{
				  	"src": "./img/icons/48x48.webp",
				  	"sizes": "48x48",
				  	"type": "image/webp"

			  	},{
					"src": "./img/icons/72x72.webp",
					"sizes": "72x72",
					"type": "image/webp"

			  	},{
					"src": "./img/icons/76x76.webp",
					"sizes": "76x76",
					"type": "image/webp"

			  	},{
					"src": "./img/icons/96x96.webp",
					"sizes": "96x96",
					"type": "image/webp"

			  	},{
					"src": "./img/icons/120x120.webp",
					"sizes": "120x120",
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
					"src": "./img/icons/180x180.webp",
					"sizes": "180x180",
					"type": "image/webp"
			  	
				},{
					"src": "./img/icons/192x192.webp",
					"sizes": "192x192",
					"type": "image/webp"
			  
				},{
					"src": "./img/icons/270x270.webp",
					"sizes": "270x270",
					"type": "image/webp"
			  
				},{
					"src": "./img/icons/512x512.webp",
					"sizes": "512x512",
					"type": "image/webp"
			  
				},{
					"src": "./img/icons/48x48-maskable.webp",
					"sizes": "48x48",
					"type": "image/webp",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/72x72-maskable.webp",
					"sizes": "72x72",
					"type": "image/webp",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/96x96-maskable.webp",
					"sizes": "96x96",
					"type": "image/webp",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/144x144-maskable.webp",
					"sizes": "144x144",
					"type": "image/webp",
					"purpose": "maskable"

			  	},{
					"src": "./img/icons/192x192-maskable.webp",
					"sizes": "192x192",
					"type": "image/webp",
					"purpose": "maskable"
			  
				},{
					"src": "./img/icons/512x512-maskable.webp",
					"sizes": "512x512",
					"type": "image/webp",
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