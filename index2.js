const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000 || process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// GET
app.get('/api/books', async (req, res) => {
    try {
        const result = await pool.query("select * from livre");
        res.send(result);
    } catch (err) {
        throw err;
    }
});
    app.get('/books/:id', (req,res) => {
    const { id } = req.params;
    db.get('SELECT * FROM livre WHERE id = ?', [id], (err, row) => {
    if(err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
    } else if(!row) {
        res.status(404).send('Product not found');
    } else {
    res.send(row);
    }
    })
})
// POST
app.post('/api/books', (req, res) => {
    const { titre, description, categorie, auteur } = req.body
    if(!titre || !description || !categorie || !auteur) {
        res.status(400).send("Le titre, la description, la categorie et l'auteur sont requis")
    } else {
        const sql = 'INSERT INTO livre(titre, description, idCat, idAut) VALUES (?, ?, ?, ?)';
        db.run(sql, [test, description, categorie, auteur], function(err) {
            if(err) {
                console.error(err.message);
                res.status(500).send('Internal server error')
            } else {
                const id = this.lastID;
                res.status(201).send({ id, titre, description, categorie, auteur})
            }
        })
    }
})

    app.put('/books/:id', (req, res) => {
    const { id }  = req.params;
    const { nom, description } = req.body;
    if(!nom || !description) {
        res.status(400).send('Le nom du livre et description sont requis')
    } else {
        const sql = 'UPDATE livre SET nom = ?, description = ?';
        db.run(sql, [nom, description, id], function(err) {
            if(err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
            } else if (this.changes === 0) {
                res.status(404).send('Product not found')
            } else {
                res.status(200).send({ id, nom, description })
            }
    })
    }
})

    app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM livre WHERE id = ?', [id], function(err) {
        if(err) {
            console.error(err.message)
            res.status(500).send('Internal server error')
        } else if (this.changes === 0) {
            res.status(404).send('Product not found')
        } else {
            res.status(204).send();
        }
    })
})
app.get('/',(req, res) => {
    let render = `<form action="./tasks" method="post">
    <p>Veuillez renseigner un nouveau livre</p>
    <div>
        <label for="titre">Titre</label>
        <input type="text" id="titre" name="titre" />

        <label for="description">Description</label>
        <input type="text" id="description" name="description" />
        
        <label for="category">Categorie</label>
        <input type="text" id="category" name="category" />
        
        <label for="author">Auteur</label>
        <input type="text" id="author" name="author" />
    </div>
    <div>
        <button type="submit">Envoyer</button>
    </div>
    </form>`;
    res.send(render);
});



// open database in memory
let db = new sqlite3.Database('./db/biblio-bdd.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});

db.serialize(() => {
  db.each(`SELECT id, nom, prenom FROM Auteur`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.nom + "\t" + row.prenom);
  });
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});