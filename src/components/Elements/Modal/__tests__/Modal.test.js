import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

it("Renders correctly", () => {
  const { getByText } = render(<Modal>Here is some modal content</Modal>);

  expect(getByText("Here is some modal content")).toBeTruthy();
});

it("Close Function fires once on button click", () => {
  const mockFn = jest.fn();

  const { getByText } = render(<Modal onClose={mockFn}>Some modal content</Modal>);

  fireEvent.click(getByText("Close"));

  expect(mockFn.mock.calls.length).toBe(1);
});

it("Close Function fires once on backdrop click", () => {
  const mockFn = jest.fn();

  const { getByTestId } = render(<Modal onClose={mockFn}>Some modal content</Modal>);

  fireEvent.click(getByTestId("test-backdrop"));

  expect(mockFn.mock.calls.length).toBe(1);
});
