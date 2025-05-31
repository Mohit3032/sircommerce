import React, { useContext, useEffect, useState } from 'react'
import './Location.scss'
import Productlist from '../Products/Productlist'
import { useParams } from 'react-router-dom'
import MyContext from '../../Common/Context/MyContext'
import axios from 'axios'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Helmet } from 'react-helmet'
const City = () => {
    const { url ,data} = useContext(MyContext)
    const { cityname } = useParams();

    const [cityExists, setCityExists] = useState([])


    useEffect(() => {

        const fetchCities = async () => {
            try {
                const response = await axios.get(`${url}/cities`)
                setCityExists(response.data)


            } catch (error) {
                console.error('Error fetching cities:', error)
            }
        }

        fetchCities()
    }, [cityname, url])

    const filteredCities = cityExists.filter(c => c.cityname.toLowerCase() === cityname.toLowerCase())
    return (
        <>
        <Helmet>
        <title>{cityname} Products - VHX View</title>
        <meta name="description" content={`Discover products available in ${cityname}.`} />
        <meta name="keywords" content={`${cityname}, products, online shopping`} />
        <meta property="og:title" content={`${cityname} Products - VHX View`} />
        <meta property="og:description" content={`Discover products available in ${cityname}.`} />
 
      </Helmet>
            {filteredCities.length > 0 ? (
                filteredCities.map(a => (
                    <div className='location-main' key={a.cityname}>
                        <div className="banner-container">
                            <div className="banner-text">
                                <h1>Order Online in {a.cityname}</h1>
                            </div>

                        </div>
                        <section className='home-products'>
                                <h2> Popular Categories</h2>
                          
                              <Carousel
                              arrows={true}
                              additionalTransfrom={0}
                              containerClass="container-with-dots"
                              focusOnSelect={false}
                              infinite={false}
                             
                              keyBoardControl
                              minimumTouchDrag={80}
                              renderArrowsWhenDisabled={false}
                              renderDotsOutside={false}
                            
                              responsive={{
                              desktop: {
                              breakpoint: {
                              max: 3000,
                              min: 1024
                              },
                              items: 4,
                              partialVisibilityGutter: 40
                              },
                              mobile: {
                              breakpoint: {
                              max: 850,
                              min: 0
                              },
                              items: 2,
                              partialVisibilityGutter: 30
                              },
                              tablet: {
                              breakpoint: {
                              max: 1024,
                              min: 850
                              },
                              items: 3,
                              partialVisibilityGutter: 30
                              }
                              }}
                              rewind={false}
                              rewindWithAnimation={false}
                              rtl={false}
                              shouldResetAutoplay
                              showDots={false}
                              sliderClass=""
                              slidesToSlide={1}
                              swipeable
                              >
                        

                                {data.map((q, index) => (
                                    <div className='slider-divs' key={index}>
                                        <img className='slider-img' src={q.category_img} alt='img' />
                                    </div>
                                ))}  
                            </Carousel>
                            <Productlist isHomePage={true} filters={{}} />
                        </section>
                    </div>
                ))
            ) : (
                <div className="not-found-message">
                    <h2>City not found. Please check the city name.</h2>
                </div>
            )}

        </>
    )
}

export default City
