const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://HACKATHON2023:SDrznKn0Bu9Zh4p0@clusterhackathon.w9ihttj.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión a MongoDB exitosa');
}).catch(error => {
  console.error('Error al conectar a MongoDB:', error);
});
