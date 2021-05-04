//Importing the requiring modules
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const runRoutes = require('./routes/runRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//Create a session
app.use(session({
    secret: 'NBDA',
    resave: false,
    saveUninitialized: false
}));

//Saving the user name as res.locals.user
app.use((req,res,next) => {
    res.locals.user = req.session.user || null;
    next();
});

//connecting to mongo db
mongoose.connect('mongodb://localhost:27017/assignDB',
{   useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then((result) => app.listen(8084))
.catch((err) => console.log(err));

//Using method override
app.use(methodOverride('_method'));

//Route for the index page
app.get('/', (req, res) => {
    res.render("index");
});

//Routes following /users goes to userRoutes
app.use('/users', userRoutes);

//Routes following /runs goes to runRoutes
app.use('/runs', runRoutes);

//Route for about page
app.get('/about', (req, res) => {
    res.render("about");
});

//Route for contact page
app.get('/contact', (req, res) => {
    res.render("contact");
});

//Route for error page
app.use((req, res) => {
    res.status(404).render("error", {error: "Page cannot be found on the server"});
});