const express = require("express");
const fastFood = require("./model/fastFood.js");
const mongoose = require("mongoose");

var fastFoodArray = fastFood.foodObjects;

//Creating express object
const app = express();

//Listening to the server at port 8084
app.listen(8084);

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

//Initial page which renders index.ejs
app.get("/", (req, res) => {
    res.render("index", {fastFoodArray});
});

//code which renders restaurant.ejs
app.get("/restaurant/:name", (req, res) => {
    var restaurantName = req.params.name;
    var restaurant = fastFood.findFastFood(restaurantName);
    if(restaurant == -1){
        res.status(404).render("error", {error: "No matching restaurant can be found"});
    }else{
        res.render("restaurant", {restaurant});
    }
});

//Code which directs to error page.
app.use((req, res) => {
    res.status(404).render("error", {error: "Page cannot be found on the server"});
});