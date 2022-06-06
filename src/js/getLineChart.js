import * as d3 from "d3"
import RoundNum from "./roundNum"
import { AsUCWords } from "./formatStr"
import store from "../store"

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/line-with-tooltip

export default function getLineChart( data, {
    x = ( [ x ] ) => x, // given d in data, returns the (temporal) x-value
    y = ( [ , y ] ) => y, // given d in data, returns the (quantitative) y-value
    title, // given d in data, returns the title text
    defined, // for gaps in data
    curve = d3.curveLinear, // method of interpolation between points
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleUtc, // type of x-scale
    xDomain, // [xmin, xmax]
    xRange = [ marginLeft, width - marginRight ], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [ height - marginBottom, marginTop ], // [bottom, top]
    color = "currentColor", // stroke color of line
    strokeWidth = 1.5, // stroke width of line, in pixels
    strokeLinejoin = "round", // stroke line join of line
    strokeLinecap = "round", // stroke line cap of line
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    unit = "ft", //reading unit
    msl = null, //mean seal level
    refs = null, //reference levels
    alarms = null, //alarms

} = { } ){
    const _this = this
                
    // Compute values.
    const X = d3.map( data, x ),
        Y = d3.map( data, y ),
        O = d3.map( data, d => d ),
        I = d3.map( data, ( _, i ) => i )

    // Compute which data points are considered defined.
    if( defined === undefined ) 
        defined = ( d, i ) => !isNaN( X[ i ] ) && !isNaN( Y[ i ] )

    const D = d3.map( data, defined ),
        sorted_data = I.filter( i => D[ i ] ).map( i => { return { datetime: X[ i ], reading: Y[ i ] } } ).sort( ( a, b ) => a.datetime - b.datetime ) // for bisection later

    // Compute default domains.
    if( xDomain === undefined )
        xDomain = d3.extent( X )
    if( yDomain === undefined ) 
        yDomain = [ 0, d3.max( Y ) ]

    // Construct scales and axes.
    const xScale = xType( xDomain, xRange ),
        yScale = yType( yDomain, yRange ),
        xAxis = d3.axisBottom( xScale ).ticks( width / 80 ).tickSizeOuter( 0 ),
        yAxis = d3.axisLeft( yScale ).ticks( height / 40, yFormat )

    let formatDate, formatValue

    // Compute titles.
    if( title === undefined ){
        formatDate = xScale.tickFormat( null, "%b %-d, %Y" )
        formatValue = yScale.tickFormat( 100, yFormat )
        
        title = i => `${ formatDate( X[ i ] ) }\n${ formatValue( Y[ i ] ) }`
    
    }else{
        const O = d3.map( data, d => d ),
            T = title
        
        title = i => T( O[ i ], i, data )

    }

    formatDate = xScale.tickFormat( null, "%b %-d, %Y %I:%M %p" )

    // Construct a line generator.
    //create svg for displaying the chart
    const svg = d3.create( "svg" )
        .attr( "width", width )
        .attr( "height", height )
        .attr( "viewBox", [ 0, 0, width, height ] )
        .attr( "style", "max-width: 100%; height: auto; height: intrinsic;" )
        .attr( "font-family", "sans-serif" )
        .attr( "font-size", 10 )
        .style( "-webkit-tap-highlight-color", "transparent" )
        .style( "overflow", "visible" )
        .on( "touchstart", event => event.preventDefault( ) )
        .on( "pointerenter", ptrEnter )
        .on( "pointermove", ptrMove )
        .on( "pointerleave", ptrLeave )

    //add the xaxis
    svg.append( "g" )
        .attr( "transform", `translate( 0, ${ height - marginBottom } )` )
        .call( xAxis )

    //add the yaxis
    svg.append( "g" )
        .attr( "transform", `translate( ${ marginLeft }, 0 )` )
        .call( yAxis )
        .call( g => g.select( ".domain" ).remove( ) )
        .call( g => g.selectAll( ".tick line" ).clone( )
            .attr( "x2", width - marginLeft - marginRight )
            .attr( "stroke-opacity", 0.1 ) )
        .call( g => g.append( "text" )
            .attr( "x", -( height / 2 ) )
            .attr( "y", -marginLeft )
            .attr( "fill", "currentColor" )
            .attr( "text-anchor", "middle" )
            .attr( "font-family", "sans-serif" )
            .attr( "font-size", 11 )
            .attr( "transform", "rotate(-90)" )
            .text( yLabel ) )

    //add alarms as reference areas (Alert, Investigate, Emergency)
    if( alarms ){
        const alarm_colors = store.getters[ "alarm_colors" ]

        let y0 = yDomain[ 0 ]
        alarms.forEach( elem => {
            const ref_svg = svg.append( "g" ),
                ref_area = d3.area( )
                    .x( p => p )
                    .y0( yScale( y0 ) )
                    .y1( yScale( elem.value ) )

            y0 = elem.value

            ref_svg.append( "path" ) 
                    .attr( "d", ref_area( [ xScale( xDomain[ 0 ] ), xScale( xDomain[ 1 ] ) ] ) )
                    .attr( "fill", alarm_colors[ elem.label ].hex )
                    .attr( "fill-opacity", "0.3" )

             //reference label
            ref_svg.append( "text" )
                .attr( "x", width - marginRight - 5 )
                .attr( "y", yScale( elem.value ) )
                .attr( "fill", "#000000" )
                .attr( "text-anchor", "end" )
                .attr( "alignment-baseline", "hanging" ) 
                .attr( "font-family", "sans-serif" )
                .attr( "font-size", 10 )
                .text( AsUCWords( elem.label ) )

        } )

    }

    //add main area path
    const main_area = d3.area( )
        .x( i => xScale( X[ i ] ) )
        .y0( yScale( yDomain[ 0 ] ) )
        .y1( i => yScale( Y[ i ] ) )

    const main_svg = svg.append( "g" )

    main_svg.append( "path" ) 
        .attr( "d", main_area( I ) )    
        .attr( "fill", color )
        .attr( "fill-opacity", "0.5" )

    //add reference lines
    if( refs ){
        const ref_svg = svg.append( "g" )

        refs.forEach( ( elem, idx ) => {
            //reference line
            ref_svg.append( "line" ) 
                .attr( "x1", xScale( xDomain[ 0 ] ) )
                .attr( "y1", yScale( elem.value ) )
                .attr( "x2", xScale( xDomain[ 1 ] ) + 10 )
                .attr( "y2", yScale( elem.value ) )
                .attr( "stroke", "currentColor" )
                .attr( "stroke-width", strokeWidth )
                .attr( "stroke-linejoin", strokeLinejoin )
                .attr( "stroke-linecap", strokeLinecap )

            ref_svg.append("circle")
                .attr( "r", 5 )
                .attr( "fill", "black" )
                .attr( "cx", width - marginRight + 12 )
                .attr( "cy", yScale( elem.value ) )

             //reference label
             ref_svg.append( "text" )
             .attr( "x", width - marginRight + 12 )
             .attr( "y", yScale( elem.value ) )
             .attr( "fill", "#ffffff" )
             .attr( "text-anchor", "middle" )
             .attr( "alignment-baseline", "middle" ) 
             .attr( "font-family", "sans-serif" )
             .attr( "font-size", 10 )
             .text( idx + 1 )

        } )

    }

    const rule = svg.append( "g" )
        rule.append( "line" )
            .attr( "y1", 0 )
            .attr( "y2", height - marginBottom + 25 )
            .attr( "stroke", "black" )
            rule.style( "opacity", "0" )

        const datetimeLabel = rule.append( "text" )
            .attr( "y", height - marginBottom + 25 )
            .attr( "fill", "black" )
            .attr( "text-anchor", "middle" )
            .attr( "dy", "1em" ) 
            .attr( "font-family", "sans-serif" )
            .attr( "font-size", 12 )
            .attr( "font-weight", "bold" )

    const dot = svg.append( "g" )
        .attr( "display", "none" )

    dot.append("circle")
        .attr( "r", 3.5 )
        .attr( "fill", "black" )

    const rdngLblBckgrnd = dot.append( "rect" )
        .style( "fill", "black" )
        .style( "fill-opacity", "1" )
        .style( "rx", "3" )
        .style( "ry", "3" )
        
    const readingLabel = dot.append( "text" )
        .attr( "y", -20 )
        .attr( "x", 10 )
        .attr( "fill", "white" )
        .attr( "text-anchor", "start" )
        .attr( "dy", "1em" ) 
        .attr( "font-family", "sans-serif" )
        .attr( "font-size", 12 )
        .attr( "font-weight", "bold" )
    
    function ptrEnter( ){
        rule.style( "opacity", "1" )
        dot.attr( "display", null )
        
    }

    function ptrMove( event ){
        const idx = d3.bisectCenter( sorted_data.map( elem => elem.datetime ), xScale.invert( d3.pointer( event )[ 0 ] ) ) //find the intersecting xScale, yScale on the chart using mouse x coord

        //set rule position and rulelabel text
        rule.attr( "transform", `translate(${ xScale( sorted_data[ idx ].datetime ) },0)` )
        datetimeLabel.text( formatDate( sorted_data[ idx ].datetime ) )
        readingLabel.text( `${ RoundNum( sorted_data[ idx ].reading, 2 ) } ${unit}`  )
        dot.attr( "transform", `translate( ${ xScale( sorted_data[ idx ].datetime ) },${yScale( sorted_data[ idx ].reading ) } )`)

        //set the reading label background
        const bbox = readingLabel.node( ).getBBox( )

        rdngLblBckgrnd.attr( "x", bbox.x )
        rdngLblBckgrnd.attr( "y", bbox.y )
        rdngLblBckgrnd.attr( "width", bbox.width )
        rdngLblBckgrnd.attr( "height", bbox.height )
            
    }

    function ptrLeave( ){
        rule.style( "opacity", "0" )
        dot.attr( "display", "none" )

    }

    return Object.assign( svg.node( ), { value: null } )
    
}