import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Products from "../Components/products";

// ? ***************** test 1 *******************************
test("render text from shopping-cart restock button", async () => {
  render(<Products />);
  const restockButton = screen.getByRole("button", {
    name: /restock products/i,
  });
  expect(restockButton).toBeInTheDocument();
});

// ? ***************** test 2 *******************************
test("render text from submit button", async () => {
  render(<Products />);
  const submitButtons = screen.queryAllByText(/-Stock=/i);
  expect(submitButtons.length).toBeGreaterThan(0);
});

// ? ***************** test 3 *******************************
test("render text from the submit button - find all which requires await", async () => {
  render(<Products />);
  const submitButtons = await screen.findAllByText(/-Stock=/i);
  expect(submitButtons.length).toBeGreaterThan(0);
});

// ? ***************** test 4 *******************************
test("render to see if the text meow is not in the submit buttons", async () => {
  render(<Products />);
  const submitButtons = screen.queryAllByText(/meow/i);
  expect(submitButtons).toHaveLength(0);
});

// ? ***************** test 5 *******************************
test("render all the elements with header - there are three", async () => {
  render(<Products />);
  const headingElements = screen.getAllByRole("heading");
  expect(headingElements.length).toBe(3);
});

// ? ***************** test 6 *******************************
test("should add item to cart on button click", async () => {
  render(<Products />);
  const productList = screen.getByRole("list");
  const addToCartInput =
    productList.getElementsByClassName("addToCartInput")[0];
  const cartContents = screen.getByText(/Cart Contents/i);
  expect(cartContents).toBeInTheDocument();
  expect(cartContents).not.toHaveTextContent(/apples/i);
  fireEvent.click(addToCartInput);
  await waitFor(() => {
    expect(cartContents).toHaveLength;
  });
});

// ? ***************** test 7 *******************************
test("fireEvent test that the buttons are working as expected and that clicking them adds the corresponding items to the cart", () => {
  render(<Products />);
  const addToCartButtons = screen.queryAllByText(/^ \+/);
  addToCartButtons.forEach((button) => fireEvent.click(button));
  const cartItemHeaders = screen.queryAllByRole("button", {
    name: /^apples$|^oranges$|^beans$|^cabbage$/i,
  });
  cartItemHeaders.forEach((header) => {
    expect(header).toBeInTheDocument();
  });
});
