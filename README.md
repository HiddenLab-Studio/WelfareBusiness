# WelfareBusiness

## Comment redéployer le projet ?

1. **Cloner** le projet
2. **Créer** une base de données
   
   ```
    Name: welfare_business
    Table: users
    Columns:
      id          (Auto-increment)
      Username    (VARCHAR, 255)
      Password    (VARCHAR, 255)
      AvatarIcon  (INT, 11, valeur par défaut = 0)
      userData    (JSON)
   ```

4. **Créer** un fichier **.env** à la racine du projet

   ```
    SERVER_HOST = localhost
    SERVER_PORT = 4000
    SERVER_ENV = production

    SESSION_NAME = session.sid
    SESSION_KEY = STRING

    DATABASE_NAME = welfare_business
    DATABASE_HOST = localhost
    DATABASE_USER = root
    DATABASE_PASSWORD =
    DATABASE_PORT = 3306
    DATABASE_CONNECTION_LIMIT = 100
   ```

4. **Exécuter** la commande suivante
 
   ```
   npm install
   ```

5. (FACULTATIF) **Configurer** le **File Watcher** pour le SCSS (Pour la modification du scss)
6. **Lancer** le serveur avec la commande suivante (en ayant votre base de donnée MySQL de lancée).
 
   ```
   nodemon app
   ```
   ou 
   ```
   node server\app.js
   ```
   
## Libs

[Animate.css](https://animate.style/)

[Hover.css](https://ianlunn.github.io/Hover/)

[Aos](https://michalsnik.github.io/aos/)

[BoxIcons](https://boxicons.com/)
