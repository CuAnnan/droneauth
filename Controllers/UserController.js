const Controller = require('./Controller');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

class UserController extends Controller
{
   static async logUserIn(req, res)
    {
        let db = this.getDB(req, res);
        let userByEmail = await db.collection('users').findOne({email:req.body.email});
        let result = await bcrypt.compare(req.body.password, userByEmail.passwordHash);
        if(result)
        {
            req.session.user = userByEmail;
            return true;
        }
        throw new Error('Could not log in');
    }

    static async addUserStream(req, res)
    {
        let db= this.getDB(req, res);
        let user = req.session.user;
        let qry = await db.collection('streamKeys').updateOne({streamName:req.body.streamName, username:user.username},{$set:{shortid:shortid.generate()}},{upsert:true});
        return true;
    }

    static async displayUserHome(req, res)
    {
        let db= this.getDB(req, res);
        let user = req.session.user;
        let qry = await db.collection('streamKeys').find({username: user.username});
        let keys = [];
        await qry.forEach(function(document){
            keys.push(document);
        });
        console.log(keys);
        let hostname = req.hostname;
        res.render('userHomepage', {title: 'User Homepage', keys:keys, hostname:hostname, scripts:['/js/streamFormHandler.js']});
    }

    static async verifyStream(req, res)
    {
        let db = this.getDB(req, res);
        let qry = await db.collection('streamKeys').findOne({username:req.body.user, streamName:req.body.name, shortid:req.body.shortid});
        if(qry)
        {
            console.log('Have verified stream');
            res.status(200);
            res.send('All good');
        }
        else
        {
            console.log('Failed stream verification process');
            res.status(403);
            res.send('You shall not pass');
        }
    }
}
module.exports = UserController