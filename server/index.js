require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gcalls.vyentxf.mongodb.net/gcalls?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Đã có lỗi gì đó: ", error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
// app.get("/", (req, res) => res.send("Hello world"));
// app.use("/api/auth", authRouter);
app.use("/", authRouter);
const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
