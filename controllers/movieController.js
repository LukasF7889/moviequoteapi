import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import Quote from "../models/Quote.js";

export const getAllMovies = async (req, res) => {
  try {
    const movieList = await Movie.find();
    if (movieList.length === 0) {
      return res.status(404).json({ error: "No movies found." });
    }
    res.status(200).json({
      message: "List of all movies",
      movieList,
    });
  } catch (error) {
    console.error("Error retrieving list:", error);
    res
      .status(500)
      .json({ error: "Could not retrieve movie list", details: error.message });
  }
};

export const createMovie = async (req, res) => {
  const { name, quotes } = req.body;

  if (!name || !Array.isArray(quotes) || quotes.length === 0) {
    return res.status(400).json({
      error: "Invalid input. Please enter a movie name and at least one quote.",
    });
  }

  try {
    const movie = await Movie.create({ name });

    const createdQuotes = await Promise.all(
      quotes.map((quote) => {
        return Quote.create({
          text: quote,
          movie: movie._id, //reference movie id
        });
      })
    );

    res.status(201).json({
      message: "Movie and quotes created successfully",
      movie,
      quotes: createdQuotes,
    });
  } catch (error) {
    console.error("Error creating movie and quotes:", error);
    res
      .status(500)
      .json({ error: "Error creating the movie.", details: error.message });
  }
};

export const getSingleMovie = async (req, res) => {
  const movieId = req.params.movieId;

  if (!mongoose.isValidObjectId(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID." });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.status(200).json({ movie });
  } catch (error) {
    console.error("Movie not found", error);
    res.status(500).json({ error: "Movie not found", details: error.message });
  }
};

export const getMovieQuotes = async (req, res) => {
  const movieId = req.params.movieId;

  if (!mongoose.isValidObjectId(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID." });
  }

  try {
    // const movie = await Movie.findById(movieId);
    const quotes = await Quote.find({ movie: movieId }).populate("movie");
    if (quotes.length === 0) {
      return res.status(404).json({ error: "No quotes found for this movie." });
    }
    res.status(200).json({ quotes });
  } catch (error) {
    console.error("No quotes found for this id", error);
    res
      .status(500)
      .json({ error: "No quotes found for this id", details: error.message });
  }
};

export const addQuote = async (req, res) => {
  const { quote } = req.body;
  const movieId = req.params.movieId;

  if (!mongoose.isValidObjectId(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID." });
  }

  if (!quote || typeof quote !== "string") {
    return res.status(400).json({ error: "Quote must be a non-empty string" });
  }

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    const addedQuote = await Quote.create({
      text: quote,
      movie: movieId,
    });

    res
      .status(201)
      .json({ message: `Quote added to ${movie.name}`, addedQuote });
  } catch (error) {
    console.error("An error occured ", error);
    res
      .status(500)
      .json({ error: "Error creating the quote", details: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  const movieId = req.params.movieId;

  if (!mongoose.isValidObjectId(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID." });
  }

  try {
    const movie = await Movie.findById(movieId); //remove movie
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    await Quote.deleteMany({ movie: movieId }); //remove quotes
    await movie.deleteOne();

    res.status(200).json({
      message: `Movie: ${movie.name} has been deleted from the database`,
    });
  } catch (error) {
    console.error("Deletion failes ", error);
    res
      .status(500)
      .json({ error: "Error deleting the movie", details: error.message });
  }
};
