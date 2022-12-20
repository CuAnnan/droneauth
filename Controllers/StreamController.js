const Controller = require('./Controller');
const shortid = require("shortid");

class StreamController extends Controller
{

    /**
     * @param   {Request}       req   The Express Request
     * @param   {Response}      res   The Express Response
     * @returns {Promise<void>}
     * This is the hook for trying to start a stream. NGINX points to this in the on_publish Directive.
     */
    static async verifyStream(req, res)
    {
        let qry = await this.db.collection('streamKeys').findOne({username:req.body.user, streamName:req.body.name, shortid:req.body.shortid});
        if(qry)
        {
            if(req.body.name === req.app.locals.STREAMNAME)
            {
                req.app.locals.streaming = true;
            }
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
        let qry = await this.db.collection('streamKeys').findOne({username:req.body.user, streamName:req.body.name, shortid:req.body.shortid});
        if(qry) {
            if (req.body.name === req.app.locals.STREAMNAME) {
                req.app.locals.streaming = false;
                res.send('Done')
            }
            else
            {
                res.send('Non primary stream');
            }
        }
        else
        {
            res.send('Failed to find stream');
        }

    }

    static async getStreamsByUsername(username)
    {
        let qry = await this.db.collection('streamKeys').find({username: username});
        let keys = [];
        await qry.forEach(function(document){
            keys.push(document);
        });
        return keys;
    }

    static async addStream(req, res)
    {
        let user = req.session.user;
        await this.db.collection('streamKeys').updateOne({streamName:req.body.streamName, username:user.username},{$set:{shortid:shortid.generate()}},{upsert:true});
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

        let db     = this.getDB(req);
        let fields = {streamName:req.body.streamName, username:user.username, shortid:req.body.shortid};
        let qry = await this.db.collection('streamKeys').deleteOne(fields);
        res.json({'deleted':true, 'shortid':req.body.shortid});
        return;
    }
}

module.exports = StreamController;