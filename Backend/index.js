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

app.get('/pokemon', async (req, res) => {
  try {
    const { name, offset, limit } = req.query;

    // Base query
    let sql = "SELECT * FROM pokemon";
    const replacements = {};

    // Optional name search
    if (name) {
      sql += " WHERE name LIKE :name";
      replacements.name = `%${name}%`;
    }

    // Pagination
    if (limit) {
      sql += " LIMIT :limit";
      replacements.limit = parseInt(limit, 10);
    }

    if (offset) {
      sql += " OFFSET :offset";
      replacements.offset = parseInt(offset, 10);
    }

    const pokemonData = await sequelize.query(sql, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });

    res.json(pokemonData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/pokemon/count', (req, res) => {
    sequelize.query("SELECT COUNT(*) AS count FROM pokemon", {
        type: sequelize.QueryTypes.SELECT
    }).then(pokemonData => {
        res.json(pokemonData[0]);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
})

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
