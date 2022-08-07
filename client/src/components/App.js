import React, { Component, useState, useEffect, useContext } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import AddMarker from "./pages/AddMarker.js";
import WriteANote from "./pages/WriteANote.js";

// Context definitions
const UserContext = React.createContext();
// In case we want to force a sign out at any point in time
const LoginContext = React.createContext();
// Automatic geolocate user
const GeolocationContext = React.createContext();

const App = () => {
  // Probably not needed, but just to stay safe.
  const emptyUser = {
    id: undefined,
    name: undefined,
  };

  const [user, setUser] = useState(emptyUser);

  // Default location is MIT!
  const [location, setLocation] = useState({
    lat: 42.36,
    lng: -71.092,
  });

  // Persistent sessions, runs only once.
  // Geolocation also only needs to run once.
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUser({
          id: user._id,
          name: user.name,
        });
      }
    });
    "geolocation" in navigator &&
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUser({
        id: user._id,
        name: user.name,
      });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    console.log("Logging out!");
    post("/api/logout");
    setUser(emptyUser);
  };

  return (
    <>
      <UserContext.Provider value={user}>
        <LoginContext.Provider value={{ handleLogin: handleLogin, handleLogout: handleLogout }}>
          <GeolocationContext.Provider value={location}>
            <Router>
              <Skeleton path="/" />
              <AddMarker
                path="/AddMarker/"
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={user.id}
                userName={user.name}
              />
              <WriteANote
                path="/WriteANote/"
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={user.id}
                userName={user.name}
              />
              <NotFound default />
            </Router>
          </GeolocationContext.Provider>
        </LoginContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export { App as default, UserContext, LoginContext, GeolocationContext };
