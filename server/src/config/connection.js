import mongoose from "mongoose";
const { connect, connection } = mongoose;

connect(process.env.MONGODB_URI);

export default connection;