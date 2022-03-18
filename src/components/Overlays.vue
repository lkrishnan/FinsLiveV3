<template>
    <div
        class="pa-5"
    >
        <v-switch
            v-for="(overlay, i) in overlays" 
            :key="'overlay' + i"
            v-model="overlay_switch"
            color="primary"
            :label=overlay.label
            :value=overlay.value
            class="ma-0"
        ></v-switch>

    </div>

</template>

<script>
    export default {
        name: "theoverlays",

         mounted: function( ){
            const _this = this

            _this.overlay_switch = _this.overlays
                                        .filter( obj => { return obj.switch === true } )
                                        .map( obj => obj.value )
        
        },

        computed: {
            overlay_switch: {
				set( overlay_switch ){
                    this.$store.commit( "overlay_switch", overlay_switch )
					
				},
      			get( ){
					return this.$store.state.overlay_switch
      			
				}

			},

            overlays: {
				set( overlays ){
                    this.$store.commit( "overlays", overlays )
					
				},
      			get( ){
					return this.$store.state.overlays
      			
				}

			},

        },

        watch: {
            overlay_switch( new_val, old_val ){
                const _this = this,
                    added = new_val.filter( x => !old_val.includes( x ) ),
                    removed = old_val.filter( x => !new_val.includes( x ) )

                _this.overlays.forEach( overlay => {
                    if( added.includes( overlay.value ) ){
                        overlay.switch = true
                    
                    }else if( removed.includes( overlay.value ) ){
                        overlay.switch = false

                    }

                } )

            },           

        },
        
    }
    
</script>

<style>
       
</style>