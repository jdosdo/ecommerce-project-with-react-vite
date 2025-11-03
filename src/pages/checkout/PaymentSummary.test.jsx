import { vi, it, expect, describe, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PaymentSummary } from "./PaymentSummary";
import { formatMoney } from "../../utils/money";

vi.mock("axios");

describe("Payment Summary", () => {
  let paymentSummary;
  let loadCart;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 7,
      productCostCents: 8635,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 8635,
      taxCents: 864,
      totalCostCents: 9499,
    };

    loadCart = vi.fn();

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );
  });

  it("shows the total items correctly", () => {
    const container = screen.getByTestId("payment-summary-total-items");
    // Using 'toHaveTextContent'
    expect(container).toHaveTextContent(`Items (${paymentSummary.totalItems})`);

    // Using 'getByText'
    expect(screen.getByText(`Items (${paymentSummary.totalItems}):`))
      .toBeInTheDocument;
  });

  it("shows the price before tax and shipping correctly", () => {
    const container = screen.getByTestId("payment-summary-price");

    // Using 'toHaveTextContent'
    expect(container).toHaveTextContent(
      formatMoney(paymentSummary.productCostCents)
    );

    // Using 'getByText
    expect(
      within(container).getByText(formatMoney(paymentSummary.productCostCents))
    ).toBeInTheDocument;
  });

  it("shows the shipping price correctly", () => {
    const container = screen.getByTestId("payment-summary-shipping");

    // Using 'toHaveTextContent'
    expect(container).toHaveTextContent(
      formatMoney(paymentSummary.shippingCostCents)
    );

    // Using 'getByText'
    expect(
      within(container).getByText(formatMoney(paymentSummary.shippingCostCents))
    ).toBeInTheDocument;
  });

  it("shows total cost before tax correctly", () => {
    const container = screen.getByTestId("payment-summary-before-tax");

    // Using 'toHaveTextContent'
    expect(container).toHaveTextContent(
      formatMoney(paymentSummary.totalCostBeforeTaxCents)
    );

    // Using 'getByText'
    expect(
      within(container).getByText(
        formatMoney(paymentSummary.totalCostBeforeTaxCents)
      )
    ).toBeInTheDocument;
  });

  it("shows the tax correctly", () => {
    const container = screen.getByTestId("payment-summary-tax");

    // Using 'toHaveTextContent'
    expect(container).toHaveTextContent(formatMoney(paymentSummary.taxCents));

    // Using 'getByText'
    expect(within(container).getByText(formatMoney(paymentSummary.taxCents)))
      .toBeInTheDocument;
  });

  it("shows the order total price correctly", () => {
    const container = screen.getByTestId("payment-summary-total");
    // Using data-testid

    expect(container).toHaveTextContent(
      formatMoney(paymentSummary.totalCostCents)
    );

    // Using 'getByText'
    expect(
      within(container).getByText(formatMoney(paymentSummary.totalCostCents))
    ).toBeInTheDocument;
  });
});
