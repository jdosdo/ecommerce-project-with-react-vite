import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import { Link } from "react-router";
import "./Tracking.css";

export function Tracking({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };
    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const item = order.products.find((product) => {
    return product.productId === productId;
  });

  const totalDeliveryTimeMs = item.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100){
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on " : "Arriving on"} 
            {dayjs(order.orderTimeMs).format("dddd, D MMMM")}
          </div>

          <div className="product-info">{item.product.name}</div>

          <div className="product-info">Quantity: {item.quantity}</div>

          <img className="product-image" src={`${item.product.image}`} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
