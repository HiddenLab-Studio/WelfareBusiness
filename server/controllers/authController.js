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

// POST méthode pour enregistrer un compte
router.post('/api/register', (req, res) => {
    // On récupère les données de notre formulaire
    const username = req.body.username;
    const password = req.body.password;
    console.log("post received: %s %s", username, password);
})

module.exports = router;