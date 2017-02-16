var multer = require('multer')

/*
// Storage option can be changed - check Multer docs
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = './uploads' // Make sure this path exists
        cb(null, path)
    }
})

var upload = multer({
    storage: storage
})
*/
var upload = multer().single('file');

var attachments = {

    /*
     * Get all attachments
     *
     */
    getAll: function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                return
            }

            // Everything went fine
        })
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


    },

    /*
     * Update group
     *
     */

    update: function (req, res) {
    },

    /*
     * Delete group
     *
     */

    delete: function (req, res) {


    }


};

module.exports = attachments;

