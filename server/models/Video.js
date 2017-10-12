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
export var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
VideoSchema.plugin(autoIncrement.plugin,'Video');
module.exports=mongoose.model('Video', VideoSchema);


