import React, { useContext } from 'react'
import MyContext from '../../Common/Context/MyContext';
import './Productlist.scss'
import { Heart } from 'lucide-react';





const Productlist = ({ title, isHomePage,filters }) => {


    const { data, Navigate,shortname, loading, size, selectSize, handleSize, formatReviewCount, handleCheckout,handlewish,selectedItemname, setSelectedItemname, } = useContext(MyContext)

        const { maxPrice = 5000, selectedSizes = [] } = filters;


        const sortedProducts = data
        .filter((item) => item.product_category_route === title)
        .map((item) => {
          // Filter products based on size and price
          const filteredVariants = item.product_container.filter(
            (variant) =>
              variant.product_price <= maxPrice &&
              (selectedSizes.length === 0 || selectedSizes.some((size) => variant.size_main.some((s) => s.size === size)))
          );
    
          // Sort filtered products
          const sortedVariants = [...filteredVariants].sort((b, a) => {
            if (shortname === "High to low") return a.product_price - b.product_price;
            if (shortname === "Low to High") return b.product_price - a.product_price;
            if (shortname === "Popular") return a.rating - b.rating;
            return 0;
          });
    
          return { ...item, product_container: sortedVariants };
        })
        .filter((item) => item.product_container.length > 0); // Remove items with no matching variants
    
      // Use title to filter or default to all data
      const newdata = title ? sortedProducts : data;
    

    return (
        <div>

            <div className="items">
                {
                    newdata
                        .map((items) => {
                            return (
                                <>
                                    {
                                        items.product_container
                                            .map((inner) => (
                                                <>
                                                  
                                                    <div className="probox">

                                                        <div className='img-rat'>
                                                            <img src={inner.product_img} onClick={() => Navigate(`/category/${items.product_category_route}/${inner.product_route}`)} alt="" />
                                                            <div className='rat'>
                                                                <span>★ {inner.rating}  ({formatReviewCount(inner.count)})  </span>

                                                            </div>
                                                        </div>
                                                        <div class="size">


                                                            <span className='sml'>
                                                                size :                                     {
                                                                    inner.size_main.map((a) => {
                                                                        return (
                                                                            <span style={{ backgroundColor: a.size === size && 'black', color: a.size === size && 'white' }}
                                                                                onClick={() => handleSize(a.size)}>
                                                                                {a.size}
                                                                            </span>
                                                                        )
                                                                    })
                                                                } </span>
                                                         
                                                                <Heart className='hert' size={18} onClick={() => handlewish(items.id, inner.id, inner.product_img, inner.product_name, inner.product_price)} />
                                                    

                                                        </div>
                                                        <span className='adbtn'>
                                                            {selectSize && selectedItemname === inner.product_name && <p className={`size-warn ${isHomePage ? 'home-page-warn' : ''}`} >** please select size</p>}


                                                   
                                                                <button className="atc" disabled={loading} onClick={() => { handleCheckout(items.id, inner.id, inner.product_img, inner.product_name, inner.product_price); setSelectedItemname(inner.product_name) }} >  {loading ? 'Adding to Cart...' : <>Add To Cart&#x2192;</>}</button>
                                                            
                                                        </span>


                                                        <div className='ps'>
                                                            <div className='p1-heart'>
                                                                <p className='p1'> {inner.product_name} </p> <span className='hr-span'>
                                                                  
                                                                        <Heart className='hert' size={18} onClick={() => handlewish(items.id, inner.id, inner.product_img, inner.product_name, inner.product_price)} />
                                                                 
                                                                     </span>
                                                            </div>
                                                            <p className='p2'> <b>₹{inner.product_price} </b> <span> <del>${inner.product_price_deleted}</del> </span></p>
                                                        </div>



                                                    </div>
                                                </>
                                            ))
                                    }
                                </>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Productlist
