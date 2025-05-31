import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MyContext from '../../../Common/Context/MyContext';
import './Passwordmodal.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Passwordmodal = () => {
  const { passModalOpen, setPassModalOpen } = useContext(MyContext);
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (adminId === '123' && password === '123') {
      // Valid credentials: close the modal to grant access
      setPassModalOpen(false);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Modal
      open={passModalOpen}
      onClose={() => {} }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown
    >
      <Box sx={style}>
        <h2>Admin Login</h2>
        <div className="password-form">
          <div>
            <label htmlFor="adminId">Admin ID:</label>
            <input
              type="text"
              name="adminId"
              id="adminId"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default Passwordmodal;
