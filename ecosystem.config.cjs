module.exports = {
	apps: [
		{
			script: "backend/index.js",
			watch: ".",
		},
		{
			env: {
				DB_NAME: "mvfqgowf",
				DB_USERNAME: "mvfqgowf",
				DB_PASSWORD: "maDNjjO-_QJmL3lzG7Of2DHKGMnyH4xd",
				DB_HOSTNAME: "silly.db.elephantsql.com",
				HOST: "0.0.0.0",
				PORT: "3001",
				DB_DIALECT: "postgres",
				SECRET_KEY: "Krahe73",
			},
		},
	],

	deploy: {
		production: {
			user: "SSH_USERNAME",
			host: "SSH_HOSTMACHINE",
			ref: "origin/main",
			repo: "git@github.com:Ness733/portfolio2024-backend.git",
			path: "DESTINATION_PATH",
			"pre-deploy-local": "",
			"post-deploy":
				"npm install && pm2 reload ecosystem.config.js --env production",
			"pre-setup": "",
		},
	},
};
