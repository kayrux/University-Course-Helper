//WAS ORIGINALLY IN PAGES/COURSEINFO BUT MOVED TO COMPONENTS FOR ORGINISATION

import { useState } from "react"

const AddCommentContainer = ({account_id, course_id}) => {
    const [rating, setRating] = useState("")
    const [comment, setComment] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        if(!rating) {
            alert("Please enter a rating")
            return
        }

        if(!comment) {
            alert("Please enter a comment")
            return
        }

        setRating("")
        setComment("")
    }

    return (
        <>
            <form className="rating-form" onSubmit={onSubmit}>

                <input 
                    className="rating-input"
                    type="int" 
                    placeholder="Rating" 
                    value={rating} 
                    onChange={(e) =>
                        setRating(e.target.value)}
                />

                <input 
                    className="comment-input"
                    type="text" 
                    placeholder="Comment" 
                    value={comment} 
                    onChange={(e) =>
                        setComment(e.target.value)}
                />

                <input type="submit" value="Add Rating" className="btn btn-block" />
            </form>
        </>
        )
}

export default AddCommentContainer