import { it, describe, beforeEach, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Header } from "./Header";
import { MemoryRouter } from "react-router";

describe("Header component", () => {
  let cart;
  let totalQuantity = 0;

  beforeEach(() => {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3,
        deliveryOptionId: "2",
      },
    ];

    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });

    render(
      <MemoryRouter>
        <Header cart={cart} />
      </MemoryRouter>
    );
  });

  it("renders the component", () => {
    // Renders App Logo section on the left section of Header correctly
    expect(screen.getByRole("img", { name: "App Logo" })).toBeInTheDocument;

    // Search section
    const container = screen.getByTestId("middle-section");

    // Renders the search bar correctly
    expect(within(container).getByTestId("search-bar")).toBeInTheDocument();

    // Renders the search button correctly
    expect(within(container).getByTestId("search-button")).toBeInTheDocument();

    // Renders the search icon correctly
    expect(
      within(container).getByRole("img", { name: "search icon" })
    ).toBeInTheDocument();

    // Renders Orders link
    expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument;

    // Cart section
    const headerCart = screen.getByTestId("header-cart");

    // Renders the cart icon correctly
    expect(
      within(headerCart).getByRole("img", { name: "cart icon" })
    ).toBeInTheDocument();

    expect(within(headerCart).getByAltText("cart icon")).toBeInTheDocument();

    // Renders the total item quantity on cart correctly
    expect(within(headerCart).getByText(totalQuantity)).toBeInTheDocument();
  });

  it("links to the intended page correctly", () => {
    
  })
});
