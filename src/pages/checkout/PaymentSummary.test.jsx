import { vi, it, expect, describe, beforeEach } from "vitest";
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { formatMoney } from "../../utils/money";

vi.mock("axios");

describe("Payment Summary", () => {
  let paymentSummary;
  const loadCart = vi.fn();

  beforeEach(() => {
    paymentSummary = {
      totalItems: 7,
      productCostCents: 8635,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 8635,
      taxCents: 864,
      totalCostCents: 9499,
    };
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );
  });
  
  it("shows the correct data", () => {
    expect(screen.getByTestId("payment-summary-total-items")).toHaveTextContent(
      `Items (${paymentSummary.totalItems})`
    );
    expect(screen.getByTestId("payment-summary-price")).toHaveTextContent(
      formatMoney(paymentSummary.productCostCents)
    );
    expect(screen.getByTestId("payment-summary-shipping")).toHaveTextContent(
      formatMoney(paymentSummary.shippingCostCents)
    );
    expect(screen.getByTestId("payment-summary-before-tax")).toHaveTextContent(
      formatMoney(paymentSummary.totalCostBeforeTaxCents)
    );
    expect(screen.getByTestId("payment-summary-tax")).toHaveTextContent(
      formatMoney(paymentSummary.taxCents)
    );
    expect(screen.getByTestId("payment-summary-total")).toHaveTextContent(
      formatMoney(paymentSummary.totalCostCents)
    )
  });
});
