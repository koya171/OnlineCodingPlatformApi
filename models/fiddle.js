const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fiddleSchema = new Schema({
    code : { type: String, default:''},
    language : {type: String, default:''},
    name: {type: String, default:'Untitled Fiddle ' + Date.now()},
    fiddleid: {type: String, required:true},
    userid: {type: String, required: true}
});

module.exports = mongoose.model('fiddle', fiddleSchema);