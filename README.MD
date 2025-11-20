# Pokemon Finder

A simple web application that allows you to search for a pokemon by its name or id.

## Features

- Search for a pokemon by its name or id
- View a list of all pokemon
- View a detailed page of a pokemon

## Built With

- [Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [vue-awesome-paginate](https://www.npmjs.com/package/vue-awesome-paginate)
- [Axios](https://axios-http.com/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)

## Getting Started

### Frontend

1. Clone the repository
2. Install the dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your web browser

### Backend

1. Clone the repository
2. Install the dependencies with `npm install`
3. Start the server with `npm run start`
4. Open [http://localhost:3000](http://localhost:3000) in your web browser

## API Endpoints

### GET /pokemon

Returns a list of all pokemon

### GET /pokemon/:id

Returns a detailed page of a pokemon

### GET /pokemon?name=<name>

Returns a list of all pokemon with the given name

### GET /pokemon?limit=<limit>&offset=<offset>

Returns a list of all pokemon with the given limit and offset
