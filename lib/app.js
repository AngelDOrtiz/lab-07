/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import client from './client.js';

// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

// heartbeat route
app.get('/', (req, res) => {
  res.send('Famous Pets API');
});

//creates new instance in the data array
app.post('/api/pets', async (req, res) => {
  try {
    const pet = req.body;
    const data = await client.query(`
      INSERT INTO pets (
        name,
        type,
        url,
        owner,
        lives,
        is_sidekick
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, type, url, owner, lives, is_sidekick AS "isSidekick";
    `,
    [pet.name, pet.type, pet.url, pet.owner, pet.lives, pet.isSidekick]
    );
    res.json(data.rows[0]);
  }
  catch(err) { console.log(err);
    res.status(500).json({ error: err.message });

  }
});


app.put('/api/pets/:id', async (req, res) => {
  try {
    const pet = req.body;
    const data = await client.query(`
    UPDATE pets
    SET name = $1, type = $2, url = $3, owner = $4, lives = $5, is_sidekick = $6
    WHERE id = $7
    RETURNING id, name, type, url, owner, lives, is_sidekick AS "isSidekick";
    `, [pet.name, pet.type, pet.url, pet.owner, pet.lives, pet.isSidekick, req.params.id]);

    res.json(data.rows[0]);
  }
  catch(err) { console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/pets/:id', async (req, res) => {
  try {
    const data = await client.query(`
    DELETE FROM pets
    WHERE id = $1
    RETURNING id, name, type, url, owner, lives, is_sidekick AS "isSidekick";
    `,
    [req.params.id]
    );
    res.json(data.rows[0]);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// API routes,
app.get('/api/pets', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
              name,
              type,
              url,
              owner,
              lives,
              is_sidekick as "isSidekick"
      FROM    pets;
    `);

    // send back the data
    res.json(data.rows); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

app.get('/api/pets/:id', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
              name,
              type,
              url,
              owner,
              lives,
              is_sidekick as "isSidekick"
      FROM    pets
      WHERE   id = $1;
    `, [req.params.id]);

    // send back the data
    res.json(data.rows[0] || null); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

export default app;