import React, { useContext, useState } from 'react'
import "./SingleImage.scss"
import MyContext from '../../../Common/Context/MyContext'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Modal } from "react-responsive-modal";  // Importing react-responsive-modal
import "react-responsive-modal/styles.css";
const SingleImage = ({ img, sideimg }) => {

  const { handlebigover, setOvershow, handleMouseMove } = useContext(MyContext)
  // State to track the currently active image
  const [activeImage, setActiveImage] = useState(img)

  const ImgOver = (sideimg) => {
    document.getElementById("change").src = sideimg
    setActiveImage(sideimg) // Set the active image when mouse is over a side image
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>

      <div className='main1'>

        <div className='box-main'>
          {sideimg.map((side, index) => {
            return (
              <div
                className='box'
                key={index}
                onMouseOver={() => ImgOver(side.img)}
                style={{
                  border: activeImage === side.img ? '1px solid black' : 'none',

                }}
              >
                <img src={side.img} alt="" />
              </div>
            )
          })

          }

        </div>

        <div>
          <img src={img} alt="" id='change' onMouseMove={handleMouseMove} onMouseEnter={handlebigover} onMouseLeave={() => setOvershow(false)} />

        </div>


      </div>
      <div className="main2" >
        <Carousel
          dynamicHeight={true}
          showStatus={false}
          showThumbs={false}
          className='carousel1'
        >
          {sideimg.map((q) => {
            return (
              <div className='slider-div' onClick={() => openModal(q.img)}  >
                <img className='slider-img' src={q.img} alt='img' />
              </div>
            )
          })}
        </Carousel>
        <Modal
          open={isModalOpen} 
          onClose={closeModal} 
          center  
          classNames={{
            overlay: 'custom-overlay', 
            modal: 'custom-modal'
          }}
        >
          <div className="zoomed-image-container">
            <img
              className="zoomed-img"
              src={selectedImage}
              alt="Zoomed View"
             
            />
          </div>
        </Modal>
      </div>
    </>
  )
}

export default SingleImage