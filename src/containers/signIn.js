import React from 'react';
import SignInForm from '../components/signInForm'
import S from 'shorti'

const SignIn = () => {
  return (
    <div style={S('p-20 pt-80')}>
      <SignInForm/>
    </div>
  );
};

export default SignIn;
