var object = require('./fastFood.js');

console.log(object.findFastFood("Subway"));
console.log(object.foodObjects);

console.log(object.findFastFood("Walmart"));
console.log(object.foodObjects);

object.addFastFood({name: "Walmart", yearFounded: 1962, owner: "Sam Walton"});
console.log(object.foodObjects);

object.addFastFood({name: "Subway", yearFounded: 1965, owner: "Fred DeLuca, Peter Buck"});
console.log(object.foodObjects);

object.removeFastFood("Bojangles");
console.log(object.foodObjects);

object.removeFastFood("Walmart");
console.log(object.foodObjects);

object.editFastFood({name: "Chick-fil-A", yearFounded: 1946, owner: "Truett Cathy"});
console.log(object.foodObjects);

object.editFastFood({name: "Walmart", yearFounded: 1946, owner: "Truett Cathy"});
console.log(object.foodObjects);