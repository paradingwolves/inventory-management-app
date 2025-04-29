import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import { LOGIN } from '../../lib/routes';

const Auth = () => {
  return (
    <div>
      {/* Automatically redirect to /auth/login */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Auth;
