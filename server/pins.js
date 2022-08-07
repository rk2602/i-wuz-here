const GroupChat = require("./models/groupChat");
const Pin = require("./models/pin");

function get(req, res) {
  Pin.find({}).then((pins) => res.send(pins));
}

function post(req, res) {
  new Pin({
    creatorId: req.body.creatorId,
    lat: req.body.lat,
    lng: req.body.lng,
    name: req.body.name,
  })
    .save()
    .then((pin) => {
      new GroupChat({
        _id: pin._id,
        users: [pin.creatorId],
      }).save();
      res.send(pin);
    });
}

module.exports = {
  get,
  post,
};
