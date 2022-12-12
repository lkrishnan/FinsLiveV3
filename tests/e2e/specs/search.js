// https://docs.cypress.io/api/introduction/api.html
describe( "Test Searches", ( ) => {
  	it( "Visits the app root url", ( ) => {
		cy.fixture("gauge_info.json").then( ( sites ) => {
			// Delay each keypress by 0.1 sec
			Object.keys( sites ).forEach( uniqueid => {
				cy.visit( "/period/rain/P1D/" + uniqueid )
			})
			
			//cy.get( "[data-cy=site_name]")
			//	.contains( site[0].unique_id, { matchCase: false } )
		})

		/*Object.keys( gaugeInfo ).forEach( elm => { 
			cy.visit( "/period/rain/P1D/" + elm )
			cy.get( "[data-cy=site_name]")
				.contains( elm, { matchCase: false } )
		} )
    	/*cy.visit( "/period/rain/P1D/4501" )
		cy.get( "[data-cy=site_name]")
			.contains( "4501", { matchCase: false } )
			
    	
		cy.visit( "/period/rain/P1D/4502" )
		cy.get( "[data-cy=site_name]")
			.contains( "4502", { matchCase: false } )
			

		cy.visit( "/period/rain/P1D/4503" )
		cy.get( "[data-cy=site_name]" )
			.contains( "4503", { matchCase: false } )

		cy.get( "#grph" )

		console.log("here")*/
			
  	} )

} )