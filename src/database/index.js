const mongoose   = require('mongoose');
const config     = require('config');


mongoose.connect('mongodb+srv://'+config.get('database.user')+':'+encodeURI(config.get('database.password'))+'@cluster0.kwy51.mongodb.net/robbysson?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true, })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));
mongoose.Promise = global.Promise;

module.exports = mongoose