import React, { useContext } from 'react';
import './LogoutModal.scss';
import MyContext from '../../Context/MyContext';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const LogoutModal = () => {
  const { closelModal, lmodal, handleLogout } = useContext(MyContext)

  return (
    <>
      <Modal open={lmodal} onClose={closelModal} center>
        <div className='model_main' >

          <p>Are you sure you want to log out ?</p>

          <div className='lbtn'>
            <button onClick={handleLogout}>Yes</button>
            <button onClick={closelModal}>No</button>
          </div>

        </div>
      </Modal>

    </>


  );
}

export default LogoutModal;
