import { useState } from "react"

const AddCommentContainer = () => {
    const [comment, setComment] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        if(!comment) {
            alert("Please enter a comment")
            return
        }

        setComment("")
    }

    return (
        <>
            <form className="comment-form" onSubmit={onSubmit}>
                <input 
                    className="comment-input"
                    type="text" 
                    placeholder="Comment" 
                    value={comment} 
                    onChange={(e) =>
                        setComment(e.target.value)}
                />

                <input type="submit" value="Add Comment" className="btn btn-block" />
            </form>
        </>
        )
}

export default AddCommentContainer