import React from "react";
import './Nav.scss';
import { NavLink } from 'react-router-dom';
class Nav extends React.Component {
    render() {
        return (
            <div className="topnav">
                <NavLink
                    to="/home"
                    className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "")
                    }
                >
                    Home
                </NavLink>
             

            </div>
        )
    }
}
export default Nav;