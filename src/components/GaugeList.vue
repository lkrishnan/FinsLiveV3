<template>
	<v-card
		class="py-0 px-2 d-flex align-center"
	>
		<!-- Button to show navigation drawer -->
		<v-app-bar-nav-icon
			color="primary"
			class="d-md-none mr-2"
			@click.stop="nav_drawer = !nav_drawer"
		>
		</v-app-bar-nav-icon>

		<!-- Gauge/Camera list combobox -->
		<v-combobox
			v-model="sel_gauge_cam"
			:items="list"
			:label=combobox_label
			data-cy="gauge_select"
			hide-details
			class="body-2"
		>
		</v-combobox>

		<!-- Button to switch map search control -->
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					icon
					color="primary"
					@click="curr_qry_ctrl='map_search'"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>mdi-map-search</v-icon>
				</v-btn>
			</template>
			<span>Location Search</span>
		</v-tooltip>

		<!-- Button to switch to filter control -->
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					icon
					color="primary"
					v-show="[ 0, 1 ].includes( top_tab ) && !filter_holder"
					@click="onFilterSwitchClick()"
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
	import GetNewRoute from "../js/getNewRoute"

  	export default {
      	name: "gaugecamlist",

		mounted: function( ){
            const _this = this

            _this.setList( )
        
        },  

		computed: {
			//app
			top_tab( ){
				return this.$store.state.top_tab
			
			},
			tabs( ){
				return this.$store.state.tabs
			
			},
			gauge_info(){
				return this.$store.state.gauge_info
			},

			//map
			zoom_to_gauge: {
                set( payload ){
                    this.$store.commit( "zoom_to_gauge", payload )
					
				},
      			get( ){
					return this.$store.state.zoom_to_gauge
      			
				}

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

			route_path( ){ //query string
				return this.$route.path
			
            },

			sel_gauge_cam: {
				set( payload ){
                    this.$store.commit( "sel_gauge_cam", payload )
					
				},
      			get( ){
					return this.$store.state.sel_gauge_cam
      			
				}

			},

			curr_qry_ctrl: {
				set( payload ){
                    this.$store.commit( "curr_qry_ctrl", payload )
					
				},
      			get( ){
					return this.$store.state.curr_qry_ctrl
      			
				}

			},
						
			//custom
			combobox_label( ){
				const _this = this

				if( _this.tabs[ _this.top_tab ].gauges.includes( "rain" ) ){
					return "Select Rain Gauge"

				}else if( _this.tabs[ _this.top_tab ].gauges.includes( "stage" ) ){
					return "Select Stage/Lake Gauge"

				}else if( _this.tabs[ _this.top_tab].gauges.includes( "cam" ) ){
					return "Select Creek Camera"

				}
				
			}

      	},

		watch: {
            //change in query string
            sel_gauge_cam( new_val, old_val ){
				if( new_val ){ //change route only when a valid selection is made
					const _this = this,
						new_route = GetNewRoute( { uniqueid: new_val.value } )
					
					//go to new route
					if( new_route ){
						_this.zoom_to_gauge = true
						_this.$router.push( new_route )

					}

				}
													
      		},

			route_path( new_val ){
				this.setList( )

			}

		},

		data: ( ) => ( {
			list: [ ],
			
      	} ),

		methods: {
            setList( ){
                const _this = this,
					name = _this.$router.currentRoute.name,
                    params = _this.$router.currentRoute.params

				let gauge_cam_arr = null
					
				switch( name ){
                   case "AllPeriod": case "SelectedPeriod": case "AllRange": case "AllDatePeriod": case "SelectedRange": case "SelectedDatePeriod":
                        gauge_cam_arr = params.gauges.split( "," ).map( gauge => gauge.trim( ).toLowerCase( ) )

						break

                    case "AllCamera": case "SelectedCamera":
                        gauge_cam_arr = [ "camera" ]

                        break

                }

				_this.list = Object.values( _this.gauge_info )
										.filter( obj => gauge_cam_arr.includes( obj.gauge_type ) )
										.map( obj => { return { 
											text: obj.label, 
											value: obj.unique_id,
										
										} } )

				//set gauge list choice based on query parameter
				if( !_this.sel_gauge_cam !== params.uniqueid  && name.search( /Selected/ ) > -1 ){
					_this.sel_gauge_cam = { text: _this.gauge_info[ params.uniqueid ].label, value: params.uniqueid  }

				}else if( name.search( /All/ ) > -1 ){
					_this.sel_gauge_cam = null

				}
                                
            },

			onFilterSwitchClick( ){
				const _this = this

				_this.filter_holder = true
				_this.info_drawer = true

			},

		}
      
  	}
</script>