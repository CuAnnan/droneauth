const Controller = require('./Controller');
const shortid = require("shortid");

class StreamController extends Controller
{
    static async streamPageAction(req, res)
    {
        res.render('streams', {title:'Streams', 'scripts':['https://vjs.zencdn.net/7.0.0/video.min.js', '/js/loadPlayer.js'], 'styles':['https://vjs.zencdn.net/7.0.0/video-js.css'], streaming:req.app.locals.streaming});
    }

    static async verifyStream(req, res)
    {
        let db = this.getDB(req, res);
        let qry = await db.collection('streamKeys').findOne({username:req.body.user, streamName:req.body.name, shortid:req.body.shortid});
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

    static async addStream(req, res)
    {
        let db= this.getDB(req, res);
        let user = req.session.user;
        if(user)
        {
            let qry = await db.collection('streamKeys').updateOne({streamName:req.body.streamName, username:user.username},{$set:{shortid:shortid.generate()}},{upsert:true});
            return true;
        }
        else
        {
            throw new Error('No logged in user');
        }
    }

    static async deleteStream(req, res)
    {
        let db= this.getDB(req, res);
        let user = req.session.user;
        if(user)
        {
            let fields = {streamName:req.body.streamName, username:user.username, shortid:req.body.shortid};
            let qry = await db.collection('streamKeys').deleteOne(fields);
            res.json({'deleted':true, 'shortid':req.body.shortid});
        }
        else
        {
            console.log('No logged in user');
            res.json({'deleted':false, 'shortid':req.body.shortid});
        }
    }
}

module.exports = StreamController;