// importing dependancies
const express = require("express");
const setupRouting = require("./lib/routing");

// setting up server for heroku
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

setupRouting(app);

app.listen(PORT, function () {
    console.log("Listening on PORT : " + PORT);
});