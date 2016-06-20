var moment = require("moment");

module.exports = function(app) {
    app.get("/:query", function(req, res) {
        var date = req.params.query;
        var unix;
        var natty;
        var dateJSON = { "unix": unix, "natural": natty }
        
        if (+date === parseInt(date, 10)) {
            unix = +date;
            natty = unixToNatty(unix);
        }
        else if (moment(date, "MMMM D, YYYY").isValid()) {
            natty = date;
            unix = nattyToUnix(natty);
        }
        else {
            unix = null;
            natty = null;
        }
        
        res.send(JSON.stringify(dateJSON));
    });
    
    function unixToNatty(unix) {
        return moment.unix(unix).format("MMMM D, YYYY");
    }
    
    function nattyToUnix(natty) {
        return natty.unix();
    }
}