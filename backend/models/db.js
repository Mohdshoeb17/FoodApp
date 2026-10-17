
const mongoose = require("mongoose");

const mongo_url = process.env.MONGODB_URI;

if (!mongo_url) {
  console.error("MongoDB URL is missing in .env");
  process.exit(1);
}

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB Atlas Connected Successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });
