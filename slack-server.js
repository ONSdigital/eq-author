// Set up Express server
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let ejs = require("ejs");

const url = process.env.SLACK_WEBHOOK_URL;
const IncomingWebhook = require("@slack/client").IncomingWebhook;

const webhook = new IncomingWebhook(url);

app.set("port", process.env.PORT || 8050);
app.set("view engine", "html");
app.set("views", "src");
app.engine("html", ejs.renderFile);

let staticFolder = ".";
app.use(express.static(staticFolder));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
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
  console.log(req.body);

  webhook.send(req.body.attachments[0].text, function(
    slackError,
    slackResponse
  ) {
    if (slackError) {
      console.log("Error:", slackError);
    } else {
      console.log("Message sent: ", slackResponse);
    }
    res.send("finished");
  });
});
