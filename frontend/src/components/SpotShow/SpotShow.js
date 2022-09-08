import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as reviewActions from '../../store/reviews';
import * as spotActions from '../../store/spots';
import * as singleSpotActions from '../../store/singleSpot';
import * as singleSpotReviewsActions from '../../store/singleSpotReviews';
import EditReviewForm from '../EditReviewForm/EditReviewForm';

const SpotShow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  // const allSpots = useSelector(state => state.spots);
  const spot = useSelector(state => state.singleSpot[spotId]);
  const currentUser = useSelector(state => state.session.user)
  // const currSpotReviews = useSelector(state => state.reviews)
  let currSpotReviews = useSelector(state => state.singleSpotReviews[spotId])

  // let userHasReview = currSpotReviews.filter(review => review.userId === spot.Owner.id)
  let userHasReviews = [];

  // if (!currSpotReviews) currSpotReviews = null;

  console.log("currSpotReviews", currSpotReviews)
  if (currSpotReviews) {
    currSpotReviews.map(review =>  userHasReviews.push(review.userId === currentUser.id))
  } else {
    userHasReviews.push(false);
  }

  console.log(userHasReviews)

  // const currentSpotOwner = spot.ownerId
  const usersWithReviews = [];

  // console.log("review[spotId]", review[spotId])

  // if (review[spotId]) {
  //   review[spotId].forEach(userReview => {
  //     usersWithReviews.push(userReview.userId)
  //   })
  // }

  useEffect(() => {
    // dispatch(spotActions.fetchSpots())
    dispatch(singleSpotActions.fetchSpots(spotId));
     dispatch(singleSpotReviewsActions.fetchSingleSpotReviews(spotId))
    // dispatch(reviewActions.fetchReviews(spotId))
  }, [dispatch, spotId]);

  console.log("SPOTSHOW: SPOT", spot)

  // console.log("REVIEW", review[spotId])

  const deleteReview = (e, reviewId) => {
    // console.log("reviewID", reviewId)
    dispatch(reviewActions.deleteSelectedReview(parseInt(reviewId)));
    e.preventDefault();
    history.push(`/`);
  }

  return (
    <section>
    {spot &&
    <>
      <div>{spot.name}</div>
      <img src={`${spot.previewImage}`} alt="spot"/>
      <div>{spot.description}</div>
      {spot.price}
      <div>Reviews</div>
      {
        !currSpotReviews &&
        <div>No reviews yet</div>
      }
      {spot && currentUser && currSpotReviews &&
      currSpotReviews.map((singleReview, index) =>
        <div key={index}>
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
    </>
    }
    </section>
    // <>
    // <section>
    //   Name: {spot.name}
    //   <br/>
    //   <img src={`${spot.previewImage}`} alt="spot"/>
    //   <br/>
    //   Description: {spot.description}
    //   <br/>
    //   Price: {spot.price}
    //   <br/>
    //   { currentUser && currentUser.id &&
    //   <ul>
    //   Reviews:
    //   {
    //     usersWithReviews.length === 0 &&
    //     <div>No reviews yet</div>
    //   }
    //   {review[spotId] &&
    //   review[spotId].map(singleReview =>
    //     <div>
    //       <li>{singleReview.review}</li>
    //       {
    //         (currentSpotOwner !== currentUser.id) && (singleReview.userId === currentUser.id) &&
    //         <div>
    //            <Link to={`/reviews/${singleReview.id}/edit`}><button>Edit Review</button>
    //           </Link>
    //           <button onClick={(e) => deleteReview(e, singleReview.id)}>Delete Review</button>
    //         </div>
    //       }
    //     </div>
    //   )}
    //   </ul>
    //   }
    //   { currentUser && currentUser.id &&
    //     (!usersWithReviews.includes(currentUser.id)) && (currentSpotOwner !== currentUser.id) &&
    //     <Link to={`/spots/${spotId}/reviews/add`}><button>Add a Review</button></Link>
    //   }
    //   <Link to="/">Back to spots List</Link>
    // </section>
    // </>
  );
}

export default SpotShow;
