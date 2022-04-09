import React from 'react'
import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import Axios from "axios"
import { Link } from "react-router-dom";

const ProfInfo = () => {

    // Read the URL for the course name
    const location = useLocation()
    const name = decodeURI(location.pathname.split("/")[2]);

    // Setup state hooks to store data gotten from api calls
    const [profInfo, setProfInfo] = useState([])
    const [courseInfo, setCourseInfo] = useState([])

    // Call apis (for more info on what each does look at client > index.js)
    useEffect(() => {
        const getProfessors = async () => {
            const professors = await Axios.get(`http://localhost:3001/api/profInfo/${name}`)
            const data = await professors.data
            setProfInfo(data)
        }
        getProfessors()
    }, [])

    useEffect(() => {
        const getCourses = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/profInfo/${name}/courses`)
            const data = await courses.data
            setCourseInfo(data)
        }
        getCourses()
    }, [])

    // Print out course info
    return (
        <div>
            {profInfo.map((prof) => {
                return(
                    <div>
                        <h1>
                            {prof.Prof_name}
                        </h1> 
                        <div>
                            -Rating (rate my professor): {' '}
                            {!!(prof.Prof_rating)? prof.Prof_rating : 'Not rated'}
                        </div>
                        <div>
                            {!!(prof.Rate_my_professor_link)? <a target="_blank" href={prof.Rate_my_professor_link} > Rate my professor</a> : ''}
                        </div>
                        <h2>
                            Has offered
                        </h2>
                        {courseInfo.map((course) => {
                            return(
                                <div>
                                    <Link to={`/courses/${course.Course_name}`}>{course.Course_name}</Link>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>   
    )
}

export default ProfInfo