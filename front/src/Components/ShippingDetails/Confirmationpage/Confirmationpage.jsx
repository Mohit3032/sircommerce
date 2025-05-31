
import React, { useContext} from "react";
import MyContext from "../../../Common/Context/MyContext";
import "./Confirmationpage.scss";
import LoginError from "../../../Common/Header/LoginError/LoginError";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Helmet } from "react-helmet";
const PaymentConfirmation = () => {

  const { token, Navigate } = useContext(MyContext);

  return (
    <>
      {token ? (
        <div className="confirmation-page">
        <Helmet>
        <title>Order Confirmation - VHX View</title>
        <meta name="description" content="Your order has been confirmed. Thank you for shopping with VHX View" />
        <meta name="keywords" content="order confirmation, purchase, thank you" />
        <meta property="og:title" content="Order Confirmation - VHX View" />
        <meta property="og:description" content="Your order has been confirmed. Thank you for shopping with VHX View" />
       
      </Helmet>
          <span>
            <CheckCircleIcon style={{fontSize:'100px'}} color="success" />
          </span>

            <h2>Order Confirmed</h2>
          <div className="con-text">

            <p>
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
            <button onClick={() => Navigate("/order")}>Show Order</button>
            <button onClick={() => Navigate("/")}>Continue Shopping</button>
          </div>
        </div>
      ) : (
        <LoginError title=" this page." />
      )}
    </>
  );
};

export default PaymentConfirmation;
