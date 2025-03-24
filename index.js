const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

const pool = mysql.createPool({

host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: 3306,
connectionLimit: 10,

});

pool.getConnection((err) => {

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
app.get('/armor', async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    const [rows] = await connection.query('SELECT * FROM armor'); // Execute query
    connection.release(); // Release the connection back to the pool
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to retrieve an armor pieces by slot
app.get('/armor/:slot', async (req, res) => {
  try {
    const slot = req.params.slot;
    const connection = await pool.getConnection(); // Get a connection from the pool
    const [rows] = await connection.query('SELECT * FROM armor WHERE armor.slot = ?', [slot]); // Execute query
    connection.release(); // Release the connection back to the pool

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: 'Armor slot not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
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

app.get('/weapons/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const connection = await pool.getConnection(); // Get a connection from the pool

    let query;
    let params;
    let message;

    if (isNaN(id)) {
      query = 'SELECT * FROM weapons WHERE weapon_type = ?';
      params = [id];
      message = 'Weapon type not found';
    } else {
      query = 'SELECT * FROM weapons WHERE weapon_id = ?';
      params = [id];
      message = 'Weapon not found';
    }

    const [rows] = await connection.query(query, params); // Execute query
    connection.release(); // Release the connection back to the pool

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to retrieve all weapons
app.get('/weapons', async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    const [rows] = await connection.query('SELECT * FROM weapons'); // Execute query
    connection.release(); // Release the connection back to the pool
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// 
// Food endpoints 
// 


// Endpoint to retrieve all food items
app.get('/food', async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    const [rows] = await connection.query('SELECT * FROM food'); // Execute query
    connection.release(); // Release the connection back to the pool
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// 
// Meds endpoints 
// 


// Endpoint to retrieve all meds
app.get('/Meds', async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    const [rows] = await connection.query('SELECT * FROM Meds'); // Execute query
    connection.release(); // Release the connection back to the pool
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 
// boosters endpoints 
// 


// Endpoint to retrieve all boosters
app.get('/boosters', async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    const [rows] = await connection.query('SELECT * FROM boosters'); // Execute query
    connection.release(); // Release the connection back to the pool
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = {app, pool};


