// import the reqiured packages
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// json middleware for reading Json input for post request;
app.use(express.json());

//connect mongo to dababase
const connect = () => {
  mongoose.connect("mongodb://localhost:27017/Masai");
};

// creating user schema
// step - 1 : creating the schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
//step -2 : creating the model
const User = mongoose.model("user", userSchema);

//     SECTION SCHEMA
//step -1 : creating the schema
const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//step -2 : creating the model
const Section = mongoose.model("section", sectionSchema);

//    AUTHOR SCHEMA
// step -1: creating the schema
const authorSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// step -2 : creating the model
const Author = mongoose.model("author", authorSchema);

//     BOOKS SCHEMA
//step -1: creating the schema
const bookSchema = new mongoose.Schema(
  {
    book_name: {
      type: String,
      required: true,
    },
    book_body: {
      type: String,
      required: true,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//step-2 : creating the model
const Book = mongoose.model("book", bookSchema);

// - Create schema for BOOK-AUTHOR

const bookAuthorSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    author_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: "author", required: true },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//  Connect the Schema to bookAuthors collection

const BookAuthor = mongoose.model("bookAuthor", bookAuthorSchema);

//      CHECKOUT SCHEMA
//step -1 : creating schema
const checkedOutSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
    checkedOutTime: {
      type: Date,
      required: true,
    },
    checkedInTime: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//step -2: create model
const CheckedOut = mongoose.model("checkedOut", checkedOutSchema);

//----------------------ALL CRUD API -----------------------------
// USER CRUD
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).lean().exec();

    return res.status(200).send({ users: users });
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(200).send({ user: user });
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});

//  SECTION CRUD
app.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find({}).lean().exec();

    return res.status(200).send({ sections: sections });
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});
app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);

    return res.status(200).send({ section: section });
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});

// AUTHORS CRUD
app.get("/authors", async (req, res) => {
  try {
    const authors = Author.find().lean.exec();
    return res.status(200).send({ authors: authors });
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});

app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);
    return res.status(200).send({ author: author });
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});

//BOOKS CRUD
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find()
      .populate("sectionId")
      .populate("authorId")
      .lean()
      .exec();
    return res.status.send({ books: books });
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body).lean.exec();
    return res.status.send({ book: book });
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean().exec();
    res.status(200).send({ book });
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});

//  CHECKED OUT CRUD
app.get("/checkedOutData", async (req, res) => {
  try {
    const checkedOutData = await CheckedOut.find()
      .populate("bookId")
      .populate("userId")
      .lean.exec();
  } catch (err) {
    return re.status(500).send({ Error: err.message });
  }
});

app.post("/checkedOutData", async (req, res) => {
  try {
    const checkedOutData = await CheckedOut.create(req.body);
    return res.status(200).send({ checkedOutData: checkedOutData });
  } catch (err) {
    return res.status(500).send({ Error: err.message });
  }
});

// ---------------- Other Crud Operations ----------------

// All books written by an Author

app.get("/booksbyauthor/:id", async (req, res) => {
  try {
    const match = await BookAuthor.find({ author_id: req.params.id })
      .lean()
      .populate("book_id")
      .exec();
    res.send(match);
  } catch (err) {
    return res.status(500).send({ Error: err.message });
  }
});

// getting books in a section
app.get("/books/:sectionId", async (req,res) => {
    try {
        const books = await Book.find({section_id: req.params.sectionId})
            .lean()
            .exec();
        return res.status(200).send(books);
    } catch (err) {
        return res.status(500).send({error: err});
    }
});

// getting books of one author inside a section
app.get("/books/:authorId/:sectionId", async (req,res) => {
    try {
        const books = await Book.find({author_id: req.params.authorId, section_id: req.params.sectionId})
            .lean()
            .exec();
        return res.status(200).send(books);
    } catch (err) {
        return res.status(500).send({error : err});
    }
})

//starting the server
app.listen(9000, async () => {
  try {
    //starting the connection to mongo
    await connect();
    console.log("Listening at port 9000");
  } catch (err) {
    console.log("err:", err.message);
  }
});
