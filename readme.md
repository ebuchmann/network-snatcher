# Network Snatcher

## Usage

To install: `npm install network-snatcher -D` or `yarn add -D network-snatcher`

To run: Import the package and run the init function, providing it a port to run on.

```
const networkSnatcher = require('network-snatcher');
networkSnatcher.init(3002);
```

Go to: `http://localhost:3002`. It will show you the network requests that your Node app is making. Useful to see the requests GraphQL is making.

## Todo

- Make more usable in projects
- Auto clear requests after loading x amount
- See if POST data is available
- Tooltip on status ## to view the code
- Different themes
- Options (?)
- Fix localhost / 127.0.0.1 duplication (?)
- Figure out NPM and fix dependencies so more are dev
- Adjust emits so it sends the req and then res
