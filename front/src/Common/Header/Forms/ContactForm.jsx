import React, { useState } from 'react';

import Otherform from './Contactsubform/Otherform';
import Returnform from './Contactsubform/Returnform';
import Orderform from './Contactsubform/Orderform';
import { Helmet } from 'react-helmet';

const ContactForm = () => {
    const [activeForm, setActiveForm] = useState('order');


    return (
        <div className="contact-main">
            <Helmet>
        <title>Contact Us - VHX View</title>
        <meta name="description" content="Get in touch with us for any questions or inquiries." />
        <meta name="keywords" content="contact us, customer service, support" />
        <meta property="og:title" content="Contact Us - VHX View " />
        <meta property="og:description" content="Get in touch with us for any questions or inquiries." />
        {/* <meta property="og:url" content="https://your-website.com/contact-us" /> */}
      </Helmet>
            <h1>Get In Touch </h1>
            <div className="buttons">
                <div>
                    <input
                        type="radio"
                        id="order"
                        name="selform"
                        value="order"
                        checked={activeForm === 'order'}
                        onChange={() => setActiveForm('order')}
                    />
                    <label htmlFor="order">Order Related</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="return"
                        name="selform"
                        value="return"
                        checked={activeForm === 'return'}
                        onChange={() => setActiveForm('return')}
                    />
                    <label htmlFor="return">Return/Replace Related</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="other"
                        name="selform"
                        value="other"
                        checked={activeForm === 'other'}
                        onChange={() => setActiveForm('other')}
                    />
                    <label htmlFor="other">Other</label>
                </div>
            </div>
         
  {activeForm === 'other' && <Otherform/>    }
  {activeForm === 'return' && <Returnform/>    }
  {activeForm === 'order' && <Orderform/>    }

                   
        </div>
    );
};

export default ContactForm;
