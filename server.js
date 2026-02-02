const express = require("express");
const app = express();

const port = 2150;

app.use(express.json());
app.use("/books", require("./Routes/booksRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Library Management System Working !!!!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


