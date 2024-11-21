import React from "react";
import Navigation from "../components/Navigation";

class Contact extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <h1>Contact Us 📞</h1>
                    <p>Complaints Department is closed!</p>
                    <p>But feel free to leave your two cents at <a href="mailto:support@upgpacalculator.com">ComplaintsDepartmentIsClosed@Voetsek.com</a></p>
                </div>
            </div>
        );
    }
}

export default Contact;