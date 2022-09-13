// https://docs.cypress.io/api/introduction/api.html

describe( "Open Home page", ( ) => {
  	it( "Visits the app root url", ( ) => {
    	cy.visit( "/" )
    	//cy.get(".v-tab").contains( "Rain Gauge" )
		cy.get( "[data-cy=tab-RainGauge]" ).click( )
  	} )

} )