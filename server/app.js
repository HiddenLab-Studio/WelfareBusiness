// Déclaration des modules importants
const express = require("express");
const http = require("http");
const mysql = require("mysql");

// Déclaration des modules utiles
const app = express();
const path = require("path");
const compression = require("compression");
const dotenv = require("dotenv").config({path: "./.env"});
const bodyParser = require("body-parser");
const flash = require("express-flash");

// Configuration de notre session
const session = require('express-session')({
    secret: process.env.SESSION_KEY,
    name: process.env.SESSION_NAME,
    resave: true,
    saveUninitialized: true
});

// Configuration de la base de données
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

// Configuration du serveur
app.use(express.static(path.join(__dirname, "..")));
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}))
app.use(session)
app.use(flash());
app.set("title", process.env.SERVER_NAME)
app.set("port", process.env.SERVER_PORT);
app.set("env", process.env.SERVER_ENV)
app.set("view engine", "ejs");
if(app.get("env") === "production"){
    app.set("trust proxy", 1);
}

// Variable globales
global.flash = flash;
global.pool = pool;

// Home page
app.get('/', (req, res) => {
    // Si l'utilisateur n'est pas connecté
    if(req.session.login){
        // On fait le rendu de notre page en enlevant le bouton de connexion
        res.render(path.join(__dirname, "..", "views", "index"), {
            session: true,
            username: req.session.username,
        });
    } else {
        // Si la session du joueur n'est pas défini on le met offline
        if(req.session.login === undefined) req.session.login = false;
        // Flash message pour afficher si une erreur est détecté pour le login ou le register
        const registerError = req.flash("registerError");
        const registerUsernameError = req.flash("registerUsernameError");
        const registerPasswordError = req.flash("registerPasswordError");
        const registerConfirmError = req.flash("registerConfirmError");
        const registerUsernameAlreadyUsed = req.flash("registerUsernameAlreadyUsed");
        const loginError = req.flash("loginError");
        const loginUsernameError = req.flash("loginUsernameError");
        const loginPasswordError = req.flash("loginPasswordError");
        // Rendu de la page avec le bouton pour se connecter
        res.render(path.join(__dirname, "..", "views", "index"), {
            session: false,
            login: {error: loginError[0], username: loginUsernameError[0], password: loginPasswordError[0]},
            register: {error: registerError[0], username: registerUsernameError[0], password: registerPasswordError[0], confirm: registerConfirmError[0], user: registerUsernameAlreadyUsed[0]},
        });

    }
})

// Controllers
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
