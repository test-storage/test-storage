module.exports = function() {
    
    switch(process.env.NODE_ENV) {

        case 'development':
            return {
                // dev settings
                "db": {
					"mongodb": "mongodb://localhost/test-storage"
				},
				"errorHandlerOptions": {
					"dumpExceptions": true,
					"showStack": true
				},
				"logger": {
					"api": "logs/api.log",
					"exception": "logs/exceptions.log"
				}
            };

        case 'production':
            return {
                // prod settings
                "db": {
					"mongodb": "mongodb://localhost/test-storage"
				},
				"errorHandlerOptions": {
					"dumpExceptions": true,
					"showStack": true
				},
				"logger": {
					"api": "logs/api.log",
					"exception": "logs/exceptions.log"
				}
            };

		// default:
		//     return {error or other settings};
    }
};