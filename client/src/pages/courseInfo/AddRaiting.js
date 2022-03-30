import { useState } from "react"

const AddCommentContainer = () => {
    const [raiting, setRaiting] = useState("")
    const [comment, setComment] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        if(!raiting) {
            alert("Please enter a comment")
            return
        }

        setRaiting("")
        setComment("")
    }

    return (
        <>
            <form className="raiting-form" onSubmit={onSubmit}>

                <input 
                    className="raiting-input"
                    type="int" 
                    placeholder="Raiting" 
                    value={raiting} 
                    onChange={(e) =>
                        setRaiting(e.target.value)}
                />

                <input 
                    className="comment-input"
                    type="text" 
                    placeholder="Comment" 
                    value={comment} 
                    onChange={(e) =>
                        setComment(e.target.value)}
                />

                <input type="submit" value="Add Raiting" className="btn btn-block" />
            </form>
        </>
        )
}

export default AddCommentContainer