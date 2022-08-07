import React, { Component, useContext } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";
import { LoginContext, UserContext } from "../App";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const NavBar = () => {
  const user = useContext(UserContext);
  const { handleLogin, handleLogout } = useContext(LoginContext);

  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">I Wuz Here</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {user.id ? (
          <Link to="/">
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          </Link>
        ) : (
          <Link to="/">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
