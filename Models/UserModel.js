let mongoose = require('mongoose'),
    shortid = require('shortid');

let UserSchema = new mongoose.Schema({
    shortid:{type:String, default:shortid.generate},
    email:{type:String,unique:true,required:true,trim:true},
    username:{type:String,unique:true,required:true,trim:true},
    passwordHash:{type:String, required:true, trim:true},
    passwordSalt:{type:String, required:true, trim:true},
    streams:[{type: mongoose.Schema.Types.ObjectId, ref:'Stream'}],
    shows:[{type: mongoose.Schema.Types.ObjectId, ref:'Show'}]
});

module.exports = mongoose.model('User', UserSchema);