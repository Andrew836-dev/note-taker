const fs = require("fs");
const path = require("path");

const myJson = path.join(__dirname,"../db/db.json");

function readJSON() {
  return new Promise(function (resolve, reject) {
    fs.readFile(myJson, "utf8", function (err, data) {
      if (err) {
        return reject(err);
      }

      resolve(JSON.parse(data));
    });
  });
}
function saveJSON(data) {
 return new Promise(function (resolve, reject) {
   fs.writeFile(myJson, JSON.stringify(data), "utf8", function (error, data) {
     if (error) return reject(error);
     else return resolve(data);
   });
 });
}
const fileHandler = {
  getJSON: function (request, response) {
    readJSON().then(parsedData => response.json(parsedData));
  },
  postJSON: function (request, response) {
    readJSON().then(parsedData => {
      request.body.id = Date.now();
      parsedData.push(request.body);
      saveJSON(parsedData).then(() => response.json(parsedData));
    }).catch(error => console.log(error.message));
  },
  deleteJSON: function (request, response) {
    let indexToDelete = -1;
    readJSON().then(notes => {
      // console.log("Deleting note Id: " + request.params.id);
      notes.forEach((note, index) => {
        if (note.id == request.params.id) {
          indexToDelete = index;
          // console.log("found", request.params.id);
        }
      });
      if (indexToDelete >= 0) {
        notes.splice(indexToDelete, 1);
        // console.log("deleted", request.params.id);
        saveJSON(notes).then(response.send(""));
      }
      else throw Error("No matching id found for " + request.params.id);
    }).catch(error => response.send("Could not delete: " + error.message));
  }
}

module.exports = fileHandler;