import React, { useContext, useEffect, useState } from 'react';
import './Sizechart.scss';
import MyContext from '../../../Common/Context/MyContext';

function SizeChartModal() {

    const {isModalsize,closesizeModal } =useContext(MyContext)
  

    const [language, setLanguage] = useState(localStorage.getItem("savedLanguage") || "Select");

   
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem("savedLanguage", selectedLanguage);
    };

    useEffect(() => {
      
        const savedLanguage = localStorage.getItem("savedLanguage");
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);
    const handleCloseModal = () => {
        // Add the 'closing' class to trigger the reverse animation
        const modalContent = document.querySelector('.modal-content');
        modalContent.classList.add('closing');

        // After the closing animation, close the modal completely
        setTimeout(() => {
            closesizeModal(); // Close the modal
        }, 200); // Match the duration of the closing animation
    };

    return (
        <div>
       
          
            {isModalsize && (
                <>
                <div className="modal" onClick={handleCloseModal}>  </div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2> Size Chart</h2>
                      <span className='lang-span'>
                            
                                        <select 
                                            id="languageSelect" 
                                            value={language} 
                                            onChange={handleLanguageChange}
                                        >
                                            <option disabled  value="Select">Select Language</option>
                                            <option  value="English">English</option>
                                            <option  value="Hindi">Hindi</option>
                                        </select>
                                        </span>
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                        </div >
                        <h3>IN CASUAL T-SHIRTS</h3>
                        <div className='tab-cont'>
                        
                        <table className="table">
                            <thead>
                                <tr>
                                <th>{language === "English" ? "Brand Size" : "ब्रांड आकार"}</th>
                                    <th>{language === "English" ? "Chest (in)" : "चेस्ट (इंच)"}</th>
                                    <th>{language === "English" ? "Waist (in)" : "कमर (इंच)"}</th>
                                    <th>{language === "English" ? "Sleeve Length (in)" : "स्लीव लंबाई (इंच)"}</th>
                                    <th>{language === "English" ? "Shoulder (in)" : "कंधा (इंच)"}</th>
                                    <th>{language === "English" ? "Length (in)" : "लंबाई (इंच)"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>S</td>
                                    <td>39</td>
                                    <td>39</td>
                                    <td>8</td>
                                    <td>16.5</td>
                                    <td>27</td>
                                </tr>
                                <tr>
                                    <td>M</td>
                                    <td>41</td>
                                    <td>41</td>
                                    <td>9</td>
                                    <td>17.5</td>
                                    <td>28</td>
                                </tr>
                                <tr>
                                    <td>L</td>
                                    <td>43</td>
                                    <td>43</td>
                                    <td>9</td>
                                    <td>18.5</td>
                                    <td>28</td>
                                </tr>
                               
                            </tbody>
                        </table>
                            
                        </div>
                    </div>
               
                </>
            )}
        </div>
    );
}

export default SizeChartModal;
