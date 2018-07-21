const promisifiedHttps = require('./promisified-https.js').promisifiedHttps


exports.githubClient = {
	getUser: () => {
		var options = {
			'hostname': 'api.github.com',
			'path': '/graphql',
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + process.env.GITHUB_TOKEN,
				'User-Agent': 'graphql client'
			}
		}
		var data = {
			'query': "query { viewer { login }}",
			'variables': {}
		};
		return promisifiedHttps
			.makeRequest(options, data)
			.then(response => new Promise(resolve => {
				responseJson = JSON.parse(response)
				return resolve(responseJson.data.viewer.login)
			}))
			.catch(err => {
				console.log("Error while fetching current user details");
				throw err;
			})
	}
}