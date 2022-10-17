<template>
  	<div 
	  	:style="padding"
	>
		<v-card
			class="d-flex justify-center flex-wrap grey lighten-3"
			:class="card_margin"
			flat
		>
			<SiteCard
				v-for="dash_site in dash_sites"
        		:key="dash_site"
				:data="site_info[dash_site]"
			/>

		</v-card>

		<v-navigation-drawer
            id="dash_drawer" 
            v-model="dash_drawer" 
			absolute 
			temporary
			stateless 
			right 
			:width=drawer_width
            v-touch="{ left: ( ) => { dash_drawer=!dash_drawer } }"
            style="z-index: 5 !important;"
			:style="padding"

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
							@change="clearRefreshID( site.uniqueid )"
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

		components: {
            SiteCard: ( ) => import( /* webpackChunkName: "sitecard"*/"./SiteCard.vue" ),
        
        },

		mounted: function( ){
			const _this = this

			_this.getSiteList( )
          			        
        },
    
		computed: {
			//custom
            padding( ){
                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "padding-top:45px;"
                    default: return "padding-top:80px;"

                }
                 
            },

			drawer_width( ){
                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "100%"
                    default: return "432px"

                }
                 
            },

			card_margin( ){
				switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "my-3"
                    default: return "my-5"

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

			dash_refreshid( ){
				return this.$store.state.dash_refreshid
      			
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

			site_info( ){
				return gaugeInfo
			}
			                	
		},
    
		data: ( ) => ( {
			site_types: [ 
				{ label: "Rain Gauges", value: "rain" },
				{ label: "Stage Gauges", value: "stage" },
				{ label: "Low Cost Stage Gauges", value: "lcs" },
				{ label: "Lake Gauges", value: "lake" },
				{ label: "Creek Cameras", value: "camera" },

			], 
			sel_site_type: null,
			site_list: [ ],
			
  		} ),
    
		methods: {
			getSiteInfo( uniqueid ){
				return { ...gaugeInfo[ uniqueid ], ...{ readings_per_pg: 6 } }

            },

			getSiteList( ){
				const _this = this

				_this.site_types.forEach( site_type => {
					_this.site_list.push( ...Object.values( gaugeInfo )
												.filter( obj => obj.gauge_type.includes( site_type.value ) )
												.map( obj => { return { label: obj.label, uniqueid: obj.unique_id, type: obj.gauge_type, } } ) )

				} )

			},

			clearRefreshID( uniqueid ){
				const _this = this
				
				if( !_this.dash_sites.includes( uniqueid ) ){
					_this.$store.commit( "update_dash_refreshid", { [ uniqueid ]: window.clearInterval( _this.dash_refreshid[ uniqueid ] )  } )
					
				}
				
				

			}

    	},

  	}
</script>