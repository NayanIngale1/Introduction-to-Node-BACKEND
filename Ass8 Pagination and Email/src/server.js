const app = require("./index");

const connect = require("./configs/db");

app.listen(6000, async () => {
  try {
    await connect();
    console.log("listening on port 6000...");
  } catch (error) {
    console.log("error:", error);
  }
});



