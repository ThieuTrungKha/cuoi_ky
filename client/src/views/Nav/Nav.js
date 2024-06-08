import React from "react";
import './Nav.scss';
import { NavLink } from 'react-router-dom';
class Nav extends React.Component {
    render() {
        return (
            <div className="topnav">
                <NavLink
                    to="/viewAddField"
                    className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "")
                    }
                >
                    QL lĩnh vực
                </NavLink>
              
            </div>
        )
    }
}
export default Nav;