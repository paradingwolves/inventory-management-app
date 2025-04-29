import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import useAuth from "../../hooks/auth/auth";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not logged in, and if they are trying to access a protected page
    if (!loading && !user) {
      navigate(LOGIN);
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {/* Page Content */}
      <div>
        <Outlet />
        <Dashboard />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
