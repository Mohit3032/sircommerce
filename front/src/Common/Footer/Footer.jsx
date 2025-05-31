import "./Footer.scss";
import Payment from "../../assets/payments.png"
import { useContext } from "react";
import MyContext from "../Context/MyContext";
import Newsletter from "./Newsletter/Newsletter";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";



const Footer = () => {

    const{Navigate,data,handleInsta,handleYoutube} = useContext(MyContext)

 
    
    return (
        <div className="footer">
    <div className="footer-content">

        <div className="col">
            <div className="title">About</div>
            <div className="text para">
            Stay at tuned to men's fashion trends and ensure that VHX offerings align with contemporary styles. Highlight key fashion elements and styles that resonate with your male audience
            </div>
        </div>

        <div className="col">
        <div className="title">Categories</div>

        {data.map((item) =>{
            return(
                <div className="text" onClick={() => Navigate(`/category/${item.product_category_route}`)} key={item.id}>{item.product_category}</div>
            )
        })
       
        } 
        </div>

        <div className="col">
        <div className="title">Pages</div>
        <div className="text" onClick={() => Navigate('/')}>Home</div>  
        <div className="text" onClick={() => Navigate('/contactus')}>Contact Us</div>
        <div className="text" onClick={() => Navigate('/terms-and-condition')}>Terms and Condition</div>
       
        
        </div>
        
        <div className="col lastcol">
        <div className="title">Join Our Newsletter for Exclusive Updates</div>
          <div className="text">
            <Newsletter/>

          </div>
          <div className="social-icons">

<button type='submit' onClick={handleInsta}>  <FaInstagram/></button>
<button type='submit' onClick={handleYoutube} >  <FaYoutube /></button>
<button type='submit' onClick={handleYoutube} > <FaFacebook /></button>

</div>
      </div>
    </div>

 

        <div className="bottom-bar-content">
            <div className="text">
                VHX View 2024.PREMIUM E-COMERCE SOLUTION.
            </div>
            <img src={Payment} alt=""/>
        </div>
   


    </div>
    )

};

export default Footer;
