import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={false} />
      
      <main className="flex-grow flex items-center justify-center bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <LoginForm />
        </div>
      </main>

    </div>
  );
};

export default Login;