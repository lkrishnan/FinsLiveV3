<template>
  	<div 
	  	:style="padding"
	>
		<div class="pa-10">
			<h1>This is dashboard</h1>
		</div>
    	
  	</div>
</template>
<script>
  	export default{
    	name: "theDashboard",
    
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