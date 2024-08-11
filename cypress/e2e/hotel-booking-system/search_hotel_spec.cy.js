describe('Search Hotel Use Case', () => {
  beforeEach(() => {
    // Intercept API call to verify search results
    cy.intercept('POST', '/search/destination/WD0M').as('fetchHotels'); 
    cy.visit('http://localhost:3000'); // Visit the home page
  });

  it('should search and navigate to the hotel search results page', () => {
    // Step 1: Enter destination
    cy.get('input[placeholder="Where to?"]').type('Singapore');
    cy.wait(500); // Wait for autocomplete suggestions

    // Select the destination from the dropdown
    cy.get('.destination-item').contains('Singapore, Singapore (SIN-Changi)').click();

    // Step 2: Select check-in and check-out dates
    cy.get('input.date-picker-input').click();
    cy.wait(500); // Wait for the date picker to appear

    // Select check-in and check-out dates
    cy.get('button.rdrNextPrevButton.rdrNextButton').click(); // Go to next month if needed
    cy.contains('span.rdrDayNumber', '10').click(); // Select check-in date
    cy.contains('span.rdrDayNumber', '12').click(); // Select check-out date
    cy.get('button.apply-button').click(); // Apply dates

    // Step 3: Set number of guests
    cy.get('input[placeholder="No. of Guests?"]').click();
    cy.wait(500); // Wait for the guest options to appear

    // Add 1 more adult
    cy.contains('button', '+').click();
    cy.contains('button', 'Done').click();

    // Step 4: Submit the search
    cy.get('.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge.search-icon').click();

    // Step 5: Wait for the search request and verify results
    cy.wait('@fetchHotels'); // Ensure the API call completes

    // Verify that the navigation to the search results page occurred
    cy.url().should('include', '/hotelSearch'); // Adjust URL as needed

    cy.wait(1000);

    // Check for expected elements on the search results page
    cy.get('.hotellist-container').should('be.visible'); 
    cy.get('.hotels').should('have.length.greaterThan', 0); // Ensure there are hotel cards
    cy.get('.filter-section').should('be.visible'); // Check if filter options are present
    
    

    // Step 6: Customer filters results by star ratings, guest ratings, and price range
    cy.get('.price-input').find('#min').type(200);

    cy.get('.star-rating button').contains('5').click();

    cy.wait(5000);

    // Step 7: System retrieves list of filtered matching hotels
    // Step 8: System displays list of filtered matching hotels
    // Step 9: Customer selects specific hotel from result list
    cy.contains('div.MuiCardContent-root', 'Grand Copthorne Waterfront') // Find the hotel name
    .parentsUntil('div.MuiCard-root') // Navigate up to the common ancestor
    .find('button.MuiButton-containedPrimary') // Find the button within this context
    .should('be.visible') // Ensure the button is visible
    .click(); // Click the button
  });
});

