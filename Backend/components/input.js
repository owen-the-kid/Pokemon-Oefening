import axios from "axios";
import { sequelize } from "./connection.js";

const pokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=151";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS pokemon (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    types VARCHAR(100),
    height INT,
    weight INT,
    hp INT,
    attack INT,
    defense INT,
    specialAttack INT,
    specialDefense INT,
    speed INT
)`;

async function seedDatabase() {
    try {
        // Check and create table if needed
        console.log("Checking database setup...");
        const tableExists = await sequelize.query("SHOW TABLES LIKE 'pokemon'", {
            type: sequelize.QueryTypes.SELECT
        });
        
        if (tableExists.length === 0) {
            console.log("Creating pokemon table...");
            await sequelize.query(createTableQuery);
            console.log("✓ Table created!");
        }
        
        // Fetch Pokemon data
        console.log("Fetching Pokemon data from PokeAPI...");
        const response = await axios.get(pokemonAPI);
        const pokemonData = response.data.results;
        console.log(`Found ${pokemonData.length} Pokemon. Fetching details...`);
        
        // Fetch all Pokemon details
        const pokemonPromises = pokemonData.map(pokemon => {
            return axios.get(pokemon.url).then(response => {
                const pokemonDetails = response.data;
                return {
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    types: pokemonDetails.types.map(type => type.type.name).join(", "),
                    height: pokemonDetails.height,
                    weight: pokemonDetails.weight,
                    hp: pokemonDetails.stats[0].base_stat,
                    attack: pokemonDetails.stats[1].base_stat,
                    defense: pokemonDetails.stats[2].base_stat,
                    specialAttack: pokemonDetails.stats[3].base_stat,
                    specialDefense: pokemonDetails.stats[4].base_stat,
                    speed: pokemonDetails.stats[5].base_stat
                };
            });
        });
        
        const allPokemon = await Promise.all(pokemonPromises);
        
        // Clear existing data
        console.log("Clearing existing data...");
        await sequelize.query("DELETE FROM pokemon");
        
        // Insert all Pokemon
        console.log("Inserting Pokemon into database...");
        await Promise.all(
            allPokemon.map(pokemon => {
                return sequelize.query(
                    "INSERT INTO pokemon (id, name, types, height, weight, hp, attack, defense, specialAttack, specialDefense, speed) VALUES (:id, :name, :types, :height, :weight, :hp, :attack, :defense, :specialAttack, :specialDefense, :speed)",
                    {
                        replacements: pokemon
                    }
                );
            })
        );
        
        console.log("✓ Successfully imported 151 Pokemon!");
        process.exit(0);
        
    } catch (error) {
        console.error("✗ Error:", error.message);
        process.exit(1);
    }
}

seedDatabase();