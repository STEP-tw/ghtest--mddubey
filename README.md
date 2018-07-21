# ghtest--mddubey
A complicated way to know your github username.

#### How to Use:-
- Generate an access-token for your account. [Steps Here.](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) **This is a long living token generated for your account. Safty is in your hands.**
- Export the access token as an env variable
	
	`export GITHUB_TOKEN=<Your access token>`
- Run the report card

        `node src/report.js`


