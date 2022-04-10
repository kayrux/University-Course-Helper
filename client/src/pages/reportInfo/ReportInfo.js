import Button from "../../components/Button"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Axios from "axios"

const ReportInfo = () => {

    // Read the URL for the course name
    const location = useLocation()
    const pathname = decodeURI(location.pathname.split("/")[2]);

    const [reportReason, setReportReason] = useState([])
    const [reportDate, setReportDate] = useState([])
    const [ratingId, setRatingId] = useState([])
    const [reportInfo, setReportInfo] = useState([])
    const [ratingInfo, setRatingInfo] = useState([])

    // Fetch the report information from the database
    useEffect(() => {
        const fetchReportInfo = async () => {
            const reports = await Axios.get(`http://localhost:3001/api/reportList/${pathname}`)
            const data = await reports.data
            setReportInfo(data)
            setRatingId(data.Rating_id)
        }
        fetchReportInfo()
    }, [])

    // Fetch the rating information from the database
    useEffect(() => {
        const fetchRatingInfo = async () => {
            const rating = await Axios.get(`http://localhost:3001/api/reportList/${pathname}/rating`)
            const data = await rating.data
            setRatingInfo(data)
        }
        fetchRatingInfo()
    }, [])

    const deleteReport = (reportInfo) => {
        console.log("Deleting report") // Assume login successful
    }

    return (
        
        <div className="display-container">
            {/* Display report info */}
            {reportInfo.map((report) => {
            return(
                <div>
                    <h1>Report Information</h1>
                    <h3>Report Reason</h3>
                    <p1>{report.Reason}</p1>
                    <h3>Date</h3>
                    <p>{report.Report_date}</p>
                    <button onClick={deleteReport}
                    className="btn-delete">
                        Reject Report
                    </button>
                    <hr />
                    {/* Display rating info */}
                    {ratingInfo.map((rating) => {
                        return (
                            <>
                                <h1>Rating Reported</h1>
                                <h3>Course Name and Number</h3>
                                <p>{rating.Course_name}</p>
                                <h3>Score</h3>
                                <p>{rating.Score}/5</p>
                                <h3>Comment</h3>
                                <p>{rating.Comment}</p>
                                <h3>Date</h3>
                                <p>{rating.Rating_date}</p>
                                <button onClick={deleteReport}
                                className="btn-delete">
                                    Delete Comment
                                </button>
                            </>
                        )
                    })}
                    
                </div>
                );
            })}
        </div>
    )
}

export default ReportInfo