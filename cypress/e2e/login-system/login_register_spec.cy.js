describe('Login and Register Use Case', () => {
    beforeEach(() => {
        // Intercept API call to verify search results
        cy.intercept('POST', '/search/destination/WD0M').as('fetchHotels'); 
        cy.visit('http://localhost:3000'); // Visit the home page
      });

    // Register use case
    it('User creates/register for their account', () =>  {
        cy.wait('@fetchHotels');
        // Step 1: Customer navigates to the register account page
        cy.get('.UserOptions').click();
        cy.wait(500)
        cy.get('.create-account-link').click();

        // Step 2:  Customer fill in their details
        cy.get('#username').type('TestUser');
        cy.get('#hp').type('96784321');
        cy.get('#email').type('user@test.com');
        cy.get('#password').type('@Password123');
        cy.get('#confirm-password').type('@Password123');

        // Step 3: Customer submit the register account form
        // Step 4: System validates submitted details
        // Step 5: System process registration
        // Step 6: System adds customer to database
        // Step 7: System displays registration successful message
        // Step 8: System returns to log in pages
        cy.get('.signup-container').contains('Create Account').click();
    });

    it('Existing user can log in and have their own login session', () => {
        // Step 1: Customer navigates to login page
        cy.wait('@fetchHotels');
        cy.get('.UserOptions').click();
        // Step 2: Customer enters username and password
        cy.get('#email').type('user@test.com');
        cy.get('#password').type('@Password123');
        // Step 3:  Customer submits username and password
        // Step 4: System validates the username and password
        // Step 5: System processes login
        // Step 6: System verifies the username and password
        // Step 7: System returns to homepage (logged in)
        cy.get('.login-form').find('.login-button').click();
        cy.get('svg.MuiSvgIcon-root[data-testid="AccountCircleIcon"]').should('be.visible');
    });
});