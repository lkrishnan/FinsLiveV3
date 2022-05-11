import NoReadingIcon from "../assets/noreading.png"
import Moment from "moment"

export function GetStrmXingTemplate( ){
	return {
				title: "{strm_name} CROSSING {xing_desc}",
				outFields: [ "*" ],
				actions: [ 
					{
						title: "View Photos",
						id: "strmxing_photos",
						image: NoReadingIcon
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
		actions: [ 
			{
				title: "View attr",
				id: "rarr",
				image: NoReadingIcon
			} 

		]

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
		actions: [ 
			{
				title: "View attr",
				id: "rarr",
				image: NoReadingIcon
			} 

		]

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
		actions: [ 
			{
				title: "View attr",
				id: "rarr",
				image: NoReadingIcon
			} 

		]

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
						image: NoReadingIcon
					} 

				]
					
				

			}
	

}

export function GetNWSWatchTemplate( ){
	return {
				title: feature => { 
					return `<h2>${feature.graphic.attributes.prod_type}</h2><div class='text-subtitle-2 font-weight-regular pt-2'>${Moment( feature.graphic.attributes.issuance ).format("M/D/YYYY h:mmA")} through ${Moment( feature.graphic.attributes.expiration ).format("M/D/YYYY h:mmA")}</div>` 
				},
				outFields: [ "*" ],
				actions: [ 
					{
						title: "Watch Details",
						id: "watch_detail",
						image: NoReadingIcon
					} 

				]
					
				

			}
	

}