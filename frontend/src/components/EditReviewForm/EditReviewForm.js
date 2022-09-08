import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as reviewActions from '../../store/reviews';

const EditReviewForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const [reviewComments, setReviewComments] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(reviewActions.currentUserReviews())
  }, [dispatch]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const updatedReview = {
      review: reviewComments,
      stars: parseInt(stars)
    };

    const res = await dispatch(reviewActions.editReview(reviewId, updatedReview))
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors) setErrors({...data.errors});
      });

    if (res) history.push(`/user/reviews`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
      {
        Object.keys(errors).map(error => {
          return (<li>
            {errors[error]}
          </li>)
        }
        )
      }
      </ul>
      <label>
        Review Comments
        <input
          type="text"
          value={reviewComments}
          onChange={(e) => setReviewComments(e.target.value)}
          required
        />
      </label>
      <label>
        Stars
        <input
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default EditReviewForm;
