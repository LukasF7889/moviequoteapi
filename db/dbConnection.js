import mongoose from "mongoose";

try {
  //Connect to mongoDB
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected");
} catch (error) {
  console.error("Connection to database failed.");
}
