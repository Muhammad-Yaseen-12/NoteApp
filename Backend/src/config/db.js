import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
mongoose.connection.on("open", () => {
    console.log("Database Connected Success");
});

mongoose.connection.on("error", () => {
    console.log("Database Error");
});
export default dbConnect;