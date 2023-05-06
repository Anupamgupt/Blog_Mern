const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/categories");
const path = require('path')
const multer = require("multer");
const app = express();

app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to mongo"))
  .catch((e) => console.log(e));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
})
app.use("/images",express.static(path.join(__dirname,"/images")));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(5000, () => {
  console.log("backend is running");
});
