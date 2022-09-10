import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as myReviewActions from '../../store/myReviews';
import * as spotActions from '../../store/spots';
import { Link } from 'react-router-dom';
import './MyReviews.css';

const MyReviews = () => {
  const dispatch = useDispatch();
  const currentUserReviews = useSelector(state => state.myReviews)
  const spots = useSelector(state => state.spots)
  const reviewDetails = Object.values(currentUserReviews);

  useEffect(() => {
    dispatch(spotActions.fetchSpots());
    dispatch(myReviewActions.currentUserReviews());
  }, [dispatch]);

  if (!currentUserReviews) {
    return null;
  }

  return (
    <section className="all-current-reviews">
    { currentUserReviews && spots && reviewDetails &&
      reviewDetails.map(userReview => {
        return (
        <ul className="my-reviews">
        <Link className="my-reviews-link" to={`/all/spots/${userReview.spotId}`}>
          <div>
            <div className="my-reviews-name">{spots[userReview.spotId].name}</div>
            <div className="my-reviews-img">
            <img className="review-img" src={`${spots[userReview.spotId].previewImage}`} alt="spot"/>
            </div>
            <div className="my-review-description"><span className="my-review-attribute">Review:</span> {userReview.review}</div>
            <div className="my-review-rating">&#9733; {userReview.stars}</div>
          </div>
          {/* <li>{spots[userReview.spotId].name}</li>
          <img className="review-img" src={`${spots[userReview.spotId].previewImage}`} alt="spot"/>
          <li>Review: {userReview.review}</li>
          <li>Rating: {userReview.stars}</li> */}
        </Link>
        </ul>
        )
      })
    }
    </section>
  );
}

export default MyReviews;
