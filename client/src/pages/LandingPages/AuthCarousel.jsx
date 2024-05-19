import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Login from "../login/Login";
import Register from "../user/Regester";
import { Link } from "react-router-dom";

function Carousels() {
  const [selectedIndex, setSelectedIndex] = useState(0); // Initially set to display Login component

  // Function to toggle to the Registration page
  const toggleToRegister = () => {
    setSelectedIndex(1); // Set to Registration component
  };

  // Function to toggle to the Login page
  const toggleToLogin = () => {
    setSelectedIndex(0); // Set to Login component
  };

  return (
    <div className="page-container">
      <div className="carousel-container">
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          selectedItem={selectedIndex}
        >
          {/* Login Form */}
          <div>
            <>
              <h3 className="textCenter ptop">Login to your account</h3>
              <h6 className="textCenter font-size">
                Don't have an account?{" "}
                <span onClick={toggleToRegister} className="orange">
                  Create a new account
                </span>
              </h6>
              <Login />
            </>
          </div>
          {/* Registration Form */}
          <div>
            <>
              <h2 className="textCenter darkbl">Join the network</h2>
              <h6 className="textCenter registertitle">
                Already have an account?{" "}
                <Link to="/login" className="coloro" onClick={toggleToLogin}>
                  Sign in
                </Link>
              </h6>
              <Register />
            
            </>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Carousels;
