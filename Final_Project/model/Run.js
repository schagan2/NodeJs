const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runSchema = new Schema({
    connectionName: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    startTime: {
        type: String,
        require: true
    },
    endTime: {
        type: String,
        require: true
    },
    eventArea: {
        type: String,
        require: true
    },
    eventHost: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    benefits: {
        type: Array
    },
    numberOfEnrollments:{
        type: Number,
        default: 0
    },
    imageURL: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rPwtfXB-mLLtQC-9B5YzEmAFMPtZ6vGr1Q&usqp=CAU" 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Run = mongoose.model("Run", runSchema);

module.exports = Run;