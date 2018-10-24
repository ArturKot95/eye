let express = require("express");
let path = require("path");

let app = express();

app.use(express.static(path.join(__dirname, "app")));

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "app", "index.html"));
});

let server = app.listen(3000, function () {
  console.log("Server listening at 3000");
});