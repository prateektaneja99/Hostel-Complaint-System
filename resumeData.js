const mongoose = require('mongoose');
mongoose.connect('mongodb://priyeshs2:iwpproject123@ds145113.mlab.com:45113/iwp')
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could Not Connect...",err));

const resumeData = mongoose.Schema({
    summary: String,
    name: String,
    email: String,
    phone: String,
    website: String,
    company_name: String,
    time: String,
    role: String,
    company_summary: String,
    project_name: String,
    project_website: String,
    project_description: String,
    college: String,
    degree: String,
    duration: String,
    skills: String
});

mongoose.Promise = global.Promise;
module.exports = mongoose.model('resume',resumeData);