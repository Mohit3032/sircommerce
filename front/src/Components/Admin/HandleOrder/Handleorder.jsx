import React, { useContext } from 'react'
import MyContext from '../../../Common/Context/MyContext';
import './HandleOrder.scss'
import axios from 'axios';
const Handleorder = ({ regdata }) => {

    const { url, setOpen, setMessage,setMainloader } = useContext(MyContext)

    const shippedfunc = async (email, categoryid, productid, size) => {
        setMainloader(true);
        document.querySelector('body').style.overflow = "hidden";

        try {
            const { data } = await axios.post(`${url}/shipping-true`, { email, categoryid, productid, size }, {
            });

            if (data.success) {
                setMessage('order shipped')
                setOpen(true)
             
            } else {
                setMessage('error');
                setOpen(true)
            }
        } catch (error) {
            alert(error.response ? error.response.data.error : error.message);
        } finally {
            document.querySelector('body').style.overflow = "auto";
            setMainloader(false);
        }
    };
    const deliverdfunc = async (email, categoryid, productid, size) => {
        setMainloader(true);
        document.querySelector('body').style.overflow = "hidden";
        try {

            const { data } = await axios.post(`${url}/deliverd-true`, { email, categoryid, productid, size }, {

            });

            if (data.success) {
                setMessage('order deliverd')
                setOpen(true)
            
            } else {
                setMessage('error');
                setOpen(true)
            }
        } catch (error) {
            alert(error.response ? error.response.data.error : error.message);
        } finally {
            document.querySelector('body').style.overflow = "auto";
            setMainloader(false);
        }
    };

    return (
        <div>
            <table >
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>track order</th>
                </tr>
                {regdata.map((u) => {
                    return (
                       
                        u.order
                        .sort((a, b) => b._id.localeCompare(a._id))
                        .map((i) => {
                            return (

                                u.shippingInfo
                                .filter(a => a._id===i.deliveryaddressid)
                                .map((s) => {
                                    return (
                                        <tr>
                                            <td>{u.fname}</td>
                                            <td>{u.email}</td>
                                            <td className='address-col'>{s.name}, {s.mobile}, {s.address}, {s.landmark}, {s.pincode}, {s.city}, {s.state}  </td>
                                            <td>{i.productname}</td>
                                            <td> &#8377; {i.productprice}</td>
                                            <td>{i.size}</td>
                                            <td>{i.quantity}</td>
                                            <td>
                                                <button className='sipd' disabled={i.shipped ===true} onClick={() => shippedfunc(u.email, i.categoryid, i.productid, i.size)} >shipped</button>
                                                <button className='sipd' disabled={i.deliverd ===true} onClick={() => deliverdfunc(u.email, i.categoryid, i.productid, i.size)} >deliverd</button>
                                            </td>
                                        </tr>
                                    )
                                }))
                        })
                    )
                })}

            </table>
        </div>
    )
}

export default Handleorder
