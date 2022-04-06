// Copy pasted from CRUD tutorial
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require("mysql")


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'university_course_helper',

})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//original
db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

app.listen(3001, () => {
    console.log("running");
});

// -------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Admin Account --------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

// CHANGE TO PUT
app.post("/api/user/:account_id", (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const sqlInsert = "INSERT INTO ADMIN_ACCOUNT (username, password) VALUES (?,?)"
    db.query(sqlInsert, [username, password], (err, result) => {
        if (err) console.log(err)
    })
})

// Find the password and account_id relating to the username.
// Maybe change to /api/password
app.get("/api/username", (req, res) => {
    console.log(req.body.username)
    const username = req.body.username

    const sqlSelect = "SELECT * FROM ADMIN_ACCOUNT AS a WHERE a.Username = ?"
    db.query(sqlSelect, username, (err, result) => {
        res.send(result)
    });
})

// ------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Course --------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT Course_name FROM COURSE"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})

//API endpoint find information on a specific course
app.get("/api/get/courseInfo/:Course_id", (req, res) => {
    const name = req.params.Course_id
    const sqlSelect = "SELECT * FROM COURSE as c WHERE c.Course_id = ?"
    db.query(sqlSelect, name, (err, result) => {
        res.send(result)
    });
})


//TO DO: View basic information for the professors who teach, or taught, the course.
app.get("/api/get/courseInfo/:Course_id/professors", (req, res) => {
    const name = req.params.Course_id
    const sqlSelect = (
        "SELECT Professor_name " + 
        "FROM OFFERED_IN AS o NATURAL JOIN PROFESSOR AS p " + 
        "WHERE c.Course_id = ?")
    db.query(sqlSelect, name, (err, result) => {
        res.send(result)
    });
})

// ---------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Professor --------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// View the list of all University of Calgary professors stored in the database
app.get("/api/profList", (req, res) => {
    const sqlSelect = "SELECT * FROM PROFESSOR"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})

// View information about a specific (unique) professor that is stored in the database.
app.get("/api/profList/:prof_id", (req, res) => {
    const prof_id = req.params.prof_id
    const sqlSelect = "SELECT * FROM PROFESSOR AS p WHERE p.Prof_id = ?" 
    db.query(sqlSelect, prof_id, (err, result) => {
        res.send(result)
    });
})

// View a list of current and previous courses taught by the professor being viewed.
app.get("/api/profList/:prof_id/courses", (req, res) => {
    const prof_id = req.params.prof_id
    const sqlSelect = (
        "SELECT c.Course_name, o.Sem_start_term, o.Sem_start_year " + 
        "FROM COURSE AS c NATURAL JOIN OFFERED_IN AS o NATURAL JOIN PROFESSOR AS p " + 
        "WHERE p.Prof_id = ?")
    db.query(sqlSelect, prof_id, (err, result) => {
        res.send(result)
    });
})

// ---------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Faculties --------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// View the list of all University of Calgary faculties stored in the database. 
app.get("/api/facultyList", (req, res) => {
    const sqlSelect = "SELECT * FROM FACULTY"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})

// View information about a specific faculty that is stored in the course database, including the majors and minors offered by them.
app.get("/api/facultyList/:faculty_id", (req, res) => {
    const faculty_id = req.params.faculty_id
    const sqlSelect = "SELECT * FROM FACULTY AS p WHERE p.Faculty_id = ?" 
    db.query(sqlSelect, faculty_id, (err, result) => {
        res.send(result)
    });
})

// NOT REALLY SURE WHAT TO DO HERE
// View a list of courses offered by the faculty being viewed. 
app.get("/api/facultyList/:faculty_id/courses", (req, res) => {
    const faculty_id = req.params.faculty_id
    const sqlSelect = (
        "SELECT DISTINCT c.Course_name" + 
        "FROM COURSE AS c NATURAL JOIN OFFERED_IN AS o NATURAL JOIN PROFESSOR AS p " + 
        "WHERE p.Prof_id = ?")
    db.query(sqlSelect, faculty_id, (err, result) => {
        res.send(result)
    });
})

// ---------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Rating --------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// MAYBE REMOVE THIS (Redundant?)
// Get ratings
app.get("/api/rating/:course_id", (req, res) => {
    const course_id = req.params.course_id

    const sqlSelect = "SELECT * FROM RATING WHERE RATING.course_id = course_id"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})

// NEED TO FIX
// Allow users to create a publicly available rating/comment based on their experience of the course. 
app.post("/api/rating/:course_id", (req, res) => {
    //const rating_id = req.params.rating_id

    const comment = req.body.comment
    const score = req.body.score
    const rating_date = req.body.rating_date
    const account_id = req.body.account_no
    const course_id = req.params.course_id

    const sqlInsert = "INSERT INTO RATING (rating_id, comment, score, rating_date, account_id, course_id) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [rating_id, comment, score, rating_date, account_id, course_id], (err, result) => {
        if (err) console.log(err);
    });
});

// The administrator account can delete ratings/comments made by users of the website. 
app.delete("/api/rating/:course_id/:rating_id", (req, res) => {
    const rating_id = req.params.rating_id
    const sqlDelete = "DELETE FROM RATING WHERE Rating_id = ?"
    db.query(sqlDelete, rating_id, (err, result) => {
        if (err) console.log(err);
    });
})