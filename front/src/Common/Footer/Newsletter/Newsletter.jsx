
import "./Newsletter.scss";
import { InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from 'axios';
import { useContext} from "react";
import MyContext from "../../Context/MyContext";
import { EmailOutlined } from "@mui/icons-material";

const Newsletter = () => {


  const {url,setMessage,setOpen,mainloader,setMainloader} = useContext(MyContext)


  const formik = useFormik({
    initialValues: {
      email: '',


    },
    validationSchema: yup.object({
      email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),

    }),
    onSubmit: async (values, { resetForm }) => {
      setMainloader(true)
      document.querySelector('body').style.overflow="hidden"

      try {
        const { data } = await axios.post(`${url}/newlater`, values);

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
    
    },

  });

 
  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
      

        <form className="form" onSubmit={formik.handleSubmit}>


          <TextField
            id="email"
            name="email"

            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          
            placeholder="enter your maill id"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined fontSize="small" />
                </InputAdornment>
              ),}}
           />

          <button variant="contained" type='submit'>{mainloader ?'wait...':'Subscribe'}  <ArrowRightAltIcon /></button>
        </form>
       
       

      </div>
    </div>
          )

}


export default Newsletter;



