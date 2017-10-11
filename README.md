# Boilerplate for teaching with React

If you're teaching React, having a local API is useful, but you don't want to go through the trouble of setting up a server. This project is pre-configured with `[json-server](https://github.com/typicode/json-server)` for that purpose.

The setup is minimal, with a webpack config for building the React app and serving it with `[json-server](https://github.com/typicode/json-server)`. `db.json` can be populated with data and that can be reached via `localhost:3030/api/*` from the React app.

There are a handful of scripts in `package.json` and that is enough to build and run the local server for development.

There is no HMR or LiveReload, by design. I just need a simple setup.

**If you have something to add that is useful to many people and keeps this simple, I'm happy to accept contributions.**