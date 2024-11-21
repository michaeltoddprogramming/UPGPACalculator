import React from "react";
import Navigation from "../components/Navigation";

class DontClickMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ clicked: true });
    }

    render() {
        const { clicked } = this.state;

        return (
            <div>
                <Navigation />
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <h1>Hey Cait! 😊</h1>
                    {!clicked ? (
                        <div>
                            <p>Don't click this button! Seriously, don't do it!</p>
                            <button onClick={this.handleClick} style={{ padding: "10px 20px", fontSize: "16px" }}>
                                Don't Click Me!
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>Oh no, you clicked it! 😱</p>
                            <p>Just kidding, I love you baba ❤️</p>
                            <p>Hope your grades worked out well! 🌟</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default DontClickMe;