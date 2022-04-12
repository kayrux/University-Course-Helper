//import Button from "../../components/Button"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import Axios from "axios"

const ReportInfo = () => {

    // Read the URL for the course name
    const location = useLocation()
    const pathname = decodeURI(location.pathname.split("/")[2]);

    const [reportInfo, setReportInfo] = useState([])
    const [ratingInfo, setRatingInfo] = useState([])

    // Fetch the report information from the database
    useEffect(() => {
        const fetchReportInfo = async () => {
            const reports = await Axios.get(`http://localhost:3001/api/reportInfo/${pathname}`)
            const data = await reports.data
            setReportInfo(data)
        }
        fetchReportInfo()
    }, [pathname])

    // Fetch the rating information from the database
    useEffect(() => {
        const fetchRatingInfo = async () => {
            const rating = await Axios.get(`http://localhost:3001/api/reportInfo/${pathname}/rating`)
            const data = await rating.data
            setRatingInfo(data)
        }
        fetchRatingInfo()
    }, [pathname])

    // Delete Report
    const deleteReport = async (id) => {
        await Axios.delete(`http://localhost:3001/api/reportInfo/${id}`)
    }

    // Delete Comment
    const deleteRating = async (id) => {
        await Axios.delete(`http://localhost:3001/api/rating/${id}`)
    }

    return (
        
        <div className="display-container">
            {/* Display report info */}
            {reportInfo.map((report) => {
            return(
                <div key={report.Report_id} value={report}>
                    <h1>Report Information</h1>
                    <h3>Report Reason</h3>
                    <p>{report.Reason}</p>
                    <h3>Date</h3>
                    <p>{report.Report_date.slice(0, 10)}</p>
                    <Link to="/reports">
                        <button onClick={() => deleteReport(report.Report_id)}
                            className="btn-delete">
                            Reject Report
                        </button>
                    </Link>
                    <hr />
                    {/* Display rating info */}  
                    {ratingInfo.length > 0 ? (
                        <>{ratingInfo.map((rating) => {
                            return (
                                <div key={rating.Rating_id} value={rating}>
                                    <h1>Rating Reported</h1>
                                    <h3>Course Name and Number</h3>
                                    <p>{rating.Course_name}</p>
                                    <h3>Score</h3>
                                    <p>{rating.Score}/5</p>
                                    <h3>Comment</h3>
                                    <p>{rating.Comment}</p>
                                    <h3>Date</h3>
                                    <p>{rating.Rating_date.slice(0, 10)}</p>
                                    <Link to="/reports">
                                        <button onClick={() => deleteRating(rating.Rating_id)}
                                            className="btn-delete">
                                            Accept Report
                                        </button>
                                    </Link>
                                </div>
                            )
                        })}</>
                    ) : <p>Comment Removed</p>}
                    
                    
                </div>
                );
            })}
        </div>
    )
}

export default ReportInfo