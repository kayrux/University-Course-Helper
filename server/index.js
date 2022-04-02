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

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT Course_name FROM COURSE"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})


app.listen(3001, () => {
    console.log("running");
});