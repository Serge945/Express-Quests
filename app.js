const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandler = require('./userHandler');
const { hashPassword } = require("./auth.js");


app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users",userHandler.getUsers)
app.get("/api/users/:id",userHandler.getUserById);
app.post("/api/movies", movieHandlers.postMovies);
app.post("/api/users", hashPassword, userHandler.postUser);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", hashPassword, userHandler.updateUser);
app.delete("/api/movies/:id",movieHandlers.deleteMovie);
app.delete("/api/users/:id",userHandler.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
