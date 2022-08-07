import React, { Component, useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { get, post } from "../../utilities";
import Pin from "./Pin";
import { GeolocationContext, UserContext } from "../App";

const Map = ({ zoom = 15, otherCallback, ...props }) => {
  // Setup contexts to use.
  const geolocation = useContext(GeolocationContext);
  const user = useContext(UserContext);

  const [pins, setPins] = useState();
  const [chosenId, setId] = useState();

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  // Get pins from db
  useEffect(() => {
    get("/api/pins").then((res) => setPins(res));
  }, []);

  const renderPins = pins ? (
    pins.map((pin) => (
      /* TODO: Rename otherCallback lmao */
      <Pin
        key={pin._id}
        lat={pin.lat}
        lng={pin.lng}
        onClickCallback={() => otherCallback(pin._id, pin.name)}
      >
        {pin.name}
      </Pin>
    ))
  ) : (
    <div></div>
  );

  const mapOnClick = ({ x, y, lat, lng, event }) => {
    console.log(x, y, lat, lng, event);
    props.parentCallback(lat, lng);
    if (props.addMarker && props.locked_in) {
      // Generate a new pin.
      const newPin = {
        creatorId: user.id,
        lat: lat,
        lng: lng,
        name: props.name_given,
      };
      console.log(newPin);
      // Push it server side and update map with new pin.
      post("/api/pin", newPin).then((pin) => setPins(pins.concat(pin)));
      console.log(pins);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        center={geolocation}
        defaultZoom={zoom}
        onClick={mapOnClick}
      >
        {renderPins}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
