import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as reviewActions from '../../store/reviews';
import * as spotActions from '../../store/spots';
import { Link } from 'react-router-dom';
import SpotIndexItem from '../SpotIndexItem/SpotIndexItem'



const MyReviews = () => {
  const dispatch = useDispatch();
  const currentUserReviews = useSelector(state => state.reviews)
  const spots = useSelector(state => state.spots)
  const reviewDetails = Object.values(currentUserReviews)[0];

  useEffect(() => {
    dispatch(reviewActions.currentUserReviews());
    dispatch(spotActions.fetchSpots());
  }, [dispatch]);

  // console.log("REVIEWSMINE", currentUserReviews)
  // console.log("REVIEWSSPOTSMINE", spots)
  // console.log("REVIEWDET", reviewDetails)

  if (!currentUserReviews) {
    return null;
  }

  return (
    <ul>
    {
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
