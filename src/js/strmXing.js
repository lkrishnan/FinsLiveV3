import NoReadingIcon from "../assets/noreading.png"

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