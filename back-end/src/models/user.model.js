import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UsersCollection = mongoose.model( "Users", userSchema );
export default UsersCollection;