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

if (process.env.NODE_ENV !== 'test'){
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
}


// TEST: Endpoint to retrieve all raw materials
app.get('/raw_materials', (req, res) => {
  db.query('SELECT * FROM raw_materials', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

// TEST: Endpoint to retrieve all colonies
app.get('/colonies', (req, res) => {
  db.query('SELECT * FROM colonies', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

// TEST: Endpoint to retrieve material_availability table
app.get('/material_availability', (req, res) => {
  db.query('SELECT * FROM  material_availability', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

app.get('/raw_materials/:id', (req, res) => {
  const raw_material_id = req.params.id
  db.query('SELECT * FROM raw_materials WHERE material_id = ?', [raw_material_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      if (results.length > 0) {
        res.json(results)
      } else {
        res.status(404).json({message: 'Raw Material not found'})
      }
      
    } 
  })
})

// TEST: Endpoint to retrieve specific colonies by ID 
app.get('/colonies/:id', (req, res) => {
  const colonyId = req.params.id
  db.query('SELECT * FROM colonies WHERE colony_id = ?', [colonyId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      if (results.length > 0) {
        res.json(results)
      } else {
        res.status(404).json({message: 'Colony not found'})
      }
      
    } 
  })
})

// TEST: Endpoint to retrieve all of the material availability table.
// This shows which colonies have which raw_materials 
app.get('/material_availability/:material_id/:colony_id', (req, res) => {
  const materialId = req.params.material_id;
  const colonyId = req.params.colony_id;
  db.query('SELECT * FROM material_availability WHERE material_id = ? AND colony_id = ?', [materialId, colonyId], (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ message: 'Material availability record not found' });
          }
      }
  });
});


module.exports = {app, db};


