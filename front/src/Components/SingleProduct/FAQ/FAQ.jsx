import React, { useState } from 'react'
import './FAQ.scss'
import { CircleMinus, CirclePlus } from 'lucide-react';
import { Avatar } from '@mui/material';
import { deepOrange, deepPurple, green } from '@mui/material/colors';
import Data from './Faqdata';
const FAQ = () => {

   

    const [showans, setShowans] = useState(false);
    const [a, setA] = useState();

    return (
        <div className='faq-main'>
            <h1>Frequently asked questions</h1>
            <p>Everything you need to know about the product.</p>


            <div className='acobox'>
                {Data.map((qa) => {
                    return (
                        <div className="que-ans">

                            <span className="qns" onClick={() => { setA(qa.srno) || setShowans(!showans) }} >
                                <p className="question">
                                    {qa.question}
                                </p>
                                <span
                                    className='aero'> {qa.srno === a && showans ? <CircleMinus size={18} strokeWidth={1.5} /> : <CirclePlus strokeWidth={1.5} size={18} />} </span>
                            </span>
                            {showans && a === qa.srno && <p className="answer">{qa.answer}</p>}
                        </div>
                    );
                })
                }
            </div>
            <div className='chatwithus' >
                <span className='avatars'>  
                     <Avatar className='avts' sx={{ bgcolor: deepOrange[500], width: 46, height: 46 }}>A</Avatar>
                    <Avatar className='avts mid-avt' sx={{ bgcolor: deepPurple[500], width: 46, height: 46 }}>N</Avatar>
                    <Avatar className='avts' sx={{ bgcolor: green[500], width: 46, height: 46 }}>V</Avatar> </span>
                <h4>Still have questions?</h4>
                <p>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
                <button className='git-btn' onClick={ ()=>window.open('/chat', "_blank", "width=650,height=900")}> Get in touch</button>
            </div>
        </div>
    )
}

export default FAQ
