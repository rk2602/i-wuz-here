import React, { Component } from "react";
import Confetti from "react-confetti";

import "../../utilities.css";
import "./AddMarker.css";
import Map from "../modules/Map";
import NavBar from "../modules/NavBar";

class AddMarker extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      map_clicked: false,
      name_value: "",
      latt: "not chosen yet",
      long: "not chosen yet",
      give_warning: false,
      give_thanks: false,
      lock_in: false,
      confetti_1: false,
      confetti_2: false,
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  componentDidUpdate(prevState) {
    if (!prevState.confetti_2 && this.state.confetti_2) {
      this.inputRef.current.value = "";
    }
  }

  handleNameChange = (event) => {
    this.setState({
      name_value: event.target.value,
      give_thanks: false,
      give_warning: false,
      confetti_1: false,
      confetti_2: false,
    });
  };

  change_comps = (lat, lon) => {
    this.setState({
      map_clicked: true,
      latt: lat,
      long: lon,
      lock_in: false,
    });
    if (this.state.confetti_1) {
      this.setState({
        confetti_2: true,
      });
    }
  };

  give_values = () => {
    if (this.state.name_value) {
      this.setState({
        give_thanks: true,
        give_warning: false,
        lock_in: true,
        confetti_1: true,
      });
    } else {
      this.setState({
        give_warning: true,
        give_thanks: false,
      });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="column">
          <NavBar />
          <div className="AddMarker-list">
            <h1 className="center-text">Add a Marker by following these easy steps!:</h1>
            <ol className="ol">
              <li>
                Before doing anything else, navigate to the approximate location where you want to
                add a marker. For reference, your last click was a point of lattitude:{" "}
                <b className="AddMarker-stats">{this.state.latt}</b> and longitude:{" "}
                <b className="AddMarker-stats">{this.state.long}</b>
              </li>
              <li>
                Give your marker a unique name:
                <div>
                  <input
                    type="text"
                    placeholder="What is the name of this location?"
                    value={this.state.name_value}
                    onChange={this.handleNameChange}
                    className="textBox"
                    ref={this.inputRef}
                  />
                </div>
              </li>
              <li>
                Click this to lock in your name:
                <div>
                  <button className="button" onClick={this.give_values}>
                    Apply Name and Description
                  </button>
                  {this.state.give_warning ? <p>Please add a name.</p> : <div />}
                  {this.state.give_thanks ? (
                    <p>{this.state.name_value} was locked in!</p>
                  ) : (
                    <div />
                  )}
                </div>
              </li>
              <li>
                Now carefully, click on the precise location where you want the pin. You should be
                able to see the pin once you click. Note that any clicks after this will not result
                in any new pins until you write a new name.
              </li>
              {this.state.confetti_1 && this.state.confetti_2 ? (
                <div>
                  <p>Yay! You added a marker!</p>
                  <Confetti numberOfPieces={200} recycle={false} />
                </div>
              ) : (
                <div />
              )}
            </ol>
          </div>
        </div>
        <div className="column">
          <Map
            addMarker={true}
            parentCallback={this.change_comps}
            userId={this.props.userId}
            locked_in={this.state.lock_in}
            name_given={this.state.name_value}
          />
        </div>
      </div>
    );
  }
}

export default AddMarker;
