import React, { useContext, useEffect } from 'react'
import './Accountdetails.scss'
import MyContext from '../../Common/Context/MyContext';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { ArrowLeft } from 'lucide-react';
import LoginError from '../../Common/Header/LoginError/LoginError';

import { Helmet } from 'react-helmet';
const Accountdetails = () => {
  const { token, userdata, url,setMainloader, setUserdata, Navigate } = useContext(MyContext);

  

  useEffect(() => {

    const fetchUserData = async () => {
      if (!token) {
        
        return;
      }

      try {
        setMainloader(true)
        const { data } = await axios.get(`${url}/account-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserdata(data.accountInfo);
        localStorage.setItem('userdata', JSON.stringify(data.accountInfo));
      } catch (error) {
        console.error('Failed to fetch account details:', error.response?.data?.error || error.message);
      } finally {
        setMainloader(false);
      }
    };
    fetchUserData();
  }, [token, setUserdata, url,setMainloader]);


  return (

<> 
{token ? (
    <div className='alt_details'>
         <Helmet>
        <title>Account Details - VHX View</title>
        <meta name="description" content="View and update your account details." />
        <meta name="keywords" content="account details, profile, settings" />
        <meta property="og:title" content="Account Details - VHX View" />
        <meta property="og:description" content="View and update your account details." />
      
      </Helmet>
      <ArrowLeft size={30} strokeWidth={0.75} className="acclose-btn" onClick={() => Navigate('/')} />
      <div className='ac-main'>
        <div className='yourdetails'>
          <Avatar sx={{ bgcolor: deepPurple[500] , width: 46, height: 46 }}>{userdata.fname[0]}</Avatar>
          <h2>Your Information</h2>
        </div>

        <p><label>FirstName </label> <span> {userdata && userdata.fname}</span></p>
        <p><label>LastName </label> <span>{userdata && userdata.lname}</span></p>
        <p><label>Email </label><span> {userdata && userdata.email}</span></p>
        <p><label>Mobile </label><span> {userdata && userdata.mobile}</span></p>
        <button onClick={() => Navigate('/edit')}>Edit</button>
      </div>

    </div> ) :
    ( <LoginError title="Account Details" />  )}
    </>
  )
}

export default Accountdetails
