// make sure to start mongodb in another terminal window before executing current file
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// connecting mongodb database
const myData = () => {
  return mongoose.connect("mongodb://localhost:27017/Masai");
};

app.listen(3002, async () => {
  try {
    await myData();
  } catch (err) {
    console.log(err);
  }
  console.log("listening on port 3002");
});

app.use(express.json()); // why do we use this????

// ----------------- SECTION SCHEMA ----------------------------
// Step 1: Creating the schema
const sectionSchema = new mongoose.Schema({
  sectionName: { type: String, required: true },
});
// Step 2: Creating the model
const Section = mongoose.model("section", sectionSchema);

// Sections CRUD
// getting data from server
app.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find().lean().exec();
    return res.status(200).send({ sections: sections });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Please try again later");
  }
});
// posting data on the server
app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(201).send(section);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
});

// ------------------------- BOOKS SCHEMA ------------------------
// Step 1: Creating the schema
const bookSchema = new mongoose.Schema({
  book_name: { type: String, required: true },
  book_body: { type: String, required: true },
  // any way to add section to database if it doesn't exist yet?
  // same for authors
  section_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
    required: true,
  },
  // need to reference multiple authors
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: true,
  },
});
// Step 2: Creating the model
const Book = mongoose.model("book", bookSchema);

// Books CRUD
// getting data from server
app.get("/books", async (req, res) => {
  try {
    const book = await Book.find()
      .populate("section_id")
      .populate("author_id")
      .lean()
      .exec();
    return res.status(200).send({ book: book });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Please try again later");
  }
});

// posting data to server
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).send(book);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
});

// -------------------- AUTHOR SCHEMA ---------------------------
// Step 1: Creating the schema
const authorSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});
// Step 2: Creating the model
const Author = new mongoose.model("author", authorSchema);

// Authors CRUD
// getting data from server
app.get("/authors", async (req, res) => {
  try {
    const author = await Author.find().lean().exec();
    return res.status(200).send({ authors: author });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Please try again later");
  }
});

// posting data to server
app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);
    return res.status(201).send(author);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
});

// ----------------------- CREATING APIS -------------------------
// finding all books written by an author
app.get("/:authorId/books", async (req, res) => {
  try {
    const books = await Book.find({ author_id: req.params.authorId })
      .lean()
      .exec();
    return res.status(200).send(books);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
});

// getting books in a section
app.get("/books/:sectionId", async (req, res) => {
  try {
    const books = await Book.find({ section_id: req.params.sectionId })
      .lean()
      .exec();
    return res.status(200).send(books);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
});

// getting books of one author inside a section
app.get("/books/:authorId/:sectionId", async (req, res) => {
  try {
    const books = await Book.find({
      author_id: req.params.authorId,
      section_id: req.params.sectionId,
    })
      .lean()
      .exec();
    return res.status(200).send(books);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
});
