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
                            <Link to={`/${val}`}>{val}</Link>
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
                            <Link to={`/professors/${val}`}>{val}</Link>
                        </h2>
                    );
                })}
            </div>
        )
    }
    else if (type === "faculty"){
        return (
            <div>
                {list.map((val) => {
                    return(
                        <h2>
                            <Link to={`/faculties/${val}`}>{val}</Link>
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
                            <Link to={`/reports/${val}`}>{val}</Link>
                        </h2>
                    );
                })}
            </div>
        )
    }
}

export default ListDisplay