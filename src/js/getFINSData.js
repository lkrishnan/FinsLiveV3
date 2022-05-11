import axios from "axios"
import store from "../store"
import JSONToURL from "./jsontourl"
import * as txml from "txml"
import { parse, toSeconds } from "iso8601-duration"
import Moment from "moment"

export async function GetAlertData( gauge, info, qrystr ){
	const axios_inst = axios.create( { 
			headers: { 
				"Cache-Control": "max-age=0, no-cache, no-store",
				"Pragma": "no-cache"  
			}
	  	} ),
	  	url = `${store.getters[ "ws" ].fins}v1/query/${gauge}/${info}`,
		response = await axios_inst.get( `${ url }?${ JSONToURL( qrystr ) }` )

	return response.data

}

export async function GetContrailData( qrystr ){
	const _this = this
	try{
		const url = `${ store.getters[ "ws" ].contrail }?${ JSONToURL( qrystr ) }`,
			response = await fetch( url ),
			xml_str = await response.text( )

		if( response.ok ){
			return txml.simplify( txml.parse( xml_str ) ).onerain.response.general.row
				
		}else{
			throw Error( `${response.status} ${response.statusText}` )

		}

	}catch( error){
		console.log( error )
 
	}
	
}

export function getContrailParams( qrystr ){
	let ret_val = { 
		method: "GetSensorData", 
		system_key: "c9254111-e6c8-4689-9171-685eac46496b", 

	}

	if( qrystr.hasOwnProperty( "period" ) ){
		const duration_secs = toSeconds( parse( qrystr.period ) )

		ret_val.data_start = ( qrystr.hasOwnProperty( "enddate" ) ? Moment( qrystr.enddate ) : Moment( ) )
									.subtract( duration_secs, "seconds" )
									.utc( )
									.format( "YYYY-MM-DD HH:mm:ss" )
		ret_val.data_end = ( qrystr.hasOwnProperty( "enddate" ) ? Moment( qrystr.enddate ) : Moment( ) )
									.utc( )
									.format( "YYYY-MM-DD HH:mm:ss" )
					
		
	}else if( qrystr.hasOwnProperty( "startdate" ) & qrystr.hasOwnProperty( "enddate" ) ){
		ret_val.data_start = Moment( qrystr.startdate )
								.utc( )
								.format( "YYYY-MM-DD HH:mm:ss" )
		ret_val.data_end = Moment( qrystr.enddate )
								.utc( )
								.format( "YYYY-MM-DD HH:mm:ss" )

	}

	if( qrystr.hasOwnProperty( "site" ) ){
		ret_val.site_id = qrystr.site

	}
		
	return ret_val

}

export function getAlertParams( qrystr ){
	//calls made to the Alert API
	delete Object.assign( qrystr, { sites: qrystr.site } )[ "site" ]
	
	return qrystr

}

export async function GetNWSDetail( url ){
	const response = await fetch( url )
						  
	return await response.json( )

}

export function GetGaugeInfo( site ){
	const site_info = { 
		"6501": {
			site_id: "6501",
			site_name: "Irwin Creek @ WWTP",
            lat: 35.1977778,
            lon: -80.9044444,
			msl: 590.87,
			ref: [ 
				{ level: 615.9,  label: "Floodstage", color: "#1976D2" }
			],
					
		}, 
		"6502": {
			site_id: "6502",
			site_name: "Little Sugar @ Archdale Drive",
            lat: 35.1480556,
            lon: -80.8577778,
			msl: 563.69,
			ref: [ 
				{ level: 575.7,  label: "Floodstage", color: "#1976D2" }
			]
		},

		"6503": {
			site_id: "6503",
			site_name: "McAlpine @ Sardis",
            lat: 35.1377778,
            lon: -80.7675,
			msl: 552.36,
			ref: [ 
				{ level: 574.3,  label: "Floodstage", color: "#1976D2" },
				{ level: 563.2, label: "Greenway", color: "#006400" },
				{ level: 563.2, label: "Top of Creek Bank", color: "#614126" },
				{ level: 574.8, label: "Sardis Rd. Brigde", color: "#000000" },
			],    
			ref_auth: [
				{ level: 566.7,  label: "Alert", color: "#00FF00" },
				{ level: 568.7, label: "Investigate", color: "#FFA500" },
				{ level: 570.7, label: "Emergency", color: "#FF0000" },
			],
			images: [ "IMG_0481.JPG" ],

		},

		"6504": {
			site_id: "6504",
			site_name: "Briar Creek @ Colony Road",
            lat: 35.1752778,
            lon: -80.8308333,
			msl: 598.02,
			ref: [ 
				{ level: 613,  label: "Floodstage", color: "#1976D2" }
			],
			elevlist: { "idx": 2, "elev": [ 608, 610.5, 612.51, 613.87, 614.62, 615.11, 616.38 ] },
		},

		"6505": {
			site_id: "6505",
			site_name: "McAlpine @ WWTP",
            lat: 35.0666667,
            lon: -80.87,
			msl: 515.51,
			ref: [ 
				{ level: 533.5,  label: "Floodstage", color: "#1976D2" }
			],
			elevlist: { "idx": 3, "elev": [ 523.67, 526.44, 528.3, 530.72, 532.45, 534.08, 538.64 ] },
			
		},

		"6506": {
			site_id: "6506",
			site_name: "Long Creek @ Paw Creek",
            lat: 35.3286111,
            lon: -80.9097222,
			msl: 647.69,
			ref: [ 
				{ level: 661.2,  label: "Floodstage", color: "#1976D2" }
			],
			
		},

		"6507": {
			site_id: "6507",
			site_name: "Sugar Creek @ NC51 Pineville",
            lat: 35.0908333,
            lon: -80.8994444,
			msl: 520.95,
			ref: [ 
				{ level: 539,  label: "Floodstage", color: "#1976D2" },
				{ level: 530.2,  label: "Top of Creek Bank", color: "#614126" },
				{ level: 532.6,  label: "Access Field", color: "#98FB98" },
				{ level: 539.1,  label: "Main St. Brigde", color: "#000000" }

			],
			ref_auth: [
				{ level: 527.1, label: "Alert", color: "#00FF00" },
				{ level: 530.1, label: "Investigate", color: "#FFA500" },
				{ level: 533.1, label: "Emergency", color: "#FF0000" },

			],
			images: [ "IMG_0484.JPG", "IMG_0486.JPG" ],
			
		},

		"6508": {
			site_id: "6508",
			site_name: "Paw Creek @ Wilkinson Blvd",
            lat: 35.2402778,
            lon: -80.9744444,
            msl: 567.97,
            ref: [ 
				{ level: 580.5,  label: "Floodstage", color: "#1976D2" },
				
			],
			ref_auth: [
				{ level: 527.1, label: "Alert", color: "#00FF00" },
				{ level: 530.1, label: "Investigate", color: "#FFA500" },
				{ level: 533.1, label: "Emergency", color: "#FF0000" },
				
			],

        },

        "6509": {
			site_id: "6509",
			site_name: "Mallard Creek @ Harrisburg",
            lat: 35.3327778,
            lon: -80.7158333,
            msl: 568.4,
            ref: [ 
				{ level: 580.4,  label: "Floodstage", color: "#1976D2" }, 

			],
			ref_auth: [
				{ level: 582.6, label: "Alert", color: "#00FF00" },
				{ level: 584.6, label: "Investigate", color: "#FFA500" },
				{ level: 586.6, label: "Emergency", color: "#FF0000" },

			],
			images: [ "IMG_0462.JPG", "IMG_0463.JPG" ],
           
        },

		"6510": {
			site_id: "6510",
			site_name: "Little Sugar @ Medical Center",
            lat: 35.2036111,
            lon: -80.8369444,
            msl: 612.82,
            ref: [ 
				{ level: 626.3,  label: "Floodstage", color: "#1976D2" }, 
				{ level: 617.3, label: "Greenway", color: "#006400" },
                { level: 623.0, label: "Top of Creek Bank", color: "#614126" },
                { level: 626.7, label: "Parking Lot (downstream)", color: "#000000" }

			],
			ref_auth: [
				{ level: 623.8, label: "Alert", color: "#00FF00" },
				{ level: 625.8, label: "Investigate", color: "#FFA500" },
				{ level: 627.8, label: "Emergency", color: "#FF0000" },

			],
			images: [ "IMG_0474.JPG", "IMG_0475.JPG", "IMG_0476.JPG" ],
           
        },

		"6511": {
			site_id: "6511",
			site_name: "Little Hope @ Seneca Place",
            lat: 35.1644444,
            lon: -80.8530556,
            msl: 597.32,
			ref: [ 
				{ level: 606.8,  label: "Floodstage", color: "#1976D2" }, 
				{ level: 606.9, label: "Top of Creek Bank", color: "#614126" },
                { level: 610.8, label: "Mockingbird Ln Bridge", color: "#000000" },
                
			],
			images: [ "IMG_0488.JPG", "IMG_0489.JPG" ],

        },

        "6512": {
			site_id: "6512",
			site_name: "SixMile Creek nr Pineville",
            lat: 35.0102778,
            lon: -80.8283333,
            msl: 574.2,
            ref: [ 
				{ level: 590.2,  label: "Floodstage", color: "#1976D2" }, 
				                
			],
        },

		"6513": {
			site_id: "6513",
			site_name: "McMullen Creek @ Sharon View",
            lat: 35.1408333,
            lon: -80.82,
            msl: 592.31,
			ref: [ 
				{ level: 606.8,  label: "Floodstage", color: "#1976D2" }, 
				{ level: 594.5, label: "Top of Creek Bank", color: "#614126" },
                { level: 610.5, label: "Sharon View Rd Bridge", color: "#000000" },
                
			],
            ref_auth: [
				{ level: 600.7, label: "Alert", color: "#00FF00" },
				{ level: 604.7, label: "Emergency", color: "#FF0000" },

			],
			images: [ "IMG_0482.JPG", "IMG_0483.JPG" ],

        },

		"6514": {
			site_id: "6514",
			site_name: "Little Sugar @ NC51 Pineville",
            lat: 35.0852778,
            lon: -80.8822222,
            msl: 531.94,
			ref: [ 
				{ level: 549.9,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6515": {
			site_id: "6515",
			site_name: "Fourmile Creek @ Elm Lane",
            lat: 35.0769444,
            lon: -80.8225,
			msl: 528.69,
			ref: [ 
				{ level: 545.2,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6516": {
			site_id: "6516",
			site_name: "Briar @ Shamrock Dr",
            lat: 35.2361111,
            lon: -80.7711111,
            msl: 672,
			ref: [ 
				{ level: 677.5,  label: "Floodstage", color: "#1976D2" }, 
				{ level: 674.8, label: "3200 Shamrock Dr. Rec Field", color: "#98FB98" },
                { level: 675.5, label: "Top of Creek Bank", color: "#614126" },
				{ level: 674.8, label: "Shamrock Drive Bridge", color: "#000000" },
                { level: 675.5, label: "Apt Complex Bridge", color: "#800080" },                
			],
			images: [ "IMG_0468.JPG", "IMG_0470.JPG" ],

        },

		"6517": {
			site_id: "6517",
			site_name: "McDowell Creek @ Beatties",
            lat: 35.3897222,
            lon: -80.9211111,
            msl: 644.87,
			ref: [ 
				{ level: 660.9,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6518": {
			site_id: "6518",
			site_name: "Irwin Creek @ Statesville Ave",
            lat: 35.2619444,
            lon: -80.8369444,
            msl: 656.04,
			ref: [ 
				{ level: 665,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6519": {
			site_id: "6519",
            site_name: "Steele Creek @ Carowinds Blvd",
            lat: 35.105,
            lon: -80.9536111,
            msl: 561.83,
			ref: [ 
				{ level: 571.3,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6520": {
			site_id: "6520",
            site_name: "Taggart Creek @ West Blvd",
            lat: 35.2066667,
            lon: -80.9219444,
			msl: 604.27,
			ref: [ 
				{ level: 630.3,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6521": {
			site_id: "6521",
            site_name: "Long Creek @ Rhyne NC",
            lat: 35.3005556,
            lon: -80.9727778,
            msl: 612.45,
            ref: [ 
				{ level: 627.4,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },
        
		"6522": {
			site_id: "6522",
            site_name: "Coffey Creek @ NC49",
            lat: 35.1458333,
            lon: -80.9269444,
            msl: 565.72,
            ref: [ 
				{ level: 578.7,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6523": {
			site_id: "6523",
            site_name: "Irvins @ Sam Newell Road",
            lat: 35.1586111,
            lon: -80.7133333,
            msl: 612.56,
			ref: [ 
				{ level: 625.5,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

        "6524": {
			site_id: "6524",
            site_name: "McAlpine Creek @ Idlewild",
            lat: 35.1758333,
            lon: -80.7191666,
            msl: 613.19,
			ref: [ 
				{ level: 629.7,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

        "6525": {
			site_id: "6525",
            site_name: "Campbell Creek @ Idlewild",
            lat: 35.1866667,
            lon: -80.7366667,
            msl: 663.92,
			ref: [ 
				{ level: 673.5,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6526": {
			site_id: "6526",
            site_name: "Stewart Creek @ State St",
            lat: 35.2402778,
            lon: -80.8683333,
            msl: 630.54,
            ref: [ 
				{ level: 640.54,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6527": {
			site_id: "6527",
            site_name: "Stewart Creek @ Morehead",
            lat: 35.2283333,
            lon: -80.8691667,
            msl: 617.43,
			ref: [ 
				{ level: 631.4,  label: "Floodstage", color: "#1976D2" }, 
				                
			],
            ref_auth: [
				{ level: 625.69, label: "Alert", color: "#00FF00" },
				{ level: 629.14, label: "Investigate", color: "#FFA500" },
				{ level: 633.1, label: "Emergency", color: "#FF0000" },

			],
            images: [ "IMG_1090.JPG" ],
            
        },

		"6528": {
			site_id: "6528",
            site_name: "Goose Creek at 1524 nr Indian Trail",
            lat: 35.1304238,
            lon: -80.6311791,
            msl: 596.58,
            
        },

        "6529": {
			site_id: "6529",
            site_name: "Goose Creek @ SR1525",
            lat: 35.125,
            lon: -80.6027778,
            msl: 549.82,
            
        },

		"6530": {
			site_id: "6530",
            site_name: "Clear Creek @ SR3181",
            lat: 35.2083333,
            lon: -80.58,
            msl: 558.29,
            ref: [ 
				{ level: 573.3,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6531": {
			site_id: "6531",
            site_name: "Gar Creek @ SR2074",
            lat: 35.3613889,
            lon: -80.8975,
            msl: 658.61,
            ref: [ 
				{ level: 680.6,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

        "6532": {
			site_id: "6532",
            site_name: "Beaverdam Creek Shopton",
            lat: 35.1697222,
            lon: -80.9877778,
            msl: 567.71,
            ref: [ 
				{ level: 577.7,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

        "6533": {
			site_id: "6533",
            site_name: "ClarkeCreek nr Harrisburg",
            lat: 35.4141666,
            lon: -80.7519444,
            msl: 608.3,
            ref: [ 
				{ level: 627.33,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

		"6534": {
			site_id: "6534",
            site_name: "Briar Creek bl Edwards B",
            lat: 35.2067222,
            lon: -80.8049722,
            msl: 629.52,
			ref: [ 
				{ level: 644.5,  label: "Floodstage", color: "#1976D2" }, 
				{ level: 636.5,  label: "Top of Creek Bank", color: "#614126" }, 
				{ level: 638.5,  label: "2700 Parking Lot", color: "#000000" }, 
				{ level: 638.8,  label: "Monroe/7th St. Bridge", color: "#800080" }, 
				                
			],
            images: [ "IMG_0471.JPG", "IMG_0473.JPG" ],
            
        },

        "6535": {
			site_id: "6535",
            site_name: "Little Sugar @ 36 St",
            lat: 35.2502778,
            lon: -80.8083333,
            msl: 672.52,
            ref: [ 
				{ level: 683.5,  label: "Floodstage", color: "#1976D2" }, 
				{ level: 636.5,  label: "Top of Creek Bank", color: "#614126" }, 
				{ level: 684.2,  label: "Cullman Ave", color: "#000000" }, 
				{ level: 685.9,  label: "36th St. Bridge", color: "#800080" }, 
				                
			],
            images: [ "IMG_0465.JPG", "IMG_0466.JPG" ],
            
        },

        "6536": {
			site_id: "6536",
            site_name: "W Br Rocky River bl Mth",
            lat: 35.4677777,
            lon: -80.7902777,
            msl: 636.42,
            ref: [ 
				{ level: 663.4,  label: "Floodstage", color: "#1976D2" }, 
				                
			],
            
        },

		"6537": {
			site_id: "6537",
            site_name: "Edwards Branch @ Sheffield",
            lat: 35.2033333,
            lon: -80.7722222,
            msl: 685.18,
			ref: [ 
				{ level: 697.2,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

        "6538": {
			site_id: "6538",
            site_name: "Gum Branch nr Thrift NC",
            lat: 35.29935,
            lon: -80.9464167,
            msl: 630.77,
            ref: [ 
				{ level: 640.8,  label: "Floodstage", color: "#1976D2" }, 
				                
			],

        },

        "6539": {
			site_id: "6539",
            site_name: "Briar Creek @ Providence",
            lat: 35.1827222,
            lon: -80.82,
            msl: 607.52,
			ref: [ 
				{ level: 622.5,  label: "Floodstage", color: "#1976D2" }, 
				{ level: 617.8,  label: "Top of Creek Bank", color: "#614126" }, 
				{ level: 619.4,  label: "Bottom of Briar Creek Access Path", color: "#006400" }, 
				{ level: 628.9,  label: "Providence Road Bridge", color: "#000000" }, 
				                
			],
			ref_auth: [
				{ level: 618.53, label: "Alert", color: "#00FF00" },
				{ level: 619.6, label: "Investigate", color: "#FFA500" },
				{ level: 620.66, label: "Emergency", color: "#FF0000" },

			],
            images: [ "IMG_0477.JPG" ],
            
        },

        "6540": {
			site_id: "6540",
            site_name: "McMullen Creek @ Lincrest",
            lat: 35.1702778,
            lon: -80.7857778,
            msl: 661.8,
			ref: [ 
				{ level: 622.5,  label: "Floodstage", color: "#1976D2" }, 
				{ level: 663.1,  label: "Addison Dr. Bridge", color: "#000000" }, 
				{ level: 664.2,  label: "Top of Creek Bank", color: "#614126" }, 
								                
			],
            ref_auth: [
				{ level: 662.7, label: "Investigate", color: "#FFA500" },
				
			],
            images: [ "IMG_0478.JPG", "IMG_0480.JPG" ],
            
        },

        "6541": {
			site_id: "6541",
            site_name: "Briar Creek @ Independence",
            lat: 35.21083333,
            lon: -80.80008333,
            msl: 635.02,
            ref: [ 
				{ level: 645,  label: "Floodstage", color: "#1976D2" }, 
												                
			],
            
        },

        "6542": {
			site_id: "6542",
            site_name: "Little Sugar @ Hillside",
            lat: 35.17916667,
            lon: -80.84638889,
            msl: 595.41,
			ref: [ 
				{ level: 607.4,  label: "Floodstage", color: "#1976D2" }, 
				{ level: 609.8,  label: "Top of Creek Bank", color: "#614126" }, 
				{ level: 611.8,  label: "Woodlawn St. Bridge", color: "#000000" }, 

			],
            images: [ "IMG_1088.JPG" ],
            
        },

		"6543": {
			site_id: "6543",
            site_name: "Trib to Briar Creek",
            lat: 35.16694444,
            lon: -80.8366667,
            msl: 584.62,
            ref: [ 
				{ level: 595.6,  label: "Floodstage", color: "#1976D2" }, 
												                
			],
            
        },

		"6544": {
			site_id: "6544",
            site_name: "Reedy Creek bl I-485",
            lat: 35.25861111,
            lon: -80.6627778,
            msl: 595.73,
            ref: [ 
				{ level: 608.7,  label: "Floodstage", color: "#1976D2" }, 
												                
			],

        },

		"6545": {
			site_id: "6545",
            site_name: "Tr Briar Creek @ Colony",
            lat: 35.1688888,
            lon: -80.8308333,
            msl: 602.42,
            ref: [ 
				{ level: 622,  label: "Floodstage", color: "#1976D2" }, 
												                
			],

        },

		"6546": {
			site_id: "6546",
            site_name: "McAlpine Creek @ SR2964",
            lat: 35.04083333,
            lon: -80.89166667,
            msl: 496.95,
           
        },

		"6547": {
			site_id: "6547",
            site_name: "Torrence Creek @ Bradford",
            lat: 35.40361111,
            lon: -80.8827778,
            msl: 663.73,
			ref: [ 
				{ level: 679,  label: "Floodstage", color: "#1976D2" }, 
												                
			],

        },

		"6548": {
			site_id: "6548",
            site_name: "McDowell Creek nr Huntersville",
            lat: 35.4072222,
            lon: -80.8905556,
            msl: 659.47,
            ref: [ 
				{ level: 689.5,  label: "Floodstage", color: "#1976D2" }, 
												                
			],

        },

		"6549": {
			site_id: "6549",
            site_name: "Sugar Creek @ Arrowood",
            lat: 35.13962,
            lon: -80.91098,
            msl: 560.05,
            ref: [ 
				{ level: 607.31,  label: "Floodstage", color: "#1976D2" }, 
												                
			],

        },

		"6550": {
			site_id: "6550",
            site_name: "McKee Creek @ SR2804",
            lat: 35.25388889,
            lon: -80.64805556,
            msl: 597.09,
            ref: [ 
				{ level: 611.1,  label: "Floodstage", color: "#1976D2" }, 
												                
			],

        },

		"6551": {
			site_id: "6551",
            site_name: "McAlpine Creek @ Colony Rd",
            lat: 35.11814,
            lon: -80.8069,
            msl: 534.76,
            ref: [ 
				{ level: 566.5,  label: "Floodstage", color: "#1976D2" }, 
												                
			],
        },

		"6552": {
			site_id: "6552",
            site_name: "Back Creek @ SR1173",
            lat: 35.30916667,
            lon: -80.6736111,
            msl: 591.13,
            
        },

        "6553": {
			site_id: "6553",
            site_name: "Reedy Creek @ SR2803",
            lat: 35.256388,
            lon: -80.700555,
            msl: 637.45,
            
        },

		"002": { 
			site_id: "002",
            site_name: "Mallard Creek at Mallard Creek Greenway FMB31",
            lat: 35.3254013,
            lon: -80.7823029,
            msl: 643.22,
            
        },
        "003": {
			site_id: "003",
            site_name: "Polk Ditch at Canvasback Dr on foot bridge FMB26",
            lat: 35.1002007,
            lon: -80.9641037 ,
            msl: 564.31,
             
        },
        "004": { 
            msl: 653.66,
             
        },
        "005": { 
			site_id: "005",
            site_name: "Edwards Branch at Commonwealth Ave. FMB63",
            lat: 35.207901,
            lon: -80.7921982,
            msl: 568.14,
             
        },	
        "007": {
			site_id: "007",
            site_name: "Irwin Creek at Andrill Terrace FMB15",
            lat: 35.2492981,
            lon: -80.8468018,
            msl: 608.89,
             
        },
		"008": { 
			site_id: "0008",
            site_name: "Briar Creek @ Park Rd FMP1",
            lat: 35.1581001,
            lon: -80.8487015,
			msl: -1,
		},
        "013": {
			site_id: "013",
            site_name: "Paw Creek at Toddville Rd FMB10",
            lat: 35.2564011,
            lon: -80.9302979, 
            msl: 654.77,
             
        },
		"015": {
			site_id: "015",
            site_name: "Rapid Deploy FMB079",
            lat: 35.0301018,
            lon: -80.7926025,
			msl: -1
		},
        "019": { 
            site_id: "019",
            site_name: "McAlpine Creek at Pineville-Matthews Rd. FMB84",
            lat: 35.0852013,
            lon: -80.8339996,
			msl: 646.77,
            
        },
		"021": {
			site_id: "021",
            site_name: "Stewart Creek at W Trade St. FMB13",
            lat: 35.2504005,
            lon: -80.8663025,

		},
		"022": { 
			site_id: "022",
            site_name: "Mallard Creek at W Sugar Creek Rd. FMB30",
            lat: 35.328701,
            lon: -80.8013992,
			msl: 702.46,

        },
        "023": { 
            msl: 610.89,
            ref: [ ],
            refdesc: [ ],
            series: {
                0: { color: "#99CDFF" },
                1: { color: "#0000FF" }
            } 
        },
        "024": { 
            msl: 723.4,
            ref: [ ],
            refdesc: [ ],
            series: {
                0: { color: "#99CDFF" },
                1: { color: "#0000FF" }
            } 
        },
        "026": { 
			site_id: "026",
			site_name: "Little Sugar Creek E 18th St. FMB42",
			lat: 35.2360001,
			lon: -80.8265991,    
			msl: 579.72,
             
        },
        "028":{
			site_id: "028",
			site_name: "Briar Creek at Country Club Dr. FMB59",
			lat: 35.2299995,
			lon: -80.7823029

		},
        "029": { 
			site_id: "029",
            site_name: "McMullen Creek at Johnny Cake Ln. FMP73",
            lat: 35.1333008,
            lon: -80.8231964,
            msl: 680.19,
             
        },
        "031": { 
			site_id: "031",
            site_name: "Irwin Creek at W Oaklawn Cemetery FMB14",
            lat: 35.2505989,
            lon: -80.8452988,
            msl: 641.02,
             
        },
        "033": { 
			site_id: "033",
            site_name: "Irvins Creek at Lebanon Rd. FMB88",
            lat: 35.1660995,
            lon: -80.6897964,
        	msl: 647.67,
            
        },
        "035": { 
            site_id: "035",
            site_name: "Stewart Creek at Norwood Dr. FMB17",
            lat: 35.2487984,
            lon: -80.8724976,
			msl: 673.61,

        },
        "036": { 
			site_id: "036",
            site_name: "Derita Branch at Craighead Rd. FMB38",
            lat: 35.264801,
            lon: -80.8048019,
            msl: 572.24,
            
        },
        "039": { 
			site_id: "039",
            site_name: "Briar Creek at Ruth Dr FMB56",
            lat: 35.2480011,
            lon: -80.7593002,
            msl: 691.93,
             
        },
        "040": { 
			site_id: "040",
            site_name: "McIntyre Creek Beatties Ford Rd. FMB9",
            lat: 35.3195,
            lon: -80.8647995,
            msl: 650.0,
            
        },
        "041": { 
			site_id: "041",
            site_name: "McMullen Creek at Quail Hollow Rd. FMB98",
            lat: 35.1170998,
            lon: -80.8286972,
            msl: 618.11,
            
        },
        "042": { 
            msl: 610.91,
            ref: [ ],
            refdesc: [ ],
            series: {
                0: { color: "#99CDFF" },
                1: { color: "#0000FF" }
            } 
        },
		"043": {
			site_id: "043",
            site_name: "Stewart Creek at Rozzelles Ferry Rd. FMB16",
            lat: 35.2475014,
            lon: -80.8683014,
			msl: -1

		},
        "044": { 
			site_id: "044",
            site_name: "Little Sugar Creek at Wellingford St. FMP37",
            lat: 35.2591019,
            lon: -80.7917023,
            msl: 700.86,
            
        },
        "045": { 
			site_id: "045",
            site_name: "Little Sugar Creek at 6317 Birmingham Dr. FMB51",
            lat: 35.1390991,
            lon: -80.8613968,
            msl: 653.46,
            
        },
        "048": { 
            site_id: "048",
            site_name: "Briar Creek at Masonic Dr. FMB62",
            lat: 35.2184982,
            lon: -80.7954025,
			msl: 642.51,
            
        },
		"049": { 
            site_id: "049",
            site_name: "McMullen Creek @ Providence Rd FMB3",
            lat: 35.1599007,
            lon: -80.7994995,
			msl: -1,
            
        },
        "054": { 
			site_id: "054",
            site_name: "Catawba River @ Riverhaven Dr. FMB101",
            lat: 35.331265,
            lon: -80.980161,
            msl: -1,
            
        },
        "055": { 
            msl: 612.75,
            ref: [ ],
            refdesc: [ ],
            series: {
                0: { color: "#99CDFF" },
                1: { color: "#0000FF" }
            } 
        },
		"056": {
			site_id: "056",
			site_name: "Briar Creek at Twiford Pl. FMB68",
			lat: 35.1874008,
			lon: -80.8158035,

		},
        "058": { 
            site_id: "058",
            site_name: "Mallard Creek at David Taylor Dr. FMB32",
            lat: 35.3212013,
            lon: -80.7557983,
			msl: 580.29,
            
        },
        "061": {
			site_id: "061",
            site_name: "Little Sugar Creek at Brandywine Rd. FMB46",
            lat: 35.1725998,
            lon: -80.8468018, 
            msl: 592.99,
             
        },
        "062": { 
			site_id: "062",
            site_name: "Little Hope Creek at E Woodlawn Rd. FMB47",
            lat: 35.1722984,
            lon: -80.8555984,
            msl: 570.6,
            
        },
        "063": { 
			site_id: "063",
            site_name: "McMullen Creek at McMullen Creek Greenway at 485 FMB76",
            lat: 35.07469,
            lon: -80.86386,
			msl: 524.75,
             
        },
        "070": {
			site_id: "070",
            site_name: "Briar Creek @ Galway Dr FMB100",
            lat: 35.2411003,
            lon: -80.7584991, 
            msl: 671.41,
             
        },
        "071": { 
			site_id: "071",
            site_name: "Briar Creek at Perth Crt. FMB071",
            lat: 35.2444992,
            lon: -80.7498016,
            msl: 713.48,
        },
        "072": { 
            site_id: "072",
            site_name: "Irwin Creek at Scottsdale Rd. FMB22",
            lat: 35.1982002,
            lon: -80.9005966,
			msl: 604.96,
            
        },
        "073": { 
            site_id: "073",
            site_name: "Torrence Creek at Wynfield Creek Pkwy FMB6",
            lat: 35.4118004,
            lon: -80.8795013,
			msl: 678.84,
           
        },
        "075": { 
			site_id: "075",
            site_name: "Little Sugar Creek at Alexander St. Park Foot Bridge FMP43",
            lat: 35.2274017,
            lon: -80.8272018,
            msl: 553.11,
           
        },
        "076": { 
			site_id: "076",
            site_name: "Kings Branch at Arrowood Rd. FMB54",
            lat: 35.135601,
            lon: -80.8861008,
            msl: 534.9,
             
        },
        "082": {
			site_id: "082",
            site_name: "Catawba River Trib at Riverside Dr. FMB062",
            lat: 35.3134995,
            lon: -80.9923019,

		},
		"083": {
			site_id: "083",
            site_name: "McMullen Creek Trib@ Addison Rd FMB96",
            lat: 35.1724014,
            lon: -80.7869034,

		},
        "085": { 
			site_id: "085",
            site_name: "Mallard Creek at Mallard Creek WWTP FMB34",
            lat: 35.3316002,
            lon: -80.6987991,
            msl: 565.02,
            
        },
		"086": { 
			site_id: "086",
            site_name: "Flat Branch at Ardrey Kell Rd. FMB92",
            lat: 35.0331993,
            lon: -80.8031006,
            
        },
        "087": { 
			site_id: "087",
            site_name: "Irvins Creek at Sam Newell Rd. FMB94",
            lat: 35.1343994,
            lon: -80.717598,
			msl: 634.92,
            
        },
        "088": { 
			site_id: "088",
            site_name: "Four Mile Creek at E Charles St. FMB95",
            lat: 35.1082001,
            lon: -80.7064972,
            msl: 673.57,

        },
		"090": {
			site_id: "090",
            site_name: "Sixmile Creek Trib at Providence Country Club Dr. FMB090",
            lat: 35.0393982,
            lon: -80.7858963,

		},
        "092": { 
			site_id: "092",
            site_name: "Little Sugar Creek at Mellow Dr. FMP36",
            lat: 35.2612,
            lon: -80.7878036,
            msl: 702.92,
            
        },
		"0241": {
			site_id: "0241",
			site_name: "McAlpine Creek at Carmel Country Club FMP83",
			lat: 35.1044998,
			lon: -80.8171005,
			
		},
		"0242": {
			site_id: "0242",
			site_name: "McMullen Creek Tributary FMP70",
			lat: 35.1785011,
			lon: -80.7862015,

		},
		"0243": {
			site_id: "0243",
			site_name: "Briar Creek at Randolph Rd. FMP67",
			lat: 35.199501,
			lon: -80.8126984,
		
		},
		"0244": {
			site_id: "0244",
			site_name: "Little Sugar Creek at Sharon Rd Greenway FMP52",
			lat: 35.1184006,
			lon: -80.8679962,
			
		},
		"0245": {
			site_id: "0245",
			site_name: "Stewart Creek at Southwest Blvd. FMB12",
			lat: 35.2639999,
			lon: -80.8686981
			
		},
		"0247": {
			site_id: "0247",
			site_name: "Sugar Creek at Edgegreen Dr. FMP23",
			lat: 35.1595001,
			lon: -80.9122009,
			
		},
		"0248": {
			site_id: "0248",
			site_name: "Irvins Creek at Apple Creek Dr. FMP97",
			lat: 35.1735001,
			lon: -80.6723022,
			
		},
		"0249": {
			site_id: "0249",
			site_name: "Toby Creek UNCC Campus FMP33",
			lat: 35.3065987,
			lon: -80.7387009,
			
		},
		"0250": {
			site_id: "0250",
			site_name: "Walker Branch at Smith Rd. FMP27",
			lat: 35.0970001,
			lon: -80.9720001,
		
		},
		"0251": {
			site_id: "0251",
			site_name: "McMullen Creek at Mountainbrook Rd. FMP72",
			lat: 35.1352997,
			lon: -80.8210983,
			
		},
		"0252": {
			"site_id": "0252",
			"site_name": "Four Mile Creek at Reverdy Lane FMP89",
			"lat": 35.097599,
			"lon": -80.7550964,
			
		},
		"0253": {
			site_id: "0253",
			site_name: "Stewart Creek at Barlowe Rd. FMP11",
			lat: 35.2559013,
			lon: -80.884903,
			
		},
		"0254": {
			site_id: "0254",
			site_name: "Stewart Creek at Parkway Ave. FMP18",
			lat: 35.2596016,
			lon: -80.786499,
			
		},
		"0255": {
			site_id: "0255",
			site_name: "Briar Creek at Kildare Dr FMP57",
			lat: 35.2438011,
			lon: -80.7650986,

		},	
		"0256": {
			site_id: "0256",
			site_name: "Kings Branch at Lexington Green Apartments FMB49",
			lat: 35.1517982,
			lon: -80.8904037
			
		},
		"0257": {
			site_id: "0257",
			site_name: "Little Sugar Creek @ E 4th St FMP5",
			lat: 35.2172012,
			lon: -80.8339996,
			
		},
		"0258": {
			site_id: "0258",
			site_name: "Little Sugar Creek @ Park Rd FMP2",
			lat: 35.16003,
			lon: -80.848805,
			
		},
		"0259": {
			site_id: "0259",
			site_name: "McMullen Creek @ Farivew Rd FMP4",
			lat: 35.1475983,
			lon: -80.811203,
			
		},
		
		"0260": {
			site_id: "0260",
			site_name: "Steele Creek at Westinghouse Blvd. FMP25",
			lat: 35.1321983,
			lon: -80.956398,
			
		},
		"0261": {
			site_id: "0261",
			site_name: "Little Hope Creek Tributary 1 at Bradbury Rd. FMP48",
			lat: 35.1693001,
			lon: -80.8594971,
			
		},
		"0262": {
			site_id: "0262",
			site_name: "McAlpine Creek at Old Providence Rd. FMP81",
			lat: 35.125,
			lon: -80.7886963,

		},
		"0263": {
			site_id: "0263",
			site_name: "McMullen Creek at Covey Hollow Rd. FMP75",
			lat: 35.1012993,
			lon: -80.8468018,
			
		},
        

		
	}
	
	return ( site_info.hasOwnProperty( site ) ? site_info[ site ] : null )

}