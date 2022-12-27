const Controller = require('./Controller');
const shortid = require('shortid');
const Show = require('../Models/ShowModel');
const Stream = require('../Models/StreamModel');
const ObjectId = require('mongoose').Types.ObjectId;

class ShowController extends Controller
{
    static async indexAction(req, res)
    {
        let user = req.session.user;
        if(!user)
        {
            res.redirect('/users/login');
        }
        else
        {
            let shows = await Show.find({owner:user}).populate('streams').exec();
            res.render('showHomePage', {shows:shows, title:'Shows'});
        }
    }

    static async launchShows(showList)
    {
        console.log(showList);
        for(let show in showList)
        {
            show.live = true;
            for(let stream of show.streams)
            {
                if(!stream.streaming)
                {
                    show.live = false;
                }
            }
            show.save();
        }
    }

    static async addShow(req, res)
    {
        let user = req.session.user;
        let qry = {
            name:req.body.showName,
            owner:user,
            streams:req.body.streams,
            shortid:shortid.generate()
        }

        if(!user)
        {
            res.redirect('/users/login');
        }
        else
        {
            let show = await Show.findOneAndUpdate({name:qry.name,owner:qry.owner},qry,{upsert: true}).populate('streams').exec();
            for(let idStreams of qry.streams)
            {
                let stream = await Stream.findOne({_id:idStreams});
                stream.shows.push(show);
                stream.save();
            }
            res.redirect(`/shows/${qry.shortid}`);
        }
    }

    static async displayShowPage(req, res)
    {
        let user = req.session.user;
        if(!user)
        {
            res.redirect('/users/login');
        }
        else
        {
            let show = await Show.findOne({shortid: req.params.showId, owner:user}).populate('streams').populate('primaryStream').exec();
            res.render('showPage', {title: 'Show overview page', show: show, scripts:['/js/showManagement.js']});
        }
    }

    static async setShowPrimaryStream(req, res)
    {
        let user = req.session.user;
        if(!user)
        {
            res.json({error:'No user logged in'});
        }
        else
        {
            let show = await Show.findOneAndUpdate({_id:req.body.showId, owner:user},{primaryStream:req.body.idPrimaryStream},{upsert: true}).exec();
            res.json({'updated':true});
        }
    }

    static async displayShowPlayer(req, res)
    {
        let show = await Show.findOne({shortid:req.params.showId}).populate('streams');
        res.render('showPlayer', {title:show.name, show:show});
    }
}

module.exports = ShowController;