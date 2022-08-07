const GroupChat = require("./models/groupChat");
const message = require("./models/message");
const ChatMessage = require("./models/message");
const User = require("./models/user");
const socketManager = require("./server-socket");
/**
 * Get reqs should be formatted as:
 * body = {
 *  _id: id of pin to get chat from
 * }
 *
 * Returns res of:
 * body = [
 *  message: message of form {
 *      creator: user id
 *      timestamp
 *      content
 *  }
 * ]
 */
function get(req, res) {
  GroupChat.findById(req.query._id).then((group) => {
    if (!group.users.includes(req.user._id)) {
      // If the user isn't subscribed to the chat, subscribe them
      group.users.push(req.user._id);
      console.log(group.users);
      group.save().then((g) => console.log(g.users));
    }
    // Find messages from this group and send them
    ChatMessage.find({ parent: group._id }).then((messages) => {
      res.send(messages);
    });
  });
}

/**
 * Post reqs should be structured as follows:
 * body = {
 *  parent: id of group to send to
 *  creator: id of user who made it
 *  timestamp: optional, can be specified
 *  content: content of message
 * }
 *
 * returns the new message for immediate display
 */
function post(req, res) {
  // Create new message, send to db, and then emit to all registered users of that group
  new ChatMessage(req.body).save().then((message) =>
    GroupChat.findById(message.parent).then((group) => {
      if (!group.users.includes(req.user._id)) {
        // If the user isn't subscribed to the chat, subscribe them
        group.users.push(req.user._id);
        console.log(group.users);
        group.save().then((g) => console.log(g.users));
      }
      group.users.forEach((userId) => {
        console.log(userId);
        // Hopefully doesn't crash if the user doesn't have an active socket\
        const socket = socketManager.getSocketFromUserID(userId);
        if (socket) {
          console.log(socket, message);
          socket.emit("message", message);
        }
      });
    })
  );
}

module.exports = {
  get,
  post,
};
