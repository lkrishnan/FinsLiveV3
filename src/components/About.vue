<template>
	<div
		class="px-4 pb-2"
	>
		<v-row>
			<v-col
				class="subtitle-2 px-3 pt-2 pb-0"
			>
				Charlotte-Mecklenburg Storm Water Services
			</v-col>
		</v-row>
		<v-row>
			<v-col
				class="body-2 pb-0"
			>
				​​​​​​​​​​​​​Established in the early 1990’s, Charlotte-Mecklenburg Storm Water Services is a joint municipal/county stormwater utility that includes the City of Charlotte, the surrounding towns of Cornelius, Davidson, Huntersville, Matthews, Mint Hill and Pineville and Mecklenburg County.
			</v-col>
		</v-row>
		<v-row>
          	<v-col
            	cols="12"
				class="py-0 px-2"
			>
				<v-btn
					icon
					color="grey darken-2"
					large
					class="px-2 py-0"
					href="https://charlottenc.gov/StormWater"
					target="_blank"
				>
					<v-icon>mdi-web</v-icon>
				</v-btn>

				<v-btn
					icon
					color="blue"
					large
					class="px-2 py-0"
					href="https://twitter.com/StormWaterCM"
					target="_blank"
				>
					<v-icon>mdi-twitter</v-icon>
				</v-btn>
				
				<v-btn
					icon
					color="indigo"
					large
					class="px-2 py-0"
					href="https://www.facebook.com/StormWaterCM/"
					target="_blank"
				>
					<v-icon>mdi-facebook</v-icon>
				</v-btn>
				<v-btn
					icon
					color="pink"
					large
					class="px-2 py-0"
					href="https://www.instagram.com/stormwatercm/"
					target="_blank"
				>
					<v-icon>mdi-instagram</v-icon>
				</v-btn>
				<v-btn
					icon
					color="red"
					large
					class="px-2 py-0"
					href="https://www.youtube.com/user/StormWaterServices"
					target="_blank"
				>
					<v-icon>mdi-youtube</v-icon>
				</v-btn>
          	</v-col>

        </v-row>

		<v-row>
			<v-col
				class="subtitle-2 px-3 pt-2 pb-0"
			>
				Mecklenburg County GIS
			</v-col>
		</v-row>
		<v-row>
			<v-col
				class="body-2"
			>
				​Mecklenburg County GIS's mission is to provide quality geospatial data and technology solutions, empowering customers of Mecklenburg County to make data-driven decisions.
			</v-col>
		</v-row>
		<v-row>
          	<v-col
            	cols="12"
				class="py-0 px-2"
			>
				<v-btn
					icon
					color="grey darken-2"
					large
					class="px-2 py-0"
					href="https://www.mecknc.gov/LUESA/GIS"
					target="_blank"
				>
					<v-icon>mdi-web</v-icon>
				</v-btn>

				<v-btn
					icon
					color="blue"
					large
					class="px-2 py-0"
					href="https://twitter.com/MeckGIS"
					target="_blank"
				>
					<v-icon>mdi-twitter</v-icon>
				</v-btn>
				
          	</v-col>

        </v-row>
	</div>
	  	    	
</template>
<script>
  	export default{
    	name: "theAbout",
    
		computed: {
      		//custom
            padding( ) {
                switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "padding-top:0px;"
                    default: return "padding-top:90px;"

                }
                 
            },
                	
		},
    
		watch: {
      		
    
		},

		data: ( ) => ( {
			
  		} ),
    
		methods: {
      		
    	}

  	};
</script>