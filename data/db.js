const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'root',  
  database: 'posts'  
});

connection.connect(err => {
  if (err) {
    console.error('Errore di connessione al database:', err);
  } else {
    console.log('Connesso al database MySQL');
  }
});

module.exports = connection;
