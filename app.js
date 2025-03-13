/*
Dopo aver completato tutte le operazioni CRUD, completiamo le nostre API inserendo un middleware per la gestione delle rotte non registrate e uno per la gestione degli errori.
Se viene chiamato un endpoint inesistente, un middleware dovrà rispondere un messaggio e uno status appropriato.
Se viene generato un errore, un middleware si occuperà di rispondere con un messaggio e uno status appropriato.
*/

const express = require('express') 
const app = express() 
const port = 3000 
const postsRouter = require('./routers/posts')
const notFound = require('./middlewares/notFound')
const error = require('./middlewares/error')
const cors = require('cors');

//registro il middleware per abilitare CORS
app.use(cors(
  {
      origin: 'http://localhost:5173'
  } 
));

//registro il body-parser per "application/json"
app.use(express.json());


app.get("/", (req, res) => {
   // dentro req.body troveremo i dati ricevuti in formato json
     console.log(req.body);
     res.send(`Hello world`);
  });

  app.use("/posts", postsRouter)

  // registrato per tutte le rotte dell'app
app.use(notFound);
app.use(error);

app.listen(port, () => {   
    console.log(`Example app listening on port ${port}`)
  })