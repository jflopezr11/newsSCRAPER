// Controller for my notes

var Note = require("../models/Notes");
var makeDate = require("../scripts/date");

//this function will grab all the notes that are associated with articles
module.exports = {
    get: function(data, cb) {
        Note.find({
            _headlineId: data._id
        }, cb);
    }, //will grab all of the notes associated with the notes in question 
    //this function is taking data from the user and the callback function
    save: function (data, cb) {
        var newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };

        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    delete: function(data, cb) {
        Note.remove({
            _id:data._id
        }, cb);
    }
};
