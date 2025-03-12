const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()

const app = express();
app.use(cors());
const port = 3000;

const db = mysql.createConnection({

host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE

});

db.connect((err) => {

  if (err) {
    console.error(`Connection Failed: ${err.stack}`);
    return
  }
  console.log('DB connection established')

})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Endpoint to retrieve all raw materials
app.get('/raw-materials', (req, res) => {
  db.query('SELECT * FROM raw_materials', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

// Endpoint to retrieve all raw materials 
app.get('/colonies', (req, res) => {
  db.query('SELECT * FROM colonies', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      res.json(results)
    }
  })
})

// Endpoint to retrieve all the material availability table.
// This shows which colonies have which raw_materials 
app.get('/material_availability', (req, res) => {
  db.query('SELECT * FROM material_availability', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      res.json(results)
    }
  })
})