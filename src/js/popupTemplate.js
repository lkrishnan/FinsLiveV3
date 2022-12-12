import DetailsIcon from "../assets/file-table-box-outline.svg"
import DeleteIcon from "../assets/delete.svg"
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

export function GetLocTemplate( tag ){

	const content = {
		"ADDRESS": [ {
			type: "fields",
			fieldInfos: [
				{ fieldName: "address", label: "Address" },
				{ fieldName: "lat", label: "Latitude" },
				{ fieldName: "lon", label: "Longitude" },
				{ fieldName: "x", label: "X Coord" },
				{ fieldName: "y", label: "Y Coord" },
				{ fieldName: "matid", label: "MAT ID" },
			]
	
		} ],
		"PARK": [ {
			type: "fields",
			fieldInfos: [
				{ fieldName: "name", label: "Name" },
				{ fieldName: "type", label: "Type" },
				{ fieldName: "address", label: "Address" },
				{ fieldName: "lat", label: "Latitude" },
				{ fieldName: "lon", label: "Longitude" },
				{ fieldName: "x", label: "X Coord" },
				{ fieldName: "y", label: "Y Coord" },
			]
	
		} ],
		"SCHOOL": [ {
			type: "fields",
			fieldInfos: [
				{ fieldName: "name", label: "Name" },
				{ fieldName: "type", label: "Type" },
				{ fieldName: "address", label: "Address" },
				{ fieldName: "lat", label: "Latitude" },
				{ fieldName: "lon", label: "Longitude" },
				{ fieldName: "x", label: "X Coord" },
				{ fieldName: "y", label: "Y Coord" },
			]
	
		} ],
		"LIBRARY": [ {
			type: "fields",
			fieldInfos: [
				{ fieldName: "name", label: "Name" },
				{ fieldName: "address", label: "Address" },
				{ fieldName: "lat", label: "Latitude" },
				{ fieldName: "lon", label: "Longitude" },
				{ fieldName: "x", label: "X Coord" },
				{ fieldName: "y", label: "Y Coord" },
			]
	
		} ],
		"BUSINESS": [ {
			type: "fields",
			fieldInfos: [
				{ fieldName: "name", label: "Name" },
				{ fieldName: "address", label: "Address" },
				{ fieldName: "lat", label: "Latitude" },
				{ fieldName: "lon", label: "Longitude" },
				{ fieldName: "x", label: "X Coord" },
				{ fieldName: "y", label: "Y Coord" },
			]
	
		} ],
		"BUS STOP": [ {
			type: "fields",
			fieldInfos: [
				{ fieldName: "name", label: "Name" },
				{ fieldName: "route", label: "Route" },
				{ fieldName: "lat", label: "Latitude" },
				{ fieldName: "lon", label: "Longitude" },
				{ fieldName: "x", label: "X Coord" },
				{ fieldName: "y", label: "Y Coord" },
			]
	
		} ],
		"LIGHT RAIL": [ {
			type: "fields",
			fieldInfos: [
				{ fieldName: "name", label: "Name" },
				{ fieldName: "address", label: "Address" },
				{ fieldName: "lat", label: "Latitude" },
				{ fieldName: "lon", label: "Longitude" },
				{ fieldName: "x", label: "X Coord" },
				{ fieldName: "y", label: "Y Coord" },
			]
	
		} ],
		"INTERSECTION": [ {
			type: "fields",
			fieldInfos: [
				{ fieldName: "intersection", label: "Name" },
				{ fieldName: "lat", label: "Latitude" },
				{ fieldName: "lon", label: "Longitude" },
				{ fieldName: "x", label: "X Coord" },
				{ fieldName: "y", label: "Y Coord" },
			]
	
		} ],
		"ROAD": [ {
			type: "fields",
			fieldInfos: [
				{ fieldName: "name", label: "Name" },
				{ fieldName: "prefix", label: "Prefix" }, 
                { fieldName: "stname", label: "Street Name" },
                { fieldName: "suffix", label: "Suffix" }, 
                { fieldName: "juris", label: "Jurisdiction" },
				
			]
	
		} ],
		
	}

	return {
		title: feature => { 
			return `${feature.graphic.attributes.tag}` 

		},
		outFields: [ "*" ],
		content: content[ tag ],
		actions: [ 
			{
				title: "Remove",
				id: "remove_loc",
				image: DeleteIcon,
			} 

		],
			
	}
	
}