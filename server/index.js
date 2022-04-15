
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require("mysql")


// Connecting to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'university_course_helper',
})

app.use(cors())
app.use(express.json()) // For parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // For parsing application/x-www-form-urlencoded

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


// Setting up for bycrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 1.1 Create account
// Allow users to create a account
app.post("/api/user", (req, res) => {
    encryptCreate(req, res)
});

// Creating seperate function to use await for bycrypt
async function encryptCreate(req, res){
    const username = req.body.username
    const password = req.body.password

    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    const sqlInsert = "INSERT INTO ADMIN_ACCOUNT (Username, Password) VALUES (?,?)"
    db.query(sqlInsert, [username, encryptedPassword], (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
}

// 1.2 Edit Account 
// User has the ability to edit/update account information.
app.put("/api/user/:username", (req, res) => {
    encryptEdit(req, res)
});

// Creating seperate function to use await for bycrypt
async function encryptEdit(req, res){
    const currentUsername = req.params.username
    const newUsername = req.body.newUsername
    const newPassword = req.body.newPassword

    const encryptedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    // Deal with case of user entering same username they already had
    if(newUsername != currentUsername){
        const sqlInsert = "UPDATE ADMIN_ACCOUNT AS a SET a.Password=?, a.Username=? WHERE a.Username=?"
        db.query(sqlInsert, [encryptedNewPassword, newUsername, currentUsername], (err, result) => {
            if (err) {
                console.log(err)
                res.sendStatus(null,err)
            }
            res.send(result)
        })
    }
    //deal with case of user entering new username
    else{
        const sqlInsert = "UPDATE ADMIN_ACCOUNT AS a SET a.Password=? WHERE a.Username=?"
        db.query(sqlInsert, [encryptedNewPassword, currentUsername], (err, result) => {
            if (err) {
                console.log(err)
                res.sendStatus(null,err)
            }
            res.send(result)
        })
    }
}

// 1.3 Verifity Account
// Find whether the passoword entered is correct for the corasponding username
app.get("/api/user/:username/:password", (req, res) => {
    const username = req.params.username
    const password = req.params.password
    const sqlSelect = "SELECT a.Password FROM ADMIN_ACCOUNT AS a WHERE a.Username = ?"
    db.query(sqlSelect, [username], async function (err, result) { //creating seperate function to use await for bycrypt
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }

        // Username is not in database, resulting in no password being retrived so check is false
        let hasPassword = true
        try{
            result[0].password == null
        }
        catch{
            hasPassword = false
            res.send(false)
        }

        // If username was in databse check if corasponding password matches
        if(hasPassword == true){
            const Check = await bcrypt.compare(password, result[0].Password)
            res.send(Check)
        }
    });
})

// ------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Course --------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

// 2.1 List Courses
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

// 2.2 View Course Info
// View information for a specific course
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

// 2.3 View Course -> Semester Info
// View information about the semester where the given course was offered
app.get("/api/courseInfo/:Course_name/semester", (req, res) => {
    const course_name = req.params.Course_name
    const sqlSelect = (
        "SELECT s.Sem_start_year, s.Sem_start_term, s.Duration " + 
        "FROM SEMESTER AS s " +
        "WHERE s.Course_name = ? " +
        "ORDER BY s.Sem_start_year DESC, s.Ordering DESC")
    db.query(sqlSelect, course_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// 2.4 View Course -> Semester -> Prof Info
// View information about the professors that taught the given course in the given semester
app.get("/api/courseInfo/:Course_name/:Sem_start_year/:Sem_start_term/professor", (req, res) => {
    const course_name = req.params.Course_name
    const sem_start_year = req.params.Sem_start_year
    const sem_start_term = req.params.Sem_start_term
    const sqlSelect = (
        "SELECT o.Mode_of_delivery, o.Syllabus_link, p.Prof_name, p.Prof_rating, p.Rate_my_professor_link " + 
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

// 2.5 View Course -> Required For
// View which degrees the given course is required for
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

// 2.6 View Course -> Optional For
// View which degrees the given course is optional for
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

// 3.1 List of Professors
// View a list of all professors
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

// 3.2 View specific professor information
// View information for a specific professor
app.get("/api/profInfo/:prof_name", (req, res) => {
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

// 3.3 View Professor -> Courses
// View which courses were taught by a specific professor
app.get("/api/profInfo/:prof_name/courses", (req, res) => {
    const prof_name = req.params.prof_name
    const sqlSelect = (
        "SELECT DISTINCT o.Course_name " + 
        "FROM OFFERED_IN AS o NATURAL JOIN PROFESSOR AS p " + 
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
// -------------------------------------------------- Degrees --------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// 4.1 List Degrees Major
// View a list of all major degrees
app.get("/api/degreeList/major", (req, res) => {
    const sqlSelect = "SELECT d.Degree_name FROM DEGREE as d WHERE d.flag = 1"
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// 4.2 List Degrees Minor
// View a list of all minor degrees
app.get("/api/degreeList/minor", (req, res) => {
    const sqlSelect = "SELECT d.Degree_name FROM DEGREE as d WHERE d.flag = 2"
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// 4.3 List Degrees Other
// View a list of all other degrees
app.get("/api/degreeList/other", (req, res) => {
    const sqlSelect = "SELECT d.Degree_name FROM DEGREE as d WHERE d.flag = 3"
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// 4.4 View Specific Degree Information
// View information for a specific degree
app.get("/api/degreeInfo/:degree_name", (req, res) => {
    const degree_name = req.params.degree_name
    const sqlSelect = "SELECT * FROM DEGREE AS d WHERE d.Degree_name = ?" 
    db.query(sqlSelect, degree_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// 4.5 View Degree -> Required Courses
// View required courses for a specific degree
app.get("/api/degreeInfo/:degree_name/coursesRequired", (req, res) => {
    const degree_name = req.params.degree_name
    const sqlSelect = (
        "SELECT r.Course_name " +
        "FROM REQUIRED_FOR AS r NATURAL JOIN DEGREE as d " +
        "WHERE d.Degree_name = ?" )
    db.query(sqlSelect, degree_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// 4.6 View Degree -> Optional Courses
// View optional courses for a specific degree
app.get("/api/degreeInfo/:degree_name/coursesOptional", (req, res) => {
    const degree_name = req.params.degree_name
    const sqlSelect = (
        "SELECT o.Course_name " +
        "FROM OPTIONAL_FOR AS o NATURAL JOIN DEGREE as d " +
        "WHERE d.Degree_name = ?" )
    db.query(sqlSelect, degree_name, (err, result) => {
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

// 5.1 View Course -> Ratings
// View a list of ratings for a specific course
app.get("/api/rating/:course_name", (req, res) => {
    const course_name = req.params.course_name
    const sqlSelect = (
        "SELECT r.Rating_id, r.Comment, r.Score, r.Rating_date, r.Username " +
        "FROM RATING as r " +
        "WHERE r.Course_name = ?" )
    db.query(sqlSelect, course_name, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// 5.2 Create Rating 
// Create a rating
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
        res.send(result)
    });
});

// 5.3 Edit Rating
// Edit/modify a accounts own ratings
app.put("/api/rating/:rating_id", (req, res) => {
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
        res.send(result)
    });
});


// 5.4 Delete Rating
// Delete a rating 
app.delete("/api/rating/:rating_id", (req, res) => {
    const rating_id = req.params.rating_id
    const sqlDelete = "DELETE FROM RATING WHERE Rating_id = ?"
    db.query(sqlDelete, rating_id, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})

// ---------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Report -----------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// 4.1 List Reports
// View a list of all reports
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

// 6.2 View Specific Report
// View information about a specific report
app.get("/api/reportInfo/:report_id", (req, res) => {
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

// 6.3 View Report -> Rating
// View information for the specific rating the report pertains to
app.get("/api/reportInfo/:report_id/rating", (req, res) => {
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

// 6.4 Create Report
// Create a report for inappropriate comments
app.post("/api/reportInfo", (req, res) => {
    const reason = req.body.reason
    const report_date = req.body.report_date
    const rating_id = req.body.rating_id
    
    const sqlInsert = "INSERT INTO REPORT (Reason, Report_date, Rating_id) VALUES (?,?,?)"
    db.query(sqlInsert, [reason, report_date, rating_id], (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
});

// 6.5 Delete report
// Delete a report
app.delete("/api/reportInfo/:report_id", (req, res) => {
    const report_id = req.params.report_id
    const sqlDelete = "DELETE FROM REPORT WHERE Report_id = ?"
    db.query(sqlDelete, report_id, (err, result) => {
        if(err){
            console.log("error:", err)
            res.sendStatus(null, err)
        }
        res.send(result)
    });
})