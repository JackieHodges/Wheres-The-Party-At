import React from 'react';


function HowItWorks(){
return (


<div className="grid-container">
<div class="row column">
<h1  align="center" >How It Works</h1>
</div>
  <div className="grid-x grid-margin-x small-up-2 medium-up-3" data-equalizer data-equalize-on="medium">
    <div className="cell">
      <div className="card">
        <img src="https://lh3.googleusercontent.com/proxy/nqB1vNpcN9W9BJ2L2wnkLBlTHFmZCV9aBf1cMvMZ-5MZ-j50p1ITr0k-oFtG5EQc8ToSwqO4FZgliv1OQz35HX7E4cAV-PNnkA" className="howimage"></img>
        <div className="" data-equalizer-watch>
        <h4 align="center">Create new trips!</h4>
          <p align="center">Start by loggin in and using our Create New Trip feature to start planning your next trip!</p>
        </div>
      </div>
    </div>
    <div className="cell">
      <div className="card">
        <img src="https://media.glamour.com/photos/5ebd7bfdff61267e6b09e86c/1:1/w_1217,h_1217,c_limit/friends.jpg" className="howimage"></img>
        <div className="card-section align-center " data-equalizer-watch>
          <h4 align="center">Invite friends to trips!</h4>
          <p align="center">Once you have created a new trip, invite your friends to create an account and join your trip!</p>
        </div>
      </div>
    </div>
    <div className="cell">
      <div className="card">
        <img src="https://embed-fastly.wistia.com/deliveries/fc7c506ce1f0ca79973b4f47dfb1c0d4.webp?image_crop_resized=1080x1080" className="howimage"></img>
        <div className="card-section align-center" data-equalizer-watch>
          <h4 align="center">View upcoming trips!</h4>
          <p align="center">View a list of trips coming up on your dashboard to help plan more! </p>
        </div>
      </div>
    </div>
  </div>
</div>

);
}

export default HowItWorks


