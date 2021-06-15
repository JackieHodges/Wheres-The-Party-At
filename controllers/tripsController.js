const db = require("../models");

// Defining methods for the tripsController
module.exports = {
  findTrip: function (req, res) {
    db.Trip
      .findOne({
        where: { id: req.params.id },
        // include: [{ model: db.User }]
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findOne({
        where: { id: req.params.id }
        ,
        include: {
          model: db.Trip,
          // through: db.Travellers 
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function (req, res) {
    db.User
      .findOne({ where: req.body })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createTrip: function (req, res) {
    db.Trip
      .create({
        trip_name: req.body.trip_name,
        location: req.body.location,
        activity: req.body.activity,
        transport: req.body.transport
      },
        {
          include: db.User
        })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOrCreate: function (req, res) {
    db.User
      .findOrCreate({
        where: { email: req.body.email },
        defaults: {
          name: req.body.name,
          authOId: req.body.authOId
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  newAssociation: function (req, res) {
    db.Travellers
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateVote: function (req, res) {
    db.Trip
      .update({
        dateVote: req.body.voteData,
        locationVote: req.body.locationData,
        activityVote: req.body.activityData,
        transportVote: req.body.transportData
      },
        {
          where: { id: req.body.trip }
        })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  isUserAdmin: function (req, res) {
    inputData = req.params.id
    console.log("this is inputData", inputData)

    function splitToDigit(n){
      return (n + '').split('').map((i) => { return Number(i); })
    }
    
    splitInputData = splitToDigit(inputData);
    user_id=splitInputData[0];
    trip_id=splitInputData[1];

    db.Travellers
      .findOne({
        where: {
          trip_id: trip_id,
          user_id: user_id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addNewFriend: function (req, res) {
    db.User
      .findOrCreate({
        where: { email: req.params.id },
        defaults: {
          name: null,
          authOId: null
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  associateFriendTrip: function (req, res) {
    db.Travellers
      .findOrCreate({
        where: {
          trip_id: req.body.trip_id,
          user_id: req.body.user_id
        },
        defaults: {
          admin: false
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getFriends: function (req, res) {
    db.Travellers
      .findAll({
        where: {
          trip_id: req.params.id
        },
        include: {
          model: db.User,
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
