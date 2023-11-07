import React from 'react';
import { NextPage } from 'next';
import SignupForm from './components/signup-form';

const SignupPage: NextPage = () => {
  return (
    <div className='w-full max-w-[calc(400px)] p-6 rounded-md shadow-md border-t-4 border-t-blue-500'>
      <SignupForm />
    </div>
  );
};

export default SignupPage;