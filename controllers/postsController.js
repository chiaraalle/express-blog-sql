const posts = require('../data/posts'); 
const connection = require('../data/db');

//creo le funzioni delle operazioni CRUD con la loro logica
// index
function index(req, res) {
    connection.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
}

// show
/*function show(req, res) {
    //res.send('Dettagli del post' + req.params.id);
    // recupero il parametro dinamico che rappresenta l'id del post e lo converto in numero.
    const id = parseInt(req.params.id) 
     // cerco il post tramite id quindi utilizzo il metodo find
     const post = posts.find(post => post.id === id);
     // Restituisco il risultato sotto forma di JSON
     res.json(post);
    
    //cotrollo se l'id inserito è presente o meno 
    if (!post) {
        res.status(404)

       return res.json(
           {
               status: 404,
               error: "Not Found",
               message: "Post non trovato"
           }
       )
   }
    
}*/ 
function show(req, res) {
    const id = parseInt(req.params.id);

    // Query per recuperare il post con l'ID specificato
    const query = 'SELECT * FROM posts WHERE id = ?';

    connection.query(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                error: err.message,
                message: "Errore del server"
            });
        }

        // Se non ci sono righe (nessun post trovato)
        if (rows.length === 0) {
            return res.status(404).json({
                status: 404,
                error: "Not Found",
                message: "Post non trovato"
            });
        }

        // Se il post è stato trovato, viene restituito come JSON
        res.json(rows[0]);
    });
}

// store
function store(req, res) {
    //res.send('Creazione nuovo post');
    // Creiamo un nuovo id incrementando l'ultimo id presente
    const newId = posts[posts.length - 1].id + 1;

    // Creiamo un nuovo oggetto post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    // Aggiungiamo il nuovo post ai posts
    posts.push(newPost);
    // controlliamo
    console.log(posts);

    // Restituiamo lo status corretto e il post appena creato
    res.status(201);
    res.json(newPost);
}
// update
function update(req, res) {
    //res.send('Modifica integrale dei posts ' + req.params.id);
   // come in show recupero l'id dall' URL e lo trasformo in numero
    const id = parseInt(req.params.id)
    // cerchiamo il post tramite id
    const post = posts.find(post => post.id === id);
    // Piccolo controllo
    if (!post) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }
    // Aggiorniamo il post
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    // Controlliamo i posts
    console.log(posts)
    // Restituiamo il post appena aggiornato
    res.json(post);
}
// modify
function modify(req, res) {
    res.send('Modifica parziale dei posts ' + req.params.id);
};
// destroy
/*function destroy(req, res) {
    //res.send('Eliminazione del post ' + req.params.id);

    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id);
    // Piccolo controllo
    if (!post) {
         res.status(404)

        return res.json(
            {
                status: 404,
                error: "Not Found",
                message: "Post non trovato"
            }
        )
    }
    // Rimuovo il post utilizzando splice e indexof()
    posts.splice(posts.indexOf(post), 1);
    // Restituiamo lo status corretto
    res.sendStatus(204)
    
    console.log(posts)
}*/
function destroy(req, res) {
    const id = req.params.id;
    
    // Eseguo la query per eliminare il post dal database
    connection.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Errore durante l\'eliminazione' });
        }

        // Se non è stato trovato alcun post con quell'ID, restituisce un errore
        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                error: "Not Found",
                message: "Post non trovato"
            });
        }

        res.sendStatus(204);
    });
}


module.exports = { index, show, store, update, modify, destroy }