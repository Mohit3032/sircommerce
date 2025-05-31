import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../Common/Context/MyContext';
import ShippingForm from './ShippingForm';
import './ShippingDetails.scss'
import Checkoutdetails from './Checkoutdetails';
import EditAddressform from './EditAddress/EditAddressform';
import LoginError from '../../Common/Header/LoginError/LoginError';
const ShippingDetails = () => {


    const { selectedAddress,setMainloader,location,editform, handleEditAddress, handleSelectAddress, selectedAddressId, setSelectedAddressId, openshipformModal, edit, token, url, shipping, setShipping, } = useContext(MyContext);
    const [loader, setLoader] = useState(true);


    const reorderedProductdata = location.state?.reorderedProductdata;

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

                let shippingData = data.shippingInfo;
              sessionStorage.setItem('shipping', JSON.stringify(shippingData));

                if (shippingData?.length > 0) {
                    const initialAddressId = reorderedProductdata?.deliveryaddressid || shippingData[0]._id;
                    setSelectedAddressId(initialAddressId);

                    // Reorder array to place the selected address at the top
                    shippingData = [
                        ...shippingData.filter((add) => add._id === initialAddressId),
                        ...shippingData.filter((add) => add._id !== initialAddressId)
                    ];
                }

                setShipping(shippingData);
            } catch (error) {
                console.error('Failed to fetch shipping details:', error.response?.data?.error || error.message);
            } finally {
                setLoader(false);
               
            }
        };

        fetchShippingData();
    }, [setShipping, token, url, setSelectedAddressId,reorderedProductdata,setMainloader]);

 

    if (loader) {
        
        return ;
    }


    return (
        <>
            {
                token ? (
                    <div className='shipinfos' >
         
                        <div className='shipping-details'>
                            <h2>Shipping Information</h2>

                            {shipping?.length > 0 &&


                                <div className='address-all'>

                                    {shipping.map((add) => (
                                        <div className='add' key={add._id}>

                                            <input className='radio-add'
                                                type="radio"
                                                name="selectedAddress"
                                                checked={selectedAddressId === add._id}
                                                onChange={() => handleSelectAddress(add._id)}
                                            />
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
                        <div className='checkout-comp'>
                            <Checkoutdetails buttonLabel="Proceed to Payment"  reord={reorderedProductdata} />

                        </div>

                    </div >) :

                    (<LoginError title="Shipping information" />)}
        </>
    )
}

export default ShippingDetails
