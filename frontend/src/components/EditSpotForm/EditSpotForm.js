import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots';

function EditSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const currentSpot = useSelector(state => state.spots[spotId])
  const [address, setAddress] = useState(currentSpot.address);
  const [city, setCity] = useState(currentSpot.city);
  const [state, setState] = useState(currentSpot.state);
  const [country, setCountry] = useState(currentSpot.country);
  const [lat, setLat] = useState(currentSpot.lat);
  const [lng, setLng] = useState(currentSpot.lng);
  const [name, setName] = useState(currentSpot.name);
  const [description, setDescription] = useState(currentSpot.description);
  const [price, setPrice] = useState(currentSpot.price);
  const [errors, setErrors] = useState({})

  // if (sessionUser) return (
  //   <Redirect to="/" />
  // );

  const handleSubmit = async (e) => {

    e.preventDefault();
    const updatedSpot = {address, city, state, country, lat, lng, name, description, price};
    // dispatch(spotActions.updateSpot(spotId, updatedSpot));
    // history.push(`/me/spots`)
    const res = await dispatch(spotActions.updateSpot(spotId, updatedSpot))
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors) setErrors({...data.errors});
      });

    if (res) history.push(`/me/spots`)
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
      <div>
        <img src={`${currentSpot.previewImage}`} alt="spot"/>
      </div>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Lat
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label>
        Lng
        <input
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default EditSpotForm;
