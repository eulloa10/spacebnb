import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as reviewActions from '../../store/reviews';
import EditReviewForm from '../EditReviewForm/EditReviewForm';

const SpotShow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const allSpots = useSelector(state => state.spots);
  const currentUser = useSelector(state => state.session.user)
  const review = useSelector(state => state.reviews)
  const spot = allSpots[spotId]
  const currentSpotOwner = spot.ownerId
  const usersWithReviews = [];

  if (review[spotId]) {
    review[spotId].forEach(userReview => {
      usersWithReviews.push(userReview.userId)
    })
  }

  useEffect(() => {
    dispatch(reviewActions.fetchReviews(spotId))
  }, [dispatch]);

  // console.log("REVIEW", review[spotId])

  const deleteReview = (e, reviewId) => {
    // console.log("reviewID", reviewId)
    dispatch(reviewActions.deleteSelectedReview(parseInt(reviewId)));
    e.preventDefault();
    history.push(`/`);
  }

  return (
    <section>
      Name: {spot.name}
      <br/>
      <img src={`${spot.previewImage}`} alt="spot"/>
      <br/>
      Description: {spot.description}
      <br/>
      Price: {spot.price}
      <br/>
      { currentUser && currentUser.id &&
      <ul>
      Reviews:
      {
        usersWithReviews.length === 0 &&
        <div>No reviews yet</div>
      }
      {review[spotId] &&
      review[spotId].map(singleReview =>
        <div>
          <li>{singleReview.review}</li>
          {
            (currentSpotOwner !== currentUser.id) && (singleReview.userId === currentUser.id) &&
            <div>
               <Link to={`/reviews/${singleReview.id}/edit`}><button>Edit Review</button>
              </Link>
              <button onClick={(e) => deleteReview(e, singleReview.id)}>Delete Review</button>
            </div>
          }
        </div>
      )}
      </ul>
      }
      { currentUser && currentUser.id &&
        (!usersWithReviews.includes(currentUser.id)) && (currentSpotOwner !== currentUser.id) &&
        <Link to={`/spots/${spotId}/reviews/add`}><button>Add a Review</button></Link>
      }
      <Link to="/">Back to spots List</Link>
    </section>
  );
}

export default SpotShow;
