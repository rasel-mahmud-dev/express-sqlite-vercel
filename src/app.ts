import cors from "cors"
import routes from "./routes";



const express = require("express");
const app = express();
require("dotenv").config()

app.use(express.json({ extended: false }));

const whitelist = [process.env.FRONTEND, "https://rasel-mahmud-dev.github.io", process.env.FRONTEND2]
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      if(process.env.NODE_ENV === "development"){
        callback(null, true) // anyone can access this apis when is development mode
      } else {
        callback(null, false) // anyone can access this apis
        // callback(new Error('Not allowed by CORS'))
      }
    }
  }
}
app.use(cors(corsOptions))

routes(app)



export default app
module.exports = app