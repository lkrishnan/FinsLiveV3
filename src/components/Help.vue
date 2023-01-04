<template>
  	<div 
	  	:style="padding"
	>
		<div class="pa-10 d-flex justify-center">
			<!--<v-card
				class="d-flex justify-center mb-6"
				:class="card_margin"
				:data="data"
				:width="card_width"
				outlined
			>
				<v-expansion-panels>
					<v-expansion-panel
						v-for="( item,i ) in items"
						:key="i"
					>
						<v-expansion-panel-header>
							{{item.title}}
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</v-expansion-panel-content>

					</v-expansion-panel>

				</v-expansion-panels>
			</v-card>-->
			<v-card
				:width="card_width"
				outlined
			>
				<v-card-title class="text-center justify-center py-6">
				<h1 class="text-h5 font-weight-medium">
					How can we help you?
				</h1>
				</v-card-title>

				<v-tabs
					v-model="tab"
				>
					<v-tab>
						Tutorial Video
					</v-tab>
					<v-tab>
						How To
					</v-tab>
					<v-tab>
						Glossary
					</v-tab>
				</v-tabs>

				<v-tabs-items 
					v-model="tab"
				>
					<v-tab-item>
						<v-card
            				class="d-flex flex-wrap pa-10 justify-center"
            				flat
            				tile
        				>
							<iframe width="720" height="515" src="https://www.youtube.com/embed/xzWYFAp1D-8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</v-card>
					</v-tab-item>
      				<v-tab-item>
						<v-expansion-panels>
							<v-expansion-panel
								v-for="( item,i ) in items"
								:key="i"
							>
								<v-expansion-panel-header>
									{{item.title}}
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</v-expansion-panel-content>

							</v-expansion-panel>

						</v-expansion-panels>
        			</v-tab-item>

					<v-tab-item>
						<v-expansion-panels>
							<v-expansion-panel
								v-for="( item,i ) in items"
								:key="i"
							>
								<v-expansion-panel-header>
									{{item.title}}
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</v-expansion-panel-content>

							</v-expansion-panel>

						</v-expansion-panels>
        			</v-tab-item>
					
    			</v-tabs-items>

				
  			</v-card>

		</div>
    	
  	</div>
</template>
<script>
  	export default{
    	name: "theHelp",
    
		computed: {
      		//custom
            padding( ) {
                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "padding-top:0px;"
                    default: return "padding-top:90px;"

                }
                 
            },

			card_width( ){
                const _this = this

                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": 
                        return "100%"
                    default: 
                        return "960"

                }
                 
            },

			card_margin( ){
				switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "my-3"
                    default: return "my-5"

                }

			},
                	
		},
    
		watch: {
      		
    
		},

		data: ( ) => ( {
			items: [ 
				{ title: "Popular Topics" } 
			
			],
			tab: null,

  		} ),
    
		methods: {
      		
    	}

  	}
</script>