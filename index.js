import express from "express";
import "./db/dbConnection.js";
import movieRouter from "./routers/movieRouter.js";
import quoteRouter from "./routers/quoteRouter.js";

const app = express(); //initialize an express instance
const port = process.env.PORT || 3000; // defines a port

//middleware: any endpoint parses json request bodies, so json can be interpreted
app.use(express.json());

// for this endpoint use the router movieRouter
app.use("/movies", movieRouter);
app.use("/quotes", quoteRouter);

//simple CRUD method / endpoint receiving a request and sending a response. In this example, no router is used
app.get("/", (req, res) => res.send("Hello World"));

//runs the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
