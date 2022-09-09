import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
        .catch(async (res) => {
          const data = await res.json();

          if (data && data.errors) setErrors({...data.errors});
        });
    }
    return setErrors({'passwordVerification' : 'Confirm Password field must be the same as the Password field'});
  };

  return (
    <form class="signup-form" onSubmit={handleSubmit}>
    <div className="signup-form-container">
    <h1 className="welcome">Welcome to Spacebnb</h1>
    <ul className="signup-errors">
       {
        Object.keys(errors).map(error => {
          return (<li>
            {errors[error]}
          </li>)
        }
        )
      }
    </ul>
    <div className="signup-info-btns">
        <input className="signup-firstname-input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input className="signup-lastname-input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input className="signup-email-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input className="signup-password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input className="signup-confirmpassword-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
      </div>
      <button className="submit-signup" type="submit">Sign Up</button>
    </div>
    </form>
  );
}

export default SignupFormPage;
