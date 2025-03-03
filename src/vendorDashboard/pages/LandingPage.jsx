import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  // Check for login token on component mount
  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogOut(true);  // User is logged in
      setShowWelcome(true); // Show Welcome section
    }
  }, []);

  // Check for firm details on component mount
  useEffect(() => {
    const firmName = localStorage.getItem('firmName');
    const firmId = localStorage.getItem('firmId');
    if (firmName || firmId) {
      setShowFirmTitle(false); // Hide "Add Firm" title if firm is selected
      setShowWelcome(true);    // Show Welcome section
    }
  }, []);

  // Logout handler
  const logOutHandler = () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('firmId');
      localStorage.removeItem('firmName');
      setShowLogOut(false);   // Update state to hide logout button
      setShowFirmTitle(true); // Show firm title again
      setShowWelcome(false);  // Hide Welcome section
      setShowLogin(true);     // Redirect to login form
    }
  };

  // Handlers for showing different sections
  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showFirmHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(true);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const showProductHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(true);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const showAllProductsHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  };

  return (
    <>
      <section className='landingSection'>
        <NavBar 
          showLoginHandler={showLoginHandler} 
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut} 
          logOutHandler={logOutHandler} 
        />
        <div className="collectionSection">
          <SideBar 
            showFirmHandler={showFirmHandler} 
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle} 
          />
          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogOut && <AllProducts />}
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
