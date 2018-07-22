const promisifiedHttps = require('./promisified-https.js').promisifiedHttps
const graphqlQueries = require('./graphql-queries.js').graphqlQueries

const requestOptions = {
	'hostname': 'api.github.com',
	'path': '/graphql',
	'method': 'POST',
	'headers': {
		'Content-Type': 'application/json',
		'Authorization': 'bearer ' + process.env.GITHUB_TOKEN,
		'User-Agent': 'graphql client'
	}
};


exports.githubClient = {
	getUser: () => {
		var data = {
			'query': "query { viewer { login }}",
			'variables': {}
		};
		return promisifiedHttps
			.makeRequest(requestOptions, data)
			.then(response => new Promise(resolve => {
				responseJson = JSON.parse(response)
				return resolve(responseJson.data.viewer.login)
			}))
			.catch(err => {
				console.log("Error while fetching current user details");
				throw err;
			})
	},

	fetchUserRepos: (username) => {
		var data = {
			'query': graphqlQueries.getUserRepoQuery,
			'variables': {username:username}
		}

		return promisifiedHttps
			.makeRequest(requestOptions, data)
			.then(response => new Promise((resolve, reject) => {
				responseJson = JSON.parse(response).data;
				if (!responseJson.user) {
					reject(new Error(`No Such User ${username}`));
				};
				repositories = responseJson.user.repositories
				//As of now last 30 repos. Might need to paginate
				var reportData = {
					total: repositories.totalCount,
					repos: repositories.edges.map(edge => edge.node.name)
				}
				return resolve(reportData)
			}))
			.catch(err => {
				console.log("Error while fetching repos for", username);
				throw err;
			})
	}
}