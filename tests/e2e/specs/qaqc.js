// https://docs.cypress.io/api/introduction/api.html
describe( "QA/QC Tests for FINS Live", ( ) => {
  	/*it( "Main Page", ( ) => {
        //visit the root route
        cy.visit( "/" )
        cy.wait(2000)

        //test the tabs.
        const idxs = [ 0, 1, 2 ]
        idxs.forEach( idx => {
            cy.get( "[data-cy=toptab" + idx + "]" )
                .click( )
                .closest( ".v-tab--active" )

            cy.get( "[data-cy=btmtab" + idx + "]" )
                .closest( ".v-btn--active" )    

            cy.wait(2000)

                        
        } )

    } )

    it( "Help Page", ( ) => {

        //visit the help page
        cy.visit( "/help" )
        cy.wait(2000)

    } )

    it( "Login Page", ( ) => {
        //visit the login page
        cy.visit( "/login" )
        //login into the app
		cy.get( "[data-cy=username]" ).type( "finsuser" )
		cy.get( "[data-cy=password]" ).type( "finsuser" )
		cy.get( "[data-cy=login_btn]" ).click( )
        cy.wait(2000)
        
  	} )*/

    it( "Camera Search", ( ) => {
        const cams_to_check = [ "MC42" ]
        cy.fixture("gauge_info.json").then( ( sites ) => {
            cams_to_check.forEach( uniqueid => {
				cy.visit( "/camera/" + uniqueid )

                cy.get( "[data-cy=site_name]")
				    .contains( sites[ uniqueid ].site_name, { matchCase: false } )
                //cy.get( "[data-cy=site_snapshot]") 
                //    .contains('camera')
                cy.get('[style^=maps.mecklenburgcountync.gov-]')
            
            } )

        } )
        //cy.visit( "/camera/MC42" )
    } )

} )