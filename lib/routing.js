const fileHandler = require("./fileHandler");
const path = require("path");

module.exports = function (app) {
    app.post("/api/notes", fileHandler.postJSON);

    app.delete("/api/notes/:id", fileHandler.deleteJSON);

    app.get("/api/notes", fileHandler.getJSON);

    app.get("/notes", function (request, response) {
        return response.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function (request, response) {
        return response.sendFile(path.join(__dirname, "../public/index.html"));
    });
}