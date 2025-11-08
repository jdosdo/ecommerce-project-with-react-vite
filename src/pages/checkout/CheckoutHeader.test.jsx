import { it, describe, expect, beforeEach } from "vitest";
import { MemoryRouter, useLocation } from "react-router";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutHeader } from "./CheckoutHeader";

function Location() {
  const location = useLocation();

  return <div data-testid="url-path">{location.pathname}</div>;
}

describe("Header Checkout component", () => {
  let user, cart, totalQuantity;

  beforeEach(() => {
    totalQuantity = 0;
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
        <CheckoutHeader cart={cart} />
        <Location />
      </MemoryRouter>
    );
  });

  it("Renders the component correctly", () => {
    // Renders app logo
    expect(
      within(screen.getByTestId("header-content")).getByRole("img", {
        name: "App Logo",
      })
    ).toBeInTheDocument();

    // Renders the total items correctly
    expect(screen.getByTestId("checkout-header-total-items")).toHaveTextContent(
      `Checkout (${totalQuantity} items)`
    );

    // Renders the checkout icon
    expect(
      within(screen.getByTestId("checkout-header-icon")).getByRole("img", {
        name: "checkout-header-icon",
      })
    ).toBeInTheDocument();
  });

  it("navigates to the homepage when App Logo is clicked", async () => {
    await user.click(screen.getByRole("img", { name: "App Logo" }));

    expect(screen.getByTestId("url-path")).toHaveTextContent("/");
  });

  it("navigates to the homepage when Total Items is clicked", async () => {
    const link = within(
      screen.getByTestId("checkout-header-total-items")
    ).getByRole("link", { name: `${totalQuantity} items` });
    await user.click(link);

    expect(screen.getByTestId("url-path")).toHaveTextContent("/");
  });
});
