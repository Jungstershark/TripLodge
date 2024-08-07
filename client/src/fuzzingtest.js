import fetch from 'node-fetch';
import fs from 'fs';

// Function to generate a random destination ID
const generateRandomDestinationId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {  // Adjust length if needed
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Function to perform the fuzzing test
const fuzzTest = async (numTests, logInterval) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/search/hotel/`;

    for (let i = 0; i < numTests; i++) {
        const destinationId = generateRandomDestinationId();
        const requestBody = {
            destination_id: destinationId,
            checkin: '2024-10-01',
            checkout: '2024-10-07',
            lang: 'en_US',
            guests: 2,
            currency: 'SGD'
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();

            // Update fuzzing_results.log every logInterval tests
            if (i % logInterval === 0) {
                console.log(`Testing destination ID: ${destinationId}`);
                console.log(`Response for ${destinationId}:`, result);
                fs.appendFileSync('fuzzing_results.log', `Destination ID: ${destinationId}, Response: ${JSON.stringify(result)}\n`);
            }
        } catch (error) {
            // Log the error and update fuzzing_results.log every logInterval tests
            if (i % logInterval === 0) {
                console.error(`Error testing destination ID: ${destinationId}`, error);
                fs.appendFileSync('fuzzing_results.log', `Destination ID: ${destinationId}, Error: ${error.message}\n`);
            }
        }
    }
};

// Run the fuzz test for 24 hours
const runFuzzTest = async () => {
    const endTime = Date.now() + 24 * 60 * 60 * 1000;  // 24 hours from now
    const numTests = 1000;  // Adjust the total number of tests as needed
    const logInterval = 500;  // Log every 500 tests

    while (Date.now() < endTime) {
        await fuzzTest(numTests, logInterval);
        // Wait before running the next batch of tests to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 60000));  // Wait 1 minute
    }

    console.log('Fuzzing test completed.');
};

// Start the fuzzing process
runFuzzTest();
