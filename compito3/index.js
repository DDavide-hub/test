"use strict"
const express = require("express")
const app = new express()
const fs = require("fs")
const port = 8000

app.use("/static", express.static(`${__dirname}/public`))

app.get("/", (req, res) => {
    const index = fs.readFileSync(`${__dirname}/public/html/index.html`, "utf-8")
    res.send(index)
})

app.listen(port, () => console.log(`server listening on port ${port}`)) 