const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
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

//Connecting to the DB
mongoose.connect('mongodb://localhost:27017/exerciseDB', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then((result) => app.listen(8084))
    .catch((err) => console.log(error));


app.use(methodOverride('_method'));

//Route for the index  page
app.get('/', (req, res) => {
    res.render('index', { name: 'Fast Food Inc!' })
});

//Route for the routes starting with /users
app.use('/users', userRoutes);

//Route for the routes starting with /restaurants
app.use('/restaurants', restaurantRoutes);

//Route for error page
app.use((req, res) => {
    res.status(404).render('error', { msg: 'Page cannot be found', name: "Fast Food Inc!" });
});