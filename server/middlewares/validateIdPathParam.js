var mongoose = require('mongoose');
var validator = {

    isMongoId: function (req, res) {
        // check params (id as mongoId)
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json('Wrong ID');
            return false;
        } else {
            return true;
        }
    },

    isIdValid: function (req, res) {
        // check params (id as random)
        if (!req.params.id.match("^[a-f0-9]{32}$")) {
            res.status(400).json('Invalid ID');
            return false;
        } else {
            return true;
        }
    }

}
module.exports = validator;