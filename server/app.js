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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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
            avatar: req.session.avatar
        });
    } else {
        // Si la session du joueur n'est pas défini on le met offline
        if(req.session.login === undefined) req.session.login = false;
        // Rendu de la page avec le bouton pour se connecter
        res.render(path.join(__dirname, "..", "views", "index"), {
            session: false,
            loginFlash: {error: req.flash("loginError"), username: req.flash("loginUsernameError"), password: req.flash("loginPasswordError")},
            registerFlash: {error: req.flash("registerError"), username: req.flash("registerUsernameError"), usernameAlreadyRegistered: req.flash("registerUsernameAlreadyUsed"), password: req.flash("registerPasswordError"), confirm: req.flash("registerConfirmError")}
        });
    }
})

// Controllers
const auth = require("./controllers/authController");
const game = require("./controllers/gameController");
const test = require("./data/defaultDataSchem");
app.use("/", auth);
app.use("/", game);

// Page 404
app.use((req, res) => {
    res.status(404).render(path.join(__dirname, "..", "views", "errors", "404"), {
        username: req.session.username,
        session: req.session.login,
        avatar: req.session.avatar,
        loginFlash: {error: req.flash("loginError"), username: req.flash("loginUsernameError"), password: req.flash("loginPasswordError")},
        registerFlash: {error: req.flash("registerError"), username: req.flash("registerUsernameError"), usernameAlreadyRegistered: req.flash("registerUsernameAlreadyUsed"), password: req.flash("registerPasswordError"), confirm: req.flash("registerConfirmError")}
    });
})

// Lancement du serveur
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log("[INFO] Server " + app.get("title") + " started on port: " + app.get("port"));
    console.log("[INFO] Server environnement: " + app.get("env"));
    console.log("[INFO] Server view engine: " + app.get("view engine"));
    console.log("[INFO] Loading defaultDataSchema... done!");
    console.log("[INFO] Hooking into MySQL...");
    pool.getConnection((error, connection) => {
        if(error) throw error;
        connection.release();
        console.log("[INFO] Server is now connected to database");
    })
})