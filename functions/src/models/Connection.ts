import mongoose from "mongoose";

async function connect() {
  if (mongoose.connection.readyState === 1) {
    console.log("db already connected");
    return true;
  } else {
    return mongoose
      .connect(process.env.DB_URL + "")
      .then((r) => {
        console.log("new db connection estabelished");
      })
      .catch((error) => {
        console.log("Unable to connect to db", error);
      });
  }
}

export { connect };
