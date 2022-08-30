<template>
	<v-app>
		<v-container 
  			fluid
			style="margin: 0; position: absolute; left: 0px; top: 0px; z-index: 7;"
			class="pa-0"
		>
			<v-card
				color="background"
				v-if="!is_mobile || ( is_mobile && ![ 'AllPeriod', 'SelectedPeriod', 'AllRange', 'SelectedRange', 'AllDatePeriod', 'SelectedDatePeriod', 'AllCamera', 'SelectedCamera'  ].includes( route_name ) )"
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
							v-if="!is_mobile"
						/>
						<div
							width="140"
							v-if="is_mobile && ![ 'AllPeriod', 'SelectedPeriod', 'AllRange', 'SelectedRange', 'AllDatePeriod', 'SelectedDatePeriod', 'AllCamera', 'SelectedCamera'  ].includes( route_name )"
						>
							FINS Live
						</div>
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
							@change="takeAction('Tab')"
							v-if="[ 'AllPeriod', 'SelectedPeriod', 'AllRange', 'SelectedRange', 'AllDatePeriod', 'SelectedDatePeriod', 'AllCamera', 'SelectedCamera'  ].includes( route_name )"
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
							color="purple darken-2"
							@click="takeAction( 'GaugeCam' )"
							v-if="![ 'AllPeriod', 'SelectedPeriod', 'AllRange', 'SelectedRange', 'AllDatePeriod', 'SelectedDatePeriod', 'AllCamera', 'SelectedCamera'  ].includes( route_name )"
						>
							<v-icon class="d-none d-md-flex">{{tabs[top_tab].icon}}</v-icon>
							&nbsp;{{tabs[top_tab].label[ 0 ]}}<span class="d-none d-md-flex">&nbsp;{{tabs[top_tab].label[ 1 ]}}</span>
						</v-btn>

						<v-btn 
							outlined
							class="ma-2 d-none d-lg-flex" 
							color="brown darken-2"
							v-if="( top_tab !== 2 ) && [ 'AllPeriod', 'SelectedPeriod', 'AllRange', 'SelectedRange', 'AllDatePeriod', 'SelectedDatePeriod', 'AllCamera', 'SelectedCamera'  ].includes( route_name )"
							@click="takeAction('DownloadData')"
						>
								<v-icon>mdi-download</v-icon>
								Data
						</v-btn>

						<v-btn 
							outlined
							class="ma-2 d-none d-lg-flex" 
							color="blue"
							@click="takeAction('Help')"
							v-if="( route_name !== 'Help' )"
						>
								<v-icon>mdi-help</v-icon>
								Help
						</v-btn>

						<v-badge
							:content="(dash_sites.length + '')"
							offset-x="20"
							offset-y="20"
							color="purple darken-2"
							v-if="( route_name !== 'Dashboard' )"
						>
							<v-btn 
								outlined
								class="ma-2 d-none d-lg-flex" 
								color="purple darken-2"
								@click="takeAction('Dashboard')"
								v-if="( route_name !== 'Dashboard' )"
							>
								<v-icon>mdi-view-dashboard</v-icon>
								Dashboard
							</v-btn>
						</v-badge>

						<v-btn 
							outlined
							class="ma-2 d-none d-lg-flex"  
							color="amber darken-2"
							@click="takeAction('Login')"
							v-if="( auth === '' )"
						>
								<v-icon>mdi-login</v-icon>
								Login
						</v-btn>

						<v-btn 
							outlined
							class="ma-2 d-none d-lg-flex"  
							color="primary"
							@click="takeAction('Logout')"
							v-if="( auth !== '' )"
						>
								<v-icon>mdi-login</v-icon>
								Logout
						</v-btn>

						<v-btn
							class="mx-2"
							fab
							dark
							color="primary"
							:small="[ 'sm', 'xs' ].includes( $vuetify.breakpoint.name )"
							@click="dash_drawer=!dash_drawer"
							v-if="( route_name === 'Dashboard' )"
						>
							<v-icon dark>
								{{'mdi-' + ( dash_drawer ? 'close' : 'plus' )}}
							</v-icon>
						</v-btn>
						
					</v-col>
				</v-row>
				
			</v-card>
			
		</v-container>

		<v-navigation-drawer
			v-model="nav_drawer"
      		absolute
      		temporary
			style="z-index: 8 !important;"
			width="280"
    	>
			<v-row 
            	class="d-flex justify-space-between pa-5"
        	>
				<v-col
					class="d-flex align-center text-h6"
				>
					<span class="primary--text">Fins Live</span>
			
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

		<v-main
			class="grey lighten-3"
		>
			<router-view/>
			
		</v-main>

		<v-snackbar bottom right :value="updateExists" :timeout="-1" color="primary">
    		An update is available
    		<v-btn text @click="refreshApp">Update</v-btn>
  		</v-snackbar>  

	</v-app>

</template>

<script>
import GetNewRoute from "./js/getNewRoute"
import CSVMaker from "./js/csvMaker"
import DownloadData from "./js/downloadData"

export default {
  	name: "App",

	mounted: function( ){
            //set the tab selectipn basedon the route
            this.parseRoute( )
        
        },

	computed: {
		nav_drawer: {
			set( nav_drawer ){
				this.$store.commit( "nav_drawer", nav_drawer )
				
			},
			get( ){
				return this.$store.state.nav_drawer
			
			}

		},
		dash_drawer: {
			set( dash_drawer ){
				this.$store.commit( "dash_drawer", dash_drawer )
				
			},
			get( ){
				return this.$store.state.dash_drawer
			
			}

		},
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
			
		},
		route_name( ){
           	return this.$route.name
			
        },
		route_path( ){ //query string
			return this.$route.path
		
		},
		last_route: {
			set( payload ){
				this.$store.commit( "last_route", payload )
				
			},
			get( ){
				return this.$store.state.last_route
			
			}

		},
		last_gauge_cam_route( ){
			return this.$store.state.last_gauge_cam_route

		},
		is_mobile( ){
			switch( this.$vuetify.breakpoint.name ){
				case "xs": case "sm": return true
				default: return false

			}

		},
				
		//map
		gauge_data( ){
			return this.$store.state.gauge_data

		},

		//query_control
		sel_gauge_cam: {
			set( payload ){
				this.$store.commit( "sel_gauge_cam", payload )
				
			},
			get( ){
				return this.$store.state.sel_gauge_cam
			
			}

		},

		dash_sites( ){
			return this.$store.state.dash_sites
									
		},

		//login
		auth: {
			set( token ){
                this.$store.commit( "auth", token )
                    
            },
            get( ){
            	return this.$store.state.token
            }

		},

	},

	created( ){
		// Listen for our custom event from the SW registration
		document.addEventListener( "swUpdated", this.updateAvailable, { once: true } )
		
		// Prevent multiple refreshes
		if( "serviceWorker" in navigator ){
			navigator.serviceWorker.addEventListener( "controllerchange", ( ) => {
				if( this.refreshing ) 
					return
				this.refreshing = true
				// Here the actual reload of the page occurs
				window.location.reload( )
		
			} )
		}

	},

	watch: {
		 //custom
		route_path( ){ //change in query string
			const _this = this

			_this.parseRoute( )
		
		},

    },  

  	data: ( ) => ( {
		//hamburger menu navigation menu
		nav_items: [
						      	
		],
		nav_item: -1,

		// refresh variables
		refreshing: false,
		registration: null,
		updateExists: false,

  	} ),

  	methods: {
		setNavItems( name ){
			const _this = this,
				all = [ 
						{ text: "Gauge/Camera", icon: "mdi-gauge", action: "GaugeCam", },
						{ text: "Dashboard", icon: "mdi-view-dashboard", action: "Dashboard", },
						{ text: "Help", icon: "mdi-help", action: "Help", },
						{ text: "Data Download", icon: "mdi-download", action: "Download", },
						{ text: "Login", icon: "mdi-login", action: "Login", },

					]

			switch( name ){
					case "AllPeriod": case "SelectedPeriod": 
				   	case "AllRange": case "SelectedRange": 
				   	case "AllDatePeriod": case "SelectedDatePeriod":
					case "AllCamera": case "SelectedCamera":
					_this.nav_items = all.filter( item => item.action != "GaugeCam" )
					break
				case "Dashboard":
					_this.nav_items = all.filter( item => item.action != "Dashboard" )
					break
				case "Help":
					_this.nav_items = all.filter( item => item.action != "Help" )
					break
				case "Login":
					_this.nav_items = all.filter( item => item.action != "Login" )
					break

			}

		},
		parseRoute( ){
                const _this = this,
                    name = _this.$router.currentRoute.name,
                    params = _this.$router.currentRoute.params

				let temp_tab = -1

				switch( name ){
                   	case "AllPeriod": case "SelectedPeriod": 
				   	case "AllRange": case "SelectedRange": 
				   	case "AllDatePeriod": case "SelectedDatePeriod":
						_this.tabs.forEach( ( tab, idx ) => {
							//check if all gauges included in the URL are in the acceptable tabs
							if( tab.gauges.every( r => params.gauges.split( "," ).includes( r ) ) ){
								temp_tab = idx

							}

						} )
						break

					case "AllCamera": case "SelectedCamera":
						if( _this.top_tab != 2 ){
							temp_tab = 2

						}
						break

                }

				if( temp_tab > 0 && temp_tab != _this.top_tab ){
					_this.top_tab = temp_tab

				}

				//set the items in the hamburgurer button's navigation drawer
				_this.setNavItems( name )

        },

        takeAction( action ){
          	const _this = this
			  
			switch( action ){
				case "GaugeCam":
					_this.last_route =  { name: this.$router.currentRoute.name, params: _this.$router.currentRoute.params }
					_this.$router.push( _this.last_gauge_cam_route )
					break

				case "Help":
					_this.$router.push( { name: action } )
					break

				case "DownloadData":
					DownloadData( CSVMaker( _this.gauge_data ),  Math.floor( Math.random( ) * 100000 ) + ".csv" )
					break

				case "Dashboard":
					_this.$router.push( { name: action } )
					break

				case "Login":
					_this.$router.push( { name: action } )
					break

				case "Logout":
					localStorage.removeItem( "token" )
          			_this.auth = ""
					break

				case "Tab":
					_this.sel_gauge_cam = null
					_this.$router.push( GetNewRoute( { gauges: _this.tabs[ _this.top_tab ].gauges.join( "," ) } ) )
					break

				default:
					console.log( action )
					break

			}
 
		},

		// Store the SW registration so we can send it a message
		// We use `updateExists` to control whatever alert, toast, dialog, etc we want to use
		// To alert the user there is an update they need to refresh for
		updateAvailable( event ){
			this.registration = event.detail
			this.updateExists = true
		
		},
		
		// Called when the user accepts the update
		refreshApp( ){
			console.debug("refreshing app")
			this.updateExists = false

			// Make sure we only send a 'skip waiting' message if the SW is waiting
			if( !this.registration || !this.registration.waiting ) 
				return
			// send message to SW to skip the waiting and activate the new SW
			this.registration.waiting.postMessage( { type: 'SKIP_WAITING' } )

		},
		
    }

}
</script>

<style>
	html { overflow-y: auto; }
</style>
