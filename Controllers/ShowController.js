const Controller = require('./Controller');
const shortid = require('shortid');

class ShowController extends Controller
{
    static async defineShow(req, res)
    {
        let user   = this.getUser(req);
        let showId = shortid.generate();
        await this.db.collection('shows').updateOne({showName:req.body.showName, username:user.username, streams:[]},{$set:{shortid:showId}},{upsert:true})();
        res.json({shortid:showId});
    }

    static async deleteShow(req, res)
    {
        let user = this.getUser(req);
        await this.db.collection('shows').deleteOne({showName:req.body.showName, username:user.username, shortid:req.body.showId});
        res.json({shortid:showId});
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