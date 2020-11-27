"use strict"
const express = require("express");
const app = express();
const port = 3000;

//Loads the handlebars module
const handlebars = require("express-handlebars");

//Sets our app to use the handlebars engine
app.set("view engine", "hbs");

//Sets hbs configurations 
app.engine("hbs", handlebars({
    layoutsDir: __dirname + "/views/layouts",
    //new extention name for handlebars
    extname: "hbs",
    //non c'è bisogno di specificare il layout, in caso il layout base sarà planB
    defaultLayout: "index",
    partialsDir: __dirname + "/views/partials/" /*__dirname = directory attuale */
}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    const query = req.query;
    const nome = query.nome;
    const cognome = query.cognome;
    const anni = query.anni;
    res.render("main", {layout: "index", nome, cognome, anni, query});
});

app.get("/page1", (req, res) => {
    const headers = req.headers;
    const connection = headers.connection;
    console.log(connection);
    res.render("main", {connection, headers});
});

app.listen(port, () => console.log(`App listening to port ${port}`));