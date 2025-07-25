import { Schema, model } from "mongoose";

const quoteSchema = new Schema({
  text: String,
  movie: { type: Schema.Types.ObjectId, ref: "Movie" }, //refers to the movie
});

const Quote = model("Quote", quoteSchema);
export default Quote;
