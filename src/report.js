const githubClient = require('./github-client.js').githubClient


const generateGithubReportCard = function(username) {
	//As of now these two are indepedent
	githubClient
		.getUser()
		.then(username => console.log("Hello", username))
		.catch(err => console.log(err))

	githubClient
		.fetchUserRepos(username)
		.then(reportData => {
			console.log("****************************")
			console.log("Information about",username);
			console.log("Number of all repos",reportData.total)
			console.log("Latest 30 repos", reportData.repos)
			console.log("****************************")
		})
		.catch(err => console.log(err))
}
username = process.argv[2]
generateGithubReportCard(username);