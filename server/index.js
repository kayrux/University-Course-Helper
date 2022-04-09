
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
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// ------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Course --------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

//NOTE: have not tested the chunk of code:
/*
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
*/

// 2.1 List of courses
// View a list of all courses
app.get("/api/courseList", (req, res) => {
    const sqlSelect = "SELECT Course_name FROM COURSE"
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// Tested: working
// 2.2 View specific course information
// View information about a specific(unique) course
app.get("/api/courseInfo/:Course_name", (req, res) => {
    const course_name = req.params.Course_name
    const sqlSelect = "SELECT * FROM COURSE as c WHERE c.Course_name = ?"
    db.query(sqlSelect, course_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

//Tested: working
//View information about what semesters the given course is offered in
app.get("/api/courseInfo/:Course_name/semester", (req, res) => {
    const course_name = req.params.Course_name
    const sqlSelect = (
        "SELECT s.Sem_start_year, s.Sem_start_term, s.Duration " + 
        "FROM SEMESTER AS s " + 
        "WHERE s.Course_name = ?" )
    db.query(sqlSelect, course_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

//View information about the professors that taught the given course in the given semester
app.get("/api/courseInfo/:Course_name/:Sem_start_year/:Sem_start_term/professor", (req, res) => {
    const course_name = req.params.Course_name
    const sem_start_year = req.params.Sem_start_year
    const sem_start_term = req.params.Sem_start_term
    const sqlSelect = (
        "SELECT o.Mode_of_delivery, o.Syllabus_link, p.Prof_name, p.Prof_rating " + 
        "FROM OFFERED_IN as o NATURAL JOIN PROFESSOR as p " + 
        "WHERE o.Course_name = ? and o.Sem_start_year = ? and o.Sem_start_term = ? and " +
        "o.Prof_name = p.Prof_name ")
    db.query(sqlSelect, [course_name, sem_start_year, sem_start_term], (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

//View which degrees the given course is required for
app.get("/api/courseInfo/:Course_name/degreeRequired", (req, res) => {
    const course_name = req.params.Course_name
    const sqlSelect = (
        "SELECT r.Degree_name " + 
        "FROM REQUIRED_FOR AS r " + 
        "WHERE r.Course_name = ?" )
    db.query(sqlSelect, course_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

//View which degrees the given course is optional for
app.get("/api/courseInfo/:Course_name/degreeOptional", (req, res) => {
    const course_name = req.params.Course_name
    const sqlSelect = (
        "SELECT o.Degree_name " + 
        "FROM OPTIONAL_FOR as o " + 
        "WHERE o.Course_name = ?" )
    db.query(sqlSelect, course_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// ---------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Professor --------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// Tested: working
// 3.1 List of professors
// View the list of all University of Calgary professors stored in the database
app.get("/api/profList", (req, res) => {
    const sqlSelect = "SELECT Prof_name FROM PROFESSOR"
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// Tested: working
// 3.2 View specific professor information
// View information about a specific (unique) professor that is stored in the database.
app.get("/api/profList/:prof_name", (req, res) => {
    const prof_name = req.params.prof_name
    const sqlSelect = "SELECT * FROM PROFESSOR AS p WHERE p.Prof_name = ?" 
    db.query(sqlSelect, prof_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// Tested: working
// 3.3 Specific professor courses
// View a list of current and previous courses taught by the professor being viewed.
app.get("/api/profList/:prof_name/courses", (req, res) => {
    const prof_name = req.params.prof_name
    const sqlSelect = (
        "SELECT c.Course_name, o.Sem_start_term, o.Sem_start_year " + 
        "FROM COURSE AS c NATURAL JOIN OFFERED_IN AS o NATURAL JOIN PROFESSOR AS p " + 
        "WHERE p.Prof_name = ?")
    db.query(sqlSelect, prof_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
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
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// View information about a specific faculty that is stored in the course database, including the majors and minors offered by them.
app.get("/api/facultyList/:faculty_id", (req, res) => {
    const faculty_id = req.params.faculty_id
    const sqlSelect = "SELECT * FROM FACULTY AS p WHERE p.Faculty_id = ?" 
    db.query(sqlSelect, faculty_id, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
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
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// ---------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Rating -----------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// Tested: working
// 5.1 Create rating 
// Allow users to create a publicly available rating/comment based on their experience of the course. 
app.post("/api/rating/:course_name", (req, res) => {
    const comment = req.body.comment
    const score = req.body.score
    const rating_date = req.body.rating_date
    const username = req.body.username
    const course_name = req.params.course_name

    const sqlInsert = "INSERT INTO RATING (Comment, Score, Rating_date, Username, Course_name) VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [comment, score, rating_date, username, course_name], (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
    });
});

// Tested: working
// 5.2 Edit Rating
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
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
    });
});


// Tested: working
// 5.3 Delete Rating
// The administrator account can delete ratings/comments made by users of the website. 
app.delete("/api/rating/:course_name/:rating_id", (req, res) => {
    const rating_id = req.params.rating_id
    const sqlDelete = "DELETE FROM RATING WHERE Rating_id = ?"
    db.query(sqlDelete, rating_id, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
    });
})

// ---------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Report -----------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// Tested (Database-v8): working
// 6.1 List of reports
// Administrator account can view a list of all reports made by users of the website.
app.get("/api/reportList", (req, res) => {
    const sqlSelect = "SELECT Report_id, Report_date FROM REPORT"
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// Tested (Database-v8): working
// 6.2 View specific report
// Administrator account can view information about a specific report that is stored in the database. 
app.get("/api/reportList/:report_id", (req, res) => {
    const report_id = req.params.report_id
    const sqlSelect = "SELECT * FROM REPORT WHERE Report_id=?"
    db.query(sqlSelect, report_id, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// Tested (Database-v8): working
// 6.3 Specific report rating
// View information for the specific rating the report pertains to
app.get("/api/reportList/:report_id/rating", (req, res) => {
    const report_id = req.params.report_id
    const sqlSelect = "SELECT rt.Rating_id, rt.Comment, rt.Score, rt.Rating_date, rt.Username, rt.Course_name " + 
        "FROM REPORT AS rp NATURAL JOIN RATING AS rt " + 
        "WHERE rp.Report_id=?"
    db.query(sqlSelect, report_id, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// Tested (Database-v8): working
// 6.4 Create report
// Users of the website can create a report for comments that they believe should be removed from the website.
app.post("/api/reportList", (req, res) => {
    const reason = req.body.reason
    const report_date = req.body.report_date
    const rating_id = req.body.rating_id
    
    const sqlInsert = "INSERT INTO REPORT (Reason, Report_date, Rating_id) VALUES (?,?,?)"
    db.query(sqlInsert, [reason, report_date, rating_id], (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
    });
});

// Tested (Database-v8): working
// 6.5 Delete report
// Administrator account has the ability to delete a report to reject it. 
app.delete("/api/reportList/:report_id", (req, res) => {
    const report_id = req.params.report_id
    const sqlDelete = "DELETE FROM REPORT WHERE Report_id = ?"
    db.query(sqlDelete, report_id, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
    });
})