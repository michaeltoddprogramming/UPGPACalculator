import React from "react";
import Navigation from "../components/Navigation";
import GPAForm from "../components/GPAForm";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            totalGradePointsSemOne: 0,
            totalCreditsSemOne: 0,
            totalGradePointsSemTwo: 0,
            totalCreditsSemTwo: 0,
            cumulativeGPAOverall: 0,
        };

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.updateSemOneGPA = this.updateSemOneGPA.bind(this);
        this.updateSemTwoGPA = this.updateSemTwoGPA.bind(this);
        this.calculateGPAOverall = this.calculateGPAOverall.bind(this);
    }

    handleOptionChange(event) {
        this.setState({ selectedOption: event.target.value });
    }

    updateSemOneGPA(totalGradePoints, totalCredits) {
        console.log("Updating Semester One GPA:", totalGradePoints, totalCredits);
        this.setState(
            {
                totalGradePointsSemOne: totalGradePoints,
                totalCreditsSemOne: totalCredits,
            },
            this.calculateGPAOverall // CALLBACK TO CALCULATE OVERALL GPA
        );
    }

    updateSemTwoGPA(totalGradePoints, totalCredits) {
        console.log("Updating Semester Two GPA:", totalGradePoints, totalCredits);
        this.setState(
            {
                totalGradePointsSemTwo: totalGradePoints,
                totalCreditsSemTwo: totalCredits,
            },
            this.calculateGPAOverall // CALLBACK TO CALCULATE OVERALL GPA
        );
    }

    calculateGPAOverall() {
        const { totalGradePointsSemOne, totalCreditsSemOne, totalGradePointsSemTwo, totalCreditsSemTwo } = this.state;
        const totalGradePoints = totalGradePointsSemOne + totalGradePointsSemTwo;
        const totalCredits = totalCreditsSemOne + totalCreditsSemTwo;

        const cumulativeGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;

        console.log("Calculating Overall GPA:", totalGradePoints, totalCredits, cumulativeGPA);
        this.setState({ cumulativeGPAOverall: cumulativeGPA });
    }

    render() {
        const { selectedOption, cumulativeGPAOverall } = this.state;

        return (
            <div>
                <Navigation />
                <div>
                    <h1>GPA Calculation</h1>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="semOne"
                                checked={selectedOption === "semOne"}
                                onChange={this.handleOptionChange}
                            />
                            Semester One
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="semTwo"
                                checked={selectedOption === "semTwo"}
                                onChange={this.handleOptionChange}
                            />
                            Semester Two
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="fullYear"
                                checked={selectedOption === "fullYear"}
                                onChange={this.handleOptionChange}
                            />
                            Full Year
                        </label>
                    </div>
                    {selectedOption === "semOne" && <GPAForm title="Semester One" onUpdate={this.updateSemOneGPA} />}
                    {selectedOption === "semTwo" && <GPAForm title="Semester Two" onUpdate={this.updateSemTwoGPA} />}
                    {selectedOption === "fullYear" && (
                        <div>
                            <GPAForm title="Semester One" onUpdate={this.updateSemOneGPA} />
                            <GPAForm title="Semester Two" onUpdate={this.updateSemTwoGPA} />
                            <h2>Overall GPA for the Year</h2>
                            <div>
                                <p>Cumulative GPA for the Year: {cumulativeGPAOverall}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;