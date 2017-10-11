import mongoose from "mongoose";

import config from '../../config/config.json';

import '../models/User';
import '../models/Video';

const User = mongoose.model('User');
const Video = mongoose.model('Video');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function getLast100(){

}
export function getLast100WithGenre(genre){

}
export function getVideoWithTimePeriod(time1,time2){

}
export function getVideoByName(name){

}
/*export function setInfo(inputVideo){
var newVideo=new Video({
	name     : inputVideo.name,
    description : inputVideo.description,
    genre     : inputVideo.genre,
    infoUplodedByUser : inputVideo.infoUplodedByUser,
    link : inputVideo.link,
    dateofUpload : inputVideo.dateofUpload
});
	newVideo.save(function(err) {
		if (err)  return -1;

		console.log('Video saved successfully');
		return 1;
	});


}*/
/*
export function listNotes(id) {
    return Note.find();
}

export function createNote(data) {
    const note = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });

    return note.save();
}

export function deleteNote(id) {
    return Note.findById(id).remove();
}
*/
