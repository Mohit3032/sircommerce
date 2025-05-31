import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../ContactForm.scss'
import MyContext from '../../../Context/MyContext';

const Returnform = () => {

    const { url,setMainloader,setMessage,setOpen } = useContext(MyContext);

    const validationSchema = Yup.object({
       
        reason:  Yup.string().required('*Return/Replace reason is required'),
        message: Yup.string().required('*Message is required'),
        email: Yup.string().email('*Invalid email format').required('*Email is required'),
        file:  Yup.mixed().required('*Photo is required')

    });

    const initialValues = {
       
        reason: '',
        message: '',
        email: '',
        file: null,
    };

    const onSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('reason', values.reason);
        formData.append('message', values.message);
        formData.append('file', values.file); 
    
        try {
            const {data} = await axios.post(`${url}/submit-return`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
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
                {({ values, setFieldValue }) => (
                    <Form className="contact-form">
                     
                                <h3>Return/Replace Related</h3>
                                <span className="span">
                                    <label htmlFor="email">Email :</label>
                                    <Field className="field1" type="text" id="email" name="email" placeholder="Enter your Email" />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </span>
                                <span className="span">
                                    <label htmlFor="reason">Reason :</label>
                                    <Field as="select" name="reason" id="reason">
                                        <option value="" label="Select a reason" />
                                        <option value="Size related" label="Size related" />
                                        <option value="Color related" label="Color related" />
                                        <option value="Quality related" label="Quality related" />
                                        <option value="Other" label="Other" />
                                    </Field>
                                    <ErrorMessage name="reason" component="div" className="error" />
                                </span>
                                <span className="span">
                                    <label htmlFor="message">Message :</label>
                                    <Field className="field1" as="textarea" id="ms3" name="message" placeholder="Enter your message" />
                                    <ErrorMessage name="message" component="div" className="error err mserr" />
                                </span>
                                <span className="span">
                                    <label htmlFor="file">Upload Photo :</label>
                                    <input
                                        className="field2"
                                        type="file"
                                        onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
                                    />
                                    <ErrorMessage name="file" component="div" className="error err" />
                                </span>
        

                        <button className="loginbtn" type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
    </div>
  )
}

export default Returnform
