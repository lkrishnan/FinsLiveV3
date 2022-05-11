<template>
	<v-card>
		<v-row 
			class="d-flex justify-space-between px-2 py-1 primary"
			no-gutters
		>
			<v-col
				class="d-flex align-center text-h6 white--text"
			>
				Filter
		
			</v-col>

			<v-col
				class="d-flex justify-end"
			>
				<v-btn
					icon
					color="white"
					@click="filter_holder=!filter_holder"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
		
			</v-col>
	
		</v-row>

        <v-divider />

		<v-tabs
			color="primary"
			class="pa-2"
		>
			<v-tab>Quick</v-tab>
			<v-tab>Date Period</v-tab>
			<v-tab>Range</v-tab>

			<v-tab-item>
				<v-card
					elevation="0"
					class="ma-2"
				>
					<!-- Quick Filter list combobox -->
					<v-combobox
						v-model="quick_selection"
						:items="quick_list"
						label="Select Period"
						hide-details
						class="body-2"
					>
					</v-combobox>
				</v-card>

			</v-tab-item>

			<v-tab-item>
				<v-container>
					 <v-form 
        				v-model="valid" 
        				ref="form"
    				>
						<v-row>
							<v-col
								class="d-flex align-center"
								md="5"
							>
								Readings in the
							</v-col>
							<v-col
								md="3"
							>
								<v-text-field
									label="Duration"
									v-model="duration"
									:rules="duration_rules"
									required
								></v-text-field>
							</v-col>

							<v-col
								md="4"
							>
								<v-select
									label="Designator"
									:items="designators"
									v-model="designator"
								></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col
								md="3"
							>
								prior to
							</v-col>
							<v-col
								md="5"
							>
								<v-menu
									ref="menu3"
									v-model="menu3"
									:close-on-content-click="false"
									:return-value.sync="period_date"
									transition="scale-transition"
									offset-y
									min-width="auto"
								>
									<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="period_date"
										label="Date"
										prepend-icon="mdi-calendar"
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
									</template>
									<v-date-picker
										v-model="period_date"
										no-title
										scrollable
									>
									<v-spacer></v-spacer>
									<v-btn
										text
										color="primary"
										@click="menu3 = false"
									>
										Cancel
									</v-btn>
									<v-btn
										text
										color="primary"
										@click="$refs.menu3.save(date)"
									>
										OK
									</v-btn>
									</v-date-picker>

								</v-menu>

							</v-col>

							<v-col
								md="4"
							>
								<v-menu
									ref="menu4"
									v-model="menu4"
									:close-on-content-click="false"
									:nudge-right="40"
									:return-value.sync="period_time"
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="period_time"
											label="Time"
											prepend-icon="mdi-clock-time-four-outline"
											type="period_time"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-time-picker
										v-if="menu4"
										v-model="period_time"
										full-width
										@click:minute="$refs.menu4.save( period_time )"
									></v-time-picker>
								
								</v-menu>
		
							</v-col>

						</v-row>

						<v-row>
							<v-col
								class="d-flex justify-end"
							>
								<v-btn 
									outlined
									color="primary"
									@click="doFilter( 'period_date' )"
								>
										<v-icon>mdi-arrow-right-thin</v-icon>
										Go
								</v-btn>
								
							</v-col>
							
						</v-row>

					 </v-form>

				</v-container>

			</v-tab-item>
			
			<v-tab-item>
				<v-container>
					<v-row
						class="black--text"
					>
						<v-col
							cols="12"
							lg="6"
						>
							<v-menu
								ref="menu1"
								v-model="menu1"
								:close-on-content-click="false"
								transition="scale-transition"
								offset-y
								max-width="290px"
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="start_date_frmt"
										label="Start Date"
										hint="MM/DD/YYYY format"
										persistent-hint
										prepend-icon="mdi-calendar"
										v-bind="attrs"
										v-on="on"
									></v-text-field>
          						</template>

								<v-date-picker
									v-model="start_date"
									no-title
									@input="menu1 = false"
								></v-date-picker>

        					</v-menu>
        					
      					</v-col>

      					<v-col
        					cols="12"
        					lg="6"
      					>
							<v-menu
								v-model="menu2"
								:close-on-content-click="false"
								transition="scale-transition"
								offset-y
								max-width="290px"
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="end_date_frmt"
										label="End Date"
										hint="MM/DD/YYYY format"
										persistent-hint
										prepend-icon="mdi-calendar"
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>

								<v-date-picker
									v-model="end_date"
									no-title
									@input="menu2 = false"
								></v-date-picker>
							
							</v-menu>
		
						</v-col>
    
					</v-row>

					<v-row>
						<v-col
							class="d-flex justify-end"
						>
							<v-btn 
								outlined
								color="primary"
								@click="doFilter( 'range' )"
							>
									<v-icon>mdi-arrow-right-thin</v-icon>
									Go
							</v-btn>
							
						</v-col>

					</v-row>
  
  				</v-container>
					
			</v-tab-item>
			
		</v-tabs>

	</v-card>
	
</template>

<script>
	import Moment from "moment"
	import GetNewRoute from "../js/getNewRoute"

  	export default{
      	name: "readingfilter",

		mounted: function( ){
            this.setQuickList( )
			
        },

		data: vm => ( {
			filter: "quick",
			quick_selection: null,
			quick_list: [
				{ text: "Last 30 minutes", value: "PT30M" },
				{ text: "Last 1 hour", value: "PT1H" },
				{ text: "Last 3 hours", value: "PT3H" },
				{ text: "Last 6 hours", value: "PT6H" },
				{ text: "Last 12 hours", value: "PT12H" },
				{ text: "Last 24 hours", value: "P1D" },
				{ text: "Last 48 hours", value: "PT48H" },
				{ text: "Last 72 hours", value: "PT72H" },

			],
			duration: null,
			designator: "H",
			designators: [ 
				{ text: "Min(s)", value: "I" },
				{ text: "Hour(s)", value: "H" },
				{ text: "Day(s)", value: "D" },
				{ text: "Week(s)", value: "W" },
				{ text: "Month(s)", value: "M" },
				{ text: "Year(s)", value: "Y" },
				
			],
			//start_date: ( new Date( Date.now( ) - ( new Date( ) ).getTimezoneOffset( ) * 60000) ).toISOString( ).substr( 0, 10 ),
			start_date: Moment( new Date( ) ).subtract( 1, 'd' ).format( 'YYYY-MM-DD' ),
			end_date: Moment( new Date( ) ).format( 'YYYY-MM-DD' ),
			start_date_frmt: Moment( new Date( ) ).subtract( 1, 'd' ).format( 'L' ),
			end_date_frmt: Moment( new Date( ) ).format( 'L' ),
			menu1: false,
			menu2: false,
			menu3: false,
			menu4: false,
			period_date: Moment( new Date( ) ).format( 'YYYY-MM-DD' ),
			period_time: Moment( new Date( ) ).format( 'HH:mm' ),
			duration_rules: [
                v => !!v || "Required",
				v => v && ( v.match( /^\d+$/ ) ? true : false ) || "Only Numbers",
			],
			valid: true,
			chg_route: true,
      
		} ),
      
      	computed: {
			//app
			top_tab( ){
				return this.$store.state.top_tab
			
			},
			tabs( ){
				return this.$store.state.tabs
			
			},
			route_path( ){ //query string
				return this.$route.path
			
            },

			//toggles
			filter_holder: {
				set( payload ){
                    this.$store.commit( "filter_holder", payload)
					
				},
      			get( ){
					return this.$store.state.filter_holder
      			
				}

			},

			//custom

      	},

		watch: {
            //change in query string
            route_path( ){
                this.setQuickList( )
			
            },

			quick_selection( ){
				if( this.chg_route ){
					this.doFilter( "quick" )
					
				}else{
					this.chg_route = true

				}
				
			},

			start_date( val ){
        		this.start_date_frmt = Moment( this.start_date ).format( 'L' )
				
      		},

			end_date( val ){
        		this.end_date_frmt = Moment( this.end_date ).format( 'L' )

      		},

		},

		methods: {
			validate( ){
                this.$refs.form.validate( )

            },

			setQuickList( ){
 				const _this = this,
                    name = _this.$router.currentRoute.name,
                    params = _this.$router.currentRoute.params,
					{ gauges, ...qrystr } = params

					//do only when the route contains quick filter parameters
					if( gauges === "rain" && qrystr.hasOwnProperty( "period" ) && !qrystr.hasOwnProperty( "enddate" ) ){
						const idx = _this.quick_list.findIndex( x => x.value === qrystr.period )

						if( idx > -1 ){
							_this.chg_route = false //prevent a route change as the required route is already set
							_this.quick_selection = _this.quick_list[ idx ] //set the dropdown choice
							
						}

					}
					
			},

			getISO8601Duration( duration, desig ){
				return "P" + ( ( desig === "H" || desig === "I" ) ? "T" + ( duration + desig ).replace( "I", "M" ) : duration + desig )

			},

			doFilter( type ){
				const _this = this

				let new_route

				switch( type ){
					case "quick":
						new_route = GetNewRoute( { 
								period: _this.quick_selection.value, 

							} )
						break

					case "period_date":
						if( _this.$refs.form.validate( ) ){
							new_route = GetNewRoute( { 
								enddate: Moment( _this.period_date + " " + _this.period_time ).format( "YYYY-MM-DDTHH:mmZ" ), 
								period: _this.getISO8601Duration( _this.duration, _this.designator ),

							} )

						}
						
						break

					case "range":
						new_route = GetNewRoute( { 
								startdate: Moment( this.start_date + " 00:00" ).format( "YYYY-MM-DDTHH:mmZ" ),
								enddate: Moment( this.end_date + " 23:59" ).format( "YYYY-MM-DDTHH:mmZ" ),

							} )

						break

				}

				//go to new route
				if( new_route ){
					_this.$router.push( new_route )

				}

				//close filter window
				_this.filter_holder = false

			},
			      
      	}
  
  	}
</script>