const server = require('./server.js');

const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.log('server is running on port ' + port);
});
