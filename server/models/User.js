import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name     : { type: String, required:true },
    pass      : { type: String, required: true }
});

mongoose.model('User', UserSchema);
