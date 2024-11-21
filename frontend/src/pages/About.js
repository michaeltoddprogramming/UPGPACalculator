import React from "react";
import Navigation from "../components/Navigation";

class About extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <div style={{ padding: "20px" }}>
                    <h1>About UP GPA Calculator 🎓</h1>
                    <p>
                        Welcome to the UP GPA Calculator! 🎉 This magical tool is here to save you from the horrors of manual GPA calculations. Whether you're a math whiz or someone who thinks algebra is a type of pasta, we've got you covered! 🍝
                    </p>
                    <h2>How to Use 🛠️</h2>
                    <p>
                        Using the GPA calculator is easier than making instant noodles! 🍜 Just follow these steps:
                    </p>
                    <ol>
                        <li>Select whether you want to calculate the GPA for Semester One, Semester Two, or the entire year. 🎯</li>
                        <li>Enter the course name, grade, and credit for each course you have taken. ✏️</li>
                        <li>Click "Add Course" to add the course to the list. ➕</li>
                        <li>Watch in awe as the application magically calculates your cumulative GPA! 🎩✨</li>
                    </ol>
                </div>
            </div>
        );
    }
}

export default About;