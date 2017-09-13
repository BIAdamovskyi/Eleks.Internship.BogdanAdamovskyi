import mongoose from "mongoose";

import config from '../../config/config.json';

import '../models/User';
import '../models/Video';

const User = mongoose.model('User');
const Video = mongoose.model('Video');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

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
