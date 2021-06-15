import React, { useContext, useEffect, useState } from 'react';
import ReactVote from 'react-vote';
import API from '../../utils/API';
import { TripContext } from '../../utils/TripContext';
import { UserContext } from '../../utils/UserContext';

const VotingMech = (props) => {

    const { currentTrip } = useContext(TripContext);
    const { currentUser } = useContext(UserContext);
    const [isAdmin, setAdmin] = useState([]);
    const [currentVote, setCurrentVote] = useState([]);

    useEffect(() => {
        // check if the user is an admin
        fetchCurrentVoteData();
        checkUserAdmin();
        // do i need something in here to fetch the vote data if the person isn't an admin?
    }, [currentTrip, currentUser])

    function fetchCurrentVoteData() {
        API.getSpecificTrip(currentTrip.id)
            .then(res => setCurrentVote(res.data))
    }

    function checkUserAdmin() {
        console.log(currentTrip.id);
        console.log(currentUser.id);
        if(currentTrip.id && currentUser.id){
        API.isUserAdmin({
            user_id: currentUser.id,
            trip_id: currentTrip.id
        })
            .then(res => setAdmin(res.data))
            .catch(err => console.log(err))}
    }

    console.log(`this is the admin data ${isAdmin.admin}`)

    function onCreateDate(data) {
        API.setVote(
            {
                voteData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onUpvoteDate(data, diff) {
        ;
        console.log(data)
        API.setVote(
            {
                voteData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onResetDate(data) {
        API.setVote(
            {
                voteData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onCloseDate(data) {
        API.setVote(
            {
                voteData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onCreateLocation(data) {
        API.setVote(
            {
                locationData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onUpvoteLocation(data, diff) {
        console.log(data)
        API.setVote(
            {
                locationData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onResetLocation(data) {
        API.setVote(
            {
                locationData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onCloseLocation(data) {
        API.setVote(
            {
                locationData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onCreateActivity(data) {
        API.setVote(
            {
                activityData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onUpvoteActivity(data, diff) {
        console.log(data)
        API.setVote(
            {
                activityData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onResetActivity(data) {
        API.setVote(
            {
                activityData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onCloseActivity(data) {
        API.setVote(
            {
                activityData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onCreateTransport(data) {
        API.setVote(
            {
                transportData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onUpvoteTransport(data, diff) {
        console.log(data)
        API.setVote(
            {
                transportData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onResetTransport(data) {
        API.setVote(
            {
                transportData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    function onCloseTransport(data) {
        API.setVote(
            {
                transportData: data,
                trip: currentTrip.id
            }
        )
            .then(res => console.log(res.data))
    }

    if (currentVote) {
        return (
            <div className="grid-container">
                <div className="card" >
                    <h3>Dates:</h3>
                    <ReactVote data={currentVote.dateVote}
                        onCreate={onCreateDate} 
                        onUpvote={onUpvoteDate} 
                        onClose={onCloseDate} 
                        onReset={onResetDate} 
                        isAdmin={isAdmin.admin} 
                        clientId={currentUser.id} />
                </div>
                <div className="card">
                    <h3>Locations:</h3>
                    <ReactVote data={currentVote.locationVote}
                        onCreate={onCreateLocation} 
                        onUpvote={onUpvoteLocation} 
                        onClose={onCloseLocation} 
                        onReset={onResetLocation} 
                        isAdmin={isAdmin.admin} 
                        clientId={currentUser.id}/>
                </div>
                <div className="card">
                    <h3>Activities:</h3>
                    <ReactVote data={currentVote.activityVote}
                        onCreate={onCreateActivity} 
                        onUpvote={onUpvoteActivity} 
                        onClose={onCloseActivity} 
                        onReset={onResetActivity} 
                        isAdmin={isAdmin.admin} 
                        clientId={currentUser.id} />
                </div>
                <div className="card">
                    <h3>Mode of Transport:</h3>
                    <ReactVote data={currentVote.transportVote}
                        onCreate={onCreateTransport} 
                        onUpvote={onUpvoteTransport} 
                        onClose={onCloseTransport} 
                        onReset={onResetTransport} 
                        isAdmin={isAdmin.admin} 
                        clientId={currentUser.id} />
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <h3>Dates:</h3>
                    <ReactVote onCreate={onCreateDate} onUpvote={onUpvoteDate} onClose={onCloseDate} onReset={onResetDate} isAdmin={isAdmin.admin} clientId={currentUser.id} />
                </div>
                <div>
                    <h3>Locations:</h3>
                    <ReactVote onCreate={onCreateLocation} onUpvote={onUpvoteLocation} onClose={onCloseLocation} onReset={onResetLocation} isAdmin={isAdmin.admin} clientId={currentUser.id} />
                </div>
                <div>
                    <h3>Activities:</h3>
                    <ReactVote onCreate={onCreateActivity} onUpvote={onUpvoteActivity} onClose={onCloseActivity} onReset={onResetActivity} isAdmin={isAdmin.admin} clientId={currentUser.id} />
                </div>
                <div>
                    <h3>Mode of Transport:</h3>
                    <ReactVote onCreate={onCreateTransport} onUpvote={onUpvoteTransport} onClose={onCloseTransport} onReset={onResetTransport} isAdmin={isAdmin.admin} clientId={currentUser.id} />
                </div>
            </div>
        )
    }
}

export default VotingMech