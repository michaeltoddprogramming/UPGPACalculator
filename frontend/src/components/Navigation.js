import React from "react";
import { Link } from "react-router-dom"

class Navigation extends React.Component {
    render() {
        return (
            <div>
            <h1>UP GPA Calculator</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
        );
    }
}

export default Navigation