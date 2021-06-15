import React, { useContext, useEffect, useState } from "react";
import API from "../utils/API";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../utils/UserContext";
import { Link } from "react-router-dom";
import { TripContext } from "../utils/TripContext";

function MyFriends() {
    const { currentTrip, setCurrentTrip } = useContext(TripContext);
    const { currentUser } = useContext(UserContext)
    const { isAuthenticated } = useAuth0();
    const [trips, setTrips] = useState([]);
    const [formObject, setFormObject] = useState({});
    const [friends, setFriends] = useState([]);


    useEffect(() => {
        getFriends();
    }, [])

    function getFriends() {
        API.getFriends(currentTrip.id)
            .then(res => setFriends(res.data))
            .catch(err => console.log(err));
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {

        event.preventDefault();
        console.log(formObject.friend_email)

        alert(`${formObject.friend_email} added to ${currentTrip.trip_name}`)

        if (formObject.friend_email) {
            API.inviteFriend(formObject.friend_email)
                .then(res => addAssociation(res.data[0].id))
        }
    };

    function addAssociation(userId) {
        API.associateFriendTrip({
            trip_id: currentTrip.id,
            user_id: userId
        })
            .then(res => console.log(res.data))
    }

    console.log(`this is the current trip id ${currentTrip.id}`);
    console.log(`these are my trips ${trips}`)
    return (
        isAuthenticated && (
            <div>
                {currentTrip.trip_name} Friend List
                <div>
                    <form>
                        <input
                            onChange={handleInputChange}
                            name="friend_email"
                            placeholder="Friend's Email"
                        />
                        <button onClick={handleFormSubmit}>
                            Add Friend
                        </button>
                    </form>
                </div>
                <div>Friends who have been invited:</div>
                <ul className="accordion" data-accordion>
                    {friends.map(friend =>
                        <li key={friend.id} className="accordion-item is-active" data-accordion-item>
                            <div className="accordion-title" >
                                {friend.user.email}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    )
}

export default MyFriends;