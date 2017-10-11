import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    name     : { type: String },
    description : { type: String, required: true },
    genre     : { type: String },
    infoUplodedByUser : { type: String },
    link : { type: String },
    dateofUpload : { type: Date}
});

module.exports=mongoose.model('Video', VideoSchema);

