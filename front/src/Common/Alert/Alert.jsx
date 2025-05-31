import React, { useContext, useEffect } from 'react'
import './Alert.scss'
import MyContext from '../Context/MyContext'
import { GoAlert } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";

const Alert = () => {
    const { open, setOpen, message } = useContext(MyContext)

    const isThanks = message.match('Thanks');

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false)
            }, 2500);
        }
    }, [open,setOpen])

    return (

        <>
            {open &&
                <div className="alert" >
                   <span>{isThanks ?<FaCheckCircle/> :<GoAlert/>}</span>
                   {message}
                </div>
            }
        </>
    )
}

export default Alert