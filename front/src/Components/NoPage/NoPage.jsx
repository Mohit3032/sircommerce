// AnimatedBorderPage.jsx

import React, { useContext } from 'react';
import './NoPage.scss';
import { IoMdHome } from 'react-icons/io';
import MyContext from '../../Common/Context/MyContext';




const NoPage = () => {
  const {Navigate} = useContext(MyContext)

  return (
    <div className="container1">
   
      <IoMdHome className="big-icon" />
 
    <h1> 404 error!</h1>
    <p onClick={() => Navigate('/')}>click here to go to home page.</p>
  </div>
  );
};

export default NoPage;
