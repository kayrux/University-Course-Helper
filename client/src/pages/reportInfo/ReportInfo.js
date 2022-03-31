import Button from "../../components/Button"

const ReportInfo = () => {

    const deleteReport = (reportInfo) => {
        console.log("Deleting report") // Assume login successful
    }

    return (
        <div className="display-container">
            <h1>Report Information</h1>
            <h3>User Account Number:</h3>
            <p>23483718</p>
            <h3>Report Type:</h3>
            <p1>Racism</p1>
            <h3>Reason for Report:</h3>
            <p1>The comment is racist</p1>
            <hr />
            <h1>Rating Information:</h1>
            <h3>Course Name and Number:</h3>
            <p1>
                CPSC 313
            </p1>
            <h3>Score:</h3>
            <p1>
                2.5/5
            </p1>
            <h3>Comment:</h3>
            <p1>
                Insert comment here
            </p1>
            <h3>Date: </h3>
            <p1>30/03/2022</p1>
            <button onClick={deleteReport}
            className="btn-delete">
                Delete
            </button>
        </div>
    )
}

export default ReportInfo