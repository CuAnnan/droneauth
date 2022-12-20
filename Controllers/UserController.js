const Controller = require('./Controller');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

class UserController extends Controller
{
   static async logUserIn(req, res)
    {
        let userByEmail = await this.db.collection('users').findOne({email:req.body.email});
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
        let user = req.session.user;

        let showQry = await this.db.collection('shows').find({username:user.username});
        let shows = [];
        await showQry.forEach(function(document){
            shows.push(document);
        });

        let streamQry = await this.db.collection('streamKeys').find({username: user.username});
        let streams = [];
        await streamQry.forEach(function(document){
            streams.push(document);
        });
        let hostname = req.hostname;
        res.render('userHomepage', {title: 'User Homepage', streams:streams, hostname:hostname, scripts:['/js/streamFormHandler.js']});
    }
}
module.exports = UserController;