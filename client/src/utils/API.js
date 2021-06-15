import axios from "axios";

export default {
  // Gets the trip with the given id
  getTrips: function(userId) {
    console.log(userId)
    return axios.get("/api/trips/" + userId);
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id)
  },
  saveTrip: function(tripData) {
    return axios.post("/api/trips", tripData);
  },
  findOrCreate: function(userData) {
    return axios.post("/api/users/", userData)
  },
  getSpecificTrip: function(tripId) {
    return axios.get("/api/specificTrips/" + tripId)
  },
  addAssociation: function(travellerData) {
    return axios.post("/api/specificTrips/", travellerData)
  },
  setVote: function(voteData) {
    return axios.put("/api/votes/", voteData)
  },
  isUserAdmin: function (specificTripData){
    return axios.get("/api/votes/" + specificTripData.user_id + specificTripData.trip_id)
  },
  inviteFriend: function (friendEmailData){
    return axios.post("/api/friends/newFriend/" + friendEmailData)
  },
  associateFriendTrip: function (friendEmailData){
    return axios.post("/api/friends/", friendEmailData)
  },
  getFriends: function (tripData){
    return axios.get("/api/friends/" + tripData)
  }
};
