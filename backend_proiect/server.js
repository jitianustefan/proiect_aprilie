const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var cors = require('cors');

// Importăm modulele de rute
const frontRoutes = require('./front');
const adminRoutes = require('./admin');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Utilizăm rutele în aplicație
app.use(cors({
    origin: 'http://localhost:3000' // Adaugă aici portul pe care rulează aplicația React
}));

app.use('/', frontRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});