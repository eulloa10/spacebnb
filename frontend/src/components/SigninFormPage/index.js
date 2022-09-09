import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import "./SigninForm.css";

function SigninFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        const data = await res.json();

        if (data.message === 'Invalid credentials') {
          return setErrors({
            "errors": data.message
          })
        }
        if (data && data.errors) {
          setErrors({...data.errors});
        }
      });

  }

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="signin-container">


      <h1 className="welcome">Welcome to Spacebnb</h1>
      {/* <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul> */}
      <ul className="signin-errors">
      {
        Object.keys(errors).map(error => {
          return (<li>
            {errors[error]}
          </li>)
        }
        )
      }
      </ul>
      <div className="login-info-btns">

        <input className="login-email-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input className="login-password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button className="submit-login" type="submit">Continue</button>
      </div>
    </form>
  );
}

export default SigninFormPage;
