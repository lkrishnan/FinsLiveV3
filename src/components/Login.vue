<template>
	<div
		:style=padding
	>
		<v-row 
			class="d-flex justify-center"
		>
      		<v-col
				lg="3"
				md="4" 
			  	sm="6"
			  	class="pa-10"
			>
				<v-card 
					outlined 
					v-model="progress.login" 
					:disabled="(progress.login === 1)"
					
				> 
					<v-form>
						<v-container 
							class="pa-4"
						>
							<v-text-field 
								v-model="userName" 
								label="User Name"
								:error-messages="userNameErrors"
								@input="$v.userName.$touch( )"
								@blur="$v.userName.$touch( )" 
								required>
							</v-text-field>
							<v-text-field 
								v-model="password" 
								label="Password"
								:type="'password'"
								:error-messages="passwordErrors"
								@input="$v.password.$touch( )"
								@blur="$v.password.$touch( )"  
								required>
							</v-text-field>
							<v-row class="my-1">
								<v-btn @click="login" outlined color="primary"  class="ml-4">Login</v-btn>
								<v-btn @click="back" outlined color="primary" class="ml-4">Back</v-btn>
								<p v-if="error_msgs.login" class="ml-4 red--text">{{ error_msgs.login }}</p>
							</v-row>
						</v-container>
						<v-fade-transition>
							<v-overlay :value="(progress.login === 1)">
								<v-progress-circular :size="50" color="amber" indeterminate></v-progress-circular>
							</v-overlay>
						</v-fade-transition>
					</v-form>
				</v-card>  
			</v-col>
		</v-row>
    	<!--<v-card
      		class="d-flex justify-center"
      		color="grey lighten-2"
      		flat
      		height="300"
      		tile
    	>
			<v-card
				class="pa-2"
				outlined
				tile
			>
				align-center
			</v-card>
    	</v-card>-->

  	</div>
</template>

<script>
  	import { validationMixin } from 'vuelidate'
  	import { required, maxLength, email } from 'vuelidate/lib/validators'
  
  	export default{
    	name: "login",
    	
		mixins: [ validationMixin ],
    	
		validations: {
      		userName: { required },
      		password: { required }
    	},
    	
		data( ){
      		return {
        		userName: "",
        		password: ""
      		}
    	},  
    
		computed: {
      		auth( ){
        		return this.$store.state.token
      		
			},
			error_msgs( ){
				return this.$store.state.error_msgs

			},
			passwordErrors( ){
        		const errors = [ ]
        
				if( !this.$v.password.$dirty ){
					return errors
				} 
          
        		!this.$v.password.required && errors.push( "Password is required." )
        
        		return errors
      		
			},
			progress( ){
				return this.$store.state.progress

			},
      		userNameErrors( ){
        		const errors = [ ]
        
				if( !this.$v.userName.$dirty ){
					return errors
				} 
			
				!this.$v.userName.required && errors.push( "User Name is required." )

				return errors
      		
			},

			//custom
            padding( ) {
                 switch( this.$vuetify.breakpoint.name ){
                    case "xs": case "sm": return "padding-top:0px;"
                    default: return "padding-top:100px;"

                }
                 
            },
    	
		},
    
		watch: {
      		auth: "authenticate"
    
		},
    
		methods: {
      		async login( ){
        		const _this = this
				
				//show progress animation
				_this.progress.login = 1

				//make an authentication request to the server
        		_this.$store.dispatch( "login", { 
					userName: _this.userName, 
					password: _this.password 
				} )
      		
			},
      		back( ){
        		const _this = this

				//reset login form
        		_this.userName = ""
        		_this.password = ""
        		_this.$v.$reset( )

				//kick back to the search/detail screen
				_this.$router.go( -1 )
        	      		
			},
		    authenticate( ){
				const _this = this
			
				if( _this.auth !== '' ){
					_this.$router.go( -1 )

				}
							
			}

    	}

  	};
</script>