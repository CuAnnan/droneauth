const Controller = require('./Controller');
const ShowController = require('./ShowController');
const shortid = require("shortid");
const Stream = require('../Models/StreamModel');
const User = require('../Models/UserModel');
const Show = require('../Models/ShowModel');

class StreamController extends Controller
{

    static async testStreamToShowRelationship(req, res)
    {
        let qry = {shortid:req.params.streamId};
        let stream = await Stream.findOne(qry).exec();
        res.send(stream);
    }

    /**
     * @param   {Request}       req   The Express Request
     * @param   {Response}      res   The Express Response
     * @returns {Promise<void>}
     * This is the hook for trying to start a stream. NGINX points to this in the on_publish Directive.
     */
    static async verifyStream(req, res)
    {
        let user = await User.findOne({username:req.body.user}).exec();
        let qry = {owner:user, name:req.body.name, shortid:req.body.shortid};
        let stream = await Stream.findOne(qry).exec();
        if(stream)
        {
            ShowController.launchShows(showList).then(function(){
                console.log('Updated shows');
            });
            stream.streaming = true;
            stream.save();
            res.status(200);
            res.send('All good');
        }
        else
        {
            res.status(403);
            res.send('You shall not pass');
        }
    }

    /**
     * @param   {Request}       req   The Express Request
     * @param   {Response}      res   The Express Response
     * @returns {Promise<void>}
     * This is the hook for ending a stream. NGINX points to this in the on_publish Directive.
     */
    static async endStream(req, res)
    {
        let user = await User.findOne({username:req.body.user}).exec();
        let qry = {owner:user, name:req.body.name, shortid:req.body.shortid};
        let stream = await Stream.findOne(qry).exec();
        if(stream) {
            stream.streaming = false;
            stream.save();
            res.send('Done');
        }
        else
        {
            res.send('Failed to find stream');
        }

    }

    static async addStream(req, res)
    {
        let user = req.session.user;
        let qry = {
            owner:user,
            shortid:shortid.generate(),
            name:req.body.streamName
        };
        await Stream.findOneAndUpdate({owner:user, name:qry.name}, qry, {upsert:true});
        return true;
    }

    static async deleteStream(req, res)
    {
        let user   = req.session.user;
        if(!user)
        {
            throw new Error('Tried to delete stream, no user logged in');
            res.json({'deleted':false, 'shortid':req.body.shortid});
            return;
        }
        let fields = {name:req.body.streamName, owner:user, shortid:req.body.shortid};
        // console.log(fields);
        // let stream = await Stream.findOne(fields).exec();
        // console.log(stream);
        await Stream.deleteOne(fields).exec();
        res.json({'deleted':true, 'shortid':req.body.shortid});
        return;
    }
}

module.exports = StreamController;