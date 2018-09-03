Removing the separate repo for schema

Issues:
1. Complex PR process including failing CI so can't just merge.
2. Schema doesn't make sense without API change. They are inherently linked.

Solutions:

	- Merge schema to api repo:
		- Still publish to npm but at least we look after schema in the same repo.
		- Reduces PR complexity as we don't have two for the api.
		- Complexity over working out what has changed for the release pipeline.
		- lerna works and links the packages nicely but wants to publish everything.
	
	- Mono repo
		- Move everything into one repo.
		- Complexity over what has changed for release. Could we solve this with hash the dir?
	
	- Runtime schema
		- Merges schema into api but the UI works out what it needs for the server by running queries
		against a running server.
		- This creates dependency on the server at lint and build times. So dev, CI and netlify
		- No package required any more though
		