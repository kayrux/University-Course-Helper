import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const ReportList = () => {

    //This is the list of reports to be displayed
    const [reportList, setReportList] = useState(["Report 1", "Report 2", "Report 3", "Report 4", "Report 5"])

    //This is used to tell ListDisplay which page to render the list (one of /,/professors,/faculties,/reports)
    const type = "report"

    //Call Listdisplay to render the list
    return(
        <div>
            <ListDisplay list = {reportList} type = {type} />
        </div>
    )
}

export default ReportList