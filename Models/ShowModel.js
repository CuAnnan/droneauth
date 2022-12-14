let mongoose = require('mongoose'),
    shortid = require('shortid');

let ShowSchema = new mongoose.Schema({
    shortid:{type:String, default:shortid.generate},
    name:{type:String,unique:true,required:true,trim:true},
    streams:[{type: mongoose.Schema.Types.ObjectId, ref:'Stream'}],
    owner:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    primaryStream:{type: mongoose.Schema.Types.ObjectId, ref:'Stream'},
    live:{type:Boolean, default: false},
    description:{type: String}
});

module.exports = mongoose.model('Show', ShowSchema);