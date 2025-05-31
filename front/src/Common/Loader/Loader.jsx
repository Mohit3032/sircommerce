//Loader.jsx

import React, { useContext } from 'react';
import './Loader.scss';
import MyContext from '../Context/MyContext';
import { CircularProgress } from '@mui/material';



const Loader = () => {

  const {mainloader} = useContext(MyContext)


 

  return (

    <>
    {mainloader  &&
    <div className="loader-containern">
      
      <CircularProgress size="5rem" color='black'/>
      <span className='vhxspin'>VHX</span>
    </div>
    }
    </>
  );
};

export default Loader;