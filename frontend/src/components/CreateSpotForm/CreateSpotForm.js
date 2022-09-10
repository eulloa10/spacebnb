import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import './CreateSpotForm.css';


function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [errors, setErrors] = useState({});



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpot = {address, city, state, country, lat, lng, name, description, price, previewImage};

    let res = await dispatch(spotActions.createNewSpot(newSpot))
    .catch(async (res) => {
      const data = await res.json();

      if (data.errors) setErrors({...data.errors})

    });

    if (res) {
      history.push('/user/spots')
    }
  }

  return (
    <>

    <form className="create-spot-form" onSubmit={handleSubmit}>
      <div className="create-spot-form-container">

      <ul className="create-spot-errors">
        {
        Object.keys(errors).map(error => {
          return (<li>
            {errors[error]}
          </li>)
        }
        )
      }
      </ul>
      <div className="create-spot-info-btns">


        <input
           className="edit-address-btn"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <input
          className="edit-city-btn"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />

        <input
          className="edit-state-btn"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          required
        />



        <input
          className="edit-country-btn"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        <input
          className="edit-lat-btn"
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Latitude"
          required
        />
        <input
          className="edit-long-btn"
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          placeholder="Longitude"
          required
        />
        <input
          className="edit-name-btn"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          className="edit-price-btn"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          className="add-image-btn"
          type="text"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          placeholder="Preview Image"
          required
        />
        <textarea
          className="edit-description-btn"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

      </div>
      <button className="create-spot-btn" type="submit">Create Listing</button>
      </div>
    </form>
    </>
  );
}

export default CreateSpotForm;
