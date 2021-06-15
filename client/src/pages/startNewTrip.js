import React, { useContext, useState } from "react";
import AddFriends from "../components/addFriends";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import { TripContext } from "../utils/TripContext";
import { UserContext } from "../utils/UserContext";


function StartNewTrip(props) {
    const { currentUser } = useContext(UserContext);
    const { currentTrip, setCurrentTrip } = useContext(TripContext);

    const [formObject, setFormObject] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {

        event.preventDefault();
        console.log(formObject.trip_name)

        if (formObject.trip_name) {
            API.saveTrip({
                trip_name: formObject.trip_name
            })
                .then(res => addAssociation(res.data.id))
        }
    };

    function addAssociation(newTripId) {
        API.addAssociation({
            trip_id: newTripId,
            user_id: currentUser.id,
            admin: true
        })
            .then(res => console.log(res.data))
    }

    return (

        <div className="row">
            <div className="col">
                <h2>Create New Trip</h2>
            </div>
            <div className="col">
                <form>
                    <Input
                        onChange={handleInputChange}
                        name="trip_name"
                        placeholder="Trip Name"
                    />
                    <button
                        //disabled={!(formObject.trip_name && formObject.date_range)}
                        onClick={handleFormSubmit}
                    >
                        Create Trip
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StartNewTrip;