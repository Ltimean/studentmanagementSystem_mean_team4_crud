const mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    rollNo : { type: Number }, 
    name: { type: String },
    branch: { type: String },
    age: { type: Number  },
    gender: { type: String },
    contactNo: { type: Number }
});

module.exports = { Student };