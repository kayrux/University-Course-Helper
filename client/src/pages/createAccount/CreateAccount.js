import { useState } from "react"
import Axios from "axios"

const CreateAccount = () => {
    const [Password, setPassword] = useState("")
    const [Username, setUsername] = useState("")
    const [success, setSuccess] = useState(false)

    // When user submits username and password make sure they exist
    const onSubmit = (e) => {
        e.preventDefault()

        if(!Username) {
            alert("Please enter a username")
            return
        }

        if (!Password) {
            alert("Please enter a password")
            return
        }

        // Attempt to create account using inputted username and password
        try {
            Axios.post(`http://localhost:3001/api/user/`, {
                username : Username,
                password : Password
            })
            setSuccess(true)
        } catch (err) {
            console.log(err)
            setSuccess(false)
        }
        
        // Clear input fields
        setUsername("")
        setPassword("")
    }

    return (
        // Form to retrieve inputed username and password from user
        <div className="accountAlign">
            <form className="account" onSubmit={onSubmit}>
                <br></br>
                <div className="accountHeadingSimulation">
                    Create Account
                </div>
                <div className="accountTextSmall">
                    Being able to freely create an admin account is for demo purposes
                </div>
                <br></br>
                {success && <p className="accountText"> Account created</p>}
                <input
                    className = "accountInput"
                    type="text"
                    placeholder="Username"
                    value={Username}
                    onChange={(e) =>
                        setUsername(e.target.value)}
                />
                <input
                    className = "accountInput"
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={(e) =>
                        setPassword(e.target.value)}
                />
                <div className="accountButtonAlign">
                    <input type="submit" value="Create" className="accountButton" />
                </div>
            </form>
        </div>
    )
}

export default CreateAccount