import { Link } from "@reach/router";
import React, { Component, useContext } from "react";

import "../../utilities.css";
import Map from "../modules/Map";
import NavBar from "../modules/NavBar";
import { LoginContext, UserContext } from "../App";
import watermelon from "../../watermelon.png";
import pin_drop from "../../pin dropping.gif";
import note_write from "../../writing a note.gif"

// Wow, so small
const Skeleton = () => {
  const user = useContext(UserContext);

  return (
    <div className="row">
      <div className="column">
        <NavBar />
        {user.id ? (
          <div>
            <div className="center-text">
              <h1>Welcome, {user.name}!</h1>
              <p>Choose One:</p>
            </div>
            <div className="row">
              <div className="column">
                <Link to="/AddMarker/">
                  <img src={pin_drop} />
                  <div className="center-text">
                    <h3>Add a Marker!</h3>
                  </div>
                </Link>
              </div>
              <div className="column">
                <Link to="/WriteANote/">
                  <img src={note_write} />
                  <div className="center-text">
                    <h3>Write a Note!</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="pad-it">
            <h1>The Concept</h1>
            <p>
            Remember going to that hip, trendy restaurant? Or that straight up tourist trap?
            You have fun; you enjoy the experience, until one thing catches your eye...
            </p><p><strong>A Message Board</strong></p><p>
            On it, Janet from California wrote: "Drove 2 whole days just to be here!", and
            Sandy from Brooklyn simply notes: "Iconic." It was a bit tacky, sure, but it
            was <i>part of the experience</i>. But let's face it... a cork board with post it 
            notes is a bit obsolete. So we made one to suit the 21st century.
            </p>
            <h1> The Website</h1>
            <p>
            A sleek, minimalistic design, seemlessly integrated with the intuitive Google Maps 
            API, <i>I Wuz Here</i> is the perfect place to have the world's message boards.

            There are 2 main functions, both requiring you, the user, to help us attain this 
            monumental task. Firstly, users are given the ability to add markers (representing 
            significant locations), giving them a unique name and description. These markers 
            will then be added to every user's map on the site. This will then allow users at 
            this location to conduct the second function, which is adding the "posts" that
            we all know and love. Enjoy!
            </p>
            <div className="center-text">
              <img src={watermelon} display="block" margin-left="auto" margin-left="auto" />
              <div/>
              <i text-align="center">Just like eating Mr. Watermelon here on a sunny summer day, our hope with this site is to foster wholesome memories wherever you are!</i>
            </div>
          </div>
        )}
      </div>
      <div className="column">
        <Map />
      </div>
    </div>
  );
};

export default Skeleton;
