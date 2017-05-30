const util = require('util');

const validator = {

    validateFields: function (req, res) {
        var fields = {};
        if (req.query.fields) {
            if (req.query.fields !== '') {
                // TODO error handling and safety validation

                let fieldsString = req.query.fields;
                fieldsString = fieldsString.replace(/\s+/g, ''); // delete whitespaces if exists
                let _fields = fieldsString.split(',');
                _fields.forEach(function (item, i, _fields) {
                    fields[item] = 1;
                });
                return fields;
            }
        }
        return fields;
    },

    validateLimit: function (req, res) {
        if (req.query.limit) {
            // TODO handle error exception
            req.checkQuery('limit', 'Invalid param').isInt();
            const limit = parseInt(req.query.limit, 3);
            if (limit > 200 || limit <= 0) {
                // "There have been validation errors: [ { param: 'limit', msg: 'Invalid param', value: 'huuu' } ]"
                res.status(400)
                    .json('There have been validation errors: [' +
                    '{ param: "limit", msg: "Bad value. Limit parameter should be mininum 1 and maximum 200 entities. ",' +
                    'current value: "' + req.query.limit + '" } ]');
                return;
            }
            const errors = req.validationErrors();
            if (errors) {
                res.status(400).json('There have been validation errors: ' + util.inspect(errors));
                return;
            } else {
                parseInt(req.query.limit, 3);
            }
        } else {
            // default limit
            return 20;
        }
    },

    isPathValid: function (req, res) {
        // check params (id as random)
        if (!req.params.id.match('^[a-f0-9]{32}$')) {
            res.status(400).json('Invalid ID');
            return false;
        } else {
            return true;
        }
    }
}
export { validator }
