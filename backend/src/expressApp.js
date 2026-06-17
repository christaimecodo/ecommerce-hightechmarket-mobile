//expressApp.js
const express = require('express');
const cors = require('cors');
const ProduitRoutes = require('./routes/Produits.js');
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
//dit à Express :“Toutes les routes définies dans ProduitRoutes doivent 
//être accessibles via le chemin
app.use('/api/produits', ProduitRoutes);
 
module.exports = app;