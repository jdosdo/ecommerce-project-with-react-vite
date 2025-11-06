import { it, describe, beforeEach, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Header } from "./Header";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";

function Location() {
  const location = useLocation();
  return (
    <div data-testid="url-path">{location.pathname + location.search}</div>
  );
}

describe("Header component", () => {
  let cart, user;
  let totalQuantity = 0;

  beforeEach(() => {
    user = userEvent.setup();
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
        <Location />
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

  it("links to the HomePage", async () => {
    const homepageLink = screen.getByTestId("homepage-link");

    await user.click(homepageLink);

    expect(screen.getByTestId("url-path")).toHaveTextContent("/");
  });

  it("can search based on user input", async () => {
    // get user input
    const searchInput = screen.getByTestId("search-bar");

    await user.type(searchInput, "smartphone");

    expect(searchInput).toHaveValue("smartphone");

    // search based on user input when the button is clicked
    const searchButton = screen.getByTestId("search-button");

    await user.click(searchButton);

    expect(screen.getByTestId("url-path")).toHaveTextContent(
      "/?search=smartphone"
    );
  });

  it("links to the Orders page", async () => {
    const ordersPageLink = screen.getByTestId("orders-link");

    await user.click(ordersPageLink);

    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders");
  });

  it("links to the checkout page", async () => {
    const checkoutPageLink = screen.getByTestId("header-cart");

    await user.click(checkoutPageLink);

    expect(screen.getByTestId("url-path")).toHaveTextContent("/checkout");
  });
});
