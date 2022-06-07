<template>
    <v-card
        class="ma-3"
        outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5">
                    Charlotte, NC
                </v-list-item-title>
                <v-list-item-subtitle>
                    Last Update: {{ curr.datetime }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                    {{ curr.short_forecast }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-card-text
            class="py-0"
        >
            <v-row 
                align="center"
                no-gutters
            >
                <v-col
                    class="text-h3"
                    cols="4"
                >
      		        {{ curr.temp }}
                </v-col>
                <v-col
                    class="text-caption font-weight-medium"
                    cols="2"
                >
      		        <div>{{ curr.max }}</div> 
                    <div>{{ curr.min }}</div>
                </v-col>
                <v-col 
                    cols="6"
                    align="center"
                >
                    <v-img
                        :src=curr.icon
                        alt="Current Weather Icon"
                        width="90"
                    ></v-img>
                </v-col>
            </v-row>
        </v-card-text>

        <v-btn
            text
            color="primary"
            class="ma-2"
            @click="show_more = !show_more"
        >
            {{( show_more ? "Show Less" : "Show More" )}}
        </v-btn>

        <v-divider
            v-if="show_more"
        >
        </v-divider>

        <v-sheet
            max-width="700"
            v-if="show_more"
        >
            <v-slide-group>
                <v-slide-item
                    v-for="( item, i ) in hourly"
                    :key="'hourly'+i"
                >
                    <v-card
                        class="ma-1 pa-2 grey--text text--darken-1"
                        height="100"
                        flat
                    >
                        <div
                            align="center"
                        >
                            <v-list-item-subtitle>
                                {{ formatTime( item.dt, i ) }}
                            </v-list-item-subtitle>
                        </div>
                        <div
                            align="center"
                        >
                            <v-img
                                :src="getIcon( item.weather[ 0 ].icon )"
                                alt="Sunny image"
                                width="40"
                            ></v-img>
                        </div>
                        <div
                            align="center"
                        >
                            <v-list-item-subtitle>
                                {{ noDecimal( item.temp ) }}&deg;
                            </v-list-item-subtitle>
                        </div>
                        
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
        
        <v-divider
            v-if="show_more"
        >
        </v-divider>
        
        <v-list 
            class="transparent"
            v-if="show_more"
        >
            <v-list-item
                v-for="( item, i ) in daily"
                :key="'daily'+i"
            >
                <v-list-item-title
                    class="grey--text text--darken-1"
                >
                    {{ formatDay( item.dt, i ) }}
                </v-list-item-title>
                <v-img
                    :src="getIcon( item.weather[ 0 ].icon )"
                    alt="Sunny image"
                    width="40"
                ></v-img>
                <v-list-item-subtitle class="text-right">
                    {{ noDecimal( item.temp.max ) }}&deg;/{{ noDecimal( item.temp.min ) }}&deg;
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>

    <v-divider
        v-if="show_more"
    >
    </v-divider>

    <v-card
        class="d-flex flex-wrap pa-2 justify-center"
        flat
        tile
        v-if="show_more"
    >
        <v-card
            class="pa-2 ma-2"
            flat
            outlined
            rounded
            v-for="( item, i ) in conditions"
            :key="'conditions'+i"
            width=120
        >
            <div
                class="grey--text text--darken-1 text-subtitle-2"
            >
                <v-icon>
                    {{ item.icon }}
                </v-icon>
                {{ item.title }}
            </div>
             <div
                class="grey--text text--darken-1 text-h6 font-weight-regular"
                align="center"
            >
                {{ item.value }}
            </div>
               
        </v-card>
        
    </v-card>
    

    <!--<a href="https://www.weatherforyou.com/weather/north+carolina/charlotte.html" target="_blank" rel="noopener"> 
        <img src="https://www.weatherforyou.net/fcgi-bin/hw3/hw3.cgi?config=png&amp;forecast=zandh&amp;alt=hwizandh&amp;place=charlotte&amp;state=nc&amp;country=us&amp;daysonly=2&amp;maxdays=5" width="375" height="270" border="0" alt="Latest Charlotte, North Carolina, weather conditions and forecast" class="img-responsive" /> 
    </a>-->

  </v-card>

</template>

<script>
    import Moment from "moment"
    import RoundNum from "../js/roundNum"
    import { AsUCWords } from "../js/formatStr"

	export default{
      	name: "weatherForecast",

        mounted: function( ){
            this.getOpenWeatherMapForecast( )
        
        },

		data: ( ) => ( {
            curr: {
                datetime: null,
                short_forecast: null,
                temp: null,
                icon: null,
                wind_speed: null,
                humidity: null,
            },            
			labels: [ "SU", "MO", "TU", "WED", "TH", "FR", "SA" ],
            time: 0,
            forecast: [
                { day: "Tuesday", icon: "mdi-white-balance-sunny", temp: "24\xB0/12\xB0" },
                { day: "Wednesday", icon: "mdi-white-balance-sunny", temp: "22\xB0/14\xB0" },
                { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
                
            ],
            grid_url: null,
            hourly: [ ],
            daily: [ ],
            conditions: [ ],
            show_more: false,
      
		} ),
      
      	computed: {
			//map
            map_center( ){
                return this.$store.state.map_center

            },

      	},

		watch: {
            //map
            /*map_center( ){
               this.getWeatherGrid( )
			
            },*/

		},

		methods: {
            formatTime( epoch, idx=1 ){
                return ( idx > 0 ? Moment.unix( epoch ).format('hA') : "Now" ) 

            },
            formatDay( epoch, idx ){
                return ( idx > 0 ? Moment.unix( epoch ).format('ddd') : "Today" ) 

            },
            formatDateTime( epoch ){
                return Moment.unix( epoch ).format( "ddd, h:mm A" )

            },
            getIcon( icon_name ){
                return `https://openweathermap.org/img/wn/${icon_name}@2x.png`

            },
            noDecimal( num ){
                return RoundNum( num, 0 )

            },
            async getOpenWeatherMapForecast( ){
                const _this = this
                try{
                    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=35.270&lon=-80.837&appid=4934b80bf63c09985d0d7b10a6de71ae&units=imperial",
                        response = await fetch( url  )

                    if( response.ok ){
                        const weather_data = await response.json( )
              
                        _this.curr = {
                            datetime: Moment.unix( weather_data.current.dt ).format( "ddd, h:mm A" ),
                            temp: `${RoundNum( weather_data.current.temp, 0 )}°F`,
                            short_forecast: AsUCWords( weather_data.current.weather[ 0 ].description ),
                            icon: _this.getIcon( weather_data.current.weather[ 0 ].icon ),
                            max: `H: ${RoundNum( weather_data.daily[ 0 ].temp.max, 0 )}°F`,
                            min: `L: ${RoundNum( weather_data.daily[ 0 ].temp.min, 0 )}°F`

                        }
                        _this.hourly = weather_data.hourly
                        _this.daily = weather_data.daily
                        _this.conditions = [ 
                            { title: "Wind", value: `${_this.noDecimal( weather_data.current.wind_speed )} mph`, icon: "mdi-weather-windy" },
                            { title: "Pressure", value: `${RoundNum( weather_data.current.pressure * 0.02953, 2 )} inHg`, icon: "mdi-gauge" },
                            { title: "Humidity", value:`${weather_data.current.humidity}%`, icon: "mdi-waves-arrow-up" },
                            { title: "Clouds", value:`${weather_data.current.clouds}%`, icon: "mdi-weather-cloudy" },
                            { title: "UV Index", value: _this.noDecimal( weather_data.current.uvi ), icon: "mdi-white-balance-sunny" },
                            { title: "Visibility", value:`${weather_data.current.visibility/1000} mi`, icon: "mdi-eye" },
                            { title: "Sunrise", value: Moment.unix( weather_data.current.sunrise ).format('h:m A'), icon: "mdi-weather-sunset-up" },
                            { title: "Sunset", value: Moment.unix( weather_data.current.sunset ).format('h:m A'), icon: "mdi-weather-sunset-down" },

                            
                        ]
                            
                    }else{
                        throw "Network response was not ok." 

                    }

                }catch( error){
                    console.log( error )
             
                }
                
            },


			/*async getWeatherGrid( ){
                const _this = this

                try{
                    const center_url = `https://api.weather.gov/points/${_this.map_center[ 1 ]},${_this.map_center[ 0 ]}`,
                        center_response = await fetch( center_url  )
                    if( center_response.ok ){
                        const center_data = await center_response.json( )

                        if( _this.grid_url != center_data.properties.forecastHourly ){
                            _this.city = center_data.properties.relativeLocation.properties.city + ", " + center_data.properties.relativeLocation.properties.state
                            _this.grid_url = center_data.properties.forecastHourly
                            _this.getHourlyForecast( )

                        }
                            
                    }else{
                        throw "Network response was not ok." 

                    }

                }catch( error){
                    console.log( error )
             
                }
                

            },

            async getHourlyForecast( ){
                const _this = this

                try{
                    const grid_response = await fetch( _this.grid_url )

                    if( grid_response.ok ){
                        const weather_data = await grid_response.json( ),
                            //store the start time of periods to find the interval to use
                            period_starts = [
                                Moment( weather_data.properties.periods[ 0 ].startTime ),
                                Moment( weather_data.properties.periods[ 1 ].startTime ),
                                Moment( weather_data.properties.periods[ 2 ].startTime ),
                            ],
                            //find the interval th
                            duration_sttime_currtime = period_starts.map( period_start => Math.abs( period_start.diff( Moment( ), "seconds" ) ) ),
                            least_duration = Math.min( ...duration_sttime_currtime ),
                            period_idx = duration_sttime_currtime.findIndex( elem => elem === least_duration )
                        _this.curr = {
                            datetime: Moment( ).format( "ddd, h:mm A" ),
                            short_forecast: weather_data.properties.periods[ period_idx ].shortForecast,
                            temp: weather_data.properties.periods[ period_idx ].temperature,
                            icon: weather_data.properties.periods[ period_idx ].icon,
                            wind_speed: weather_data.properties.periods[ period_idx ].windSpeed + " " + weather_data.properties.periods[ period_idx ].windDirection,

                        }

                        

                    }else{
                        throw "Network response was not ok." 
                            
                    }

                }catch( error){
                    console.log( error )
             
                }
 
            },*/

        }

  	}

</script>