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
database: process.env.DB_NAME

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

// Endpoint to retrieve an armor pieces by slot
app.get('/armor/:slot', (req, res) => {
  const slot = req.params.slot
  db.query('SELECT * FROM armor WHERE armor.slot = ?', [slot], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({message: 'Armor slot not found'});
      }
      
    } 
  });
});


// 
// implant endpoints
// 


// Endpoint to retrieve all implants
app.get('/implants', (req, res) => {
  db.query('SELECT * FROM  implants', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});



// 
// Weapons endpoints
// 




// Endpoint to retrieve a weapon by id or type

app.get('/weapons/:id', (req, res) => {
  const id = req.params.id
  // (isNaN(id)) Checks if a value passed to endpoint is a string. If not, it's treated as a weapon_id.
  if (isNaN(id)) {
   const weapon_type = id;
    db.query('SELECT * FROM weapons WHERE weapon_type = ?', [weapon_type], (err, results) => {
      if (err) {
       res.status(500).json({ error: err.message});
      } else {
        if (results.length > 0) {
        res.json(results);
        } else {
          res.status(404).json({message: 'Weapon type not found'});
       }
      
      } 
   });
} else {
    const weapon_id = id;
    db.query('SELECT * FROM weapons WHERE weapon_id = ?', [weapon_id], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message});
      } else {
        if (results.length > 0) {
          res.json(results);
        } else {
          res.status(404).json({message: 'Weapon not found'});
        }
        
      } 
  });
}
});

// Endpoint to retrieve all weapons
app.get('/weapons', (req, res) => {
  db.query('SELECT * FROM  weapons', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});


// 
// Food endpoints 
// 


// Endpoint to retrieve all food items
app.get('/food', (req, res) => {
  db.query('SELECT * FROM  food', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});


// 
// Meds endpoints 
// 


// Endpoint to retrieve all meds
app.get('/Meds', (req, res) => {
  db.query('SELECT * FROM  Meds', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

// 
// boosters endpoints 
// 


// Endpoint to retrieve all boosters
app.get('/boosters', (req, res) => {
  db.query('SELECT * FROM  boosters', (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});

module.exports = {app, db};


