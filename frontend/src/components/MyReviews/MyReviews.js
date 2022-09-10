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
    <ul>
    { currentUserReviews && spots && reviewDetails &&
      reviewDetails.map(userReview => {
        return (
        <li className="my-reviews">
        <Link to={`/all/spots/${userReview.spotId}`}>
          <li>{spots[userReview.spotId].name}</li>
          <img src={`${spots[userReview.spotId].previewImage}`} alt="spot"/>
          <li>Review: {userReview.review}</li>
          <li>Rating: {userReview.stars}</li>
        </Link>
        </li>
        )
      })
    }
    </ul>
  );
}

export default MyReviews;
