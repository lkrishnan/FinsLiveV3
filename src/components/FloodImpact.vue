<template>
    <v-card
        class="ma-3 d-flex flex-wrap justify-center px-2 pb-2"
        outlined
        flat
    >
       <v-list-item one-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5">
                    Flood Impact
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        
        <v-card
            class="d-flex flex-wrap pa-2 justify-center"
            flat
            tile
        >
            <v-hover
                v-slot="{ hover }"
                open-delay="200"
                v-for="( item, i ) in flood_impact_details"
                :key="'impact'+i"
            >
                <v-card
                    class="pa-2 ma-2"
                    flat
                    outlined
                    rounded
                    width=100
                    :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    @click="panel=( panel==i ? -1 : i )"
                >
                <div class="d-flex justify-center pb-1">
                        <v-icon>
                            {{ item.icon }}
                        </v-icon>
                                        
                    </div>
                    <div class="d-flex justify-center grey--text text--darken-1 text-h4 ">
                        {{ item.rows.length }}
                                    
                    </div>
                    <div class="text-center grey--text text--darken-1 text-subtitle-2">
                        {{ item.type }}
                    </div>
                    
                </v-card>

            </v-hover>
        
        </v-card>

         <v-data-table
            :headers="( panel > -1 ? flood_impact_details[ panel ].headers : [ ] )"
            :items="( panel > -1 ? flood_impact_details[ panel ].rows : [ ] )"
            :items-per-page="5"
            class="elevation-1"
            v-show="panel > -1"
        ></v-data-table>

        <v-row
            v-show="panel > -1"
        >
            <v-col 
                class="d-flex justify-end align-center"
            >
                <v-btn 
                    outlined
                    class="mt-3 d-none d-lg-flex" 
                    color="primary"
                    @click="downloadData( )"
                >
                    <v-icon>mdi-download</v-icon>
                    Download Flood Impact
                </v-btn>
            </v-col>
        </v-row>
        
  </v-card>

</template>

<script>
    import CSVMaker from "../js/csvMaker"
    import DownloadData from "../js/downloadData"

    export default{
      	name: "FloodImpact",

        computed: {
			//map
            flood_impact_details( ){
                return this.$store.state.flood_impact_details
                
            },
            
      	},
        
        data: ( ) => ( {
            panel: -1,
                             
        } ),

		methods: {
            downloadData( ){
                const _this = this,
                    csvdata = CSVMaker(  _this.flood_impact_details[ _this.panel ].rows )

  				DownloadData( csvdata,  Math.floor( Math.random( ) * 100000 ) + ".csv" )

            }            

        }

  	}

</script>
