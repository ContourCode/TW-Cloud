# TW-Cloud
A lightweight NodeJS library for connecting to Turbowarp cloud variables.

Example:
```js
const TWConnection = require('TW-Cloud'); // import library
const connection = new TWConnection('username', <project_id>); // create new tw connection class
connection.init(); // initiate the web socket
connection.on('set', obj => { // when variable is changed on client side, triggers event
    connection.set(obj.name, '10') // sets the variable that was changed to 10
    console.log(connection.get(obj.name)) // prints the value of the variable to the console, in this case, 10
});
```

(proper docs coming soon)
