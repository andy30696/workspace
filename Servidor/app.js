const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hola Mundo!");
});

app.listen(3000, function () {
    console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});