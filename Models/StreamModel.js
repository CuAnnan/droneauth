let mongoose = require('mongoose'),
    shortid = require('shortid');

let ShowSchema = new mongoose.Schema({
    shortid:{type:String, default:shortid.generate},
    name:{type:String,unique:true,required:true,trim:true},
    shows:[{type: mongoose.Schema.Types.ObjectId, ref:'Show'}],
    owner:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    streaming:{type:Boolean, default:false}
});

module.exports = mongoose.model('Stream', ShowSchema);