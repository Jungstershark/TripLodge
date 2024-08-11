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

// Fuzz test cases generator
const generateFuzzTestCases = () => {
  const cases = [];
  for (let i = 0; i < 100; i++) { // Adjust the number of cases
    cases.push({
      name: `Fuzz Test Case ${i + 1}`,
      value: randomString(Math.floor(Math.random() * 1000) + 1)
    });
  }
  return cases;
};

// Run continuous fuzz testing
describe("Continuous Fuzz Testing", () => {
  const fuzzTestCases = generateFuzzTestCases();

  fuzzTestCases.forEach((testCase) => {
    test(testCase.name, () => {
      const { getByTestId } = render(<CustomerDetail onCustomerDetailChange={() => {}} />);

      act(() => {
        const firstNameInput = getByTestId("firstName");
        fireEvent.change(firstNameInput, { target: { value: testCase.value } });
        console.log(`Tested firstName with value: ${testCase.value}`);
      });

      act(() => {
        const lastNameInput = getByTestId("lastName");
        fireEvent.change(lastNameInput, { target: { value: testCase.value } });
        console.log(`Tested lastName with value: ${testCase.value}`);
      });

      act(() => {
        const countryInput = getByTestId("country");
        fireEvent.change(countryInput, { target: { value: testCase.value } });
        console.log(`Tested country with value: ${testCase.value}`);
      });

      act(() => {
        const telephoneInput = getByTestId("telephone");
        fireEvent.change(telephoneInput, { target: { value: testCase.value } });
        console.log(`Tested telephone with value: ${testCase.value}`);
      });
    });
  });
});
