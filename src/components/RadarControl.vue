<template>
	<v-card
		class="px-2 subtitle-2"
		color="white"
	>
		<v-row 
			class="d-flex justify-space-between pl-2 py-0"
		>
			<v-col
				class="d-flex align-center text-h6"
				cols="11"
			>
				<span class="secondary--text">Weather Radar</span>
		
			</v-col>

			<v-col
				class="d-flex justify-end"
				cols="1"
			>
				<v-btn
					icon
					color="secondary"
					@click="overlay_switch = overlay_switch.filter( overlay => overlay !== 'radar' )"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
		
			</v-col>
        
        </v-row>

		<v-card-text
			class="px-4 py-0"
		>
			<v-slider
				v-model="radar_tick"
				:prepend-icon="radar_plyng ? 'mdi-pause' : 'mdi-play'"
				:label="String( 60 - ( radar_tick * 5 ) ).padStart(2, '0') + ' mins ago'"
				max="12"
				step="1"
				ticks="always"
				tick-size="4"
				@click:prepend="radarAnimate"
			>
			</v-slider>
			
		</v-card-text>

	</v-card>
	
</template>

<script>
	import { SubtractFromDate } from "../js/vanillaMoment"

	export default{
      	name: "radarControl",

		data: ( ) => ( {
			//weather radar
            radar_tick: 12,
            radar_plyng: false,
            radar_loop: null,
      
		} ),
      
      	computed: {
			//toggles
			overlay_switch: {
				set( overlay_switch ){
                    this.$store.commit( "overlay_switch", overlay_switch )
					
				},
      			get( ){
					return this.$store.state.overlay_switch
      			
				}

			},

			//map
            map_sources: {
				set( payload ){
                    this.$store.commit( "map_sources", payload )
					
				},
      			get( ){
					return this.$store.state.map_sources
      			
				}

			},

      	},

		watch: {
        	//local
            radar_tick( ){
                const _this = this

                _this.map_sources.radar.timeExtent = {
					start: SubtractFromDate( ( 60 - ( _this.radar_tick * 5 ) ), "minutes", new Date( ), true ),
					end: SubtractFromDate( ( 60 - ( _this.radar_tick * 5 ) ), "minutes", new Date( ), true ),

				}

            },

		},

		methods: {
			radarAnimate( ){
                const _this = this

                if( _this.radar_plyng ){
                    //stop loop
                    window.clearInterval( _this.radar_loop )

                }else{
                    //start 1 second loop
                    _this.radar_loop = self.setInterval( ( ) => {
                        _this.radar_tick = ( _this.radar_tick < 12 ? ( _this.radar_tick + 1 ) : 0 )
                        
				    }, 1500 )

                }

                //invert value
                _this.radar_plyng = !_this.radar_plyng
                
            },

		}

  
  	}
</script>