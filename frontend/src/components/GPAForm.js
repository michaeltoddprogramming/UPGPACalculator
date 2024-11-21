import React from "react";

class GPAForm extends React.Component {
    constructor(props) {
        super(props);
        // INITIALIZE STATE VARIABLES
        this.state = {
            courses: [], 
            grade: "", 
            credit: "", 
            totalGradePoints: 0, 
            totalCredits: 0, 
            cumulativeGPA: 0, 
        };

        // BIND METHODS TO THE COMPONENT INSTANCE
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculateGPA = this.calculateGPA.bind(this);
    }

    // HANDLE CHANGE EVENT FOR INPUT FIELDS
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    // HANDLE FORM SUBMISSION
    handleSubmit(event) {
        event.preventDefault(); // PREVENT DEFAULT FORM SUBMISSION BEHAVIOR
        const { name, grade, credit, courses } = this.state;
        const newCourse = { name, grade: parseInt(grade), credit: parseInt(credit) }; // CREATE NEW COURSE OBJECT

        // UPDATE STATE WITH NEW COURSE AND RESET INPUT FIELDS
        this.setState(
            {
                courses: [...courses, newCourse], // ADD NEW COURSE TO COURSES ARRAY
                name: "", // RESET COURSE NAME INPUT
                grade: "", // RESET GRADE INPUT
                credit: "", // RESET CREDIT INPUT
            },
            () => {
                this.calculateGPA(); // CALL CALCULATE GPA AFTER STATE UPDATE
            }
        );
    }

    // CALCULATE GPA BASED ON COURSES
    calculateGPA() {
        const { courses } = this.state;
        let totalGradePoints = 0;
        let totalCredits = 0;

        // LOOP THROUGH EACH COURSE TO CALCULATE TOTAL GRADE POINTS AND CREDITS
        courses.forEach(course => {
            if (course.credit > 0) { // ONLY INCLUDE COURSES WITH NON-ZERO CREDITS
                const gradePoints = course.grade * course.credit; // CALCULATE GRADE POINTS FOR COURSE
                totalGradePoints += gradePoints; // ADD TO TOTAL GRADE POINTS
                totalCredits += course.credit; // ADD TO TOTAL CREDITS
            }
        });

        // CALCULATE CUMULATIVE GPA
        const cumulativeGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;

        console.log("Calculating GPA:", totalGradePoints, totalCredits, cumulativeGPA);
        // UPDATE STATE WITH CALCULATED VALUES AND CALL PARENT COMPONENT'S onUpdate METHOD
        this.setState({ totalGradePoints, totalCredits, cumulativeGPA }, () => {
            this.props.onUpdate(totalGradePoints, totalCredits); // PASS TOTAL GRADE POINTS AND CREDITS TO PARENT COMPONENT
        });
    }

    render() {
        const { name, grade, credit, courses, cumulativeGPA } = this.state;

        return (
            <div>
                <h2>{this.props.title}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Course Name:
                            <input type="text" name="name" value={name} onChange={this.handleChange} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Grade:
                            <input type="number" name="grade" value={grade} onChange={this.handleChange} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Credit:
                            <input type="number" name="credit" value={credit} onChange={this.handleChange} required />
                        </label>
                    </div>
                    <button type="submit">Add Course</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Grade</th>
                            <th>Credit</th>
                            <th>Grade Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.name}</td>
                                <td>{course.grade}</td>
                                <td>{course.credit}</td>
                                <td>{course.grade * course.credit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <p>Cumulative GPA: {cumulativeGPA}</p>
                </div>
            </div>
        );
    }
}

export default GPAForm;