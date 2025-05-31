import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import MyContext from "../../../Context/MyContext";
import "./Reviewform.scss";
import { ArrowRight } from "lucide-react";

const Reviewform = ({ item }) => {
  const { url, setMainloader, setOpen, userdata, setMessage, data } = useContext(MyContext);
  const [rate, setRate] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [previousRating, setPreviousRating] = useState(0);
  const [previousmsg, setPreviousmsg] = useState("");

  // Check if the user has already reviewed the product
  useEffect(() => {
    // Check if the user has already reviewed the product
    const category = data.find((cat) => cat.id === item.categoryid);
    if (category) {
      const product = category.product_container.find(
        (prod) => prod.id === item.productid
      );
      if (product && product.reviews) {
        const userReview = product.reviews.find(
          (rev) =>
            rev.name.toLowerCase() ===
            `${userdata.fname} ${userdata.lname}`.toLowerCase()
        );
        if (userReview) {
          setHasReviewed(true);
          setPreviousRating(userReview.rating);
          setPreviousmsg(userReview.message)
        }
      }
    }
  }, [data, item, userdata]);

  //review form handle
  const initialValues = {
    message: previousmsg,
  };

  const validationSchema = Yup.object({
    message: Yup.string(),
  });

  const onSubmit = async (values, { resetForm }) => {
    if (rate === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    document.querySelector("body").style.overflow = "hidden";
    setMainloader(true);

    try {
      const { data } = await axios.post(`${url}/add-review`, {
        categoryId: item.categoryid,
        productId: item.productid,
        review: {
          name: userdata.fname + " " + userdata.lname,
          rating: rate,
          message: values.message,
        },
      });

      if (data.success) {
        setOpen(true);
        setMessage(data.message);
        setHasReviewed(true); // Disable further reviews
        resetForm()
      } else {
        setMessage(data.error);
        setOpen(true);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review. Please try again later.");
    } finally {
      document.querySelector("body").style.overflow = "auto";
      setMainloader(false);
    }
  };

  return (
    <div className="review-main">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="review-form">
            {/* Star Rating */}
            <span className="span str-spn">

              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const givenRating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        value={givenRating}
                        onClick={() => setRate(givenRating)}
                        disabled={hasReviewed}
                        style={{ display: "none" }}
                      />
                      <FaStar
                        color={
                          givenRating <= (hasReviewed ? previousRating : rate)
                            ? "rgb(255, 183, 0, 0.58)"
                            : "rgb(192,192,192)"
                        }
                        style={{ cursor: hasReviewed ? "not-allowed" : "pointer" }}
                      />
                    </label>
                  );
                })}
              </div>
              <button
              type="submit"
              className="loginbtn"
              disabled={hasReviewed  || isSubmitting}
            >
              <ArrowRight
                size={15}
                strokeWidth={1.25}
              />
            </button>
            </span>

            {/* Message Field */}
            <span className="span">
              <Field
                as="textarea" 
                className="field1"
                id="message"
                name="message"
            placeholder={hasReviewed ? "" : "Enter your review"}
                disabled={hasReviewed}
              />
              <ErrorMessage name="message" component="div" className="error" />
            </span>

          

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Reviewform;
