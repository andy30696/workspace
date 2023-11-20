const express = require("express");
const fs = require("fs");
const path = require('path');

const app = express();
const port = 3000;


app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hola Mundo!");
});

app.listen(3000, function () {
    console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});

app.get('/emercado-api-main/cart/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname,'emercado-api-main', 'cart', filename);
  
    // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
    res.sendFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).send('Archivo no encontrado');
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

  app.get('/emercado-api-main/cats/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname,'emercado-api-main','cats', filename);
  
    // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
    res.sendFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).send('Archivo no encontrado');
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

  app.get('/emercado-api-main/cats_products/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname,'emercado-api-main','cats_products', filename);
  
    // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
    res.sendFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).send('Archivo no encontrado');
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

  app.get('/emercado-api-main/products/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname,'emercado-api-main','products', filename);
  
    // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
    res.sendFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).send('Archivo no encontrado');
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

  app.get('/emercado-api-main/products_comments/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname,'emercado-api-main','products_comments', filename);
  
    // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
    res.sendFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).send('Archivo no encontrado');
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

  app.get('/emercado-api-main/sell/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname,'emercado-api-main','sell', filename);
  
    // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
    res.sendFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).send('Archivo no encontrado');
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

  app.get('/emercado-api-main/user_cart/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname,'emercado-api-main','user_cart', filename);
  
    // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
    res.sendFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).send('Archivo no encontrado');
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });
