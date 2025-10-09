import { OrdersHeader } from "./OrdersHeader";
import { OrdersDetails } from "./OrdersDetails";


export function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrdersHeader order={order} />
            <OrdersDetails order={order} />
          </div>
        );
      })}
    </div>
  );
}
