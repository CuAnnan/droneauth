const Controller = require('./Controller');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
let User = require('../Models/UserModel');
let Stream = require('../Models/StreamModel');
let Show = require('../Models/ShowModel');

class UserController extends Controller
{
   static async logUserIn(req, res)
    {
        let userByEmail = await User.findOne({email:req.body.email}).exec();
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
        let sessionUser = req.session.user;
        let streams = this.sync(await Stream.find({owner:sessionUser}).populate('owner').exec());
        let shows = this.sync(await Show.find({owner:sessionUser}).populate('owner').exec());
        let hostname = req.hostname;
        res.render('userHomepage', {title: 'User Homepage', streams:streams, shows:shows, hostname:hostname, scripts:['/js/streamFormHandler.js']});
    }
}
module.exports = UserController;