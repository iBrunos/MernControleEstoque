const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log("Wait connecting to the database")

    mongoose.connect("mongodb+srv://root:1234@cluster0.sbbxqd2.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDb Atlas Connected"))
    .catch((error) => console.log(error))
};

module.exports = connectDatabase;