const Controller = require('./Controller');
const shortid = require('shortid');
const Show = require('../Models/ShowModel');

class ShowController extends Controller
{
    static async defineShow(req, res)
    {
        let user   = req.session.user;
        let qry = {
            name:req.body.showName,
            owner:user,
            shortid:shortid.generate()
        };
        await Show.findOneAndUpdate({name:qry.name, username:qry.username}, qry, {upsert:true});
        res.json({shortid:qry.shortid});
    }

    static async deleteShow(req, res)
    {
        let user = this.getUser(req);
        await Show.deleteOne({name:req.body.name, owner:user, shortid:req.body.shortid})
        res.json({shortid:shortid});
    }

    static async showUserShows(req, res)
    {
        let db =this.getDB();
        let user = this.getUser(req);

    }

    static async indexAction(req, res)
    {
        let user = req.session.user;
        let qry = this.db.collection('shows').find({username:user.username});
        let shows = [];
        await qry.forEach(function(document){
            shows.push(document);
        });

        res.render('shows', {title:'Shows', shows:shows});
    }

}

module.exports = ShowController;