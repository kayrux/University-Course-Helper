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

//API endpoint find list of all courses
app.get("/api/get/courseList", (req, res) => {
    const sqlSelect = "SELECT c.Course_id, c.Course_name FROM COURSE as c"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})

//API endpoint find information on a specific course
app.get(`/api/get/courseInfo/:Course_id`, (req, res) => {
    const name = req.params.Course_id
    db.query(
        'SELECT * FROM COURSE as c WHERE c.Course_id = ?',
        [name],
        (err, result) => {
            res.send(result)
        });
})

app.listen(3001, () => {
    console.log("running");
});