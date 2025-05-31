
import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../ShippingForm.scss'
import MyContext from '../../../Common/Context/MyContext';
import { MdClose } from 'react-icons/md';
const EditAddressform = ({ address }) => {

    const { closehandleEditAddress,token, url, setShipping, setMainloader, setOpen, setMessage } = useContext(MyContext);

    return (

        <div className='shipform'>
            <Formik
                initialValues={{
                    name: address?.name || '',
                    mobile: address?.mobile || '',
                    address: address?.address || '',
                    landmark: address?.landmark || '',
                    city: address?.city || '',
                    state: address?.state || '',
                    pincode: address?.pincode || ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Name is required'),
                    mobile: Yup.string().required('Mobile number is required').matches(/^[0-9]{10}$/, "*Mobile number must contain only 10 numbers"),
                    address: Yup.string().required('Address is required'),
                    state: Yup.string().required('State is required'),
                    pincode: Yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
                    landmark: Yup.string().required('Landmark is required'),
                    city: Yup.string().required('City is required'),
                })}
                onSubmit={async (values) => {
                    setMainloader(true);
                    document.querySelector('body').style.overflow = "hidden";
                    const payload = { ...values, addressId: address._id };
                    try {
                        const { data } = await axios.post(`${url}/update-shipping-info`,
                            payload,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },

                            });

                        if (data.success) {
                            setOpen(true);
                            setMessage(data.message);
                            setShipping(data.shippingInfo);
                            sessionStorage.setItem('shipping', JSON.stringify(data.shippingInfo));

                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            setOpen(true);
                            setMessage(data.error);

                        }

                    } catch (error) {

                        setMessage(error.response?.data?.error || error.message);
                        setOpen(true);
                    } finally {
                        document.querySelector('body').style.overflow = "auto";
                        setMainloader(false);
                    }
                }}
            >


                {({ isSubmitting }) => (
                    <Form className='ship-main'>
                        <h2>Upadate Shipping Details    <span className='x' > <MdClose onClick={closehandleEditAddress} />  </span></h2>
                        <div className='name-form'>
                            <div className='name-input'>
                                <label htmlFor='name'>Name:</label>
                                <Field type='text' name='name' />
                                <ErrorMessage name='name' component='div' className='error-message' />
                            </div>

                            <div className='name-input'>
                                <label htmlFor='mobile'>Mobile:</label>
                                <Field type='text' name='mobile' />
                                <ErrorMessage name='mobile' component='div' className='error-message' />
                            </div>

                            <div className='name-input'>
                                <label htmlFor='address'>Address:</label>
                                <Field type='text' name='address' />
                                <ErrorMessage name='address' component='div' className='error-message' />
                            </div>



                            <div className='name-input'>
                                <label htmlFor='landmark'>Landmark:</label>
                                <Field type='text' name='landmark' />
                                <ErrorMessage name='landmark' component='div' className='error-message' />
                            </div>

                            <div className='name-input'>
                                <label htmlFor='pincode'>Pincode:</label>
                                <Field type='text' name='pincode' />
                                <ErrorMessage name='pincode' component='div' className='error-message' />
                            </div>
                            <div className='name-input'>
                                <label htmlFor='city'>City:</label>
                                <Field type='text' name='city' />
                                <ErrorMessage name='city' component='div' className='error-message' />
                            </div>

                            <div className='name-input'>
                                <label htmlFor='state'>State:</label>
                                <Field type='text' name='state' />
                                <ErrorMessage name='state' component='div' className='error-message' />
                            </div>
                            <button type='submit' disabled={isSubmitting}>
                                submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>

    )
}

export default EditAddressform
