import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.DATABASE_URI);
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
