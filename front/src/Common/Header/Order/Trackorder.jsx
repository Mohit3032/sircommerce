import React, { useContext } from 'react'
import './Trackorder.scss'
import MyContext from '../../Context/MyContext'
import LoginError from '../LoginError/LoginError'
import { Helmet } from 'react-helmet'
const Trackorder = () => {


    const { selectedOrder, token } = useContext(MyContext)
    return (

        <>
        <Helmet>
        <title>Track Your Order - VHX View</title>
        <meta name="description" content="Track the status of your order." />
        <meta name="keywords" content="track order, order status, shipping status" />
        <meta property="og:title" content="Track Your Order - VHX View" />
        <meta property="og:description" content="Track the status of your order." />
      </Helmet>
            {token ? (
                <div className="order-status-card">
                    <div className="order-header">
                        <span>Order ID : <strong>{selectedOrder._id.slice(-4)}</strong></span>
                        <span>Place On : <strong>{selectedOrder.orderDate.slice(0, 10)}</strong></span>
                    </div>

                    <div className="product-info">
                        <div className="product-details">
                            <h3>{selectedOrder.productname}</h3>
                            <p>Qt: {selectedOrder.quantity}</p>
                            <p className="price">Price: &#8377; {selectedOrder.productprice}</p>

                        </div>
                        <div className="product-image">
                            <img src={selectedOrder.productimg} alt="Product" />
                        </div>
                    </div>

                    <div className="order-progress">
                        <div className="progress-step">
                            <div className="circle" style={{ backgroundColor: selectedOrder.confirm === true && '#35495e' }} >1</div>
                            <span className="label">PLACED</span>
                        </div>
                        <div className="progress-bar" style={{ backgroundColor: selectedOrder.shipped === true && '#35495e' }}  ></div>
                        <div className="progress-step ">
                            <div className="circle" style={{ backgroundColor: selectedOrder.shipped === true && '#35495e' }} >2</div>
                            <span className="label">SHIPPED</span>
                        </div>
                        <div className="progress-bar" style={{ backgroundColor: selectedOrder.deliverd === true && '#35495e' }} ></div>
                        <div className="progress-step">
                            <div className="circle" style={{ backgroundColor: selectedOrder.deliverd === true && '#35495e' }} >3</div>
                            <span className="label">DELIVERED</span>
                        </div>
                    </div>
                </div>)
                : (<LoginError title='Track order' />)}
        </>
    )
}

export default Trackorder
