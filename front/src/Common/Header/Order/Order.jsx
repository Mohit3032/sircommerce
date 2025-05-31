import React, { useContext, useEffect, useState } from 'react';
import "./Order.scss";

import axios from 'axios';
import MyContext from '../../Context/MyContext';
import { Helmet } from 'react-helmet';
import Reviewform from './Reviewform/Reviewform';

const Order = () => {
  const [loading, setLoading] = useState(true);
  const { order, setOrder, url, token, handleNavigate ,Navigate , setSelectedOrder,setMainloader} = useContext(MyContext);
//track orders 
  const trackfunc = (item)=>{
  setSelectedOrder(item);
  localStorage.setItem('selectedorderitem', JSON.stringify(item));
  Navigate('/track-order') ;
}

useEffect(() => {
  setMainloader(loading);
}, [loading, setMainloader]);
  useEffect(() => {

    const fetchOrderItems = async () => {

      if (!token) {
        setLoading(false);
       
        return;
      }
      try {
        const { data } = await axios.get(`${url}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setOrder(data.orderInfo);
        localStorage.setItem('order', JSON.stringify(data.orderInfo));
      } catch (error) {
        console.error('Failed to fetch order details:', error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
       
      }
    };
    fetchOrderItems();
  }, [setOrder, token,setMainloader, url]);

  if (loading) {
 
    return
  }


  const sendReorder = (productdata) => {
  
    Navigate('/shipping-details', { state: { reorderedProductdata: productdata } });
  };
  return (
    <div className='order-container'>
         <Helmet>
        <title>Order Details - VHX View</title>
        <meta name="description" content="View the details of your order." />
        <meta name="keywords" content="order details, order status, purchase history" />
        <meta property="og:title" content="Order Details - VHX View" />
        <meta property="og:description" content="View the details of your order." />
  
      </Helmet>
      <div className="order-content">

        <h1>Order History </h1>
        <div className='order-center'>
          {
            order && order.length > 0 ?
              order
              .sort((a, b) => b._id.localeCompare(a._id))
                .map((item) => (
                  <div className="order-item" key={item._id}>
                    <div className='firstline' >
                      <p>Order Date: <strong> {item.orderDate.slice(0, 10)}</strong></p>
                      <p>Order ID:  <strong>{item._id.slice(-4)}</strong></p>
                      <p>Order Status:  <strong> {item.deliverd ? 'Delivered' : item.shipped ? 'Shipped' : 'Confirm'} </strong> </p>

                    </div>

                    <div className="order-item-details">
                      <img src={item.productimg} alt={item.productname}
                        className="order-item-img"
                        onClick={() => handleNavigate(item.categoryid, item.productid)} />
                      <div className='imp-details'>
                        <h3>{item.productname}</h3>
                        <p>Size: {item.size}</p>
                        <p className='pric'> <strong>Price: &#8377; {item.productprice}</strong></p>
                        <p>Quantity: {item.quantity}</p>
                       
                        <span className='track23'>
                      <button  onClick={()=>trackfunc(item) } >Track Order </button>
                      <button  onClick={()=>sendReorder(item)} > Reorder </button>
                      
                      </span>
                      </div>
                      <Reviewform className='rvfrm' item={item} />
                      <span className='track'>
                      <button  onClick={()=>trackfunc(item) } >Track Order </button>
                      <button onClick={()=>sendReorder(item)}> Reorder </button>
                  
                      </span>
                    </div>
                  </div>
                )) :
              <div className='order-empty'>
                <span className='order-empty-text'>You don't Order yet.
                  <br />
                  <br />
                  You will find a lot of interesting products on our "Shop" page.
                </span>
                <button className='order-btn'   onClick={() =>Navigate('/')} >Continue Shopping</button>
              </div>
          }
        </div>
      </div>
      
    </div>
  );
}

export default Order;
