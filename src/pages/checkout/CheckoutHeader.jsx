import { Link } from "react-router";
import "./CheckoutHeader.css";
import logo from "../../assets/images/logo.png";
import mobileLogo from "../../assets/images/mobile-logo.png";
import checkoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";

export function CheckoutHeader({cart}) {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity
  })
  return (
    <>
      <div className="checkout-header">
        <div className="header-content" data-testid="header-content">
          <div className="checkout-header-left-section" data-testid="checkout-header-app-logo">
            <Link to="/">
              <img className="logo" alt="App Logo" src={logo} />
              <img className="mobile-logo" alt="App Logo Mobile" src={mobileLogo} />
            </Link>
          </div>

          <div className="checkout-header-middle-section" data-testid="checkout-header-total-items">
            Checkout (
            <Link to="/" className="return-to-home-link">
              {totalQuantity} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section" data-testid="checkout-header-icon">
            <img alt="checkout-header-icon" src={checkoutLockIcon} />
          </div>
        </div>
      </div>
    </>
  );
}
