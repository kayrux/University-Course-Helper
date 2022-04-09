import AddRaitingContainer from "../../components/AddRatingContainer"
import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import Axios from "axios"
import SemesterProf from '../../components/SemesterProf'
import { Link } from "react-router-dom";

const CourseInfo = () => {

    // Read the URL for the course name
    const location = useLocation()
    const name = decodeURI(location.pathname.split("/")[2]);

    // Setup state hooks to store data gotten from api calls
    const [courseInfo, setCourseInfo] = useState([])
    const [semesterInfo, setSemesterInfo] = useState([])
    const [degreeRequiredInfo, setDegreeRequiredInfo] = useState([])
    const [degreeOptionalInfo, setDegreeOptionalInfo] = useState([])
    const [getRatings, setGetRatings] = useState([])

    // Call apis (for more info on what each does look at client > index.js)
    useEffect(() => {
        const getCourses = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/courseInfo/${name}`)
            const data = await courses.data
            setCourseInfo(data)
        }
        getCourses()
    }, [])

    useEffect(() => {
        const getSemester = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/courseInfo/${name}/semester`)
            const data = await courses.data
            setSemesterInfo(data)
        }
        getSemester()
    }, [])

    useEffect(() => {
        const getDegreeRequired = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/courseInfo/${name}/degreeRequired`)
            const data = await courses.data
            setDegreeRequiredInfo(data)
        }
        getDegreeRequired()
    }, [])

    useEffect(() => {
        const getDegreeOptional = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/courseInfo/${name}/degreeOptional`)
            const data = await courses.data
            setDegreeOptionalInfo(data)
        }
        getDegreeOptional()
    }, [])

    useEffect(() => {
        const getRatings = async () => {
            const ratings = await Axios.get(`http://localhost:3001/api/rating/${name}`)
            const data = await ratings.data
            setGetRatings(data)
        }
        getRatings()
    }, [])

    // Print out course info
    return(
        <div>
            {courseInfo.map((course) => {
                return(
                    <div>
                        <h1>
                            {course.Course_name}
                        </h1>
                        <div>
                            {course.Course_description}
                        </div>
                        <br>
                        </br>
                        <div>
                            - Hours: {course.Hours}
                        </div>
                        <div>
                            - Prerequisites: {' '}
                            {!!(course.Prerequisites)? course.Prerequisites : 'No prerequisites listed'}
                        </div>
                        <div>
                            - Antirequisites: {' '}
                            {!!(course.Antirequisites)? course.Antirequisites : 'No antirequisites listed'}
                        </div>

                        <hr />

                        <h2>
                            Offered in
                        </h2>
                        {semesterInfo.map((sem) => {
                            return(
                                <div>
                                    <h3>
                                        {sem.Sem_start_year} {' '}
                                        {sem.Sem_start_term}
                                    </h3>
                                    <div>
                                        Duration: {sem.Duration} months
                                    </div>
                                    {/* semesterProf returns information on a specific semester and prof*/}
                                    {<SemesterProf name = {course.Course_name} startYear = {sem.Sem_start_year} startTerm = {sem.Sem_start_term} />}
                                </div>
                            );
                        })}

                        <hr />

                        <h2>
                            Degrees relevant to
                        </h2>
                        <h3>
                            Required for:
                        </h3>
                        {degreeRequiredInfo.map((required) => {
                            return(
                                <div>
                                    <Link to={`/degrees/${required.Degree_name}`}>{required.Degree_name}</Link>
                                </div>
                            );
                        })}
                        <h3>
                            Optional for:
                        </h3>
                        {degreeOptionalInfo.map((optional) => {
                            return(
                                <div>
                                    <Link to={`/degrees/${optional.Degree_name}`}>{optional.Degree_name}</Link>
                                </div>
                            );
                        })}

                        <hr />

                        <div> Make pretend that there is a rating input thing here </div>

                        <hr />

                        {getRatings.map((rating) => {
                            return(
                                <div>
                                    <div>
                                        Posted: {' '}
                                        {rating.Rating_date.slice(0, 10)}
                                        {!!(rating.Username)? ` By admin ${rating.Username}` : ''}     
                                    </div>
                                    <div>
                                        {rating.Score}
                                        /5
                                    </div>
                                    <div>
                                        {rating.Comment}
                                    </div>
                                    <br>
                                    </br>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )    
}

export default CourseInfo


