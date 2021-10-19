import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }
});

export const User = mongoose.model('User', userSchema);