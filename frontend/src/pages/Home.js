import React from "react";
import Navigation from "../components/Navigation"
import SemOneCalc from "../components/SemOneCalc";

class Home extends React.Component {

    render() {
        return (
            <div>
                <Navigation />
                <SemOneCalc />
            </div>
        );
    }
}

export default Home