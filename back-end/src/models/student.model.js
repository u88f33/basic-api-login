import mongoose from "mongoose";

const studentApiSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true,
        unique: true
    },
    studentPhone: {
        type: String,
        required: true,
        unique: true
    },
    studentAge: {
        type: Number,
        required: true
    },
    studentGender: {
        type: String,
        required: true,
        enum: [ "Male", "Female", "Other" ]
    },
    studentCourse: {
        type: String,
        required: true
    },
    studentImage: {
        type: String
    }
}, { timestamps: true });

const StudentApiCollection = mongoose.model( "Student", studentApiSchema );
export default StudentApiCollection;