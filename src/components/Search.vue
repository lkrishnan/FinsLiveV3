<template>
	<v-card
		class="py-0 px-2 d-flex align-center"
	>
		<!-- Button to show navigation drawer -->
		<v-app-bar-nav-icon
			color="primary"
			class="d-sm-none mr-2"
			@click.stop="nav_drawer = !nav_drawer"
		>
		</v-app-bar-nav-icon>

		<v-autocomplete
			v-model="srch_selection"
			:loading="loading"
			:items="search_results"
			:search-input.sync="searchInput"
			clearable
			hide-no-data
			hide-details
			no-filter
			label="Search Location"
			@click:clear="clearResults"
			class="body-2"
		>
			<!-- Search Result formatting -->
			<template slot="item" slot-scope="data">
				<v-icon
					class="mr-2"
				>
					{{ getIcon( data.item.value.tag ) }}
				</v-icon>
				<span class="body-2">{{ data.item.text }}</span>
				
			</template>

		</v-autocomplete>

		<!-- Button to switch map search control -->
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					icon
					color="primary"
					@click="curr_qry_ctrl='gauge_cam'"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>mdi-clipboard-list-outline</v-icon>
				</v-btn>
			</template>
			<span>{{list_btn_tooltip}}</span>
		</v-tooltip>

		<!-- Button to switch to filter control -->
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					icon
					color="primary"
					v-show="[ 0, 1 ].includes( top_tab )"
					@click="filter_holder=true"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>mdi-filter-outline</v-icon>
				</v-btn>
			</template>
			<span>Filter</span>
		</v-tooltip>

		<!-- Button to toggle information drawer -->	
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					icon
					color="primary"
					@click="info_drawer=!info_drawer"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>{{( info_drawer ? "mdi-chevron-left" : "mdi-chevron-right" ) }}</v-icon>
				</v-btn>
			</template>
			<span>{{( info_drawer ? "Hide Info" : "Show Info" ) }}</span>
		</v-tooltip>

	</v-card>
</template>

<script>
  	import axios from "axios"
	import JSONToURL from "../js/jsontourl"
	import GetStandardizedAddr from "../js/getStandardizedAddr"
	import GetSearchParams from "../js/getSearchParams"
	import ValidateString from "../js/validateString"

  	export default {
      	name: "mainsrch",

        data: ( ) => ( {
			axios_inst: axios.create( { 
				headers: { 
					"Cache-Control": "max-age=0, no-cache, no-store",
					"Pragma": "no-cache"  
				}
			} ),
			cancel_source: null,
			loading: false,
			searchInput: null,
			srch_selection: null,
			search_results: [ ],
		
		} ),
      
      	computed: {
			//app
			is_mobile( ){
				return this.$store.state.is_mobile
      			
			},
			top_tab( ){
				return this.$store.state.top_tab
			
			},
			tabs( ){
				return this.$store.state.tabs
			
			},
			ws( ){
				return this.$store.state.ws
			
			},

			//toggles
			info_drawer: {
				set( payload ){
                    this.$store.commit( "info_drawer", payload )
					
				},
      			get( ){
					return this.$store.state.info_drawer
      			
				}

			},
			nav_drawer: {
				set( payload ){
                    this.$store.commit( "nav_drawer", payload )
					
				},
      			get( ){
					return this.$store.state.nav_drawer
      			
				}

			},
			filter_holder: {
				set( payload ){
                    this.$store.commit( "filter_holder", payload )
					
				},
      			get( ){
					return this.$store.state.filter_holder
      			
				}

			},

			//map
			map_sources( ){
				return this.$store.state.map_sources
      			
			},

			//query control
			curr_qry_ctrl: {
				set( payload ){
                    this.$store.commit( "curr_qry_ctrl", payload )
					
				},
      			get( ){
					return this.$store.state.curr_qry_ctrl
      			
				}

			},

			//custom
			list_btn_tooltip( ){
				const _this = this

				if( _this.tabs[ _this.top_tab ].gauges.includes( "rain" ) ){
					return "Rain Gauge List"

				}else if( _this.tabs[ _this.top_tab ].gauges.includes( "stage" ) ){
					return "Stage & Lake List"

				}else if( _this.tabs[ _this.top_tab].gauges.includes( "cam" ) ){
					return "Creek Camera List"

				}
				
			}
			
      	},
      
      	watch: {
        	searchInput( val ){
				const _this = this

				if( val && val !== _this.srch_selection && val.length > 3 ){
					_this.cancelSearch( )
					_this.loading = true
					_this.getItems( val )
					
				}else{
					_this.search_results = [ ]
					_this.loading = false

				}
					
        	},
			
			srch_selection( new_selection, old_selection ){
				const _this = this

				if( _this.srch_selection ){
					document.activeElement.blur( )
													
				}
				
			},
	
      	},
      
      	methods: {
			getItems( srch_str ){
				const _this = this

      			_this.cancel_source = axios.CancelToken.source( )

				axios.all( 
					_this.getSearchList( srch_str )
						.map( srch => _this.axios_inst.get( `${ srch.url }?${ JSONToURL( srch.params ) }`, { cancelToken: _this.cancel_source.token } ) ) 
				)
					.then( 
						axios.spread( ( ...responses ) => {
							let search_results = [ ]

							responses.forEach( response => {
								search_results
									.push(...response.data
												.map( row=> { 
														return {
																"text": row.displaytext, 
																"value": Object.fromEntries( Object.entries( row ).filter( ( [ key ] ) => key != 'displaytext' ) )
															}

														} ) 

									)

							} )

							_this.search_results = search_results

						} )

					)
					.catch( thrown => {
							//handle errors
							if( axios.isCancel( thrown ) ){
								//console.log('Request canceled', thrown.message);
							
							}else{
								console.log( "parsing failed", thrown );
							
							}
						
						}


					)
					.finally( ( ) => {
						_this.loading = false
					
					} )
							
			},
			cancelSearch( ){
				const _this = this

      			if( _this.cancel_source ){
					_this.cancel_source.cancel( )

      			}
    		},
			
			clearResults( ){
				this.search_results = [ ];
        
        	},

			getSearchList( srch_str ){
				const _this = this

				let srch_list = [ ]

				//validate string and add corresponding searches to the list of searches to be made
				
				//address
				if( ValidateString( srch_str.substring( 0, srch_str.indexOf( " " ) - 1 ), "isNumeric" ) ){
					srch_list.push( GetSearchParams( "address", { 
						addr_num : srch_str.substring( 0, srch_str.indexOf( " " ) ), 
						address: srch_str 
					} ) )

				}

				//intersection		
						
				else if( ValidateString( srch_str, "isIntersection" ) ){
					const clean_search_str = srch_str.trim( ).split( /\s+/ ).map( part => ( part == "AND" ? "&" : part ) ).join( " " ),
						street1 = GetStandardizedAddr( clean_search_str.substring( 0, clean_search_str.indexOf( "&" ) ).trim( ), "intersection" ),
						street2 = GetStandardizedAddr( clean_search_str.substring( clean_search_str.indexOf( "&" ) + 1, clean_search_str.length ).trim( ), "intersection" )

					srch_list.push( GetSearchParams( "intersection", {
						street1: street1,
						street2: street2
					} ) )

				}

				else{
					//road
					srch_list.push( GetSearchParams( "road", { road: srch_str } ) )

					//park
					srch_list.push( GetSearchParams( "park", { park_name: srch_str } ) )

					//public_schools
					srch_list.push( GetSearchParams( "public_schools", { school_name: srch_str } ) )

					//charter_schools
					srch_list.push( GetSearchParams( "charter_schools", { school_name: srch_str } ) )

					//private_schools
					srch_list.push( GetSearchParams( "private_schools", { school_name: srch_str } ) )

					//library
					srch_list.push( GetSearchParams( "library", { library_name: srch_str } ) )

					//business
					srch_list.push( GetSearchParams( "business", { business_name: srch_str } ) )

					//bus_stop
					srch_list.push( GetSearchParams( "bus_stop", { bus_stop_name: srch_str } ) )

					//light_rail
					srch_list.push( GetSearchParams( "light_rail", { station_name: srch_str } ) )

				}

				return srch_list

			},

			getIcon( tag ){
				const lookup = {
						"ADDRESS": "mdi-mailbox",
						"INTERSECTION": "mdi-routes",
						"ROAD": "mdi-road-variant",
						"PARK": "mdi-pine-tree",
						"SCHOOL": "mdi-school",
						"LIBRARY": "mdi-library",
						"BUSINESS": "mdi-office-building",
						"BUS STOP": "mdi-bus",
						"LIGHT RAIL": "mdi-train-variant",
		
					}
						
				return lookup[ tag ] 
			},
      
      	}
  
  	}
</script>
<style scoped>
	
</style>