// https://docs.cypress.io/api/introduction/api.html

describe( "Login Page Test", ( ) => {
  	it( "Visits the login page and login in the application", ( ) => {
    	cy.visit( "/login" )

		//login into the app
		cy.get( "[data-cy=username]" ).type( "finsuser" )
		cy.get( "[data-cy=password]" ).type( "finsuser" )
		//cy.get( "[data-cy=password]" ).click()
		cy.get( "[data-cy=login_btn]" ).click( )

		// we should be redirected to /dashboard
		//cy.url( ).should('contain', 'rain' )
		cy.url( ).should('include', '/period/rain/P1D' )

  	} )

} )