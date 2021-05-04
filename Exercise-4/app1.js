const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for request
app.listen(3000);

//get method - 2parameters [first is the url, req and res object]
app.get('/about', (req, res) => {
    //res.send('<p>Home page</p>');
    //To send html pages(Problem with sendFile method is first parameter should be absolute, it
    //cannot check for relative path and second parameter is the object which specifies the root directory.)
    res.sendFile('./views/restaurant.html', { root: __dirname});
});

//Re-direct
app.get('/about-us', (req,res) => {
    res.redirect('/about');
});

//404 error
//use method checks for every single url req. Should be bottom of the page.
app.use((req, res) => {
    res.sendFile('/views/error.html', {root: __dirname});
});