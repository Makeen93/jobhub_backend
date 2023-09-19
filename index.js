const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
const bookmarkRoute = require("./routes/bookmark");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch((err) => { console.log(err) });
// app.get('/', (req, res) => res.send('Hello Makeen!'))
app.use(express.json());
app.use("/api/", authRoute);
app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/Bookmarks", bookmarkRoute);
app.listen(process.env.Port || 5002, () => console.log(`Example app listening on port ${process.env.port}!`))