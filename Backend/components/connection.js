import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "owen",
    password: "root",
    database: "pokemondb",
    logging: false,
});

export const db = sequelize;