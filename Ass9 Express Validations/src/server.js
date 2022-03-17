const app = require("./index");

const connect = require("./config/db");

app.listen(6000, async (req, res) => {
  try {
    await connect();
    console.log("Listening at port 6000...");
  } catch (error) {
    console.log("error:", error);
  }
});
