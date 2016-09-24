var util = require('util');

var validator = {

    isExist: function (req) {
        if (req.query.limit) {
            return true;
        } else {
            return false;
        }
    },

    isInt: function (req, res) {
        // TODO handle error exception
        req.checkQuery('limit', 'Invalid param').isInt();
        if (parseInt(req.query.limit) > 200) {
            // "There have been validation errors: [ { param: 'limit', msg: 'Invalid param', value: 'huuu' } ]"
            res
            .status(400)
            .json("There have been validation errors: [ { param: 'limit', msg: 'Too many entities requested. Max limit 200 entities.', value: '" + req.query.limit + "' } ]");
            return;

        }

        var errors = req.validationErrors();
        if (errors) {
            res.status(400).json('There have been validation errors: ' + util.inspect(errors));
            return;
        }
    },

    sanitize: function (req) {
        return parseInt(req.query.limit);
    }


}
module.exports = validator;