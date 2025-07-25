import { Schema, model } from "mongoose";

//Schema = Create a blueprint for how movies are modelled in the db
const movieSchema = new Schema({
  name: String,
});

//Create a model from the schema- This creates a collection called user. The Movie model will be used to operate on Movie-information
const Movie = model("Movie", movieSchema);

export default Movie;
