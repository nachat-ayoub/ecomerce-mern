const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();

// db : (we could transform it to another folder db/db.js if you want)
// connecting to db process.env.DB_URI
const chalk = require("chalk");
const db = process.env.DB_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => console.log(chalk.blue("db connected successfully...")))
  .catch((err) => console.log(chalk.red(err)));

// express config:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes :
const AuthRoutes = require("./routes/authRoutes");

app.get("/d", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html>
  
  <body>
  
  <img width="100%" src='http://api.page2images.com/directlink?p2i_url=https://www.youtube.com/results?search_query=how+to+use+ffmpeg+in+heroku&p2i_key=${process.env.APIKEYD}&p2i_device=0'>
  
  <script src="http://www.page2images.com/js/p2i.js"></script>
  <script>
    const p2i = new page2images();
    p2i.thumbnail('demo');
  </script>
  
  </body>
  
  </html>
  `);
});
// Start : Login Page And Logic :
app.use("/", AuthRoutes);

// PORT :
const PORT = process.env.PORT || 9000;
// Running The Server :
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}/`);
});
