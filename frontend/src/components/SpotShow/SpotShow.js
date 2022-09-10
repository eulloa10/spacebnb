import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as reviewActions from '../../store/reviews';
import * as spotActions from '../../store/spots';
import * as singleSpotActions from '../../store/singleSpot';
import * as singleSpotReviewsActions from '../../store/singleSpotReviews';
import "./SpotShow.css";


const SpotShow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const noAuthSpots = useSelector(state => state.spots);
  const spot = useSelector(state => state.singleSpot[spotId]);
  const currentUser = useSelector(state => state.session.user)
  // const currSpotReviews = useSelector(state => state.reviews)
  let currSpotReviews = useSelector(state => state.singleSpotReviews[spotId])

  let userHasReviews = [];

  if (currSpotReviews && currentUser) {
    currSpotReviews.map(review =>  userHasReviews.push(review.userId === currentUser.id))
  } else {
    userHasReviews.push(false);
  }

  useEffect(() => {
    dispatch(spotActions.fetchSpots())
    dispatch(singleSpotActions.fetchSpots(spotId));
     dispatch(singleSpotReviewsActions.fetchSingleSpotReviews(spotId))
    // dispatch(reviewActions.fetchReviews(spotId))
  }, [dispatch, spotId]);


  const deleteReview = (e, reviewId) => {
    dispatch(reviewActions.deleteSelectedReview(parseInt(reviewId)));
    e.preventDefault();
    history.push(`/`);
  }

  return (
    <section>
    {
     spot && !currentUser && spotId &&
      <div className="spot-show-container">
        <div className="spot-show-top">
          <h1 className="spot-name">{spot.name}</h1>
            <ul className="spot-show-subheading">
              <li>&#9733;</li>
              <li>{spot.avgStarRating}</li>
              <li>&#8226;</li>
              <li>{spot.numReviews} reviews</li>
              <li>&#8226;</li>
              <li>{spot.city}, {spot.state}, {spot.country}</li>
            </ul>
        </div>
       <img className="spot-show-image" src={`${spot.previewImage}`} alt="spot"/>
       <div className="spot-show-bottom">
        <div className="spot-show-summary">
          <div className="spot-show-owner">Space home hosted by {spot.Owner.firstName}</div>
          <div className="spot-show-book">
            <div>
              <div>${spot.price} night</div>
            </div>
            <div className="spot-show-book-metrics">
              <div>&#9733;{spot.avgStarRating}</div>
              <div>&#8226;</div>
              <div>{spot.numReviews} reviews</div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="spot-show-description">{spot.description}</div>
       </div>
      </div>
    }
    {spot && currentUser &&
    <div className="spot-show-container">
       <div className="spot-show-top">
          <h1 className="spot-name">{spot.name}</h1>
            <ul className="spot-show-subheading">
              <li>&#9733;</li>
              <li>{spot.avgStarRating}</li>
              <li>&#8226;</li>
              <li>{spot.numReviews} reviews</li>
              <li>&#8226;</li>
              <li>{spot.city}, {spot.state}, {spot.country}</li>
            </ul>
        </div>

        <img className="spot-show-image" src={`${spot.previewImage}`} alt="spot"/>
        <div className="spot-show-bottom">
        <div className="spot-show-summary">
          <div className="spot-show-owner">Space home hosted by {spot.Owner.firstName}</div>
          <div className="spot-show-book">
            <div>
              <div>${spot.price} night</div>
            </div>
            <div className="spot-show-book-metrics">
              <div>&#9733;{spot.avgStarRating}</div>
              <div>&#8226;</div>
              <div>{spot.numReviews} reviews</div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="spot-show-description">{spot.description}</div>
       </div>
      <div className="reviews-divider"></div>
      <div className="reviews-container">
      <div className="spot-show-book-metrics-bottom">
        <div>&#9733;{spot.avgStarRating}</div>
        <div>&#8226;</div>
        <div>{spot.numReviews} reviews</div>
      </div>

      {
        !currSpotReviews &&
        <div className="no-reviews">No reviews yet</div>
      }
      {spot && currentUser && currSpotReviews &&
      currSpotReviews.map((singleReview, index) =>
        <div className="single-user-review" key={index}>
          <li className="review-firstname">{singleReview.User.firstName}</li>
          <li className="review-content">{singleReview.review}</li>
          {
            (spot.Owner.id !== currentUser.id) && (singleReview.userId === currentUser.id) &&
            <div className="review-btn-container">
               <Link to={`/reviews/${singleReview.id}/edit`}><button className="edit-review-btn">Edit Review</button>
              </Link>
              <button className="delete-review-btn" onClick={(e) => deleteReview(e, singleReview.id)}>Delete Review</button>
            </div>
          }
        </div>
      )}
      {currentUser && currentUser.id &&
         (spot.Owner.id !== currentUser.id) && !userHasReviews.includes(true) &&
         <Link to={`/spots/${spotId}/reviews/add`}><button className="add-review-btn">Add a Review</button></Link>
      }
      </div>
      {/* <Link to="/">Back to spots List</Link> */}
    </div>
    }
    </section>
  );
}

export default SpotShow;
