const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
  genDaySecretQR();
});

const dbConfig = {
  host: "localhost",
  user: "c0dev2942",
  password: "Kg!Xs*OtfiU-i",
  database: "c0suiviheberg",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : " + err.stack);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors());
app.use(bodyParser.json());

app.post("/insertDomaine", async (req, res) => {
  const {
    nom,
    prix_annuel,
    client,
    date_creation,
    date_expiration,
    nom_hote,
    nom_utilisateur,
    mot_de_passe,
    vps_id,
    parent,
  } = req.body;

  const query =
    "INSERT INTO domaines (nom, prix_annuel, client, date_creation, date_expiration, nom_hote, nom_utilisateur, mot_de_passe, vps_id, parent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      nom,
      prix_annuel,
      client,
      date_creation,
      date_expiration,
      nom_hote,
      nom_utilisateur,
      mot_de_passe,
      vps_id,
      parent,
    ],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion : " + err.stack);
        res.status(500).json({ error: "Erreur lors de l'insertion" });
        return;
      }

      res.status(201).json({ message: "insertion réussie" });
    }
  );
});

app.post("/insertVps", async (req, res) => {
  const {
    nom_vps,
    prix_annuel,
    date_creation,
    date_expiration,
    nom_hote,
    nom_utilisateur,
    mot_de_passe,
    adresse_ip,
  } = req.body;

  const query =
    "INSERT INTO vps (nom_vps, prix_annuel, date_creation, date_expiration, nom_hote, nom_utilisateur, mot_de_passe, adresse_ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      nom_vps,
      prix_annuel,
      date_creation,
      date_expiration,
      nom_hote,
      nom_utilisateur,
      mot_de_passe,
      adresse_ip,
    ],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion : " + err.stack);
        res.status(500).json({ error: "Erreur lors de l'insertion" });
        return;
      }

      res.status(201).json({ message: "insertion réussie" });
    }
  );
});
app.post("/insertHist", async (req, res) => {
  const { motif, email, domaine, date } = req.body;

  const query =
    "INSERT INTO historique (motif, email, domaine, date) VALUES (?, ?, ?, ?)";
  connection.query(query, [motif, email, domaine, date], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion : " + err.stack);
      res.status(500).json({ error: "Erreur lors de l'insertion" });
      return;
    }

    res.status(201).json({ message: "insertion réussie" });
  });
});
app.post("/insertBase", async (req, res) => {
  const { nom, nom_hote, nom_utilisateur, mot_de_passe, lien, domaine_id } =
    req.body;

  const query =
    "INSERT INTO bases (nom, nom_hote, nom_utilisateur, mot_de_passe, lien, domaine_id) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [nom, nom_hote, nom_utilisateur, mot_de_passe, lien, domaine_id],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion : " + err.stack);
        res.status(500).json({ error: "Erreur lors de l'insertion" });
        return;
      }

      res.status(201).json({ message: "insertion réussie" });
    }
  );
});
app.post("/updateNote", async (req, res) => {
  const { id, title, content } = req.body;

  const query = "UPDATE note SET title=?, content=? WHERE id=?";
  connection.query(query, [title, content, id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la modification : " + err.stack);
      res.status(500).json({ error: "Erreur lors de la modification" });
      return;
    }
    res.status(201).json({ message: "Modification réussie" });
  });
});

app.post("/updateDomaineDate", async (req, res) => {
  const { id_domaine, date_expiration } = req.body;

  const query = "UPDATE domaines SET  date_expiration=? WHERE id_domaine=? ";
  connection.query(query, [date_expiration, id_domaine], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion : " + err.stack);
      res.status(500).json({ error: "Erreur lors de la modification" });
      return;
    }

    res.status(200).json({ message: "Mise à jour réussie" });
  });
});

app.post("/updateDomaine", async (req, res) => {
  const {
    id_domaine,
    nom,
    prix_annuel,
    client,
    date_creation,
    date_expiration,
    nom_hote,
    nom_utilisateur,
    mot_de_passe,
    vps_id,
    parent,
  } = req.body;

  const query =
    "UPDATE domaines SET nom=?, prix_annuel=?, client=?, date_creation=?, date_expiration=?, nom_hote=?, nom_utilisateur=?, mot_de_passe=?, vps_id=?, parent=?  WHERE id_domaine=? ";
  connection.query(
    query,
    [
      nom,
      prix_annuel,
      client,
      date_creation,
      date_expiration,
      nom_hote,
      nom_utilisateur,
      mot_de_passe,
      vps_id,
      parent,
      id_domaine,
    ],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la modification : " + err.stack);
        res.status(500).json({ error: "Erreur lors de la modification" });
        return;
      }
      res.status(201).json({ message: "Modification réussie" });
    }
  );
});
app.post("/deleteNote", async (req, res) => {
  const { id } = req.body;

  const query = "DELETE FROM note WHERE id=?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la suppression : " + err.stack);
      res.status(500).json({ error: "Erreur lors de la suppression" });
      return;
    }
    res.status(201).json({ message: "Suppression réussie" });
  });
});
app.post("/deleteBase", async (req, res) => {
  const { id } = req.body;

  const query = "DELETE FROM bases WHERE id=?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la suppression : " + err.stack);
      res.status(500).json({ error: "Erreur lors de la suppression" });
      return;
    }
    res.status(201).json({ message: "Suppression réussie" });
  });
});
app.post("/deleteDomaine", async (req, res) => {
  const { id_domaine } = req.body;

  const query = "DELETE FROM domaines WHERE id_domaine=?";
  connection.query(query, [id_domaine], (err, results) => {
    if (err) {
      console.error("Erreur lors de la suppression : " + err.stack);
      res.status(500).json({ error: "Erreur lors de la suppression" });
      return;
    }
    res.status(201).json({ message: "Suppression réussie" });
  });
});
app.post("/updateBase", async (req, res) => {
  const { nom, nom_hote, nom_utilisateur, mot_de_passe, lien, domaine_id, id } =
    req.body;

  const query =
    "UPDATE bases SET nom=?, nom_hote=?, nom_utilisateur=?, mot_de_passe=?, lien=?, domaine_id=? WHERE id=?";
  connection.query(
    query,
    [nom, nom_hote, nom_utilisateur, mot_de_passe, lien, domaine_id, id],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la modification : " + err.stack);
        res.status(500).json({ error: "Erreur lors de la modification" });
        return;
      }
      res.status(201).json({ message: "Modification réussie" });
    }
  );
});

app.get("/getNote", async (req, res) => {
  const query = "SELECT * FROM domaine";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des notes : " + err.stack);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des notes" });
      return;
    }

    res.status(200).json(results);
  });
});
app.get("/getDomaine", async (req, res) => {
  const query = "SELECT * FROM domaines";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des notes : " + err.stack);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des notes" });
      return;
    }

    res.status(200).json(results);
  });
});
app.get("/getVps", (req, res) => {
  const query = "SELECT * FROM vps";
  connection.query(query, async (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des VPS : " + err.stack);
      res.status(500).json({ error: "Erreur lors de la récupération des VPS" });
      return;
    }
    try {
      const domainesPromise = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM domaines", (err, result2) => {
          if (err) {
            reject(err);
          } else {
            resolve(result2);
          }
        });
      });

      const result2 = await domainesPromise;

      const finalList = results.map((obj1) => {
        const match = result2.filter((obj2) => obj2.vps_id === obj1.id_vps);
        return { ...obj1, domaines: match };
      });

      res.status(200).json(finalList);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : " + error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des données" });
    }
  });
});
app.post("/getVpsById", (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ error: "L'ID du VPS est requis" });
    return;
  }

  const queryVps = `SELECT * FROM vps WHERE id_vps = ${id}`;
  connection.query(queryVps, async (err, resultVps) => {
    if (err) {
      console.error("Erreur lors de la récupération du VPS : " + err.stack);
      res.status(500).json({ error: "Erreur lors de la récupération du VPS" });
      return;
    }

    if (resultVps.length === 0) {
      res.status(404).json({ error: "VPS non trouvé" });
      return;
    }

    const queryDomaines = `SELECT * FROM domaines WHERE vps_id = ${id}`;
    connection.query(queryDomaines, async (err, resultDomaines) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des domaines : " + err.stack
        );
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des domaines" });
        return;
      }

      const vps = resultVps[0];
      const domaines = resultDomaines;

      res.status(200).json({ ...vps, domaines });
    });
  });
});

app.get("/getBase", async (req, res) => {
  const query = "SELECT * FROM bases";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des notes : " + err.stack);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des notes" });
      return;
    }

    res.status(200).json(results);
  });
});
app.post("/inscription", async (req, res) => {
  const { nom, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (nom, email, password) VALUES (?, ?, ?)";
    connection.query(query, [nom, email, hashedPassword], (err, results) => {
      if (err) {
        console.error("Erreur lors de l'inscription : " + err.stack);
        res.status(500).json({ error: "Erreur lors de l'inscription" });
        return;
      }

      res.status(201).json({ message: "Inscription réussie" });
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription : " + error.stack);
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
});

app.post("/connexion", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification si l'email existe dans la base de données
    const results = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (results.length === 0) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const user = results[0];
    const userId = user.id;

    // Comparaison du mot de passe haché de manière asynchrone
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Génération du token JWT
    const token = jwt.sign({ userId: userId }, "12345555pjhf", {
      expiresIn: "1h",
    });

    // Authentification réussie
    res.json({ message: "Connexion réussie", token: token });
  } catch (error) {
    console.error("Erreur lors de la connexion : " + error.stack);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const rule = new schedule.RecurrenceRule();
rule.hour = 19;
rule.minute = 0;
rule.seconds = 1;

function genDaySecretQR() {
  schedule.scheduleJob(rule, async () => {
    connection.query("SELECT * FROM domaines", (error, rows) => {
      if (error) {
        console.error("Erreur :", error);
        return;
      }

      const today = new Date();
      const fiveDaysAgo = new Date(today);
      fiveDaysAgo.setDate(today.getDate() + 30);

      rows.forEach((row) => {
        const expirationDate = new Date(row.date_expiration);
        // const currentDate = new Date();
        // const dateDiff = expirationDate.getDate() - currentDate.getDate();
        if (
          expirationDate.getDate() === fiveDaysAgo.getDate() &&
          expirationDate.getMonth() === fiveDaysAgo.getMonth() &&
          expirationDate.getFullYear() === fiveDaysAgo.getFullYear()
        ) {
          sendMail(row);
        }
      });
      console.log("heure arrivee");
    });
  });
}

function sendMail(user) {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      secure: true,
      host: "smtp.gmail.com",
      auth: { user: "cosit.massy03dt@gmail.com", pass: "zvqsokilcnwuylvt" },
      tls: { rejectUnauthorized: false },
    })
  );
  const date = new Date(user.date_expiration);
  const mailOptions = {
    from: "diarafasouk@gmail.com",
    to: user.email_client,
    subject: "Rappel de paiement",
    html: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title> Rappel de paiement pour votre serveur en ligne</title>
          </head>
          <body>

          Bonjour <strong>${user.client}</strong>,</br>
 
          </br>
          </br>
          Nous vous contactons pour vous rappeler que le paiement pour votre nom de domaine est actuellement en retard.</br>
           Pour assurer la continuité du service, nous vous encourageons à régler votre facture dès que possible.</br>
          
          </br>
         
      
          - Montant dû : ${user.prix_annuel}</br>
          - Date limite de paiement :${
            date.getDate() +
            "/" +
            "0" +
            date.getMonth() +
            "/" +
            date.getFullYear()
          }</br>
          
          Veuillez noter que si le paiement n'est pas reçu d'ici la date limite , votre service pourrait être suspendu.</br>
     
          Nous vous remercions de votre compréhension et de votre coopération.</br>
          </br>
          </br>
          Cordialement, </br>
          COSIT MALI</br>

          
          </body>
          </html>
          `,
  };

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take your messages");
    }
  });

  //send verification email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail SID: ", info.messageId);
    }
  });
}

function sendMailDomaine(user, mail, base) {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      secure: true,
      host: "smtp.gmail.com",
      auth: { user: "cosit.massy03dt@gmail.com", pass: "zvqsokilcnwuylvt" },
      tls: { rejectUnauthorized: false },
    })
  );
  const date = new Date(user.date_expiration);
  const mailOptions = {
    from: "cosit.massy03dt@gmail.com",
    to: mail,
    subject: "Les accès du domaine",
    html: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title> Accès demandés pour le domaine ${user.nom}</title>
          </head>
          <body>

          <strong>Compte FPT</strong>: </br>
 
          </br>
          
          Nom d'hôte: &nbsp; ${user.nom_hote}</br>
          Nom d'utilisateur: &nbsp; ${user.nom_utilisateur}</br>
          Mot de passe: &nbsp; ${user.mot_de_passe}</br>
          </br>
          <strong>Bases de donnée</strong>:</br>

          Phpmyadmin: &nbsp; ${base.lien}</br>
          Nom d'hôte:  &nbsp; ${base.nom_hote}</br>
          Nom de base:  &nbsp; ${base.nom}</br>
          Nom d'utilisateur:  &nbsp; ${base.nom_utilisateur}</br>
          Mot de passe: &nbsp; ${base.mot_de_passe}
          </br>
          </br>
          COSIT MALI</br>

          
          </body>
          </html>
          `,
  };

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take your messages");
    }
  });

  //send verification email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail SID: ", info.messageId);
    }
  });
}
app.post("/send-mail-domaine", (req, res) => {
  const { user, mail, base } = req.body;
  sendMailDomaine(user, mail, base);
  res.send("E-mail envoyé avec succès");
});
app.get("/hello", async (req, res) => {
  const message = "Bonjour tu vas bien ?";
  console.log(message);

  res.status(200).send(message);
});

app.get("/", (req, res) => {
  res.send("Hello Server");
});

module.exports = app;
