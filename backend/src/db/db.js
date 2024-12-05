const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(connectionInstance.connection.host);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to db");
    });
    connection.on("error", (err) => {
      console.log(err);
    });
  } catch (error) {
    console.log("Failed to connect to db");

    process.exit(1);
  }
};

module.exports = dbConnect;
