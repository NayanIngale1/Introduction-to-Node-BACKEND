const express = require("express");
const data = require("./booksData");

const app = express();
const booksData = data();



app.use(allBooks);


app.get("/books", (req, res) => {
  return res.status(200).json(booksData);
});

app.use(singleBook);

app.get("/books/:name", (req, res) => {
    
    req.name = req.params.name;
    return res.status(200).json({ bookName: req.name });
    
});

function allBooks(req, res, next) {
  console.log("Fetching all books...");
  next();
}

function singleBook(req, res, next) {
    
   
     console.log("Fetching single book...");
     next();
}

app.listen(4000, () => {
  console.log("listening on port 4000");
});
