const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("./model/Restaurant.js");

mongoose.connect('mongodb://localhost:27017/exerciseDB', 
{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then((result) => app.listen(8084))
    .catch((err) => console.log(error));


//Creating express object
const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}));

//Initial page which renders index.ejs
app.get("/", (req, res, next) => {
     Restaurant.find()
    .then((restaurants) => res.render("index", {restaurants}))
    .catch((err) => {console.log(err); next();});
});

app.post("/", (req,res, next) => {
    var restaurant = new Restaurant(req.body);
    restaurant.save()
    .then(res.redirect("/"))
    .catch((err) => {console.log(); next();});
});

app.get("/restaurant/create", (req,res) => {
    res.render("create", {title: "Create restaurant"});
});

//code which renders restaurant.ejs
app.get("/restaurant/:id", (req, res, next) => {
    var restaurantId = req.params.id;
    Restaurant.findById(restaurantId)
    .then((restaurant) => res.render("restaurant", {restaurant}))
    .catch((err) => {console.log(err), 
        res.status(404).render("error", {error: "No matching restaurant can be found"}), next()});
});

//Code which directs to error page.
app.use((req, res) => {
    res.status(404).render("error", {error: "Page cannot be found on the server"});
});