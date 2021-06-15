import React, { useContext, useState } from "react";
import ReactVote from "react-vote";
import AddFriends from "../components/addFriends";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import { TripContext } from "../utils/TripContext";
import { UserContext } from "../utils/UserContext";


function StartNewTrip(props) {
    const { currentUser } = useContext(UserContext);
    const { currentTrip, setCurrentTrip } = useContext(TripContext);

    const [formObject, setFormObject] = useState({});
    const [thisTripId, setThisTripId] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {

        event.preventDefault();

        alert(`${formObject.trip_name} created! Now set your voting parameters.`)
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
            .then(res => setThisTripId(res.data.trip_id))
    }

    function onCreateDate(data) {
        API.setVote(
            {
                voteData: data,
                trip: thisTripId
            }
        )
            .then(res => console.log(res.data))
    }

    function onCreateLocation(data) {
        API.setVote(
            {
                locationData: data,
                trip: thisTripId
            }
        )
            .then(res => console.log(res.data))
    }

    function onCreateActivity(data) {
        API.setVote(
            {
                activityData: data,
                trip: thisTripId
            }
        )
            .then(res => console.log(res.data))
    }


    function onCreateTransport(data) {
        API.setVote(
            {
                transportData: data,
                trip: thisTripId
            }
        )
            .then(res => console.log(res.data))
    }

    return (

        <div className="row">
            <div className="col">
                <h2>Create New Trip</h2>
                <h3>Step 1: Name your trip and hit submit</h3>
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
                    <div>
                        <h3>Step 2: Set your voting parameters. Click create for each section as you complete. </h3>
                    </div>
                    <div className="card" >
                        <h3>Dates:</h3>
                        <ReactVote
                            onCreate={onCreateDate}
                            clientId={currentUser.email}
                        />
                    </div>
                    <div className="card">
                        <h3>Locations:</h3>
                        <ReactVote
                            onCreate={onCreateLocation}
                            clientId={currentUser.email}
                        />
                    </div>
                    <div className="card">
                        <h3>Activities:</h3>
                        <ReactVote
                            onCreate={onCreateActivity}
                            clientId={currentUser.email}
                        />
                    </div>
                    <div className="card">
                        <h3>Mode of Transport:</h3>
                        <ReactVote
                            onCreate={onCreateTransport}
                            clientId={currentUser.email}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartNewTrip;