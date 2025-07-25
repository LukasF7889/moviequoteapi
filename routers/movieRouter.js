import { Router } from "express";

import {
  getAllMovies,
  createMovie,
  getSingleMovie,
  getMovieQuotes,
  addQuote,
  deleteMovie,
} from "../controllers/movieController.js";

const movieRouter = Router(); //creating an "mini-app" only for the endpoint /movies

movieRouter
  .get("/", getAllMovies)
  .get("/:movieId", getSingleMovie)
  .get("/:movieId/quotes", getMovieQuotes);

movieRouter.post("/", createMovie).post("/:movieId/quotes", addQuote);

movieRouter.delete("/:movieId", deleteMovie);

export default movieRouter;
