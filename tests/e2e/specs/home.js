// https://docs.cypress.io/api/introduction/api.html

describe( "Open Home page", ( ) => {
  	it( "Visits the app root url", ( ) => {
    	cy.visit( "/" )
    	//cy.get(".v-tab").contains( "Rain Gauge" )
		cy.get( "[data-cy=tab0]" ).click( )

		console.log(cy.get( "[data-cy=gauge_select]" ).select('4501'))
  	} )

} )