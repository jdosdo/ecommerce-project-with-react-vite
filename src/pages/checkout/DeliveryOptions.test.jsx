import dayjs from "dayjs";
import { it, describe, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeliveryOptions } from "./DeliveryOptions";
import { formatMoney } from "../../utils/money";

describe("Delivery options", () => {
  let deliveryOptions, cartItem, loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    cartItem = {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 6,
      deliveryOptionId: "1",
    };

    deliveryOptions = [
      {
        id: "1",
        deliveryDays: 7,
        priceCents: 0,
        estimatedDeliveryTimeMs: 1763454037734,
      },
      {
        id: "2",
        deliveryDays: 3,
        priceCents: 499,
        estimatedDeliveryTimeMs: 1763108437734,
      },
      {
        id: "3",
        deliveryDays: 1,
        priceCents: 999,
        estimatedDeliveryTimeMs: 1762935637734,
      },
    ];

    render(
      <DeliveryOptions
        deliveryOptions={deliveryOptions}
        cartItem={cartItem}
        loadCart={loadCart}
      />
    );
  });

  it("shows the correct text", () => {
    /*
    // For Delivery Option 1
    expect(
      screen.getByTestId(
        `delivery-option-date-${deliveryOptions[0].id}-${cartItem.productId}`
      )
    ).toHaveTextContent(
      dayjs(deliveryOptions[0].estimatedDeliveryTimeMs).format("dddd, MMMM D")
    );

    expect(
      screen.getByTestId(
        `delivery-option-price-${deliveryOptions[0].id}-${cartItem.productId}`
      )
    ).toHaveTextContent("FREE SHIPPING");

    // For Delivery Option 2
    expect(
      screen.getByTestId(
        `delivery-option-date-${deliveryOptions[1].id}-${cartItem.productId}`
      )
    ).toHaveTextContent(
      dayjs(deliveryOptions[1].estimatedDeliveryTimeMs).format("dddd, MMMM D")
    );

    expect(
      screen.getByTestId(
        `delivery-option-price-${deliveryOptions[1].id}-${cartItem.productId}`
      )
    ).toHaveTextContent(
      `${formatMoney(deliveryOptions[1].priceCents)} - Shipping`
    );

    // For Delivery Option 2
    expect(
      screen.getByTestId(
        `delivery-option-date-${deliveryOptions[2].id}-${cartItem.productId}`
      )
    ).toHaveTextContent(
      dayjs(deliveryOptions[2].estimatedDeliveryTimeMs).format("dddd, MMMM D")
    );

    expect(
      screen.getByTestId(
        `delivery-option-price-${deliveryOptions[2].id}-${cartItem.productId}`
      )
    ).toHaveTextContent(
      `${formatMoney(deliveryOptions[2].priceCents)} - Shipping`
    );
    */

    deliveryOptions.forEach((deliveryOption) => {
      let priceString = "FREE SHIPPING";

      if (deliveryOption.priceCents > 0) {
        priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
      }

      expect(
        screen.getByTestId(
          `delivery-option-date-${deliveryOption.id}-${cartItem.productId}`
        )
      ).toHaveTextContent(
        dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")
      );

      expect(
        screen.getByTestId(
          `delivery-option-price-${deliveryOption.id}-${cartItem.productId}`
        )
      ).toHaveTextContent(priceString);
    });
  });
});
