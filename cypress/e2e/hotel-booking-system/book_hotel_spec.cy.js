describe('Book Hotel Use Case', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('div[data-index="0"]').eq(1).click();
    });

    it('Customer is directed to checkout url sent by Stripe', () => {
        // Step 1: Customer selects room to book.
        cy.get('button.Reserve').first().click();
        cy.url().should('include', '/checkout');
        cy.wait(1000);

        // Step 2: Customer enters required booking information (e.g., Customer’s email).
        cy.get('input[name="firstName"]').type('Doe');
        cy.get('input[name="lastName"]').type('John');
        cy.get('input[name="country"]').type('Singapore')
        cy.get('input[name="telephone"]').type('96784321');
        cy.get('button.DetailButton').click();

        // Third Party
        // Step 3: Customer submits booking information.
        // Step 4: System validates booking information.
        // Step 5: System sends payment request to Payment Gateway.
        // Step 6: Customer enters payment details.
        // Step 7: Customer submits payment details.
        // Step 8: Payment Gateway validates payment details.
        // Step 9: Payment Gateway processes the payment and returns a confirmation.

        // Step 10: System confirms the booking and creates a booking in the database.
        // Step 11: System triggers send booking confirmation use case (HBS_UC_3).
        // Step 12: System displays “booking success” message.

    });
})
