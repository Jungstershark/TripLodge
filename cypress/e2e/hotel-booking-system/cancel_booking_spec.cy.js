// describe('Cancel Booking Use Case', () => {
//     // Step 1: Customer navigates to booking cancellation page unique to their booking, via URL in booking confirmation email
//     // Step 2: System prompts customer to confirm cancellation
//     // Step 3: Customer confirms booking cancellation
//     // Step 4: System processes cancellation request
//     // Step 5: System triggers handle refunds (HBS_UC_5) use case
//     // Step 6: System updates booking status to ‘cancelled’ in database
//     // Step 7: System triggers send cancellation confirmation (HBS_UC_6) use case
//     // Step 8: System displays “Booking cancelled successfully.”
// })

describe('Cancel Booking Use Case', () => {
    beforeEach(() => {
        // Mock the fetch request for booking details
        cy.intercept('GET', '/booking/view/12345', {
            statusCode: 200,
            body: {
                bookingId: '12345',
                hotelName: 'Grand Hotel',
                roomTypes: 'Deluxe Suite',
                startDate: '2024-08-15',
                endDate: '2024-08-20',
                numAdults: 2,
                numChildren: 1,
                price: 250,
                status: 'confirmed' // Initial status before cancellation
            }
        }).as('fetchBookingDetails');

        // Mock the fetch request for refund/cancellation
        cy.intercept('POST', '/booking/refund/12345/test_payment_id', {
            statusCode: 200,
            body: {
                success: true
            }
        }).as('cancelBooking');

        // Visit the cancel booking page with mock parameters
        cy.visit('http://localhost:3000/cancel-booking?bookingId=12345&paymentId=test_payment_id');
    });

    it('Customer navigates to booking cancellation page and cancels booking successfully', () => {
        // Wait for the booking details to be fetched
        cy.wait('@fetchBookingDetails');
        cy.wait(1000);

        // Verify that booking details are displayed
        cy.get('p').should('contain', 'Booking ID: 12345');
        cy.get('button.cancel-button').should('be.visible');

        // Simulate clicking the cancel button
        cy.get('button.cancel-button').click();

        // Wait for the cancellation request
        cy.wait('@cancelBooking');
        cy.wait(1000);

        // Verify the booking status has been updated
        cy.get('p.cancel-success-message').should('contain', 'Booking successfully cancelled');
    });
});
