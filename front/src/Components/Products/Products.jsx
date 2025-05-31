import React, { useContext, useEffect, useState } from 'react'
import './Products.scss'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MyContext from '../../Common/Context/MyContext';
import Productlist from './Productlist';
// import component 
import Drawer from 'react-modern-drawer'
//import styles 
import 'react-modern-drawer/dist/index.css'
import { MdClose } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronsRight } from 'lucide-react';

const Products = () => {

  const { shortname, setShortname ,data} = useContext(MyContext)

  const { title } = useParams();

  const [filOpen, setFilOpen] = useState(false)
  const opnfilter = () => {
    setFilOpen(true)
     document.querySelector('body').style.overflow = "hidden"
  }
  const clsfilter = () => {
    setFilOpen(false)
     document.querySelector('body').style.overflow = "auto"
  }

  const [shortproOpen, setShortproOpen] = useState(false)
  const openshortpro = () => {
    setShortproOpen(true)
     document.querySelector('body').style.overflow = "hidden"
  }
  const closeshortpro = () => {
    setShortproOpen(false)
     document.querySelector('body').style.overflow = "auto"
  }
// process for filtering products
const [maxPrice, setMaxPrice] = useState(5000); // Default max price
const [selectedSizes, setSelectedSizes] = useState([]); // Array for selected sizes
const [filters, setFilters] = useState({}); // Applied filters
const handleMaxPriceChange = (event, newValue) => {
  setMaxPrice(newValue);
};

// Handle size selection
const handleSizeSelection = (size) => {
  setSelectedSizes((prev) =>
    prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
  );
};

// Apply filters
const applyFilters = () => {
  setFilters({ maxPrice, selectedSizes });
  clsfilter(); // Close the filter drawer
}; 

const [selectedCategory, setSelectedCategory] = useState(title);

useEffect(() => {
  // Set the selected category when the title changes (initially or on route change)
  setSelectedCategory(title);
}, [title]);
  return (
    <>
      <Helmet>
        <title>{title} - VHX view</title>
        <meta name="description" content={`Browse through our wide range of stylish ${title} clothes. Shop the latest ${title} trends for men, women, or kids. Affordable pricing and fast delivery.`} />
        <meta name="keywords" content={`${title}, buy ${title} online, fashion`} />

        <title>{title} - VHX view</title>
        <meta property="og:title" content={`${title} - VHX view`} />
        <meta property="og:description" content={`Shop the latest ${title} collection.`} />
        {/* <meta property="og:image" content="https://your-website.com/images/category-og-image.jpg" /> */}
        {/* <meta property="og:url" content={`https://your-website.com/category/${category.slug}`} /> */}
      </Helmet>

      <div className="container2">
        <div className="header">

          <div className='filters'>
            <h3 className='small' onClick={()=>opnfilter()}>FILTERS <span>&#8651;</span></h3>
            <h3 className='big'>FILTERS </h3>

            <div className='sel-last' >
              <button className='select1'> Sort by : <b>{shortname}</b> </button>
              <h3 onClick={()=>openshortpro()} className='select12'> Sort by :</h3>
              <div className='shortnames'>
                <li className='account-division' onClick={() => setShortname('High to low')} >
                  High to low
                </li>

                <li className='account-division' onClick={() => setShortname('Low to High')} >
                  Low to High
                </li>

                <li className='account-division' onClick={() => setShortname('Popular')} >
                  Popular
                </li>



              </div>
            </div>
          </div>
        </div>

        <div className="nav">
          <span className='btsp'><button className='fil-apply' onClick={applyFilters} > Apply Filter</button> </span>  
          <div className='box box2'>
            <h3>PRICE</h3>
            <Box sx={{ width: 150 }}>
            <Slider
        size="small"
        value={maxPrice}// Set initial value
        min={0} // Minimum value for the slider
        max={5000} // Maximum value for the slider
        aria-label="Set Max Value"
        valueLabelDisplay="auto"
        onChange={handleMaxPriceChange} // Update max value on slider move
      />
            </Box>
            <p>₹0 - ₹5000 </p>
          </div>
          <div className="box box2">
            <h3>CATEGORIES</h3>
            <ul>
              {data.map((i)=>(
              <li key={i.id}>
                <input type="checkbox"  id={i.product_category_route}   checked={i.product_category_route === selectedCategory}
                    disabled={i.product_category_route !== selectedCategory} />
                <label for={i.product_category_route}>{i.product_category} </label>
              </li>
               
              ))}
            
            </ul>
          </div>
         
          <div className="box box2">
            <h3>Size</h3>
            <ul>
            {['S', 'M', 'L', 'XL'].map((size) => (
                <li key={size}>
                  <input
                    type="checkbox"
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeSelection(size)}
                  />
                  <label htmlFor={size}>{size}</label>
                </li>
              ))}

            </ul>
          </div>
          
         


        </div>

        <div className="main12">

          <Productlist title={title} filters={filters} />
        </div>

      </div>

      <Drawer
        open={filOpen}
        onClose={clsfilter}
        direction='bottom'
        className='fil-drawer'
        size={'100%'}
      >
        <div className="nav nav2">
          <div className='h2close'>
            <h2>Filters  <button onClick={applyFilters} className='fil-apply' > Apply Filter</button></h2>

            <MdClose className='mdc' onClick={()=>clsfilter()}  size={24} />
          </div>
          <div className='box box2'>
            <h3>PRICE</h3>
            <Box sx={{ width: 150 }}>
            <Slider
        size="small"
        value={maxPrice}// Set initial value
        min={0} // Minimum value for the slider
        max={5000} // Maximum value for the slider
        aria-label="Set Max Value"
        valueLabelDisplay="auto"
        onChange={handleMaxPriceChange} // Update max value on slider move
      />
            </Box>
            <p>₹0 - ₹5000 </p>
          </div>
          <div className="box box2">
          <h3>CATEGORIES</h3>
          <ul>
              {data.map((i)=>(
              <li key={i.id}>
                <input type="checkbox"  id={i.product_category_route}   checked={i.product_category_route === selectedCategory}
                    disabled={i.product_category_route !== selectedCategory} />
                <label for={i.product_category_route}>{i.product_category} </label>
              </li>
               
              ))}
            
            </ul>
          </div>
         
          <div className="box box2">
          <h3>Size</h3>
            <ul>
            {['S', 'M', 'L', 'XL'].map((size) => (
                <li key={size}>
                  <input
                    type="checkbox"
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeSelection(size)}
                  />
                  <label htmlFor={size}>{size}</label>
                </li>
              ))}

            </ul>
          </div>

        </div>
      </Drawer>

      <Drawer
        open={shortproOpen}
        onClose={closeshortpro}
        direction='bottom'
        className='shortpro'
        size={'100%'}
      >
        <div className='shortnames'>
          <MdClose className='mds' onClick={closeshortpro} size={24} />
          <h2>Sort by   </h2>

          <li className='account-division' onClick={() => setShortname('High to low') || closeshortpro()} >
            High to low <ChevronsRight size={20} strokeWidth={1.5} />
          </li>

          <li className='account-division' onClick={() => setShortname('Low to High') || closeshortpro()} >
            Low to High <ChevronsRight size={20} strokeWidth={1.5} />
          </li>

          <li className='account-division' onClick={() => setShortname('Popular') || closeshortpro()} >
            Popular <ChevronsRight size={20} strokeWidth={1.5} />
          </li>

        </div>
      </Drawer>
    </>
  )
}

export default Products
