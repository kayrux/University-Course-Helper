import { useState, useEffect } from "react"
import Axios from "axios"

// onLogin is called when the user succesfully logs in
const LoginContainer = ({onLogin}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [dbPassword, setDbPassword] = useState("") // Password returned from database
    const [loginError, setLoginError] = useState(false) // Used for wrong username/password
    const [loggedIn, setLoggedIn] = useState(false); // Keeps track of whether the user is logged in

    const fetchPassword = async () => {
        
        const password1 = await Axios.get(`http://localhost:3001/api/password/${username}`)
        const data = await password1.data
        {data.map((pswrd) => {
            //console.log("Setting database password")
            setDbPassword(pswrd.Password)
        })}
    }


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
        
        fetchPassword()
        // console.log({username})
        // console.log({dbPassword})

        // Verify password
        if (dbPassword === password && dbPassword != "") {
            
            onLogin({username, password}) // To do
            
            setLoggedIn(true)
            setLoginError(false)
        } else {
            setLoggedIn(false)
            setLoginError(true)
        }
        setUsername("")
        setPassword("")
        setDbPassword("")
    }

    

    return (
        <>
            {loggedIn ? (
                <h2>Welcome</h2>
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
                    type="text" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) =>
                        setPassword(e.target.value)}
                />

                <input type="submit" value="Login" className="btn btn-block" />
            </form>)}
        </>
        )
}

export default LoginContainer