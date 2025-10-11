import { Header } from "../components/Header";
import "./PageNotFound.css";

export function PageNotFound({cart}) {
  return (
    <>
      <Header cart={cart} />
      <div className="notfound-page">
        <p className="notfound-404">404 Page Not Found</p>
        <p className="notfound-sorry">Sorry, the page you are looking for isn't available</p>
      </div>
    </>
  );
}
