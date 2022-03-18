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

		<!-- Gauge/Camera list combobox -->
		<v-combobox
			v-model="sel_gauge_cam"
			:items="gauge_cam_list"
			:label=combobox_label
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
	import GetNewRoute from "../js/getNewRoute"

  	export default {
      	name: "gaugelist",

		data: ( ) => ( {
			sel_gauge_cam: null,

      	} ),
      
      	computed: {
			//app
			top_tab( ){
				return this.$store.state.top_tab
			
			},
			tabs( ){
				return this.$store.state.tabs
			
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

			//query control
			gauge_cam_list( ){
				return this.$store.state.gauge_cam_list

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
            route_path( ){
                const _this = this

            },

			sel_gauge_cam( new_val, old_val ){
				const _this = this,
					new_route = GetNewRoute( { site: new_val.value.site_id, } )

				console.log( new_route )

				//go to new route
				if( new_route ){
					_this.$router.push( new_route )

				}

      		},

		},
      
  	}
</script>
<style scoped>
	
</style>