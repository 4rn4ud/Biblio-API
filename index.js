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
        let db = new sqlite3.Database('./db/biblio-bdd.db', sqlite3.OPEN_READONLY, (err) => {
          if (err) {
            // res.status(500).json({ error: err.message });
            // return console.error(err.message);
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

            if (!row) {
              res.status(404).json({ message: "Auteurs non trouvés" });
              return console.error(err.message);
            }

            // let dictioAPI = "".concat('{"id": ', row.id, ',"nom": ', '"', row.nom, '","prenom": ', '"', row.prenom, '"}');
            let dictioAPI = {"id": row.id, "nom": row.nom, "prenom": row.prenom};

            // rows.push(JSON.parse(dictioAPI));
            rows.push(dictioAPI);
            console.log(rows);
          });
        });

        // close the database connection
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Close the database connection.');
          //   res.send(rows);
          res.json(rows);
        });

    } catch (err) {
        throw err;
    }
});

// GET
app.get('/auteurs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        var rows = [];

        // open database in memory
        let db = new sqlite3.Database('./db/biblio-bdd.db', sqlite3.OPEN_READONLY, (err) => {
          if (err) {
            console.error(err.message);
          }
          console.log('Connected to the chinook database.');
        });

        db.serialize(() => {
          db.each(`SELECT id, nom, prenom
                   FROM Auteur
                   WHERE id = ?`, [id], (err, row) => {
            if (err) {
              console.error(err.message);
            }

            if (!row) {
              res.status(404).json({ message: "Auteur non trouvé" });
              return console.error(err.message);
            }

            let dictioAPI = {"id": row.id, "nom": row.nom, "prenom": row.prenom};

            rows.push(dictioAPI);
            console.log(rows);
          });
        });

        // close the database connection
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Close the database connection.');
          res.json(rows);
        });

    } catch (err) {
        throw err;
    }
});

// GET
app.get('/genres/all', async (req, res) => {
  try {
      var rows = [];

      // open database in memory
      let db = new sqlite3.Database('./db/biblio-bdd.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          // res.status(500).json({ error: err.message });
          // return console.error(err.message);
          console.error(err.message);
        }
        console.log('Connected to the chinook database.');
      });

      db.serialize(() => {
        db.each(`SELECT id, nom
                 FROM Genre`, (err, row) => {
          if (err) {
            console.error(err.message);
          }

          if (!row) {
            res.status(404).json({ message: "Genres non trouvés" });
            return console.error(err.message);
          }

          let dictioAPI = {"id": row.id, "nom": row.nom};

          // rows.push(JSON.parse(dictioAPI));
          rows.push(dictioAPI);
          console.log(rows);
        });
      });

      // close the database connection
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
        //   res.send(rows);
        res.json(rows);
      });

  } catch (err) {
      throw err;
  }
});

// GET
app.get('/genres/:id', async (req, res) => {
  try {
      const id = req.params.id;
      var rows = [];

      // open database in memory
      let db = new sqlite3.Database('./db/biblio-bdd.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the chinook database.');
      });

      db.serialize(() => {
        db.each(`SELECT id, nom
                 FROM Genre
                 WHERE id = ?`, [id], (err, row) => {
          if (err) {
            console.error(err.message);
          }

          if (!row) {
            res.status(404).json({ message: "Genre non trouvé" });
            return console.error(err.message);
          }

          let dictioAPI = {"id": row.id, "nom": row.nom};

          rows.push(dictioAPI);
          console.log(rows);
        });
      });

      // close the database connection
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
        res.json(rows);
      });

  } catch (err) {
      throw err;
  }
});

// GET
app.get('/livres/all', async (req, res) => {
  try {
      var rows = [];

      // open database in memory
      let db = new sqlite3.Database('./db/biblio-bdd.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          // res.status(500).json({ error: err.message });
          // return console.error(err.message);
          console.error(err.message);
        }
        console.log('Connected to the chinook database.');
      });

      db.serialize(() => {
        db.each(`SELECT l.id, l.titre, l.description, g.id AS id_genre, g.nom AS nom_genre, a.id AS id_auteur, a.nom AS nom_auteur, a.prenom AS prenom_auteur
                 FROM Livre l
                 INNER JOIN Genre g ON g.id=l.idGen
                 INNER JOIN Auteur a ON a.id=l.idAut`, (err, row) => {
          if (err) {
            console.error(err.message);
          }

          if (!row) {
            res.status(404).json({ message: "Livres non trouvés" });
            return console.error(err.message);
          }

          let dictioAPI = {"id": row.id, "titre": row.titre, "description": row.description, "auteur": {"id": row.id_auteur, "nom": row.nom_auteur, "prenom": row.prenom_auteur}, "genre": {"id": row.id_genre, "nom": row.nom_genre}};

          // rows.push(JSON.parse(dictioAPI));
          rows.push(dictioAPI);
          console.log(rows);
        });
      });

      // close the database connection
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
        //   res.send(rows);
        res.json(rows);
      });

  } catch (err) {
      throw err;
  }
});

// GET
app.get('/livres/:id', async (req, res) => {
  try {
      const id = req.params.id;
      var rows = [];

      // open database in memory
      let db = new sqlite3.Database('./db/biblio-bdd.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the chinook database.');
      });

      db.serialize(() => {
        db.each(`SELECT l.id, l.titre, l.description, g.id AS id_genre, g.nom AS nom_genre, a.id AS id_auteur, a.nom AS nom_auteur, a.prenom AS prenom_auteur
                 FROM Livre l
                 INNER JOIN Genre g ON g.id=l.idGen
                 INNER JOIN Auteur a ON a.id=l.idAut
                 WHERE l.id = ?`, [id], (err, row) => {
          if (err) {
            console.error(err.message);
          }

          if (!row) {
            res.status(404).json({ message: "Livre non trouvé" });
            return console.error(err.message);
          }

          let dictioAPI = {"id": row.id, "titre": row.titre, "description": row.description, "auteur": {"id": row.id_auteur, "nom": row.nom_auteur, "prenom": row.prenom_auteur}, "genre": {"id": row.id_genre, "nom": row.nom_genre}};

          rows.push(dictioAPI);
          console.log(rows);
        });
      });

      // close the database connection
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
        res.json(rows);
      });

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
