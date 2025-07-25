import { Router } from "express";
import {
  getRandomQuote,
  getSingleQuote,
  deleteQuote,
} from "../controllers/quoteController.js";

const quoteRouter = Router();

quoteRouter.get("/", getRandomQuote).get("/:quoteId", getSingleQuote);
quoteRouter.delete("/:quoteId", deleteQuote);

export default quoteRouter;
