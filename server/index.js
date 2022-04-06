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

// Original
db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

app.listen(3001, () => {
    console.log("running");
});

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT Course_name FROM COURSE"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})


// ------------------------------------ Admin Account ------------------------------------
app.post("/api/user/:account_id", (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const sqlInsert = "INSERT INTO ADMIN_ACCOUNT (username, password) VALUES (?,?)"
    db.query(sqlInsert, [username, password], (err, result) => {
        if (err) console.log(err)
    })
})

// ------------------------------------ Rating ------------------------------------

// Get ratings
app.get("/api/rating/:course_id", (req, res) => {
    const course_id = req.params.course_id

    const sqlSelect = "SELECT * FROM RATING WHERE RATING.course_id = course_id"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})

// Add rating
app.post("/api/rating/:course_id", (req, res) => {
    const rating_id = req.params.rating_id
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