import { useState, useEffect } from "react"
import Axios from "axios"
import { Link } from "react-router-dom";

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
            {semesterProfInfo.map((semProf) => {
                return(
                    <div>
                        <br>
                        </br>
                        <div>
                        -Prof: {semProf.Prof_name}
                        </div>
                        -Rating: {' '}
                        {!!(semProf.Prof_rating)? semProf.Prof_rating : 'Not rated'}
                        <div>
                        -Syllabus: {' '}
                        {!!(semProf.Syllabus_link)? <Link to={semProf.Syllabus_link} target="_blank"> BROKEN I DONNO WHY THE STUFF ON FRONT ISNT COMING OFF</Link> : 'Not provided'}
                        </div>
                        <div>
                        -Mode of delivery: {' '}
                        {!!(semProf.Mode_of_delivery)? semProf.Mode_of_delivery : 'Not listed'}
                        </div>
                    </div>
                );
            })}
        </div>
    )

}  

export default SemesterProf