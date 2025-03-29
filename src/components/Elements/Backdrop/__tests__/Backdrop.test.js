import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Backdrop from "../Backdrop";

it("Backdrop renders correctly", () => {
  const { getByTestId } = render(<Backdrop />);

  expect(getByTestId("test-backdrop")).toBeTruthy();
});

it("Function fires once on backdrop click", () => {
  const mockFn = jest.fn();

  const { getByTestId } = render(<Backdrop show onClick={mockFn} />);

  fireEvent.click(getByTestId("test-backdrop"));

  expect(mockFn.mock.calls.length).toBe(1);
});
