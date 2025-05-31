import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../../Context/MyContext';
import '../../../../Components/ShippingDetails/ShippingDetails.scss'
import ShippingForm from '../../../../Components/ShippingDetails/ShippingForm';
import EditAddressform from '../../../../Components/ShippingDetails/EditAddress/EditAddressform';
import LoginError from '../../LoginError/LoginError';
import { Helmet } from 'react-helmet';

const Shipping = () => {


    const { selectedAddress,setMainloader, editform, handleEditAddress, setSelectedAddressId, openshipformModal, edit, token, url, shipping, setShipping, } = useContext(MyContext);
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        setMainloader(loader);
      }, [loader, setMainloader]);

    useEffect(() => {

        const fetchShippingData = async () => {
            if (!token) {
                setLoader(false)
               
                return

            }

            try {
                const { data } = await axios.get(`${url}/get-user-address`, {

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setShipping(data.shippingInfo);
                localStorage.setItem('shipping', JSON.stringify(data.shippingInfo));



            } catch (error) {
                console.error('Failed to fetch shipping details:', error.response?.data?.error || error.message);
            } finally {
                setLoader(false);
               
            }
        };

        fetchShippingData();
    }, [setShipping, token, url, setSelectedAddressId,setMainloader]);

    if (loader) {
       
        return;
    }


    return (
        <>
            {
                token ? (
                    <div className='shipinfos' >
                        <Helmet>
                            <title>Shipping Address - VHX View</title>
                            <meta name="description" content="Enter your shipping address details." />
                            <meta name="keywords" content="shipping address, checkout, Confirm order" />
                            <meta property="og:title" content="Shipping Address - VHX View" />
                            <meta property="og:description" content="Enter your shipping address details." />
                        
                        </Helmet>
                        <div className='shipping-details'>
                            <h2>Shipping Information</h2>

                            {shipping &&


                                <div className='address-all'>

                                    {shipping.map((add) => (
                                        <div className='add' key={add._id}>


                                            <div className='address1'>

                                                <div>
                                                    <p><strong> {add.name}</strong></p>
                                                    <p> {add.mobile}</p>
                                                    <p>   {add.address} ,
                                                        {add.landmark} ,
                                                        {add.city} ,
                                                        {add.state} ,
                                                        {add.pincode} </p>
                                                </div>
                                                <button onClick={() => handleEditAddress(add)}>Edit Address</button>
                                            </div>
                                        </div>
                                    ))}


                                </div>}


                            {shipping && shipping.length < 3 ? <button className='add-new' onClick={() => openshipformModal()}>Add new Address</button> : null}

                        </div>



                        {edit && <ShippingForm />}
                        {editform && <EditAddressform address={selectedAddress} />}

                    </div >) :

                    (<LoginError title="Shipping information" />)}
        </>
    )
}

export default Shipping
