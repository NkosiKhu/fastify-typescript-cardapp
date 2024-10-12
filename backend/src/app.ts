import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import { server } from "./server"

server
  .listen(process.env.PORT || 3001, "0.0.0.0")
  .then(() =>
    console.log("Server running on port " + (process.env.PORT || 3001))
  )
  .catch((error) => {
    console.log(error.message);
  });