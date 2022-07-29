import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json("This is home page");
});

app.get("/product", auth, (req, res) => {
  res.json("ok");
});
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
  }

  console.log("token", token);

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    console.log(err, data);
  });
  next();
}

app.post("/login", (req, res) => {
  const data = req.body;
  const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "30s" });
  res.json({ data, token });
});

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
