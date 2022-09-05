import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as reviewActions from '../../store/reviews';


function CreateReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {spotId} = useParams();
  const [reviewComments, setReviewComments] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      review: reviewComments,
      stars: parseInt(stars)
    };

    let res = await dispatch(reviewActions.createNewReview(spotId, newReview))
    .catch(async (res) => {
      const data = await res.json();

      if (data.errors) setErrors({...data.errors})

    });

    if (res) {
      history.push('/')
    }
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
        Review
        <input
          type="text"
          value={reviewComments}
          onChange={(e) => setReviewComments(e.target.value)}
          required
        />
      </label>
      <label>
        stars
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

export default CreateReviewForm;
