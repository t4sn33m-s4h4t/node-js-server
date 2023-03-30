const express = require("express");
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
PORT = process.env.PORT || 5000
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

// Serve uploaded image files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {

  res.status(200).json("File has been uploaded");
});




app.delete("/api/images/:name", (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join(__dirname, "images", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json("Error deleting image file");
    } else {
      res.status(200).json("Image file deleted successfully");
    }
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// API routes
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
// app.use("/api/categories", categoryRoute);





// Start server
app.listen(PORT, () => {
  console.log("Backend is running.");
});
