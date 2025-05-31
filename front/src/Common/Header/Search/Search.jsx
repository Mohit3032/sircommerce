import React, { useContext } from 'react'
import MyContext from '../../Context/MyContext'
import './Search.scss'

import { VscSearch } from 'react-icons/vsc'
const Search = () => {

    const { data, input,Navigate } = useContext(MyContext)

    return (
        
            <div className="search-lists">
                {data
                .filter((a) => {
                    const categoryMatch = a.product_category.toLowerCase().startsWith(input.toLowerCase());
                    const productMatch = a.product_container.some(product =>
                        product.product_name.toLowerCase().startsWith(input.toLowerCase())
                    );
                    return input && (categoryMatch || productMatch);
                })
                .map((b) => (
                    <>
                        {/* Category Navigation */}
                        {b.product_category.toLowerCase().startsWith(input.toLowerCase()) && (
                            <p
                                key={`category-${b.id}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => Navigate(`/category/${b.product_category_route}`)}
                            >
                                <VscSearch className="history" /> {b.product_category}
                            </p>
                        )}

                        {/* Product Navigation */}
                        {b.product_container
                            .filter(product => product.product_name.toLowerCase().startsWith(input.toLowerCase()))
                            .map((product) => (
                                <p
                                    key={`product-${product.id}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => window.open(`/category/${b.product_category_route}/${product.product_route}`)}
                                >
                                    <VscSearch className="history" /> {product.product_name}
                                </p>
                            ))}
                    </>
                ))}
            
        </div>
    )
}

export default Search
