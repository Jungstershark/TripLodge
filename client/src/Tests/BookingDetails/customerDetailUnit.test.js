const fs = require('fs');
const path = require('path');
const { render, fireEvent } = require('@testing-library/react');
const React = require('react');
const CustomerDetail = require('../../BookingDetails/customerDetail.js').default;

// Path to the log file relative to the client directory
const logFilePath = path.join(process.cwd(), 'logs', 'fuzz_test_log.txt');

// Ensure the logs directory exists
const logDirectory = path.dirname(logFilePath);
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Maximum log file size in bytes (e.g., 1MB)
const MAX_LOG_FILE_SIZE = 1 * 1024 * 1024;

// Function to clear the log file when it exceeds the maximum size
const clearLogFileIfTooLarge = () => {
  const stats = fs.statSync(logFilePath);
  if (stats.size > MAX_LOG_FILE_SIZE) {
    fs.writeFileSync(logFilePath, '', 'utf8'); // Clear the log file
    console.log('Log file cleared because it exceeded the maximum size.');
  }
};

// Create a write stream
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Ensure console.log writes to the file and flushes the output
console.log = (...args) => {
  const message = args.join(' ') + '\n';
  logStream.write(message);
  logStream.uncork(); // Ensure data is written immediately
};

// Generate random string with characters from ASCII 32 to 96, limited to 100 characters
const randomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomAscii = Math.floor(Math.random() * (96 - 32 + 1)) + 32; // Random ASCII between 32 and 96
    result += String.fromCharCode(randomAscii);
  }
  return result;
};

// Continuous fuzz test case generation and execution
const runContinuousFuzzTesting = () => {
  let testCaseCount = 0;

  // Function to generate and run a single test case
  const generateAndRunTestCase = () => {
    testCaseCount++;
    const testCase = {
      name: `Fuzz Test Case ${testCaseCount}`,
      value: randomString(Math.floor(Math.random() * 100) + 1) // Limit to 100 characters
    };

    console.log(`Running ${testCase.name}`);

    // Run the test
    const { getByTestId } = render(React.createElement(CustomerDetail, { onCustomerDetailChange: () => {} }));

    const firstNameInput = getByTestId("firstName");
    fireEvent.change(firstNameInput, { target: { value: testCase.value } });
    console.log(`Tested firstName with value: ${testCase.value}`);

    const lastNameInput = getByTestId("lastName");
    fireEvent.change(lastNameInput, { target: { value: testCase.value } });
    console.log(`Tested lastName with value: ${testCase.value}`);

    const countryInput = getByTestId("country");
    fireEvent.change(countryInput, { target: { value: testCase.value } });
    console.log(`Tested country with value: ${testCase.value}`);

    const telephoneInput = getByTestId("telephone");
    fireEvent.change(telephoneInput, { target: { value: testCase.value } });
    console.log(`Tested telephone with value: ${testCase.value}`);

    // Check if the log file needs to be cleared
    clearLogFileIfTooLarge();
  };

  // Run the test case generation and execution continuously
  setInterval(generateAndRunTestCase, 1000); // Generates a new test case every second
};

// Jest requires at least one test function to run
test("Continuous Fuzz Testing", () => {
  runContinuousFuzzTesting();
});
