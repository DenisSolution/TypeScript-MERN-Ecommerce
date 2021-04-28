import React, { useEffect, useState } from "react";
import { Card, ListGroup, Dropdown } from "react-bootstrap";
import { Review } from "../types";
import Rating from "./Rating";

interface Props {
  productReviews: Review[];
}

/**
 * Product Review Ratings component that shows total number of reviews based on the star rating
 */
const ProductReviewRatings = ({ productReviews }: Props) => {
  const [oneStarReviews, setOneStarReviews] = useState(0);
  const [twoStarReviews, setTwoStarReviews] = useState(0);
  const [threeStarReviews, setThreeStarReviews] = useState(0);
  const [fourStarReviews, setFourStarReviews] = useState(0);
  const [fiveStarReviews, setFiveStarReviews] = useState(0);

  /**
   * Populate the number of reviews per star
   */
  useEffect(() => {
    productReviews.forEach((review) => {
      switch (review.rating) {
        case 1:
          setOneStarReviews((prevOneStarReviews) => prevOneStarReviews + 1);
          break;
        case 2:
          setTwoStarReviews((prevTwoStarReviews) => prevTwoStarReviews + 1);
          break;
        case 3:
          setThreeStarReviews(
            (prevThreeStarReviews) => prevThreeStarReviews + 1
          );
          break;
        case 4:
          setFourStarReviews((prevFourStarReviews) => prevFourStarReviews + 1);
          break;
        case 5:
          setFiveStarReviews((prevFiveStarReviews) => prevFiveStarReviews + 1);
          break;
      }
    });
  }, []);

  /**
   * Calculates the total percentage of reviews per star based on the total reviews
   */
  const calculateReviewRatingPercentage = (
    reviewsPerRating: number,
    totalReviews: number
  ) => {
    console.log((100 * reviewsPerRating) / totalReviews);
    return (100 * reviewsPerRating) / totalReviews;
  };

  return (
    <>
      <h2>Product Ratings Overview</h2>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Product Reviews
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {productReviews.map((review) => (
            <div>
              <Dropdown.Item>
                <Rating value={review.rating} />
              </Dropdown.Item>
              {review.rating === 1 ? (
                <Dropdown.Item>
                  {oneStarReviews}
                  {oneStarReviews > 1 ? "reviews" : "review"}
                  <p>
                    {calculateReviewRatingPercentage(
                      oneStarReviews,
                      productReviews.length
                    )}{" "}
                    Percent
                  </p>
                </Dropdown.Item>
              ) : review.rating === 2 ? (
                <Dropdown.Item>
                  {twoStarReviews} {twoStarReviews > 1 ? "reviews" : "review"}
                </Dropdown.Item>
              ) : review.rating === 3 ? (
                <Dropdown.Item>
                  {threeStarReviews}{" "}
                  {threeStarReviews > 1 ? "reviews" : "review"}
                </Dropdown.Item>
              ) : review.rating === 4 ? (
                <Dropdown.Item>
                  {fourStarReviews} {fourStarReviews > 1 ? "reviews" : "review"}
                </Dropdown.Item>
              ) : (
                <Dropdown.Item>
                  {fiveStarReviews} {fiveStarReviews > 1 ? "reviews" : "review"}
                </Dropdown.Item>
              )}
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ProductReviewRatings;