var multer = require('multer')

// Storage option can be changed - check Multer docs
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = './uploads' // Make sure this path exists
        cb(null, path)
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})

var upload = multer({
    storage: storage
}).single('file');


var attachments = {

    /*
     * Get all attachments
     *
     */
    getAll: function (req, res) {
       
    },


    /*
     * Get single attachment
     *
     */

    getOne: function (req, res) {

    },

    /*
       * Create attachment
       *
       */

    create: function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null });
            // Everything went fine
        });
    },

    /*
     * Update attachment
     *
     */

    update: function (req, res) {
    },

    /*
     * Delete attachment
     *
     */

    delete: function (req, res) {


    }


};

module.exports = attachments;

