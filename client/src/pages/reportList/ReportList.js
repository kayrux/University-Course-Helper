import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const ReportList = () => {

    //This is the list of reports to be displayed
    const [reportList, setReportList] = useState(["report 1", "report 2", "report 3", "report 4", "report 5"])

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