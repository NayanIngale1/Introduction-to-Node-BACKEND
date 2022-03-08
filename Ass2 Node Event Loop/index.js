const express = require("express");
// console.log('express:', express);

const app = express();
// console.log('app:', app)

app.get("", function (req, res) {
  return res.send("Hello");
});

app.get("/books", function (req, res) {
  return res.status(200).json({
    result: [
      {
        name: "Book 1",
        author: "Author 2",
        genre: "Book",
      },
      {
        name: "Book 2",
        author: "Author 2 ",
        genre: "Book",
      },
      {
        name: "Book 3",
        author: "Book 3",
        genre: "Book",
      },
      {
        name: "Book 4",
        author: "Author 4",
        genre: "Book",
      },
    ],
  });
});


app.listen((port = 4254), () => {

  console.log(`listening on port ${port}`);
});
