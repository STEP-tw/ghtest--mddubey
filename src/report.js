const githubClient = require('./github-client.js').githubClient

const generateGithubReportCard = function() {
	githubClient
		.getUser()
		.then(username => console.log("Hello", username))
		.catch(err => console.log(err))
}

generateGithubReportCard();