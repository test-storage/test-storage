const util = require('util');

/*
export class Validator {

    public validateFields(req, res) {
        let fields = {};
        if (req.query.fields) {
            if (req.query.fields !== '') {
                // TODO error handling and safety validation

                var fieldsString = req.query.fields;
                fieldsString = fieldsString.replace(/\s+/g, ''); // delete whitespaces if exists
                var _fields = fieldsString.split(',');
                _fields.forEach(function (item, i, _fields) {
                    fields[item] = 1;
                });
                return fields;
            }
        }
        return fields;
    }
} */

export class Validator {

    public validateFields(req, res) {
        if (req.query.fields) {
            if (req.query.fields !== '') {
                // TODO error handling and safety validation
                const fieldsString = req.query.fields;
                return fieldsString.replace(/,/g, ' ');
            }
        }

    }

    public validateOffset(req, res) {

        if (req.query.offset) {

            if (Number(req.query.offset)) {
                const offset = Number(req.query.offset);
                if (offset > 200 || offset <= 0) {
                    res.status(400).
                        json({
                            'status': 400,
                            'message': 'Bad value. Offset parameter should be minimum 1 and maximum 200 entities.' +
                            'Current value: ' + req.query.offset
                        });
                    throw new Error('Bad Request: Bad value. Offset parameter should be minimum 1 and maximum 200 entities.');
                } else {
                    return offset;
                }
            } else {
                res.status(400).
                    json({
                        'status': 400,
                        'message': 'Bad value. Offset parameter should be numberic.'
                    });
                throw new Error('Bad Request: Offset parameter should be numberic.');
            }
        } else {
            // default offset
            return 0;
        }
    }

    public validateLimit(req, res) {
        if (req.query.limit) {

            if (Number(req.query.limit)) {
                const limit = Number(req.query.limit);
                if (limit > 200 || limit <= 0) {
                    res.status(400).
                        json({
                            'status': 400,
                            'message': 'Bad value. Limit parameter should be minimum 1 and maximum 200 entities.' +
                            'Current value: ' + req.query.limit
                        });
                    throw new Error('Bad Request: Bad value. Limit parameter should be minimum 1 and maximum 200 entities.');
                } else {
                    return limit;
                }
            } else {
                res.status(400).
                    json({
                        'status': 400,
                        'message': 'Bad value. Limit parameter should be numberic.'
                    });
                throw new Error('Bad Request: Limit parameter should be numberic.');
            }
            /*
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
                return +req.query.limit;
            }
            */
        } else {
            // default limit
            return 20;
        }
    }

    isPathValid(req, res) {
        // check params (id as random)
        if (!req.params.id.match('^[a-f0-9]{32}$')) {
            res.
                status(400).
                json({
                    'status': 400,
                    'message': 'Invalid ID. Bad value of path {:id} parameter.'
                });
            return false;
        } else {
            return true;
        }
    }
}

