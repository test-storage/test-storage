module.exports = function () {

	switch (process.env.NODE_ENV) {

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

		case 'test':
			return {
				// test settings
				"db": {
					"mongodb": "mongodb://localhost/test-storage-test"
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
					"dumpExceptions": false,
					"showStack": false
				},
				"logger": {
					"api": "logs/api.log",
					"exception": "logs/exceptions.log"
				}
			};
	}
};