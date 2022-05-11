export default function roundNum( number, decimalPlaces ){
    return Number( Math.round( number + "e" + decimalPlaces ) + "e-" + decimalPlaces )
    
}