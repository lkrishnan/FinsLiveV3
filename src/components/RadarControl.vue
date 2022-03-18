<template>
	<v-card
		class="px-2 subtitle-2"
		color="white"
	>
		<v-toolbar
			flat
			dense
		>
			<v-toolbar-title>
				<span class="subheading">Weather Radar</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<!-- Closes radar loop control and also removed weather radar layer  -->
			<v-btn
				icon
				color="secondary"
				@click="overlay_switch = overlay_switch.filter( overlay => overlay !== 'radar' )"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			
		</v-toolbar>

			<v-card-text>
			<v-row
				class="mb-1"
				justify="space-between"
			>
				<v-col class="text-left">
					<span
						class="text-h3 font-weight-light"
						v-text="( radar_tick < 12 ? 60 - ( radar_tick * 5 ) : 'Now' )"
					></span>
					<span class="subheading font-weight-light mr-1">{{ radar_tick === 12 ? "" : "Minutes Ago" }}</span>
				</v-col>
				<v-col class="text-right">
					<v-btn
						:color="(radar_plyng ? 'red' : 'primary')"
						dark
						depressed
						fab
						@click="radarAnimate"
					>
						<v-icon large>
						{{ radar_plyng ? 'mdi-pause' : 'mdi-play' }}
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			
			<v-slider
				v-model="radar_tick"
				max="12"
				step="1"
				ticks="always"
				tick-size="4"
			>
			</v-slider>
	
		</v-card-text>

	</v-card>
	
</template>

<script>
	import Moment from "moment"

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
                        start: Moment( ).subtract( 60 - ( _this.radar_tick * 5 ), "minutes" ).valueOf( ),
                        end: Moment( ).subtract( 60 - ( _this.radar_tick * 5 ), "minutes" ).valueOf( ),

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
                        console.log( _this.radar_tick )

				    }, 1500 )

                }

                //invert value
                _this.radar_plyng = !_this.radar_plyng
                
            },

		}

  
  	}
</script>