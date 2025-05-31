import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../ContactForm.scss'
import MyContext from '../../../Context/MyContext';


const Orderform = () => {

    const { url,setMainloader,setMessage,setOpen } = useContext(MyContext);


    const validationSchema = Yup.object({
        orderID:  Yup.string().required('*Order ID is required'),
        message: Yup.string().required('*Message is required'),
        email: Yup.string().email('*Invalid email format').required('*Email is required'),
    });

    const initialValues = {
        orderID: '',
        message: '',
        email: '',
       
    };

    const onSubmit = async (values, { resetForm }) => {
        setMainloader(true);
        document.querySelector('body').style.overflow = "hidden";
     
  
      try {
          const {data} = await axios.post(`${url}/submit-orderform`, values);

  
          if (data.success) {
              setOpen(true);
              setMessage(data.message);
              resetForm();
           
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
  
    
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
             
                    <Form className="contact-form">
                                <h3>Order Related</h3>
                                <span className="span">
                                    <label htmlFor="email">Email :</label>
                                    <Field className="field1" type="text" id="email" name="email" placeholder="Enter your Email" />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </span>
                                <span className="span">
                                    <label htmlFor="orderID">Order ID :</label>
                                    <Field className="field1" type="text" id="orderID" name="orderID" placeholder="Enter your Order ID" />
                                    <ErrorMessage name="orderID" component="div" className="error" />
                                </span>
                                <span className="span">
                                    <label htmlFor="message">Message :</label>
                                    <Field className="field1" as="textarea" id="message" name="message" placeholder="Enter your message" />
                                    <ErrorMessage name="message" component="div" className="error mserr" />
                                </span>
                        <button className="loginbtn" type="submit">Submit</button>
                    </Form>
              
            </Formik>
        </div>
    )
}

export default Orderform
