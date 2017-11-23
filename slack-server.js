// Set up Express server
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let ejs = require("ejs");

app.set("port", process.env.PORT || 8050);
app.set("view engine", "html");
app.set("views", "src");
app.engine("html", ejs.renderFile);

let staticFolder = ".";
app.use(express.static(staticFolder));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let server = app.listen(app.get("port"), () => {
  console.log(
    "Express server running on http://localhost:" + server.address().port
  );
});

app.post("/api/slack", (req, res) => {
  console.log(req);
  res.send({
    messageStatus: "SENT"
  });
});
