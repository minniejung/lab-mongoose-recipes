const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    createARecipe();
    insertRecipes();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// *************** Create **********************

function createARecipe() {
  Recipe.create({
    title: "Tiramisu",
    level: "Easy Peasy",
    ingredients: [
      "4 Eggs",
      "500g Mascarpone Cheese",
      "6 cups coffee",
      "400g Finger cookies",
      "Cocoa powder",
    ],
    cuisine: "Italian",
    dishType: "dessert",
    duration: 30,
    creator: "Someone",
  })
    .then((dbResult) => {
      console.log("** New recipe is created! :", dbResult.title);
    })
    .catch((error) => {
      console.log("Failed! :", error);
    });
}

// *************** Insert JSON **********************

const json = require("./data.json");
// console.log(json);

function insertRecipes() {
  Recipe.insertMany(json)
    .then(
      json.forEach((dbResult) => {
        console.log("** A New recipe is inserted! :", dbResult.title);
      })
    )
    .then(() => {
      updateARecipe();
      deleteARecipe();
    })
    .catch((error) => {
      console.log("Failed! :", error);
    });
}

// *************** Update **********************

function updateARecipe() {
  Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: 100 },
    { new: true }
  )
    .then((dbResult) => {
      console.log("** New data is updated !", dbResult);
    })
    .catch((error) => {
      console.log("Failed! :", error);
    });
}

// *************** Remove **********************

function deleteARecipe() {
  Recipe.findOneAndRemove({ title: "Carrot Cake" })
    .then((dbResult) => {
      console.log("** Selected data is deleted !", dbResult);
    })
    .then(() => {
      mongoose.disconnect(() => console.log("** DB is closed !"));
    })
    .catch((error) => {
      console.log("Failed! :", error);
    });
}
