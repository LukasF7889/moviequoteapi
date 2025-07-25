import mongoose from "mongoose";
import Quote from "../models/Quote.js";

export const getRandomQuote = async (req, res) => {
  try {
    const count = await Quote.countDocuments(); // Get amount of all quotes
    if (count === 0) {
      return res.status(404).json({ message: "No quotes found." });
    }
    const random = Math.floor(Math.random() * count); // Pick a random quote
    const quote = await Quote.findOne().skip(random).populate("movie"); //skip = jump to specific quote

    if (!quote) {
      return res.status(404).json({ message: "No quotes found" });
    }

    res.status(200).json({ quote });
  } catch (error) {
    console.error("Error retrieving quote ", error);
    res.status(500).json({
      error: "Couldn't retrieve random quote.",
      details: error.message,
    });
  }
};

export const getSingleQuote = async (req, res) => {
  const { quoteId } = req.params;

  if (!mongoose.isValidObjectId(quoteId)) {
    return res.status(400).json({ error: "Invalid quote ID." });
  }

  try {
    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return res.status(404).json({ message: "No quote found under this ID." });
    }

    res.status(200).json({ quote });
  } catch (error) {
    console.error("Error retrieving the quote ", error);
    res
      .status(500)
      .json({ error: "Error retrieving quote", details: error.message });
  }
};

export const deleteQuote = async (req, res) => {
  const { quoteId } = req.params;

  if (!mongoose.isValidObjectId(quoteId)) {
    return res.status(400).json({ error: "Invalid quote ID." });
  }

  try {
    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: "No quote found under this ID." });
    }

    await quote.deleteOne();

    res.status(200).json({ message: `Quote: "${quote.text}" deleted` });
  } catch (error) {
    console.error("Error deleting the quote ", error);
    res
      .status(500)
      .json({ error: "Error retrieving quote", details: error.message });
  }
};
