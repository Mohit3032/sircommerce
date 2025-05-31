import React, { useContext, useEffect, useState } from 'react'
import './Categories.scss'
import MyContext from '../../Common/Context/MyContext'
import { Skeleton } from '@mui/material'

const Categories = () => {

    const { data, Navigate } = useContext(MyContext)

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (data && data.length > 0) {
            setIsLoading(false);
        }
    }, [data]);

    return (
        <div className='cats'>
            <div className="categories">
                {isLoading
                    ? [...Array(4)].map((_, index) => (
                        <div className="category" key={index}>
                            <Skeleton variant="rectangular"  animation="wave" width="100%" height='100%' className='skel'>
                                <div className='dummydiv' />
                            </Skeleton>
                        </div>
                    ))
                    : data.map((item) => (
                        <div className="category" key={item.id}>
                            <img
                                src={item.category_img}
                                onClick={() => Navigate(`/category/${item.product_category_route}`)}
                                alt={item.name}
                            />
                        </div>
                    ))}
            </div>


        </div>
    )
}

export default Categories
