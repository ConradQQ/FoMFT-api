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

if (process.env.NODE_ENV !== 'test') {
  
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

}



// 
// API Endpoints
// 



// 
// raw_materials endpoints
// 


// Endpoint to retrieve all raw materials
app.get('/raw_materials', (req, res) => {
  db.query('SELECT * FROM raw_materials', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

// Endpoint to retrieve raw materials by id
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
  });
});


// 
// colonies endpoints
// 


// Endpoint to retrieve all colonies
app.get('/colonies', (req, res) => {
  db.query('SELECT * FROM colonies', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

// Endpoint to retrieve colonies by ID 
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
  });
});


// 
// material_availability endpoints
// 


// Endpoint to retrieve material_availability table
app.get('/material_availability', (req, res) => {
  db.query('SELECT * FROM  material_availability', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

// Endpoint to retrieve material availability table entries by colony and material id
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

// 
// production_components endpoints
// 

// Endpoint to retrieve all production component
app.get('/production_components', (req, res) => {
  db.query('SELECT * FROM production_components', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

// Endpoint to retrieve a specific production component
app.get('/production_components/:id', (req, res) => {
  const component_id = req.params.id
  db.query('SELECT * FROM production_components WHERE component_id = ?', [component_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      if (results.length > 0) {
        res.json(results)
      } else {
        res.status(404).json({message: 'Production component not found'})
      }
      
    }
  });
});

// 
// armor endpoints
// 


// Endpoint to retrieve all armor pieces
app.get('/armor', (req, res) => {
  db.query('SELECT * FROM  armor', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

// Endpoint to retrieve an armor piece by id
app.get('/armor/:id', (req, res) => {
  const armor_id = req.params.id
  db.query('SELECT * FROM armor WHERE armor_id = ?', [armor_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      if (results.length > 0) {
        res.json(results)
      } else {
        res.status(404).json({message: 'Armor piece not found'})
      }
      
    } 
  });
});

module.exports = {app, db};


