
// Used to store the username in a local variable to check if the user is logged in (athenticated)
class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb, loginInfo) {
        localStorage.setItem("user", loginInfo.username)
        cb()
    }

    logout(cb) {
        localStorage.clear()
        cb()
    }

    isAuthenticated() {
        
        if (localStorage.getItem("user") == null) {
            console.log("Not logged in")
            return false
        } else {
            console.log("Logged in")
            return true
        }
    }

}

export default new Auth()