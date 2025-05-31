import React, { useContext } from 'react'
import './AcDetailsEdit.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import MyContext from '../../Common/Context/MyContext';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { ArrowLeft } from 'lucide-react';

const AcDetailsEdit = () => {
    const { Navigate, url, setOpen, setMainloader, mainloader, setMessage, userdata, setUserdata, token, setToken } = useContext(MyContext)




    // Form submission handler
    const validationSchema = Yup.object({
        email: Yup
            .string('*Enter your Email')
            .email('*Invalid email format')
            .required('*Email is required'),
        fname: Yup
            .string('*Enter your FirstName')
            .required('*FirstName is required'),
        lname: Yup
            .string('*Enter your LastName')
            .required('*LastName is required'),
        mobile: Yup
            .string('*Enter your Mobile no.')
            .required('*Mobile no. is required')
            .matches(/^[0-9]{10}$/, "*Mobile number must contain only 10 numbers")
    });

    // Initial form values
    const initialValues = {
        email: userdata.email || '',
        mobile: userdata.mobile || '',
        fname: userdata.fname || '',
        lname: userdata.lname || '',

    };

    // Form submission handler
    const onSubmit = async (values) => {
        setMainloader(true);
        document.querySelector('body').style.overflow = "hidden";


        try {
            const { data } = await axios.post(`${url}/update-ac-data`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });


            if (data.success) {

                setToken(data.tokendata);
                localStorage.setItem('token', data.tokendata);
                setUserdata(data.accountInfo);
                localStorage.setItem('userdata', JSON.stringify(data.accountInfo));

                setOpen(true);
                setMessage(data.message);
                Navigate('/account-details')

            } else {
                setOpen(true);
                setMessage(data.error);
            }
        } catch (error) {
            alert(error.response ? error.response.data.error : error.message);
        } finally {
            document.querySelector('body').style.overflow = "auto";
            setMainloader(false);
        }

    }

    return (
        <div className='Edit-main'>
            <ArrowLeft size={30} strokeWidth={0.75} className="close-btn" onClick={() => Navigate('/account-details')} />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                <Form className="Edit-form">
                    

                    <div className='avtar'>

                        <Avatar sx={{ bgcolor: deepPurple[500], width: 46, height: 46 }}>{userdata.fname[0]}</Avatar>
                        <h2>Update your details</h2>
                    </div>

                    <span className="span">
                        <label htmlFor="fname">FirstName </label>
                        <Field className='field1' type="text" name="fname" placeholder="Enter your FirstName" />
                        <ErrorMessage name="fname" component="div" className="error" />
                    </span>
                    <span className="span">
                        <label htmlFor="lname">LastName </label>
                        <Field className='field1' type="text" name="lname" placeholder="Enter your LastName" />
                        <ErrorMessage name="lname" component="div" className="error" />
                    </span>
                    <span className="span">
                        <label htmlFor="email">Email </label>
                        <Field className='field1' type="text" name="email" placeholder="Enter your Email" />
                        <ErrorMessage name="email" component="div" className="error" />
                    </span>
                    <span className="span">
                        <label htmlFor="mobile">Mobile No </label>
                        <Field className='field1' type="text" name="mobile" placeholder="Enter your Mobile No." />
                        <ErrorMessage name="mobile" component="div" className="error" />
                    </span>


                    <button className='subbtn' type="submit" disabled={mainloader}>
                        {mainloader ? 'wait...' : 'Submit'}
                    </button>
                </Form>

            </Formik>

        </div>
    )
}

export default AcDetailsEdit
