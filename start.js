const mongoose = require('mongoose');
// models 🚶
require('./models/Bar');
// App
const app = require('./app');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log(`💩 : ${err.message}`);
});

app.set('port', process.env.PORT || 7778);
const server = app.listen(app.get('port'), () => {
  console.log(`Express is running on PORT ${server.address().port}`);
});
