
class Auth {

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
        //return this.authenticated
    }

}

export default new Auth()