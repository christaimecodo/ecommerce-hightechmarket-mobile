

const app = require('./expressApp');
const connectDB = require('./db');
 
connectDB();
 
app.listen(6000, () => {
  console.log('🚀 Serveur démarré sur le port 6000');
});