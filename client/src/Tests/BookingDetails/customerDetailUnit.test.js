import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomerDetail from "../../BookingDetails/customerDetail.js";

test("CustomerDetail input fields handle changes correctly", () => {
  const handleChange = jest.fn();

  const { getByTestId } = render(
    <CustomerDetail onCustomerDetailChange={handleChange} />
  );

  // Simulate user input for the First Name field
  const firstNameInput = getByTestId("firstName");
  fireEvent.change(firstNameInput, { target: { name: "firstName", value: "John" } });
  expect(handleChange).toHaveBeenCalledWith("firstName", "John");

  // Simulate user input for the Last Name field
  const lastNameInput = getByTestId("lastName");
  fireEvent.change(lastNameInput, { target: { name: "lastName", value: "Doe" } });
  expect(handleChange).toHaveBeenCalledWith("lastName", "Doe");

  // Simulate user input for the Country field
  const countryInput = getByTestId("country");
  fireEvent.change(countryInput, { target: { name: "country", value: "USA" } });
  expect(handleChange).toHaveBeenCalledWith("country", "USA");

  // Simulate user input for the Telephone field
  const telephoneInput = getByTestId("telephone");
  fireEvent.change(telephoneInput, { target: { name: "telephone", value: "1234567890" } });
  expect(handleChange).toHaveBeenCalledWith("telephone", "1234567890");
});
