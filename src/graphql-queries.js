const fs = require('fs')

exports.graphqlQueries = {
	getUserRepoQuery: fs.readFileSync('./src/graphql-queries/fetch-user-repos', 'utf-8')
}