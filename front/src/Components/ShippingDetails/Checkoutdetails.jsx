import React, { useContext } from 'react'
import './Checkoutdetails.scss'
import MyContext from '../../Common/Context/MyContext';
import axios from 'axios';
import LoginError from '../../Common/Header/LoginError/LoginError';
import { Helmet } from 'react-helmet';

const Checkoutdetails = ({ buttonLabel , reord}) => {

  const { userdata,handleReorder,handleSubmit, selectedAddressId, Navigate, shipping, token, setOpen, setMessage, TotalValue, url, setMainloader } = useContext(MyContext);



  const handleupi = async (e) => {
    setMainloader(true);

    try {
      // Use axios to make the POST request
      const { data } = await axios.post(`${url}/razorpay`, {
        amount: reord?.productprice || TotalValue
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });



      if (data.success !== true) {
        setOpen(true);
        setMessage(data.error);
      } else {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: data.amount,
          currency: data.currency,
          image: "https://i.ibb.co/Yf17h8z/logo.png",
          name: "VHX",
          description: "Test Transaction",
          prefill: {
            contact: userdata.mobile, 
          },
          order_id: data.id,
          config: {
            display: {
              blocks: {
                utib: {
                  name: "most recommended using",
                  instruments: [
                    {
                      method: "card",
                      types: ["debit", "credit"]
                    },
                    {
                      method: "upi",

                    }
                  ]
                },

              },
              hide: [
                {
                  method: "upi",
                  flows: ["qr"]
                },
                {
                  method: "wallet",

                },

                {
                  method: "paylater",

                }
              ],
              sequence: ["block.utib", "block.other"],
              preferences: {
                show_default_blocks: true
              }
            }
          },
          handler: async (response) => {
            if (reord) {
              await handleReorder(response,reord); 
            } else {
              await handleSubmit();  
            }
            Navigate('/confirm');
          },
        
          theme: {
            color: "#fff",
            hide_topbar: false,
            shape: "rectangular",
            header: {
              color: "#fff",
              text: "Payment"
            }
          }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      alert(error.message);
      console.error("Error during payment process:", error);
    } finally {
      setMainloader(false);
    }
  };


  return (
    <div>
      <Helmet>
       <title>Secure Checkout | VHX View</title>
      <meta name="description" content="Complete your purchase with a safe and secure checkout process. Shop confidently with VHX View" />
    </Helmet>
      {token ? (
        <div className="cart-footer">

          <div className="pay-infos">
            <p>
              <span className="text">Total MRP</span>
              <span className="text">&#8377; {reord?.productprice || TotalValue}</span>
            </p>
            <p>
              <span className="text">Handling fee</span>
              <span className="text">free</span>
            </p>
            <p>
              <span className="text">Shipping fee</span>
              <span className="text">free</span>
            </p>
          </div>
          <div className="subtotal">
            <span className="text">Subtotal</span>
            <span className="text total">&#8377; {reord?.productprice || TotalValue}</span>
          </div>
          <div className="button">
            <button
              className="checkout-cta"
           
              onClick={() => handleupi()}
              disabled={!selectedAddressId || shipping.length < 1}
            >
              {buttonLabel}
            </button>
          </div>
          <div className="small-scrn-btn">
            <div className="subtotal2">
              <span className="text">total</span>
              <span className="text total">&#8377;{reord?.productprice || TotalValue}</span>
            </div>

            <button
              className="checkout-cta2"
              onClick={() => handleupi()}
              disabled={!selectedAddressId || shipping.length < 1}
            >
              {buttonLabel}
            </button>
          </div>
        </div>)
        : (
          <LoginError title="Payment details" />
        )}
    </div>
  )
}

export default Checkoutdetails
