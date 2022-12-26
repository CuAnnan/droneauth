const {mongo} = require('../conf');
const mongoose = require('mongoose');
const connectString = `mongodb://${mongo.user}:${mongo.pass}@${mongo.host}`;

mongoose.set('strictQuery', false);
mongoose.connect(connectString,{dbName:'lyreen'}).then(function(){
    console.log('Connection to mongodb established');
}).catch(function(e){
    console.log('Have error');
    console.log(e);
});

class Controller
{
    static sync(mongooseObject)
    {
        return JSON.parse(JSON.stringify(mongooseObject));
    }

    static getUser(req)
    {
        let user = req.session.user;
        if(!user)
        {
            throw new Error('No user logged in');
        }

    }
}

module.exports = Controller;