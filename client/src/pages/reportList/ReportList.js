import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const ReportList = () => {

    const [reportList, setReportList] = useState(["report 1", "report 2", "report 3", "report 4", "report 5"])

    const type = "report"

    return(
        <div>
            <ListDisplay list = {reportList} type = {type} />
        </div>
    )
}

export default ReportList