import {TwoDigitNo} from "./formatStr"

export function GetTimeZoneStd( timezone_offset_min ){
    let offset_hrs = parseInt( Math.abs( timezone_offset_min / 60 ) ),
        offset_min = Math.abs( timezone_offset_min % 60 ),
        timezone_standard = null

    if( offset_hrs < 10 )
        offset_hrs = '0' + offset_hrs;

    if( offset_min < 10 )
        offset_min = '0' + offset_min;

    // Add an opposite sign to the offset
    // If offset is 0, it means timezone is UTC
    if( timezone_offset_min < 0 )
        timezone_standard = '+' + offset_hrs + ':' + offset_min
    else if( timezone_offset_min > 0 )
        timezone_standard = '-' + offset_hrs + ':' + offset_min
    else if( timezone_offset_min == 0 )
        timezone_standard = 'Z'

    // Timezone difference in hours and minutes
    // String such as +5:30 or -6:00 or Z
    return timezone_standard

}

export function GetDateAsEpoch( dte ){
    if( isEpoch( dte ) ){
        return dte

    }else if( isDateObj( dte ) ){
        return dte.getTime( )  

    }else if( typeof dte === "string" && isValidDate( dte ) ){
        return Date.parse( dte )

    }else{
        return undefined
        
    }

}

export function GetDateAsObj( dte ){
    if( isEpoch( dte ) ){
        return new Date( dte )

    }else if( isDateObj( dte ) ){
        return dte

    }else if( typeof dte === "string" && isValidDate( dte ) ){
        return new Date( Date.parse( dte ) )

    }else{
        return undefined
        
    }

}

export function isValidDate( dte ){
    return ( new Date( Date.parse( dte ) ) === "Invalid Date" ? false : true )

}

export function isDateObj( dte ){
    return ( Object.prototype.toString.call( dte ) === "[object Date]" && !isNaN( dte ) ? true : false )
        
}

export function isEpoch( epoch ){
    const parsed = parseFloat( epoch )
  
    return !Number.isNaN( parsed ) && Number.isFinite( parsed ) && /^\d+\.?\d+$/.test( epoch ) && new Date( epoch ) !== "Invalid Date"

}

export function FormatDate( fmt, dte=Date.now( ), utc=false ){
   switch( fmt ){
        case "MM/DD/YYYY hh:mm A":
            return new Intl.DateTimeFormat( "en-US", { 
                month: "2-digit", 
                day: "2-digit", 
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",

            } ).format( GetDateAsEpoch( dte ) ).replace( /,/g, "" ) 

        case "MM/DD/YYYY hh:mm:ss A":
            return new Intl.DateTimeFormat( "en-US", { 
                month: "2-digit", 
                day: "2-digit", 
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                
            } ).format( GetDateAsEpoch( dte ) ).replace( /,/g, "" ) 
            
        case "M/D/YYYY h:mmA":
            return new Intl.DateTimeFormat( "en-US", { 
                dateStyle: "short",
                timeStyle: "short",

            } ).format( GetDateAsEpoch( dte ) ).replace( /\s/g, "" ).replace( /,/g, " " ) 

        case "ddd, h:mm A":
            return new Intl.DateTimeFormat( "en-US", { 
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
                hour12: true

            } ).format( GetDateAsEpoch( dte ) ).replace( /\s/g, "" ).replace( /[a-zA-Z]{3}/,'$&, ' ).replace( /\d{1,2}:\d{1,2}/,'$& ' ) 

        case "h:mm A":
            return new Intl.DateTimeFormat( "en-US", { 
                hour: "numeric",
                minute: "numeric",
                hour12: true

            } ).format( GetDateAsEpoch( dte ) )

        case "hh:mm":
            return new Intl.DateTimeFormat( "en-US", { 
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,

            } ).format( GetDateAsEpoch( dte ) )

        case "hA":
            return new Intl.DateTimeFormat( "en-US", { 
                hour: "numeric",
                hour12: true

            } ).format( GetDateAsEpoch( dte ) ).replace( /\s/g, "" )

        case "ddd":
            return new Intl.DateTimeFormat( "en-US", { 
                weekday: "short",

            } ).format( GetDateAsEpoch( dte ) )

        case "YYYY-MM-DD HH:mm:ss":
            dte = GetDateAsObj( dte )
           
            return ( utc ? 
                    ( dte.getUTCFullYear( ) + "-" + TwoDigitNo( dte.getUTCMonth( ) + 1 ) + "-" + TwoDigitNo( dte.getUTCDate( ) )
                        + " " + TwoDigitNo( dte.getUTCHours( ) ) + ":" + TwoDigitNo( dte.getUTCMinutes( ) ) + ":" + TwoDigitNo( dte.getUTCSeconds( ) ) ) 
                    :
                    ( dte.getFullYear( ) + "-" + TwoDigitNo( dte.getMonth( ) + 1 ) + "-" + TwoDigitNo( dte.getDate( ) )
                    + " " + TwoDigitNo( dte.getHours( ) ) + ":" + TwoDigitNo( dte.getMinutes( ) ) + ":" + TwoDigitNo( dte.getSeconds( ) ) ) 
            )
            
        case "YYYY-MM-DD":
            dte = GetDateAsObj( dte )
            
            return ( utc ? 
                    ( dte.getUTCFullYear( ) + "-" + TwoDigitNo( dte.getUTCMonth( ) + 1 ) + "-" + TwoDigitNo( dte.getUTCDate( ) ) )
                    :
                    ( dte.getFullYear( ) + "-" + TwoDigitNo( dte.getMonth( ) + 1 ) + "-" + TwoDigitNo( dte.getDate( ) ) ) 
            )

        case "MM/DD/YYYY":
            return new Intl.DateTimeFormat( "en-US", { 
                month: "2-digit", 
                day: "2-digit", 
                year: "numeric",
                                
            } ).format( GetDateAsEpoch( dte ) )
            
        case "YYYY-MM-DDTHH:mmZ":
            dte = GetDateAsObj( dte )

            return dte.getFullYear( ) + "-" + TwoDigitNo( dte.getMonth( ) + 1 ) + "-" + TwoDigitNo( dte.getDate( ) )
                    + "T" + TwoDigitNo( dte.getHours( ) ) + ":" + TwoDigitNo( dte.getMinutes( ) ) + GetTimeZoneStd( dte.getTimezoneOffset( ) ) 

    }
    
}

export function AsMilliSeconds( duration=1, unit ){
    const conversion = {
        seconds: duration * 1000,
        minutes: duration * 60 * 1000,
        hours: duration * 60 * 60 * 1000,
        days: duration * 24 * 60 * 60 * 1000,
        years: duration * 365 * 24 * 60 * 60 * 1000,
    
    }

    return conversion[ unit ]
}

export function SubtractFromDate( duration, unit, dte=new Date( ), ret_as_epoch=false ){
    const epoch = GetDateAsObj( dte ) - AsMilliSeconds( duration, unit )

    return new Date( ret_as_epoch ? epoch : new Date( epoch ) )

}

export function AddToDate( duration, unit, dte=new Date( ), ret_as_epoch=false ){
    const epoch = GetDateAsObj( dte ) + AsMilliSeconds( duration, unit )

    return new Date( ret_as_epoch ? epoch : new Date( epoch ) )

}

export function GetDateDiffinSecs( startdate, enddate ){
    startdate = ( isDateObj( startdate ) ? startdate : new Date( Date.parse( startdate ) ) ) 
    enddate = ( isDateObj( enddate ) ? enddate : new Date( Date.parse( enddate ) ) )

    return Math.abs( ( enddate.getTime( ) - startdate.getTime( ) ) / 1000 )
    
}