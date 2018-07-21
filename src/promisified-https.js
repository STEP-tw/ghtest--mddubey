const https = require('https');

exports.promisifiedHttps = {
	makeRequest: (options, body) => {
		return new Promise((resolve, reject) => {
			const request = https.request(options, (response) => {
				response.setEncoding('utf-8');
				if (response.statusCode < 200 || response.statusCode > 299) {
					reject(new Error(`Unexpected response form server ${response.statusCode}`));
				};
				var responseContent = '';
				response.on('data', (d) => {responseContent += d});
				response.on('end', () => {resolve(responseContent)})
			})
			if (body) {
				request.write(JSON.stringify(body))
			};
			request.on('error', (err) => {reject(err)})
			request.end()
		});
	}
}