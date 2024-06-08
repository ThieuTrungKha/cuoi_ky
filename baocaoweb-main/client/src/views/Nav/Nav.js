import React from "react";
import './Nav.scss';
import { NavLink } from 'react-router-dom';
class Nav extends React.Component {
    render() {
        return (
            <div className="topnav">
            
                <NavLink
                    to="/getLanguage"
                    className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "")
                    }
                >
                    QL Language
                </NavLink>
                <NavLink
                    to="/getFramework"
                    className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "")
                    }
                >
                    QL Framework
                </NavLink>

            </div>
        )
    }
}
export default Nav;