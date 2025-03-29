import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "../Input";

it("Input renders standard input", () => {
  const { getByTestId } = render(
    <Input type="text" id="text-example" label="Example text input" data-testid="input-element" />
  );

  const el = getByTestId("input-element");
  expect(el).toBeTruthy();
  expect(el.nodeName).toBe("INPUT");
  expect(el.getAttribute("type")).toBe("text");
});

it("Input renders password input", () => {
  const { getByTestId } = render(
    <Input type="password" id="text-example" label="Example text input" data-testid="input-element" />
  );

  const el = getByTestId("input-element");
  expect(el).toBeTruthy();
  expect(el.nodeName).toBe("INPUT");
  expect(el.getAttribute("type")).toBe("password");
});

it("Input renders textarea input", () => {
  const { getByTestId } = render(
    <Input type="textarea" id="text-example" label="Example text input" data-testid="input-element" />
  );

  const el = getByTestId("input-element");
  expect(el).toBeTruthy();
  expect(el.nodeName).toBe("TEXTAREA");
});

it("Input renders email input", () => {
  const { getByTestId } = render(
    <Input type="email" id="text-example" label="Example text input" data-testid="input-element" />
  );

  const el = getByTestId("input-element");
  expect(el).toBeTruthy();
  expect(el.nodeName).toBe("INPUT");
  expect(el.getAttribute("type")).toBe("email");
});

it("Input renders select input", () => {
  const selectOptions = [
    {
      value: "1",
      label: "one"
    },
    {
      value: "2",
      label: "two"
    },
    {
      value: "3",
      label: "three"
    }
  ];
  const { getByTestId } = render(
    <Input
      type="select"
      id="text-example"
      label="Example text input"
      data-testid="input-element"
      selectOptions={selectOptions}
    />
  );

  const el = getByTestId("input-element");
  expect(el).toBeTruthy();
  expect(el.nodeName).toBe("SELECT");
  expect(el.getAttribute("type")).toBe("select");
  const children = el.childNodes;

  selectOptions.forEach((option, index) => {
    const child = children[index];
    expect(child.nodeName).toBe("OPTION");
    expect(child.getAttribute("value")).toBe(option.value);
    expect(child.innerHTML).toBe(option.label);
  });
});

it("Input fires change on text update", () => {
  const mockFunction = jest.fn();
  const { getByLabelText } = render(<Input type="text" id="text-example" label="text input" onChange={mockFunction} />);
  fireEvent.change(getByLabelText("text input"), { target: { value: "foo" } });

  expect(mockFunction.mock.calls.length).toBe(1);
});
