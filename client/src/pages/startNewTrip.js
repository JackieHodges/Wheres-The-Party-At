import React, { useContext, useState } from "react";
import AddFriends from "../components/addFriends";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import { TripContext } from "../utils/TripContext";
import { UserContext } from "../utils/UserContext";
import ReactVote from 'react-vote';


function StartNewTrip(props) {
    const { currentUser } = useContext(UserContext);
    const { currentTrip, setCurrentTrip } = useContext(TripContext);

    const [formObject, setFormObject] = useState({});
    const [selectedTrip, setSelectedTrip] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        alert(`The trip ${formObject.trip_name} was created!`)
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
            .then(res => setSelectedTrip(res.data))
    }

    function onCreateDate(data) {
        API.setVote(
            {
                voteData: data,
                trip: selectedTrip.trip_id
            }
        )
            .then(res => console.log(res.data))
    }

    function onCreateLocation(data) {
        API.setVote(
            {
                locationData: data,
                trip: selectedTrip.trip_id
            }
        )
            .then(res => console.log(res.data))
    }

    function onCreateActivity(data) {
        API.setVote(
            {
                activityData: data,
                trip: selectedTrip.trip_id
            }
        )
            .then(res => console.log(res.data))
    }
    
    function onCreateTransport(data) {
        API.setVote(
            {
                transportData: data,
                trip: selectedTrip.trip_id
            }
        )
            .then(res => console.log(res.data))
    }

    return (

        <div className="row">
            <div className="col">
                <h2>Create New Trip</h2>
                <h5>Step 1: Name your trip and click Create Trip</h5>
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
                <div className="grid-container">
                <h5>Step 2: Set your vote parameters for each category.</h5>
                    <div className="card" >
                        <h3>Dates:</h3>
                        <ReactVote 
                            onCreate={onCreateDate}
                            isAdmin={true}
                            clientId={currentUser.id} />
                    </div>
                    <div className="card">
                        <h3>Locations:</h3>
                        <ReactVote 
                            onCreate={onCreateLocation}
                            isAdmin={true}
                            clientId={currentUser.id} />
                    </div>
                    <div className="card">
                        <h3>Activities:</h3>
                        <ReactVote
                            onCreate={onCreateActivity}
                            isAdmin={true}
                            clientId={currentUser.id} />
                    </div>
                    <div className="card">
                        <h3>Mode of Transport:</h3>
                        <ReactVote 
                            onCreate={onCreateTransport}
                            isAdmin={true}
                            clientId={currentUser.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartNewTrip;