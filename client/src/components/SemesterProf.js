import { useState, useEffect } from "react"
import Axios from "axios"

const SemesterProf = ({name, startYear, startTerm}) => {

    const [semesterProfInfo, setSemesterProfInfo] = useState([])

    useEffect(() => {
            const getSemesterProf = async () => {
                const courses = await Axios.get(`http://localhost:3001/api/courseInfo/${name}/${startYear}/${startTerm}/professor`)
                const data = await courses.data
                setSemesterProfInfo(data)
            }
            getSemesterProf()
    }, [])

    return(
        <div>
            {semesterProfInfo.map((val) => {
                return(
                    <div>
                        {val.Prof_name}
                    </div>
                );
            })}
        </div>
    )

}  

export default SemesterProf