import React from "react";

class SemOneCalc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            name: "",
            grade: "",
            credit: "",
            totalGradePoints: 0,
            totalCredits: 0,
            cumulativeGPA: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, grade, credit, courses } = this.state;
        const newCourse = { name, grade: parseInt(grade), credit: parseInt(credit) };

        this.setState(
            {
                courses: [...courses, newCourse],
                name: "",
                grade: "",
                credit: "",
            },
            this.calculateGPA
        );
    }

    calculateGPA() {
        const { courses } = this.state;
        let totalGradePoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            if (course.credit > 0) {
                const gradePoints = course.grade * course.credit;
                totalGradePoints += gradePoints;
                totalCredits += course.credit;
            }
        });

        const cumulativeGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;

        this.setState({ totalGradePoints, totalCredits, cumulativeGPA });
    }

    render() {
        const { name, grade, credit, courses, totalGradePoints, totalCredits, cumulativeGPA } = this.state;

        return (
            <div>
                <h1>Semester One GPA Calculation</h1>
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
                    <p>Total Grade Points: {totalGradePoints}</p>
                    <p>Total Credits: {totalCredits}</p>
                    <p>Cumulative GPA: {cumulativeGPA}</p>
                </div>
            </div>
        );
    }
}

export default SemOneCalc;