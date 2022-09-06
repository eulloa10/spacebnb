import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as reviewActions from '../../store/reviews';
import * as spotActions from '../../store/spots';
import { Link } from 'react-router-dom';

const MyReviews = () => {
  const dispatch = useDispatch();
  const currentUserReviews = useSelector(state => state.reviews)
  const spots = useSelector(state => state.spots)
  const reviewDetails = Object.values(currentUserReviews);

  // console.log("CurrentUserRev", Object.values(currentUserReviews))
  // console.log("REVIEWSSPOTSLOAD", spots)

  useEffect(() => {
    dispatch(reviewActions.currentUserReviews());
    dispatch(spotActions.fetchSpots());
  }, [dispatch]);

  if (!currentUserReviews) {
    return null;
  }

  return (
    <ul>
    { currentUserReviews && spots &&
      reviewDetails.map(userReview => {
        return (
        <Link to={`/spots/${userReview.spotId}`}>
          <li>{spots[userReview.spotId].name}</li>
          <img src={`${spots[userReview.spotId].previewImage}`} alt="spot"/>
          <li>Review: {userReview.review}</li>
          <li>Rating: {userReview.stars}</li>
        </Link>
        )
      })
    }
    </ul>
  );
}

export default MyReviews;
