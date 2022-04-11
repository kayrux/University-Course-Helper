import { Link } from "react-router-dom";

//display a list of links
const ListDisplay = ({list,type}) => {

    //determine which page the list is being displayed on to determine where the link should lead
    if (type === "course"){
        //returns every course name in the given list and turns them into links to the corasponding course page
        //(note all other if statements below do the same, just with a different path)
        return (
            <div>
                {list.map((val) => {
                    return(
                        <h2>
                            <Link to={`/courses/${val.Course_name}`}>{val.Course_name}</Link>
                        </h2>
                    );
                })}
            </div>
        )
    }
    else if (type === "professor"){
        return (
            <div>
                {list.map((val) => {
                    return(
                        <h2>
                            <Link to={`/professors/${val.Prof_name}`}>{val.Prof_name}</Link>
                        </h2>
                    );
                })}
            </div>
        )
    }
    else if (type === "degree"){
        return (
            <div>
                {list.map((val) => {
                    return(
                        <h2>
                            <Link to={`/degrees/${val.Degree_name}`}>{val.Degree_name}</Link>
                        </h2>
                    );
                })}
            </div>
        )
    }
    else if (type === "report"){
        return (
            <div>
                {list.map((val) => {
                    return(
                        <h2>
                            <Link to={`/reports/${val.Report_id}`}>Report {val.Report_id}</Link>
                        </h2>
                    );
                })}
            </div>
        )
    }
}

export default ListDisplay