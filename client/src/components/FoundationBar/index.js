import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCocktail } from '@fortawesome/free-solid-svg-icons'
import LoginButton from "../loginButton";
import LogoutButton from "../logoutButton";

function FoundationBar() {
    return (
        <div className="title-bar">
            <div className="title-bar-left ">
                <ul className="menu">
                <li><FontAwesomeIcon icon={faCocktail} /></li>
                    <li><span className="title-bar-title aligh-right"> WTPA</span></li>

                </ul>
                </div>

                <div className="title-bar-right">
                <a className="align-right" href="/">Home</a>
                <div className="align-right"><LoginButton /></div>
                <div className="align-right"><LogoutButton /></div>

            </div>

        </div>
    );
}
export default FoundationBar;

