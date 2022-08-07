import React, { Component, useMemo } from "react";
import { socket } from "../../client-socket";
import { get, getUser, post } from "../../utilities";
import "./../modules/NavBar.css";
import "../../utilities.css";
import { UserContext } from "../App";
import Map from "../modules/Map";
import NavBar from "../modules/NavBar";

class WriteANote extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      chosen_id: undefined,
      chosen_name: undefined,
      post_value: undefined,
      chats: [],
    };
  }

  componentDidMount = () => {
    socket.on(
      "message",
      (message) =>
        message.parent === this.state.chosen_id &&
        this.setState((prevState) => ({ ...prevState, chats: prevState.chats.concat(message) }))
    );
  };

  chooseId = (id, name) => {
    this.setState({
      chosen_id: id,
      chosen_name: name,
    });

    // get chats from server
    get("/api/chat", { _id: id }).then((messages) => {
      this.setState((prevState) => ({
        ...prevState,
        chats: messages,
      }));
      console.log(this.state.chats);
    });
  };

  handlePostChange = (event) => {
    this.setState({
      post_value: event.target.value,
    });
  };

  submitMessage = () => {
    console.log("Sending message: ", {
      parent: this.state.chosen_id,
      creator: this.props.userId,
      content: this.state.post_value,
    });
    post("/api/chat", {
      parent: this.state.chosen_id,
      creator: this.props.userId,
      creatorName: this.props.userName,
      content: this.state.post_value,
    });
  };

  render() {
    // create chats to render
    const renderChats = this.state.chats ? (
      this.state.chats.map((mesg) => (
        //I changed the class name (and put it in NavBar.css); please choose a good background color.
        <div className="other-container" key={mesg.id}>
          {mesg.creatorName}: {mesg.content}
        </div>
      ))
    ) : (
      <div></div>
    );

    return (
      <div className="row">
        <div className="column">
          <NavBar
            handleLogin={this.props.handleLogin}
            handleLogout={this.props.handleLogout}
            userId={this.props.userId}
          />
          {this.props.userId ? (
            <div>
              {this.state.chosen_id ? (
                <div className="center-text">
                  <h1>You have chosen the following marker: {this.state.chosen_name}</h1>
                  <input
                    type="text"
                    placeholder="Write your note here: "
                    value={this.state.post_value}
                    onChange={this.handlePostChange}
                    className="textBox"
                  />
                  <button className="button" onClick={this.submitMessage}>Add Note</button>
                  {
                    // Dummy chat list
                    renderChats
                  }
                </div>
              ) : (
                <div className="center-text">
                  <h1>Click on a Marker!</h1>
                </div>
              )}
            </div>
          ) : (
            <p>Going home...</p>
          )}
        </div>
        <div className="column">
          <Map otherCallback={this.chooseId} />
        </div>
      </div>
    );
  }
}

export default WriteANote;
