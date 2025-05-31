import React, { useContext } from 'react'
import './Profile.scss'
import MyContext from '../../Context/MyContext'
import LoginError from '../LoginError/LoginError'


const Account = () => {

    const { userdata, openlModal, Navigate, token ,setIsProfileHovered} = useContext(MyContext)


    return (
        <>
            {token ? (
                <div className='account'>


                    <li className='account-division onediv' >

                        {/* <strong>   {userdata.fname}  </strong>
                        <p>       {userdata.mobile}</p> */}
                         <strong>{userdata?.fname}</strong> 
                         <p>{userdata?.mobile}</p>

                    </li>


                    <hr />
                    <li className='account-division' onClick={() =>{ Navigate('account-details') ;setIsProfileHovered(false)}} >
                        Account Information
                    </li>

                    <li className='account-division' onClick={() =>{ Navigate('order') ;setIsProfileHovered(false)}} >
                        order-details
                    </li>


                    <li className='account-division' onClick={() => {Navigate('shipping-address') ;setIsProfileHovered(false)}} >
                        shipping Address
                    </li>

                    <li className='account-division' onClick={openlModal || setIsProfileHovered(false)} >
                        Logout
                    </li>
                </div>)
                :
                (
                    <LoginError title="Profile Page" />
                )}

        </>
    )
}

export default Account