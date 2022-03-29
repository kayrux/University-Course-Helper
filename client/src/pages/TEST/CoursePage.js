import L from "../../Luigi_NSMBUDX.png"
import AddCommentContainer from "../courseInfo/AddCommentContainer"

//makes a luigi in all course pages (wahoo)
const CoursePage = () => {

    return(
        <div className="courseInfo-display">
            <h1>Course Information</h1>
            <h3>Course description</h3>
            <p1>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo 
                ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, 
                nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. 
                Nulla consequat massa quis enim.
            </p1>
            <h3>Professors</h3>
            <p1>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo 
                ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, 
                nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. 
                Nulla consequat massa quis enim.
            </p1>
            <h3>Department</h3>
            <p1>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo 
                ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, 
                nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. 
                Nulla consequat massa quis enim.
            </p1>
            <h3>Degree</h3>
            <p1>
                Lorem ipsum dolor sit amet
            </p1>
            
            <h3>Comments</h3>
            <p1>
                Insert Comment component here
            </p1>
            <AddCommentContainer />
        </div>
    )
}

export default CoursePage