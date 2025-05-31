import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import "./Wishlist.scss";

import MyContext from "../../Context/MyContext";

import { ArrowLeft } from "lucide-react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

import { Helmet } from "react-helmet";

const Wishlist = () => {
  const [loading, setLoading] = useState(true);



  const {
    handledoff ,
    dopen,handled,
    selectedItemname,
    setSelectedItemname,
    data,
    url,
    wish,
    handleNavigate,
    setWish,
    removeProductFromWish,
    Navigate,
    token,
    move2cart,
    selectSize,
    handleSize,
    setMainloader,
    size,
    showwishsize,
  } = useContext(MyContext);

  // for wishitems fetching start

  useEffect(() => {
    setMainloader(loading);
  }, [loading, setMainloader]);

  useEffect(() => {
    const fetchWishItems = async () => {
      if (!token) {
        setLoading(false);
    
        return;
      }

      try {
        const { data } = await axios.get(`${url}/wish`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWish(data.wishInfo);
        localStorage.setItem("wish", JSON.stringify(data.wishInfo));
      } catch (error) {
        console.error(
          "Failed to fetch account details:",
          error.response?.data?.error || error.message
        );
      } finally {
        setLoading(false);
     
      }
    };

    fetchWishItems();
  }, [setWish, token,setMainloader, url]);
  // for wishitems fetching end

  if (loading) {

    return
  }
 

  return (
    <>
     <Helmet>
        <title>Your Wishlist - VHX View</title>
        <meta name="description" content="Save your favorite items in Wishlist for later." />
        <meta name="keywords" content="wishlist, favorites, save for later" />
        <meta property="og:title" content="Your Wishlist - VHX View" />
        <meta property="og:description" content="Save your favorite items in Wishlist for later." />
   
        {/* <meta property="og:url" content="https://your-website.com/wishlist" /> */}
      </Helmet>
      <ArrowLeft
        size={30}
        strokeWidth={0.75}
        className="close-btn"
        onClick={() =>  Navigate(-1)}
      />

      <div className="wish-model">
        <div className="wish-content" id="wish">
          <div className="wish-center">
            {wish && wish.length > 0 ? (
              wish
                .sort((a, b) => b._id.localeCompare(a._id))
                .map((Item) => {
                  return (
                    <>
                      <div className="wish-product">
                        <div className="img-container">
                          <img
                            src={Item.productimg}
                            alt=""
                            onClick={() =>
                              handleNavigate(Item.categoryid, Item.productid)
                            }
                          />
                        </div>

                        <div className="prod-details">
                          <span className="name">{Item.productname}</span>
                          <span className="name">MRP: {Item.productprice}</span>

                          {showwishsize &&
                            selectedItemname === Item.productname && (
                              <div class="size">
                               
                                Size:
                                {data
                                  .filter((I) => I.id === Item.categoryid)
                                  .map((outer) => (
                                    <>
                                      {outer.product_container
                                        .filter((g) => g.id === Item.productid)
                                        .map((inner) => (
                                          <>
                                            {inner.size_main.map((a) => {
                                              return (
                                                <>
                                                  <span
                                                    className="bgscrn"
                                                    style={{
                                                      backgroundColor:
                                                        a.size === size &&
                                                        "black",
                                                      color:
                                                        a.size === size &&
                                                        "white",
                                                    }}
                                                    onClick={() =>
                                                      handleSize(a.size)
                                                    }
                                                  >
                                                    {a.size}
                                                  </span>
                                                </>
                                              );
                                            })}
                                          </>
                                        ))}
                                    </>
                                  ))}
                              </div>
                            )}

                          {selectSize &&
                            selectedItemname === Item.productname && (
                              <p className="err-size">** please select size</p>
                            )}

                          <button
                            className="m2c2"
                            onClick={() => {
                              setSelectedItemname(Item.productname);
                              move2cart(Item.categoryid, Item.productid);
                            }}
                          >
                            move to cart
                          </button>
                          <button
                            className="m2c22"
                            onClick={() => {
                                handled(Item.productname) 
                            }}
                          >
                            move to cart
                          </button>

                        { dopen &&  selectedItemname === Item.productname   &&  <div className="mobile-drawer">
                           <div className="mobile-overlay" onClick={()=>handledoff()}></div>
                           <div className="mobi-cont">

                           
                                <div class="size2">
                            
                                  Size:
                                  {data
                                    .filter((I) => I.id === Item.categoryid)
                                    .map((outer) => (
                                      <>
                                        {outer.product_container
                                          .filter(
                                            (g) => g.id === Item.productid
                                          )
                                          .map((inner) => (
                                            <>
                                              {inner.size_main.map((a) => {
                                                return (
                                                  <>
                                                    <span
                                                      className="bgscrn2"
                                                      style={{
                                                        backgroundColor:
                                                          a.size === size &&
                                                          "black",
                                                        color:
                                                          a.size === size &&
                                                          "white",
                                                      }}
                                                      onClick={() =>
                                                        handleSize(a.size)
                                                      }
                                                    >
                                                      {a.size}
                                                    </span>
                                                  </>
                                                );
                                              })}
                                            </>
                                          ))}
                                      </>
                                    ))}
                                </div>
                           
                            {selectSize &&
                             
                                <p className="err-size2">
                                  ** please select size
                                </p>
                              }

                            <button
                              className="m2c3"
                              onClick={() => {
                                move2cart(Item.categoryid, Item.productid);
                              }}
                            >
                              move to cart
                            </button>
                            </div>
                          </div>}
                        </div>

                        <span
                          className="delete"
                          onClick={() =>
                            removeProductFromWish(
                              Item.categoryid,
                              Item.productid
                            )
                          }
                        >
                          <MdDelete />
                        </span>
                      </div>
                    </>
                  );
                })
            ) : (
              <>
                     {setMainloader(false)}    
                <div className="no-wish">
                  <span className="empty-wish">
                    <AiOutlineHeart />
                  </span>

                  <span className="empty-text">
                    You don't have any products in the wishlist yet.
                    <br />
                    You will find a lot of interesting products on our "Shop"
                    page.
                  </span>

                  <button className="cart_btn" onClick={() => Navigate("/")}>
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
