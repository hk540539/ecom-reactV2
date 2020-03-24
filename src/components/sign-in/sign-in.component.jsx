import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.style.scss';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

const SignIn = () => {
  const [state, setState] = useState({ email: '', password: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setState({ email: '', password: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <div className="sign-in">
      <h2 className="title">I Already have an Account</h2>
      <span className="title">Sign in with your email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={state.email}
          handleChange={handleChange}
          required
          label="email"
        />
        <FormInput
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          required
          label="password"
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
