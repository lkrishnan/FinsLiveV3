<template>
	<v-card
		class="ma-3"
        outlined
		flat
	>
		<v-row
            no-gutters
        >
            <v-col
                class="d-flex justify-start text-subtitle-1 font-weight-medium pa-2 accent"
            >
                Filter
            </v-col>
			<v-col
				class="d-flex justify-end align-center pr-1 accent"
			>
				<v-btn
					icon
					@click="filter_holder=!filter_holder"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
		
			</v-col>
        </v-row>

		<v-divider />

		<v-tabs
			color="primary"
		>
			<v-tab>Quick</v-tab>
			<v-tab>Date Period</v-tab>
			<v-tab>Range</v-tab>

			<v-tab-item>
				<v-card
					elevation="0"
					class="ma-2"
				>
					<v-row>
						<v-col>
							<!-- Quick Filter list combobox -->
							<v-combobox
								v-model="quick_selection"
								:items="quick_list"
								label="Select Period"
								hide-details
								class="body-2"
							>
							</v-combobox>

						</v-col>

					</v-row>

					<v-row>
						<v-col
							class="d-flex justify-end"
						>
							<v-btn 
								outlined
								color="primary"
								@click="doFilter( 'quick' )"
							>
									<v-icon>mdi-arrow-right-thin</v-icon>
									Go
							</v-btn>
							
						</v-col>

					</v-row>
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
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="auto"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="period_date_frmt"
											label="Date"
											hint="MM/DD/YYYY format"
											persistent-hint
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-date-picker
										v-model="period_date"
										no-title
										@input="menu3 = false"
									>
									</v-date-picker>

								</v-menu>

								

							</v-col>

							<v-col
								md="4"
							>
								<v-text-field
									v-model="period_time"	
									label="Time"
									type="time"
								></v-text-field>
		
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
	import GetNewRoute from "../js/getNewRoute"
	import { SubtractFromDate, FormatDate } from "../js/vanillaMoment"

  	export default{
      	name: "readingfilter",

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
			start_date: FormatDate( "YYYY-MM-DD", SubtractFromDate( 1, "days" ) ),
			end_date: FormatDate( "YYYY-MM-DD" ),
			start_date_frmt: FormatDate( "MM/DD/YYYY", SubtractFromDate( 1, "days" ) ),
			end_date_frmt: FormatDate( "MM/DD/YYYY" ),
			menu1: false,
			menu2: false,
			menu3: false,
			menu4: false,
			period_date: FormatDate( "YYYY-MM-DD" ),
			period_date_frmt: FormatDate( "MM/DD/YYYY" ),
			period_time: FormatDate( "hh:mm" ),
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

      	},

		watch: {
            start_date( val ){
        		this.start_date_frmt = FormatDate( "MM/DD/YYYY", val )
				
      		},

			end_date( val ){
				this.end_date_frmt = FormatDate( "MM/DD/YYYY", val + " 23:59" )

      		},

	  	    period_date( val ){
				this.period_date_frmt = FormatDate( "MM/DD/YYYY", val + " 23:59" )
			}

		},

		methods: {
			validate( ){
                this.$refs.form.validate( )

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
								enddate: FormatDate( "YYYY-MM-DDTHH:mmZ", _this.period_date + " " + _this.period_time ), 
								period: _this.getISO8601Duration( _this.duration, _this.designator ),

							} )

						}
						
						break

					case "range":
						new_route = GetNewRoute( { 
								startdate: FormatDate( "YYYY-MM-DDTHH:mmZ", this.start_date + " 00:00" ),
								enddate: FormatDate( "YYYY-MM-DDTHH:mmZ", this.end_date + " 23:59" ),

							} )

						break

				}

				//go to new route
				if( new_route ){
					_this.$router.push( new_route )

				}

			},
			      
      	}
  
  	}
</script>