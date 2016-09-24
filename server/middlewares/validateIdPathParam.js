var mongoose = require('mongoose');
var validator = {

    isMongoId: function (req) {
        // check params (id as mongoId)
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json('Wrong ID');
            return false;
        } else {
            return true;
        }
    }

}
module.exports = validator;