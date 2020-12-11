const mongoose = require('mongoose');
mongoose.connect('mongodb://priyeshs2:iwpproject123@ds145113.mlab.com:45113/iwp')
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could Not Connect...",err));

const userData = mongoose.Schema({
    reg : String,
    name: String,
    password: String,
    gender: String,
    phone: Number,
    email: String,
});
mongoose.Promise = global.Promise;
module.exports = mongoose.model('user', userData);