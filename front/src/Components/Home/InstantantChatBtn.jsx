import React from 'react'
import { SiChatbot } from "react-icons/si";
import './InstantantChatBtn.scss';

const InstantantChatBtn = () => {
  return (
    <div className='chatbtn-container' onClick={()=>window.open('/chat', "_blank", "width=650,height=900")} >
      <SiChatbot />
    </div>
  )
}

export default InstantantChatBtn
