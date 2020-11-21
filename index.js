"use strict"
const express = require('express');
const app = express();
const port = 3000;

//Loads the handlebars module
const handlebars = require('express-handlebars');

//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

//Sets hbs configurations 
app.engine('hbs', handlebars({
layoutsDir: __dirname + '/views/layouts',
//new extention name for handlebars
extname: 'hbs',
//non c'è bisogno di specificare il layout, in caso il layout base sarà planB
defaultLayout: 'planC',
partialsDir: __dirname + '/views/partials/' /*__dirname = directory attuale */
}));

app.use(express.static('public'));

const fakeApi = () => {
    return [
        {
            name: 'Katarina',
            lane: 'midlaner'
        },
        {
            name: 'Jayce',
            lane: 'toplaner'
        },
        {
            name: 'Heimerdinger',
            lane: 'toplaner'
        },
        {
            name: 'Zed',
            lane: 'midlaner'
        },
        {
            name: 'Azir',
            lane: 'midlaner'
        }
    ];
};

app.get('/', (req, res) => {
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
res.render('main', {layout: 'index', suggestedChamps: fakeApi(), listExist: true});
});

app.listen(port, () => console.log(`App listening to port ${port}`));