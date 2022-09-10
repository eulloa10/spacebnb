import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as reviewActions from '../../store/reviews';
import './CreateReviewForm.css';


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
    <form className="add-review-form" onSubmit={handleSubmit}>
      <div className="add-review-container">
      <ul className="add-review-errors">
        {
        Object.keys(errors).map(error => {
          return (<li>
            {errors[error]}
          </li>)
        }
        )
      }
      </ul>
      <div className="edit-info-btns">
        <textarea
        className="review-comments-input"
          type="text"
          value={reviewComments}
          onChange={(e) => setReviewComments(e.target.value)}
          placeholder="Enter your review here"
          required
        />
      <div className="add-rating-section">
      <div className="add-rating-title">Rating:</div>
        <input
        className="rating-input"
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </div>
      </div>
      <button className="add-review-submit-btn" type="submit">Save</button>
      </div>
    </form>
  );
}

export default CreateReviewForm;
