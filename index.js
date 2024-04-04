const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/parkings', (req,res) => {
    res.send("Liste des parkings")
})

// GET
app.get('/auteurs/all', async (req, res) => {
    try {
        var rows = [];

        // open database in memory
        let db = new sqlite3.Database('./db/biblio-bdd.db', (err) => {
          if (err) {
            console.error(err.message);
          }
          console.log('Connected to the chinook database.');
        });

        db.serialize(() => {
          db.each(`SELECT id, nom, prenom
                   FROM Auteur`, (err, row) => {
            if (err) {
              console.error(err.message);
            }
            let dictioAPI = "".concat('{"id": ', row.id, ',"nom": ', '"', row.nom, '","prenom": ', '"', row.prenom, '"}');

            rows.push(JSON.parse(dictioAPI));
            console.log(rows);
          });
        });

        // close the database connection
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Close the database connection.');
        });

        res.send(rows);
    } catch (err) {
        throw err;
    }
});
  
// POST
app.post('/tasks', async (req, res) => {
    let task = req.body;
    try {
        const result = await pool.query("insert into tache (titre, description) values (?, ?)", [task.titre, task.description]);
        res.send('Nouvel tâche ajoutée avec succès !');
    } catch (err) {
        throw err;
    }
});
  
app.get('/',(req, res) => {
    let render = `<form action="./tasks" method="post">
    <p>Veuillez renseigner un titre et une description pour la nouvelle tâche :</p>
    <div>
        <label for="titre">Titre</label>
        <input type="text" id="titre" name="titre" />

        <label for="description">Description</label>
        <input type="text" id="description" name="description" />
    </div>
    <div>
        <button type="submit">Envoyer</button>
    </div>
    </form>`;
    res.send(render);
});



// // open database in memory
// let db = new sqlite3.Database('./db/biblio-bdd.db', (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Connected to the chinook database.');
// });

// db.serialize(() => {
//   db.each(`SELECT id, nom, prenom
//            FROM Auteur`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.nom + "\t" + row.prenom);
//   });
// });

// // close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });