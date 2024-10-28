
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.get('/', function (req, res) {
	 console.log('okokoookokokook.')
});
app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
