const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect(
      "mongodb+srv://NayanIngale:nayan123@test.wjg1r.mongodb.net/Authorisation_Ouath"
    );
}


module.exports = connect;