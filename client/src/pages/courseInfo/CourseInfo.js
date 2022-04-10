import EnterRating from "../../components/EnterRating"
import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import Axios from "axios"
import SemesterProf from '../../components/SemesterProf'
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const CourseInfo = ({onLogin}) => {

    // Read the URL for the course name
    const location = useLocation()
    const name = decodeURI(location.pathname.split("/")[2]);

    // Setup state hooks to store data gotten from api calls
    const [courseInfo, setCourseInfo] = useState([])
    const [semesterInfo, setSemesterInfo] = useState([])
    const [degreeRequiredInfo, setDegreeRequiredInfo] = useState([])
    const [degreeOptionalInfo, setDegreeOptionalInfo] = useState([])
    const [score, setScore] = useState("")
    const [comment, setComment] = useState("")
    const [getRatings, setGetRatings] = useState([])
    const [isEditingRating, setIsEditingRating] = useState("")

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

    // Handling submission of new comment
    const onSubmit = async (e) => {
        e.preventDefault()

        try{
            const rating = await Axios.post(`http://localhost:3001/api/rating/${name}`, {
                score,
                comment,
                rating_date: new Date().toISOString().slice(0, 10),
                //
                //THIS IS PLACEHOLDER NEED TO GET USERNAME IN HERE SOMEHOW BUT CANT FIGURE OUT HOW
                //
                username: null,
                course_name: 'Cpsc 331'
            })
        }
        catch(err) {
            console.log("ERROR HERE")

        }

        console.log("hello")
        console.log(comment)


        if(!score) {
            alert("Please enter a score")
            return
        }

        setScore("")
        setComment("")
    }

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

                        <div>
                            <form className="rating-form" onSubmit={onSubmit}>

                                <label>
                                Class Score: {' '}
                                <select value={score} onChange={(e) => {setScore(e.target.value)}}>            
                                    <option value = "1"> 1 </option>
                                    <option value = "2"> 2 </option>
                                    <option value = "3"> 3 </option>
                                    <option value = "4"> 4 </option>
                                    <option value = "5"> 5 </option>
                                </select>
                                </label>

                                <input 
                                    className="comment-input"
                                    type="text" 
                                    maxLength="255"
                                    placeholder="Additional Comments" 
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(e.target.value)}
                                />

                                <input type="submit" value="Add Rating" className="btn btn-block" />
                            </form>
                        </div>

                        <hr />

                        {getRatings.map((rating) => {
                            return(
                                <div>
                                    {isEditingRating === rating.Rating_id? ( <div> 
                                        <div>
                                            EDITING THIS RATING NOW
                                        </div>
                                    </div> ) : ( <div>                      
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

                                        <div>
                                        {/*THIS WRITTEN WITH BELIEF IS LOGGED IN WILL BE NULL IF NOT LOGGED IN AND WILL BE USERNAME IF LOGGED IN */}
                                        {onLogin ? <Button text="Edit" color="yellow" onClick={() => setIsEditingRating(rating.Rating_id)}></Button> : ''}
                                        {/* ^to replace above isLoggedIn with ^(rating.Username) === (isLoggedIn)*/}
                                        </div>
                                    </div>)}  
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


