import DetailsIcon from "../assets/file-table-box-outline.svg"
import imageIcon from "../assets/image.svg"
import { FormatDate } from "../js/vanillaMoment"

export function GetStrmXingTemplate( ){
	return {
		title: "{strm_name} CROSSING {xing_desc}",
		outFields: [ "*" ],
		actions: [ 
			{
				title: "View Photos",
				id: "strmxing_photos",
				image: imageIcon,
			} 

		]
			
	}
	
}

export function GetRARRBldgTemplate( ){
	return {
		title: "Building: {Address}",
		outFields: [ "Address", "PID", "FEMAStrm", "FldCatgry" ],
		content: [ {
			type: "fields",
			fieldInfos: [
				{
				  	fieldName: "Address",
				  	label: "Property Address"

				}, {
				  	fieldName: "PID",
				  	label: "Parcel ID"

				},{
				  	fieldName: "FEMAStrm",
				  	label: "Creek"

				}, {
				  	fieldName: "FldCatgry",
				  	label: "Flood Category"

				}
			]

		} ],
		
	}
	
}

export function GetRARRRoadTemplate( ){
	return {
		title: feature => { 
			return `Road: ${Math.min( feature.graphic.attributes.ll_add, feature.graphic.attributes.lr_add)} - ${Math.max( feature.graphic.attributes.ul_add, feature.graphic.attributes.ur_add)} ${feature.graphic.attributes.wholestnam}`
			
		},
		outFields: [ "UseCtgry", "FldCatgry", "AvgFldDpth", "MaxFldDpth", "ll_add", "lr_add", "ul_add", "ur_add", "wholestnam" ],
		content: [ {
			type: "fields",
			fieldInfos: [
				{
				  	fieldName: "UseCtgry",
				  	label: "Road Class"

				}, {
				  	fieldName: "FldCatgry",
				  	label: "Flood Category"

				}, {
					fieldName: "AvgFldDpth",
					label: "Mean Depth"

			  	}, {
					fieldName: "MaxFldDpth",
					label: "Max Depth"

		  		}
			]

		} ],
		
	}
	
}

export function GetRARRStrmXingTemplate( ){
	return {
		title: "Crossing: {XingDesc}",
		outFields: [ "XingDesc", "XingClass", "XingType", "OvtpDpth", "FldCatgry" ],
		content: [ {
			type: "fields",
			fieldInfos: [
				{
				  	fieldName: "XingClass",
				  	label: "Crossing Class"

				}, {
				  	fieldName: "XingType",
				  	label: "Crossing Type"

				},{
				  	fieldName: "OvtpDpth",
				  	label: "Flood Depth"

				}, {
				  	fieldName: "FldCatgry",
				  	label: "Flood Category"

				}
			]

		} ],
		
	}
	
}

export function GetNWSWarnTemplate( ){
	return {
		title: "{prod_type}",
		outFields: [ "*" ],
		actions: [ 
			{
				title: "Warning Details",
				id: "warn_detail",
				image: DetailsIcon,
			} 

		]
	
	}
	
}

export function GetNWSWatchTemplate( ){
	return {
		title: feature => { 
			return `<h2>${feature.graphic.attributes.prod_type}</h2><div class='text-subtitle-2 font-weight-regular pt-2'>${FormatDate( "M/D/YYYY h:mmA", feature.graphic.attributes.issuance )} through ${FormatDate( "M/D/YYYY h:mmA", feature.graphic.attributes.expiration )}</div>` 

		},
		outFields: [ "*" ],
		actions: [ 
			{
				title: "Watch Details",
				id: "watch_detail",
				image: DetailsIcon,

			} 

		]
			
	}
	
}