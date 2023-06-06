import mongoose from "mongoose";

const connextionString = `mongodb://localhost:27017`;

mongoose.connect(connextionString)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error(err));