import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import CustomerDetail from "../../BookingDetails/customerDetail.js";
import fs from 'fs';

// Create a write stream (in append mode)
const logStream = fs.createWriteStream('fuzz_test_log.txt', { flags: 'a' });

// Override console.log to also write to the file
console.log = (...args) => {
  logStream.write(args.join(' ') + '\n');
  process.stdout.write(args.join(' ') + '\n');
};

// Generate random string with characters from ASCII 32 to 96
const randomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomAscii = Math.floor(Math.random() * (96 - 32 + 1)) + 32; // Random ASCII between 32 and 96
    result += String.fromCharCode(randomAscii);
  }
  return result;
};

// Function to perform the fuzzing test
const runFuzzTest = async (logInterval, duration) => {
  const endTime = Date.now() + duration;  // Duration in milliseconds
  let testCount = 0;

  while (Date.now() < endTime) {
    const randomValue = randomString(Math.floor(Math.random() * 1000) + 1);
    const { getByTestId } = render(<CustomerDetail onCustomerDetailChange={() => {}} />);

    act(() => {
      fireEvent.change(getByTestId("firstName"), { target: { value: randomValue } });
      console.log(`Tested firstName with value: ${randomValue}`);
    });

    act(() => {
      fireEvent.change(getByTestId("lastName"), { target: { value: randomValue } });
      console.log(`Tested lastName with value: ${randomValue}`);
    });

    act(() => {
      fireEvent.change(getByTestId("country"), { target: { value: randomValue } });
      console.log(`Tested country with value: ${randomValue}`);
    });

    act(() => {
      fireEvent.change(getByTestId("telephone"), { target: { value: randomValue } });
      console.log(`Tested telephone with value: ${randomValue}`);
    });

    testCount++;

    // Log results at intervals
    if (testCount % logInterval === 0) {
      console.log(`Completed ${testCount} fuzz tests.`);
    }

    // Add a small delay to prevent overwhelming the system
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  }

  console.log('Fuzzing test completed.');
};

// Run the fuzz test for a specified duration (e.g., 24 hours)
describe("Continuous Fuzz Testing", () => {
  const duration = 24 * 60 * 60 * 1000;  // 24 hours in milliseconds
  const logInterval = 100;  // Log every 100 tests

  it("runs fuzz testing for an extended period", async () => {
    await runFuzzTest(logInterval, duration);
  }, duration + 60000);  // Add some buffer time to the test duration
});
