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

    static async displayUserHome(req, res)
    {
        let db= this.getDB(req, res);
        let user = req.session.user;
        let qry = await db.collection('streamKeys').find({username: user.username});
        let keys = [];
        await qry.forEach(function(document){
            keys.push(document);
        });
        let hostname = req.hostname;
        res.render('userHomepage', {title: 'User Homepage', keys:keys, hostname:hostname, scripts:['/js/streamFormHandler.js']});
    }
}
module.exports = UserController