const fs = require('fs');

module.exports = {
    mongo:{
        host:"167.99.221.26",
        user:"lyreen_dba",
        pass:encodeURIComponent("estate-entangle-cupful-polonium")
    },
    live:false,
    https:false,
    // httpsConfig:{
    //     key:fs.readFileSync('./security/cert.key',{encoding:"utf8"}),
    //     cert:fs.readFileSync('./security/cert.pem',{encoding:"utf8"}),
    // }
}