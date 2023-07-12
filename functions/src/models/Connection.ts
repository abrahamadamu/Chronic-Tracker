import mongoose from "mongoose";

/**
 * Connects database
 */
async function connect() {
  if (mongoose.connection.readyState === 1) {
    console.log("db already connected");
    return true;
  } else {
    return mongoose
      .connect(process.env.DB_URL + "", {
        dbName: process.env.FUNCTIONS_EMULATOR === "true" ? "testing" : "prod",
      })
      .then((r) => {
        console.log("new db connection estabelished");
      })
      .catch((error) => {
        console.log("Unable to connect to db", error);
        throw error;
      });
  }
}

export { connect };
