<template>
	<v-app>
		<v-container 
  			fluid
			style="margin: 0; position: absolute; left: 0px; top: 0px; z-index: 1;"
			class="pa-0"
		>
			<v-card
				color="background"
				class="d-none d-sm-flex"
			>
				<v-row
					no-gutters
					class="mx-2"
				>
					<v-col
						class="d-flex align-center flex-grow-0 flex-shrink-0"
					>
						<v-btn
							icon
							color="primary"
							@click="nav_drawer = !nav_drawer"
						>
							<v-icon>mdi-menu</v-icon>
						</v-btn>
					</v-col>
					<v-col
						class="d-flex align-center flex-grow-0 flex-shrink-0 ml-8 my-2"
					>
						
						<v-img
							alt="Vuetify Name"
							src="./assets/finslive_logo.png"
							max-width="140"
						/>
					</v-col>
					<v-col
						class="d-flex align-end"
					>
						<v-tabs
							v-model="top_tab" 
							align-with-title
							color="primary"
							background-color="transparent"
							light
							@change="takeAction('TopTab')"
						>
							<v-tab
								v-for="(tab, i) in tabs"
                				:key="'tab'+i"
							>
								<v-icon class="d-none d-md-flex">{{tab.icon}}</v-icon>
								&nbsp;{{tab.label[ 0 ]}}<span class="d-none d-md-flex">&nbsp;{{tab.label[ 1 ]}}</span>
							</v-tab>
							
						</v-tabs>
					</v-col>
					<v-col
						class="d-flex justify-end align-center flex-grow-0 flex-shrink-0"
					>
						<v-btn 
							outlined
							class="ma-2 d-none d-lg-flex" 
							color="primary"
						>
								<v-icon>mdi-download</v-icon>
								Data
						</v-btn>

						<v-btn 
							outlined
							class="ma-2 d-none d-lg-flex" 
							color="primary"
						>
								<v-icon>mdi-help</v-icon>
								Help
						</v-btn>

						<v-btn 
							outlined
							class="ma-2 d-none d-lg-flex" 
							color="primary"
						>
								<v-icon>mdi-information-variant</v-icon>
								About
						</v-btn>

						<v-btn 
							outlined
							class="ma-2 d-none d-lg-flex"  
							color="primary"
						>
								<v-icon>mdi-login</v-icon>
								Login
						</v-btn>
					</v-col>
				</v-row>
				
			</v-card>
			
		</v-container>

		<v-navigation-drawer
			v-model="nav_drawer"
      		absolute
      		temporary
			style="z-index: 7 !important;"
			width="280"
    	>
			<v-row 
            	class="d-flex justify-space-between pa-5"
        	>
				<v-col
					class="d-flex align-center text-h6"
				>
					<span class="primary--text">Polaris 3G</span>
			
				</v-col>

				<v-col
					class="d-flex justify-end"
				>
					<v-btn
						icon
						color="primary"
						@click="nav_drawer=!nav_drawer"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
			
				</v-col>
        
        	</v-row>

        	<v-divider />
        
      		<v-list
				nav
        		dense
			>
				<v-list-item-group
					v-model="nav_item"
					color="primary"
				>
					<v-list-item
						v-for="(item, i) in nav_items"
						:key="i"
						@click="takeAction( item.action )"
					>
						<v-list-item-icon>
							<v-icon v-text="item.icon"></v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="item.text"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
            	</v-list>
    	</v-navigation-drawer>

		<v-main>
			<router-view/>
		</v-main>

		<v-bottom-navigation
			color="secondary"
			class="d-flex d-sm-none"
			fixed
		>
			<v-btn>
				Rain Gauge
				<v-icon>mdi-weather-rainy</v-icon>
			</v-btn>

			<v-btn>
				<span>Stage Gauge</span>
				<v-icon>mdi-wave</v-icon>
			</v-btn>

			<v-btn>
				<span>Creek Cam</span>
				<v-icon>mdi-camera-enhance-outline</v-icon>
			</v-btn>

  		</v-bottom-navigation>
		
	</v-app>
</template>

<script>

export default {
  	name: "App",

	computed: {
		top_tab: {
			set( top_tab ){
				this.$store.commit( "top_tab", top_tab )
				
			},
			get( ){
				return this.$store.state.top_tab
			
			}

		},
		tabs( ){
			return this.$store.state.tabs
			
		}

	},

	watch: {
		

    },  

  	data: ( ) => ( {
		//hamburger menu navigation menu
		nav_drawer: false,
	  	nav_items: [
				{ text: "Help", icon: "mdi-help", action: "Help" },
				{ text: "About", icon: "mdi-information-variant", action: "About" },
        		{ text: "Data Download", icon: "mdi-download", action: "Download" },
        		{ text: "Login", icon: "mdi-login", action: "Login" },
						      	
		],
		nav_item: -1
    
  	} ),

  	methods: {
        takeAction( action ){
          	const _this = this
			  
			switch( action ){
				case "Help":
					console.log( action )

					break

				case "About":
					console.log( action )

					break

				case "TopTab":
					switch( _this.top_tab ){
						case 0: case 1:
							_this.$router.push( { name: "AllPeriod", params: { 
									gauges: _this.tabs[ _this.top_tab ].gauges.join( "," ), 
									period: "P1D"
								} } )
							break
						case 2:
							_this.$router.push( { name: "Camera" } )
							break

					}
										
					break

				default:
					console.log( action )
					break

			}
 
		},
		
    }

}
</script>

<style>
	
</style>
