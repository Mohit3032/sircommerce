import React, { useContext, useEffect, useState } from 'react';
import './Admin.scss';
import axios from 'axios';
import MyContext from '../../Common/Context/MyContext';
import Handleorder from './HandleOrder/Handleorder';
import Contactdata from './Contactdata/Contactdata';
import { Helmet } from 'react-helmet';
import CustomerInqChatPage from './ChatPage/CustomerInqChatPage';
import HandelProducts from './HandleProducts/HandelProducts';
import Passwordmodal from './PasswordModel/Passwordmodal';

const Admin = () => {
  const { passModalOpen, url, setMainloader } = useContext(MyContext);
  const [regdata, setRegdata] = useState([]);
  const [contactdata, setContactdata] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // Track active section

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setMainloader(true);
        const { data } = await axios.get(`${url}/register-details`);
        setRegdata(data.AdminInfo);
      } catch (error) {
        console.error('Failed to fetch Admin details:', error.response?.data?.error || error.message);
      } finally {
        setMainloader(false);
      }
    };
    fetchAdminData();
  }, [url, setMainloader]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setMainloader(true);
        const { data } = await axios.get(`${url}/contact-info`);
        setContactdata(data.data);
      } catch (error) {
        console.error('Failed to fetch Contact details:', error.response?.data?.error || error.message);
      } finally {
        setMainloader(false);
      }
    };
    fetchContactData();
  }, [url, setMainloader]);

  return (
    <div className='admin-main'>
      <Helmet>
        <title>Admin - VHX View</title>      
      </Helmet>

      {/* Show modal if not logged in */}
      {passModalOpen && <Passwordmodal />}

      {!passModalOpen && (
        <>
          {/* Sidebar Navigation */}
          <div className="sidebar">
            <h2>Dashboard</h2>
            <div className='lists'>
              <ul>
                <li className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>
                  Registered Emails
                </li>
                <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>
                  Contact Us
                </li>
                <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                  Orders
                </li>
                <li className={activeTab === 'inquiry' ? 'active' : ''} onClick={() => setActiveTab('inquiry')}>
                  User Inquiry
                </li>
                <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                  Update Products
                </li>
              </ul>
            </div>
          </div>

          {/* Dynamic Content Section */}
          <div className="content">
            {activeTab === 'register' && (
              <div className="register-info active-section">
                <h2>Registered Users</h2>
                <table>
                  <thead>
                    <tr>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Mobile</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regdata.map((r) => (
                      <tr key={r.email}>
                        <td>{r.fname || r.name}</td>
                        <td>{r.lname}</td>
                        <td>{r.mobile}</td>
                        <td>{r.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'contact' && <Contactdata className="active-section" contactdata={contactdata} />}
            {activeTab === 'orders' && <Handleorder className="active-section" regdata={regdata} />}
            {activeTab === 'inquiry' && <CustomerInqChatPage className="active-section" />}
            {activeTab === 'products' && <HandelProducts className="active-section" />}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
