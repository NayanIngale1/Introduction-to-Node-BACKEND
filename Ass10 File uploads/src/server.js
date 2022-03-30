const app = require("./index");

const connect = require("./config/db");

app.listen(4444,async function () {
    try {
        await connect();
        console.log("Listening on port 4444");
    } catch (error) {
        console.log('error:', error)
        
    }
})