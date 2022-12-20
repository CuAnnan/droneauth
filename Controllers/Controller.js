const mongoClient = require('../mongoClient');

class Controller
{
    /**
     * @param req
     * @returns {mongoClient} The MongoDB instance
     * Get the mongo client from the app locals
     */

    static getUser(req)
    {
        let user = req.session.user;
        if(!user)
        {
            throw new Error('No user logged in');
        }

    }
}

mongoClient.connect().then((client) => {
    Controller.db = client.db('lyreen');
}).catch(err => {
    console.log(err)
});


module.exports = Controller;