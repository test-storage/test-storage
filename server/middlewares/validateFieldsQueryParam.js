var util = require('util');

var fields = {

    isExist: function (req) {
        if (req.query.fields) {
            if (req.query.fields !== '') {
                return true;
            }
        }
        return false;
    },

    parseFields: function (req) {
        var fields = {};
        var fieldsString = req.query.fields;
        fieldsString = fieldsString.replace(/\s+/g, ''); // delete whitespaces if exists
        var _fields = fieldsString.split(","); 
        _fields.forEach(function (item, i, _fields) {
            fields[item] = 1;
        });
       // fields["_id"] = 0;
        console.log("fields:");
        console.log(fields);
        return fields;
    }
}
module.exports = fields;