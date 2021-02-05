const express = require("express")
const app = new express() 
const bodyParser = require("body-parser")
const PORT = 8080
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:') //o directory file

app.use(bodyParser.json())

db.serialize(() => {
    db.run("CREATE TABLE users (username VARCHAR(255), password VARCHAR(255));")
    var stmt = db.prepare("INSERT INTO users VALUES (?, ?)")
    for (var i = 0; i < 10; i++) {
        stmt.run(`User${i}`, `User${i}`); //esegue stmt
    }
    stmt.finalize(); //conclude stmt 
})

//db.close();
app.post("/login", (req, res) => {
    const body = req.body
    const pwd = body.password
    const user = body.username
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [user, pwd], (err, row) => {
        if (row) {
            console.log(`You are welcome, ${user}`)
            res.status(200).json({ ok: true})
        } else { 
            res.status(401).json({ ok: false})
        }
    })
})

app.listen(PORT, console.log(`server on port ${PORT}`))