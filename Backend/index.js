import { sequelize } from "./components/connection.js";
import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.status(req.query.status || 200).send('Welcome to the Rest API!');
});

app.get('/pokemon', (req, res) => {
  sequelize.query(
    "SELECT * FROM pokemon",
    {
      type: sequelize.QueryTypes.SELECT
    }
  )
    .then(pokemonData => {
      res.json(pokemonData);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

app.get('/pokemon/:id', (req, res) => {
    const { id } = req.params;
    sequelize.query("SELECT * FROM pokemon WHERE id = :id", {
        replacements: {
            id: id
        },
        type: sequelize.QueryTypes.SELECT
    }).then(pokemonData => {
        if (pokemonData.length === 0) {
            res.status(404).send({ message: 'Pokemon not found' });
        } else {
            res.json(pokemonData[0]);
        }
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

app.listen(3000, () => {
    console.log('Rest API listening on port 3000');
});
