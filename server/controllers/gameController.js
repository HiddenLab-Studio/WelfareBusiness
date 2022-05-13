const express = require("express");
const router = express.Router();
const path = require("path");
const defaultDataSchema = require("../data/defaultDataSchem");

router.get("/play", (req, res) => {
    res.render(path.join(__dirname, "..", "..", "views", "play"), {
        session: req.session.login,
        username: req.session.username,
        avatar: req.session.avatar,
        loginFlash: {error: req.flash("loginError"), username: req.flash("loginUsernameError"), password: req.flash("loginPasswordError")},
        registerFlash: {error: req.flash("registerError"), username: req.flash("registerUsernameError"), usernameAlreadyRegistered: req.flash("registerUsernameAlreadyUsed"), password: req.flash("registerPasswordError"), confirm: req.flash("registerConfirmError")}
    });
})

router.get("/api/userdata", (req, res) => {
    // Si l'utilisateur est connecté à son compte
    if(req.session.login){
        console.log("[INFO] Request complete for user " + req.session.username)
        // Je viens créer une connexion à ma bdd pour récupérer les données du joueur
        pool.getConnection((error, connection) => {
            if(error) throw error;
            pool.query("SELECT userData FROM users WHERE username = ?", [req.session.username], (error, result) => {
                if(error) throw error;
                connection.release();
                //console.log(result[0])
                if(result.length > 0){
                    res.send(result[0].userData)
                }
            })
        })
    } else {
        console.log("[INFO] Request complete for user (guess)")
        res.send(defaultDataSchema)
    }
})

router.post("/api/savedata", (req, res) => {
    let data = req.body
    //console.log(data)
    if(req.session.login){
        console.log("[INFO] Request complete for user " + req.session.username)
        // Je viens créer une connexion à ma bdd pour récupérer les données du joueur
        pool.getConnection((error, connection) => {
            if(error) throw error;
            pool.query("UPDATE users SET userData = ? WHERE username = ?", [JSON.stringify(data), req.session.username], (error, result) => {
                if(error) throw error;
                connection.release();
                res.send({text: "Data successfully saved!"});
            })
        })
    } else {
        //console.log(data);
        req.session.guessData = data;
        res.send({text: "Please create an account to save your data!"})
    }
})


module.exports = router;