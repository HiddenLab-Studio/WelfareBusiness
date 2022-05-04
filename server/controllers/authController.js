// Modules importants
const express = require("express");
const router = express.Router();

// Module utiles
const bcrypt = require("bcrypt"); // hash password
const path = require("path");

/**
 * Permet de "crypter" notre mot de passe
 *
 * @param {string} password
 * @returns {*}
 */
function generateHash(password) {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
}

/**
 * Permet de comparer un mdp entré et son homologue "crypté" récupérer à partir d'une base de donnée
 *
 * @param {string} password
 * @param {string} hashed
 * @returns {*}
 */
async function compareHash(password, hashed) {
    return await bcrypt.compareSync(password, hashed);
}

/**
 * Permet de check si un mot de passe rempli nos conditions fixées
 *
 * @param password
 * @returns {boolean}
 */
function isPasswordValid(password) {
    // Si notre passe fait moins de 6 caractère OU notre passe contient des espaces
    if (password.length < 2 || password.includes(" ")) {
        // DEBUG
        console.log("Invalid password: " + password);
        return false;
    }
    return true;
}

/**
 * Permet de check si pseudo rempli nos conditions fixées
 *
 * @param username
 * @returns {boolean}
 */
function isUsernameValid(username) {
    // Si notre pseudo
    if (username.length < 3 || username.includes(" ")) {
        // DEBUG
        console.log("Invalid username: " + username);
        return false;
    }
    return true;
}

// Dashboard de l'utilisateur
router.get("/profile", (req, res) => {
    // Si l'utilisateur est connecté
    if(req.session.login){
        // On fait le rendu de notre page en passant en paramètre les différentes informations du joueur
        res.render(path.join(__dirname, "..", "..", "views", "profile"), {
            username: req.session.username,
        });
    } else {
        // On le redirige sur la page home
        res.redirect("/")
    }
})

// POST méthode pour enregistrer un compte
router.post("/api/register", async (req, res) => {
    // On récupère les données de notre formulaire
    const username = req.body.username;
    const password = req.body.password;
    const confirm = req.body.passwordConfirm;

    // On hash i.e "crypte" notre mot de passe
    // Tant que l'exécution de la fonction generateHash n'est pas terminée on attend
    const passwordHashed = await generateHash(req.body.password);

    // Boolean qui vérifie si nos inputs correspondent avec nos conditions
    // Cette variable va nous permettre aussi d'optimiser nos actions sur notre base de données
    // on vient ainsi limiter l'utilisation des ressources serveur
    let isInputValid = true;

    // Nos deux mots de passes sont identiques
    if (!isUsernameValid(username)) {
        isInputValid = false;
        req.flash("registerUsernameError", true);
    }
    if (!isPasswordValid(password)) {
        isInputValid = false;
        req.flash("registerPasswordError", true);
    }
    if (password !== confirm) {
        isInputValid = false;
        req.flash("registerConfirmError", true);
    }

    if (isInputValid) {
        // On se connecte à notre base de données
        pool.getConnection((error, connection) => {
            if (error) throw error;
            // On sélectionne dans notre base de données l'utilisateur ayant un username qui correspond à celui saisi sur le form
            pool.query("SELECT Username FROM `users` WHERE username = ?", [username], (error, result) => {
                // On affiche si une erreur est détectée
                if(error) throw error;
                // Si notre requête SQL aboutie alors elle admet forcément un résultat
                // On check donc si un utilisateur n'est pas déjà enregistré avec ce pseudo
                console.log(result)
                // L'utilisateur existe déjà, on refresh la page pour afficher l'erreur
                if(result.length > 0){
                    // On coupe la connection à notre base de donnée
                    connection.release();
                    // Le pseudo est déjà utilisé on a donc une erreur qui va être traduite par une valeur false pour notre booléen
                    isInputValid = false;
                    // On update notre message flash qui sera affiché à l'utilisateur pour lui rendre compte de l'erreur
                    req.flash("registerError", true);
                    req.flash("registerUsernameAlreadyUsed", true)
                    // On "reload" la page avec les flash messages (attention c'est une redirection qui est utilisée comme un reload)
                    res.redirect("/");
                } else {
                    // Si on a survécu à nos différents tests ouffff...
                    if (isInputValid === true) {
                        // On va donc faire une dernière et ultime requête SQL afin de tout simplement ajouter notre utilisateur à notre base de donnée
                        pool.query("INSERT INTO users (username, password) VALUES(?, ?)", [username, passwordHashed], (error) => {
                            // On coupe la connection à notre base de donnée car on ne fais plus aucune requête
                            connection.release();
                            // On affiche si une erreur est détectée
                            if (error) throw error;
                            // On met à jour la session de l'utilisateur
                            req.session.login = true;
                            req.session.username = username;
                            // On redirige notre utilisateur connecté vers son dashboard
                            res.redirect("/profile");
                        });
                    }
                }
            })
        })
    } else {
        req.flash("registerError", true);
        res.redirect("/")
    }
})

router.post("/api/login", (req, res) => {
    // On récupère les données de notre formulaire
    const username = req.body.username;
    const password = req.body.password;

    // On lance une connexion à notre bdd
    pool.getConnection((error, connection) => {
        // On affiche l'erreur si le serveur n'arrive à se connecter à notre bdd
        if(error) throw error;
        // Requête SQL pour savoir si le pseudo et le mdp entré par l'utilisateur existe dans la bdd
        pool.query("SELECT Username as username, Password as password FROM users WHERE username = ?", [username], async (error, result) => {
            // On affiche l'erreur
            if (error) throw error;
            // On coupe la connexion à notre bdd
            connection.release();
            // Si un résultat est trouvé i.e. l'utilisateur existe
            if (result.length > 0) {
                // On créé une variable (boolean) qui va contenir le résultat de la fonction compareHash
                // qui va nous permettre de savoir si le mot de passe saisi est bien celui présent
                // dans notre base de donnée
                let compare = await compareHash(password, result[0].password);
                // Notre exécution de code s'arrête tant que compare na pas reçu le feu vert de la fonction compareHash
                // On check si les mots passes correspondent
                if(compare){
                    // L'utilisateur existe + le mot de passe est valide on peut donc le connecter à son profil
                    req.session.login = true;
                    req.session.username = username;
                    res.redirect("/profile");
                } else {
                    // On modifie notre flash message
                    // On update notre message flash qui sera affiché à l'utilisateur pour lui rendre compte de l'erreur
                    req.flash("loginError", true);
                    req.flash("loginPasswordError", true)
                    res.redirect("/");
                }
            } else {
                // L'utilisateur n'existe pas
                // On update notre message flash qui sera affiché à l'utilisateur pour lui rendre compte de l'erreur
                req.flash("loginError", true);
                req.flash("loginUsernameError", true)
                res.redirect("/");
            }
        })
    })
})

// Page pour se déconnecter (cette page n'existe pas réellement)
router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) return next(err);
            else res.redirect('/');
        });
    }
});

module.exports = router;