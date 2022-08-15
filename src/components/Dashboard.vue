<template>
  	<div 
	  	:style="padding"
	>
		<v-card
			class="d-flex justify-center mb-6 flex-wrap"
			flat
			tile
		>
			<v-card
				v-for="(dash_site, n) in dash_sites"
        		:key="'dash_site' + n"
				class="pa-2 ma-5"
				:width=drawer_width
				outlined
			>
				<v-row
					no-gutters
				>
					<v-col
						class="d-flex justify-start text-subtitle-1 font-weight-medium pa-2 accent primary--text"
					>
						{{dash_site}}
					</v-col>
				</v-row>
			</v-card>
		</v-card>

		 <v-navigation-drawer
            id="dash_drawer" 
            v-model="dash_drawer" 
			absolute 
			:permanent="dash_drawer" 
			stateless 
			right 
			:width=drawer_width
            v-touch="{ left: ( ) => { dash_drawer=!dash_drawer } }"
            style="z-index: 5 !important; padding-top: 80px;"

        >
			 <v-container fluid>
				<v-row>
					<v-col
						class="d-flex"
						cols="12"
					>
						<v-select
							v-model="sel_site_type"
							:items="site_types"
							item-text="label"
          					item-value="value"
							label="Filter Sites"
						></v-select>

					</v-col>
      				
    			</v-row>

				<v-row
					v-for="(site, n) in site_list"
					:key="'site'+ n"
					no-gutters
					v-show="site.type===sel_site_type"
				>
					<v-col
						cols="12"
					>
						<v-checkbox
							v-model="dash_sites"
							:label=site.label
							:value=site.uniqueid
							:disabled="dash_sites.length>dash_limit-1 && !dash_sites.includes(site.uniqueid)"
						></v-checkbox>
					</v-col>
					
				</v-row>

  			</v-container>

		</v-navigation-drawer>
    	
  	</div>
</template>

<script>
	import gaugeInfo from "../assets/gauge_info.json"

  	export default{
    	name: "theDashboard",

		mounted: function( ){
			const _this = this

			_this.getSiteList( )
            _this.updateDash( )
			        
        },
    
		computed: {
			tabs( ){
				return this.$store.state.tabs

			},

      		//custom
            padding( ){
                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "padding-top:70px;"
                    default: return "padding-top:90px;"

                }
                 
            },

			drawer_width( ){
                 switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "100%"
                    default: return "432px"

                }
                 
            },

			//query control			
			dash_sites: {
				set( payload ){
                    this.$store.commit( "dash_sites", payload )
					
				},
      			get( ){
					return this.$store.state.dash_sites
      			
				}
							
			},

			dash_limit( ){
				return this.$store.state.dash_limit
      			
			},

			 //toggles
            dash_drawer: {
				set( payload ){
                    this.$store.commit( "dash_drawer", payload )
					
				},
      			get( ){
					return this.$store.state.dash_drawer
      			
				}

			},
			                	
		},
    
		watch: {
      		dash_sites( ){
				const _this = this

				_this.updateDash( )	
			}
    
		},

		data: ( ) => ( {
			cards: [
				{ title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
				{ title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
				{ title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
			],
			site_types: [ 
				{ label: "Rain Gauges", value: "rain" },
				{ label: "Stage Gauges", value: "stage" },
				{ label: "Low Cost Stage Gauges", value: "lcs" },
				{ label: "Lake Gauges", value: "lcs" },
				{ label: "Creek Cameras", value: "camera" },

			], 
			sel_site_type: null,
			site_list: [ ],
			test: [ ]
			
  		} ),
    
		methods: {
      		updateDash( ){
				console.log( "update the dashboard" )
			},

			getSiteList( ){
				const _this = this

				_this.site_types.forEach( site_type => {
					_this.site_list.push( ...Object.values( gaugeInfo )
												.filter( obj => obj.gauge_type.includes( site_type.value ) )
												.map( obj => { return { label: obj.label, uniqueid: obj.unique_id, type: obj.gauge_type, } } ) )

				} )

			},

    	}

  	}
</script>