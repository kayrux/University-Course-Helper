
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
app.use(express.json()) // For parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // For parsing application/x-www-form-urlencoded

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

// Tested: working
// CHANGED FUNCTIONALITY: now only updates the password
// Update user password
app.put("/api/user", (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const sqlInsert = "UPDATE ADMIN_ACCOUNT AS a SET a.Password=? WHERE a.Username=?"
    db.query(sqlInsert, [password, username], (err, result) => {
        if (err) console.log(err)
    })
})

// Tested: working
// Find the password and account_id relating to the username.
// Changed from /api/username to /api/password
app.get("/api/password", (req, res) => {
    const username = req.body.username

    const sqlSelect = "SELECT a.Password FROM ADMIN_ACCOUNT AS a WHERE a.Username = ?"
    db.query(sqlSelect, username, (err, result) => {
        res.send(result)
    });
})

// ------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Course --------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

// Tested: working
//  View a list of all University of Calgary courses
app.get("/api/courseList", (req, res) => {
    const sqlSelect = "SELECT Course_name FROM COURSE"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})

// Tested: working
// View information about a specific(unique) course
app.get("/api/courseList/:course_name", (req, res) => {
    const course_name = req.params.course_name
    const sqlSelect = "SELECT * FROM COURSE as c WHERE c.Course_name = ?"
    db.query(sqlSelect, course_name, (err, result) => {
        res.send(result)
    });
})

// Tested: working
// View basic information for the professors who teach, or taught, the course.
app.get("/api/course/:course_name/professors", (req, res) => {
    const course_name = req.params.course_name
    const sqlSelect = (
        "SELECT p.Prof_name, p.Prof_rating, p.Rate_my_professor_link " + 
        "FROM OFFERED_IN AS o NATURAL JOIN PROFESSOR AS p " + 
        "WHERE o.Course_name = ?")
    db.query(sqlSelect, course_name, (err, result) => {
        res.send(result)
    });
})

// ---------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Professor --------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// Tested: working
// View the list of all University of Calgary professors stored in the database
app.get("/api/profList", (req, res) => {
    const sqlSelect = "SELECT Prof_name FROM PROFESSOR"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})

// Tested: working
// View information about a specific (unique) professor that is stored in the database.
app.get("/api/profList/:prof_name", (req, res) => {
    const prof_name = req.params.prof_name
    const sqlSelect = "SELECT * FROM PROFESSOR AS p WHERE p.Prof_name = ?" 
    db.query(sqlSelect, prof_name, (err, result) => {
        res.send(result)
    });
})

// Tested: working
// View a list of current and previous courses taught by the professor being viewed.
app.get("/api/profList/:prof_name/courses", (req, res) => {
    const prof_name = req.params.prof_name
    const sqlSelect = (
        "SELECT c.Course_name, o.Sem_start_term, o.Sem_start_year " + 
        "FROM COURSE AS c NATURAL JOIN OFFERED_IN AS o NATURAL JOIN PROFESSOR AS p " + 
        "WHERE p.Prof_name = ?")
    db.query(sqlSelect, prof_name, (err, result) => {
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

// Tested: working
// Allow users to create a publicly available rating/comment based on their experience of the course. 
app.post("/api/rating/:course_name", (req, res) => {
    const comment = req.body.comment
    const score = req.body.score
    const rating_date = req.body.rating_date
    const username = req.body.username
    const course_name = req.params.course_name

    const sqlInsert = "INSERT INTO RATING (Comment, Score, Rating_date, Username, Course_name) VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [comment, score, rating_date, username, course_name], (err, result) => {
        if (err) console.log(err);
    });
});

// Tested: working
// Edit Rating
// The administrator account can edit/modify ratings made by users of the website. 
app.put("/api/rating/:course_name/:rating_id", (req, res) => {
    const course_name = req.params.course_name
    const rating_id = req.params.rating_id

    const username = req.body.username
    const comment = req.body.comment
    const score = req.body.score
    const rating_date = req.body.rating_date

    const sqlInsert = 
        ("UPDATE RATING AS r " + 
        "SET r.Comment=?, r.Score=?, r.Rating_date=? " + 
        "WHERE r.Rating_id=? AND r.Username=?")

    db.query(sqlInsert, [comment, score, rating_date, rating_id, username], (err, result) => {
        if (err) console.log(err);
    });
});


// Tested: working
// The administrator account can delete ratings/comments made by users of the website. 
app.delete("/api/rating/:course_name/:rating_id", (req, res) => {
    const rating_id = req.params.rating_id
    const sqlDelete = "DELETE FROM RATING WHERE Rating_id = ?"
    db.query(sqlDelete, rating_id, (err, result) => {
        if (err) console.log(err);
    });
})