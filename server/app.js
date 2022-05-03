// Déclaration des modules importants
const express = require("express");
const http = require("http")

// Déclaration des modules utiles
const app = express();
const path = require("path");
const compression = require("compression");
const dotenv = require("dotenv").config({path: "./.env"});
const bodyParser = require("body-parser");

// Configuration de notre session
const session = require('express-session')({
    secret: process.env.SESSION_KEY,
    name: process.env.SESSION_NAME,
    resave: true,
    saveUninitialized: true
});

// Configuration du serveur
app.use(express.static(path.join(__dirname, "..")));
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.set("title", process.env.SERVER_NAME)
app.set("port", process.env.SERVER_PORT);
app.set("env", process.env.SERVER_ENV)
app.set("view engine", "ejs");
if(app.get("env") === "production"){
    app.set("trust proxy", 1);
}

// Home page
app.get('/', (req, res) => {
    res.render(path.join(__dirname, "..", "views", "index"));
})

const auth = require("./controllers/authController");
app.use("/", auth);

// Lancement du serveur
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log("[INFO] Server " + app.get("title") + " started on port: " + app.get("port"));
    console.log("[INFO] Server environnement: " + app.get("env"));
    console.log("[INFO] Server view engine: " + app.get("view engine"));
})
