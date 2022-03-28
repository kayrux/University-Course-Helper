import { Link } from "react-router-dom";

const ListDisplay = ({list,type}) => {

    if (type === "course"){
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
    if (type === "professor"){
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
    if (type === "faculty"){
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
    if (type === "report"){
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