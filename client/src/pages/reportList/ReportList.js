import { useState, useEffect } from "react"
import Axios from "axios";
import ListDisplay from '../../components/ListDiplay';

const ReportList = () => {

    //This is the list of reports to be displayed
    const [reportList, setReportList] = useState([])

    //This is used to tell ListDisplay which page to render the list (one of /,/professors,/faculties,/reports)
    const type = "report"

    //Updates the list of courses
    useEffect(() => {
        const getReports = async () => {
            const reports = await Axios.get("http://localhost:3001/api/reportList")
            const data = await reports.data
            setReportList(data)
        }
        getReports()
    }, [])

    //Call Listdisplay to render the list
    return(
        <div className="list">
            <ListDisplay list = {reportList} type = {type} />
        </div>
    )
}

export default ReportList