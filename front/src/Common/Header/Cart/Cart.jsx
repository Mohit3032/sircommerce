import React, { useContext, useEffect, useState } from 'react';
import { BsCartX } from 'react-icons/bs';
import './Cart.scss';
import MyContext from '../../Context/MyContext';
import { ArrowLeft } from 'lucide-react';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Cart = () => {
  const [loader, setLoader] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    Navigate,
    TotalValue, // Keep using this without modifying it
    url,
    setCartItems,
    cartItems,
    token,
    handleNavigate,
    removeProductFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    setMainloader
  } = useContext(MyContext);

  // Fetch cart items
  useEffect(() => {
    setMainloader(loader);
  }, [loader, setMainloader]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!token) {
        setLoader(false);
        return;
      }
      try {
        const { data } = await axios.get(`${url}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(data.cartInfo);
        localStorage.setItem('cart', JSON.stringify(data.cartInfo));
      } catch (error) {
        console.error('Failed to fetch cart details:', error.response?.data?.error || error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchCartItems();
  }, [setCartItems, token, setMainloader, url]);

  // Handle Checkbox Selection
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.some((selected) => selected.productid === item.productid && selected.size === item.size)
        ? prevSelected.filter((selected) => selected.productid !== item.productid || selected.size !== item.size)
        : [...prevSelected, item]
    );
  };

  // Compute Selected Items Total (For Dynamic Display)
  const selectedTotalValue = selectedItems.reduce((acc, item) => acc + item.productprice * item.quantity, 0);

  // Checkout only selected items
  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item for checkout.");
      return;
    }
    try {
      const { data } = await axios.post(`${url}/checkout`, { selectedItems }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        console.log("Checkout items:", data.checkoutItems);
        Navigate("/shipping-details", { state: { checkoutItems: data.checkoutItems } });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to proceed to checkout. Please try again.");
    }
  };

  if (loader) return null;

  return (
    <>
      <Helmet>
        <title>Your Cart - VHX View</title>
        <meta name="description" content="Review and edit your shopping cart items." />
        <meta name="keywords" content="shopping cart, checkout, online shopping" />
        <meta property="og:title" content="Your Cart - VHX View" />
        <meta property="og:description" content="Review and edit your shopping cart items." />
      </Helmet>

      <ArrowLeft strokeWidth={0.75} size={30} className="close-btn" onClick={() => Navigate(-1)} />

      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            <div className="cpi">
              {cartItems.sort((a, b) => b._id.localeCompare(a._id)).map((Item) => (
                <div className="cart-product" key={Item._id}>
                  <input
                    type="checkbox"
                    checked={selectedItems.some((selected) => selected.productid === Item.productid && selected.size === Item.size)}
                    onChange={() => handleCheckboxChange(Item)}
                  />
                  <div className="img-size">
                    <div className="img-container">
                      <img src={Item.productimg} alt="" onClick={() => handleNavigate(Item.categoryid, Item.productid)} />
                    </div>
                  </div>
                  <div className="prod-details">
                    <span className="name">{Item.productname}</span>
                    <span className="size-p">Size: {Item.size}</span>
                    <div className="quantity-buttons">
                      <span
                        onClick={() =>
                          Item.quantity === 1
                            ? removeProductFromCart(Item.categoryid, Item.productid, Item.size)
                            : handleDecreaseQuantity(Item.categoryid, Item.productid, Item.size)
                        }
                      >-</span>
                      <span>{Item.quantity}</span>
                      <span onClick={() => handleIncreaseQuantity(Item.categoryid, Item.productid, Item.size)}>+</span>
                    </div>
                    <div className="text">
                      <span>{Item.quantity}</span>
                      <span>x</span>
                      <span className="highlight">&#8377;{Item.productprice}</span>
                    </div>
                  </div>
                  <MdClose className="close-btn5" onClick={() => removeProductFromCart(Item.categoryid, Item.productid, Item.size)} />
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="pay-infos">
                <p>
                  <span className="text">Total MRP</span>
                  <span className="text">&#8377; {selectedItems.length > 0 ? selectedTotalValue : TotalValue}</span>
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
                <span className="text total">&#8377; {selectedItems.length > 0 ? selectedTotalValue : TotalValue}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="main-cart1">
          <div className="no-item">
            <span>
              <BsCartX className='crt' size={120} />
            </span>
            <p>No Item In Cart</p>
            <button onClick={() => Navigate('/')} className="add-to-cart-button">
              Go For Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
