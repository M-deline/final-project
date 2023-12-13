const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://projectuser:projectuser@cluster-project.jwvyi1a.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error: ', err));

module.exports = mongoose.connection;

