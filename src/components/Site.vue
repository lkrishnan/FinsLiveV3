<template>
    <v-card
        class="ma-3"
        outlined
    >
        <v-row
			no-gutters
			class="mx-2"
		>
            <v-col>
                dasda
            </v-col>
        </v-row>
        <v-row
            no-gutters
        >
            <v-col
                class="d-flex justify-start"
            >
                <v-tabs
                    v-model="site_tab" 
                    align-with-title
                    color="primary"
                    background-color="transparent"
                    light
                >
                    <v-tab
                        v-for="(tab, i) in site_tabs"
                        :key="'tab'+ i"
                    >
                        <v-icon>{{tab.icon}}</v-icon>
                       
                    </v-tab>
                    
                </v-tabs>

			</v-col>

        </v-row>    

  </v-card>

</template>

<script>
	export default{
      	name: "site",

		data: ( ) => ( {
            site_tab: 0,
			site_tabs: [
			    { label: "Graph", icon: "mdi-chart-bell-curve-cumulative", value: "graph", },
			    { label: "Tabular", icon: "mdi-file-table-box-outline", value: "tablular", },
			    { label: "Picture", icon: "mdi-panorama-outline", value: "picture", },
				
		    ],
      
		} ),
      
      	computed: {
			
      	},

		watch: {
            
		},

		methods: {
			

        },

  	}

</script>