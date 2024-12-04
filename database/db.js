const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Connected to mongodb"))
      .catch((err) => console.log(err));

  
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectToDb;
// export default connectToDb;
