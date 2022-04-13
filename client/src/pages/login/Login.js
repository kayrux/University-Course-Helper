import { useState, useEffect } from "react"
import Axios from "axios"
import { Navigate } from "react-router-dom"

// onLogin is called when the user succesfully logs in
const Login = ({onLogin}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false) // Used for wrong username/password
    const [loggedIn, setLoggedIn] = useState(false); // Keeps track of whether the user is logged in

    // Authenticates username and password
    const onSubmit = async (e) => {
        e.preventDefault()
        
        if(!username) {
            alert("Please enter a username")
            return
        }

        if (!password) {
            alert("Please enter a password")
            return
        }

        // Fetch whether the password was accurate or not from database
        const check = await Axios.get(`http://localhost:3001/api/user/${username}/${password}`)
        const data = await check.data

        //recording if logged in
        if (data == true){
            onLogin({username}) //NOTE this used to be {username,password} is something breaks take a peek
            setLoggedIn(true)
            setLoginError(false)
        }
        else{
            setLoggedIn(false)
            setLoginError(true)
        }
        setUsername("")
        setPassword("")
    }

    return (
        <>
            {loggedIn ? (
                <Navigate to={"/"} />
            ) : (
            <form className="login-form" onSubmit={onSubmit}>
                <h1>Sign in</h1>
                
                {loginError && (<p className="err">Incorrect username or password</p>)}

                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) =>
                        setUsername(e.target.value)}
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) =>
                        setPassword(e.target.value)}
                />

                <input type="submit" value="Login" className="btn btn-block" />
            </form>)
        }
        </>
    )
}

export default Login