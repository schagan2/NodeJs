
var foodObjects = [{
    name: "Bojangles",
    yearFounded: 1977,
    owner: "Jack Fulk"
},
{
    name: "Chick-fil-A",
    yearFounded: 1946,
    owner: "S. Truett Cathy"
},
{
    name: "Subway",
    yearFounded: 1965,
    owner: "Fred DeLuca, Peter Buck"
}];

function findFastFood(nameOfFastFood){
    var object = foodObjects.findIndex(element => element.name === nameOfFastFood);
    
    if(object == -1){
        return "Fast food name "+nameOfFastFood+" is not found.";
    }else{
        return foodObjects[object];
    }
}

function addFastFood(fastFoodObject){
    var found = foodObjects.find(element => element.name === fastFoodObject.name);
    if(!found){
        foodObjects.push(fastFoodObject);
        console.log("New fast food added\nName of the fast food: " +fastFoodObject.name +"\n"+ 
        "Year founded: " + fastFoodObject.yearFounded +"\n"+"Owner: " + fastFoodObject.owner);
    }else{
        console.log("Food object "+fastFoodObject.name+" already exists.");
    }
}

function removeFastFood(nameOfFastFood){
    var index = foodObjects.findIndex(element => element.name === nameOfFastFood);
    if(index == -1){
        console.log("Fast food "+nameOfFastFood+" is not found.");
    }else{
        console.log(foodObjects.splice(index, 1));
    }
}

function editFastFood(fastFoodObject){
    var index = foodObjects.findIndex(element => element.name === fastFoodObject.name);
    if(index == -1){
        console.log("Fast food "+fastFoodObject.name+" object not found.");
    }else{
        console.log("Old object: "+ JSON.stringify(foodObjects[index]));
        foodObjects[index] = fastFoodObject;
        console.log("Changed object: "+ JSON.stringify(foodObjects[index]));
    }
}

module.exports = {
    foodObjects,
    findFastFood,
    addFastFood,
    removeFastFood,
    editFastFood};