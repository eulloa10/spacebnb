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
     <div className="spot-show-all">
       <h1 className="spot-name">{spot.name}</h1>
       <div className="spot-show-subheading">
         <div>&#9733; {spot.avgStarRating}</div>
         <div>&#8226;</div>
         <div>{spot.numReviews} reviews</div>
         <div>{spot.city}, {spot.state}, {spot.country}</div>
       </div>

       <img className="spot-show-image" src={`${spot.previewImage}`} alt="spot"/>
       <div>Space home hosted by {spot.Owner.firstName}</div>
       <div>{spot.description}</div>
       {spot.price}
       <div>&#9733; {spot.avgStarRating}</div>
       <div>{spot.numReviews} reviews</div>
       </div>
    }
    {spot && currentUser &&
    <div className="spot-show-all">
      <h1 className="spot-name">{spot.name}</h1>
      <div className="spot-show-subheading">
        <div>&#9733; {spot.avgStarRating}</div>
        <div>&#8226;</div>
        <div>{spot.numReviews} reviews</div>
        <div>{spot.city}, {spot.state}, {spot.country}</div>
      </div>

      <img className="spot-show-image" src={`${spot.previewImage}`} alt="spot"/>
      <div>Space home hosted by {spot.Owner.firstName}</div>
      <div>{spot.description}</div>
      {spot.price}
      <div>&#9733; {spot.avgStarRating}</div>
      <div>{spot.numReviews} reviews</div>
      {
        !currSpotReviews &&
        <div>No reviews yet</div>
      }
      {spot && currentUser && currSpotReviews &&
      currSpotReviews.map((singleReview, index) =>
        <div key={index}>
          <li>{singleReview.User.firstName}</li>
          <li>{singleReview.review}</li>
          {
            (spot.Owner.id !== currentUser.id) && (singleReview.userId === currentUser.id) &&
            <div>
               <Link to={`/reviews/${singleReview.id}/edit`}><button>Edit Review</button>
              </Link>
              <button onClick={(e) => deleteReview(e, singleReview.id)}>Delete Review</button>
            </div>
          }
        </div>
      )}
      {currentUser && currentUser.id &&
         (spot.Owner.id !== currentUser.id) && !userHasReviews.includes(true) &&
         <Link to={`/spots/${spotId}/reviews/add`}><button>Add a Review</button></Link>
      }
      <Link to="/">Back to spots List</Link>
    </div>
    }
    </section>
  );
}

export default SpotShow;
