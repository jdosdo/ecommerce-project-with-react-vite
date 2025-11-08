import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeliveryDate } from "./DeliveryDate";

describe("Delivery date", () => {
  let selectedDeliveryOption = {
    createdAt: "2025-10-18T08:54:18.857Z",
    deliveryDays: 7,
    estimatedDeliveryTimeMs: 1763189236489,
    id: "1",
    priceCents: 0,
  };
  it("shows the correct date", () => {
    render(<DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />);

    expect(screen.getByTestId("delivery-date")).toHaveTextContent(
      "Delivery date: Saturday, November 15")
  });
});
