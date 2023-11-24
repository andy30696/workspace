const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

//variables de token -------------------------------------
const jwt = require("jsonwebtoken");
const SECRET_KEY = "claveSecreta";
const ruta = express.Router();

//const { User, authenticateUser } = require("autenticador");
// --------------------------------------------------------
app.use(express.urlencoded({ extended: false }));
// Variables autenticador ------------------------------------------
const mysql = require("mysql");

const bcrypt = require("bcryptjs"); // encripta el string pasado
const myConnection = require("express-myconnection");
//------------------------------------------------------------------

app.use(express.json());

const verificarToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ auth: false, message: "Token no proporcionado" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Falló la autenticación del token" });
    }

    // Si el token es válido, se almacena el ID del usuario en el objeto de solicitud (req)
    req.userId = decoded.id;
    next(); // Continuar con la siguiente operación después de la verificación del token
  });
};

app.get("/", function (req, res) {
  res.send("Hola Mundo!");
});

app.listen(3000, function () {
  console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});

app.get("/emercado-api-main/cart/:filename", verificarToken, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "emercado-api-main", "cart", filename);

  if (token !== previousToken) {
    return res.status(401).json({ auth: false, message: "Token no válido" });
  }

  // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
  res.sendFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Archivo no encontrado");
      return;
    }
    const jsonData = JSON.stringify(data);
    res.json(jsonData);
  });
});

app.get("/emercado-api-main/cats/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "emercado-api-main", "cats", filename);

  // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
  res.sendFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Archivo no encontrado");
      return;
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.get("/emercado-api-main/cats_products/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(
    __dirname,
    "emercado-api-main",
    "cats_products",
    filename
  );

  // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
  res.sendFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Archivo no encontrado");
      return;
    }
    const jsonData = JSON.stringify(data);
    res.json(jsonData);
  });
});

app.get("/emercado-api-main/products/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(
    __dirname,
    "emercado-api-main",
    "products",
    filename
  );

  // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
  res.sendFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Archivo no encontrado");
      return;
    }
    const jsonData = JSON.stringify(data);
    res.json(jsonData);
  });
});

app.get("/emercado-api-main/products_comments/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(
    __dirname,
    "emercado-api-main",
    "products_comments",
    filename
  );

  // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
  res.sendFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Archivo no encontrado");
      return;
    }
    const jsonData = JSON.stringify(data);
    if (jsonData == "") {
      console.log("sin comentarios");
      res.send("Sin comentarios");
    } else {
      res.json(jsonData);
    }
  });
});

app.get("/emercado-api-main/sell/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "emercado-api-main", "sell", filename);

  // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
  res.sendFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Archivo no encontrado");
      return;
    }
    const jsonData = JSON.stringify(data);
    res.json(jsonData);
  });
});

app.get(
  "/emercado-api-main/user_cart/:filename",
  verificarToken,
  (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(
      __dirname,
      "emercado-api-main",
      "user_cart",
      filename
    );

    // Devuelve el archivo JSON si existe, de lo contrario, devuelve un error 404
    res.sendFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).send("Archivo no encontrado");
        return;
      }
      const jsonData = JSON.stringify(data);
      res.json(jsonData);
    });
  }
);

// token ------------------------------------------------------------------------------------

app.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  User.create(
    {
      username: username,
      email: email,
      password: password,
    },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log("Usuario creado:\n", result);
        const userId = result.id;
        const token = jwt.sign({ id: userId }, SECRET_KEY, {
          expiresIn: 60 * 60 * 24, // el token expirará después de 24 horas
        });
        res.status(200).json({ auth: true, token: token });
      }
    }
  );
});

app.get("/me", (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ auth: false, message: "No tienes un token autorizado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    User.getById(userId, (err, user) => {
      if (err) {
        console.log("Error al obtener el usuario:", err);
        return res.status(500).json({ error: "Error al obtener el usuario" });
      }
      console.log("Usuario encontrado:", user);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json({ user: user });
    });
  } catch (error) {
    console.log("Token inválido:", error);
    return res.status(500).json({ error: "Token inválido" });
  }
});

let previusToken = "";
app.post("/signin", (req, res, next) => {
  // Lógica de inicio de sesión
  const { email, password } = req.body;
  console.log(email, password);

  authenticateUser(email, password, (err, token) => {
    if (err) {
      console.log("Error en la autenticacion: ", err);
      return res
        .status(401)
        .json({ auth: false, message: "Credenciales incorrectas" });
    }
    previusToken = "";
    User.getById(email, (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Error al obtener el usuario" });
      }

      const userToken = jwt.sign({ username: user.username }, SECRET_KEY, {
        expiresIn: 60 * 60 * 24, // el token expirará después de 24 horas
      });
      previusToken = userToken;

      res
        .status(200)
        .json({ auth: true, token: userToken, message: "autorizado" });
    });
  });
});
module.exports = ruta;

/////////////////////////////////      BASE DE DATOS       ///////////////////////////////////////////

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "54652162",
  database: "workspace",
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});

const User = {
  create: (userData, callback) => {
    // ecnciptar la contraseña antes de guardarla
    bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) throw err;

      // reemplazamos la password con la original con el hash
      userData.password = hash;

      connection.query("INSERT INTO users SET ?", userData, callback);
    });
  },
  getAll: (callback) => {
    connection.query("SELECT * FROM users", callback);
  },
  getById: (id, callback) => {
    connection.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },
  // Otros métodos para crear, actualizar o borrar usuarios según tu necesidad
};
const verifyPassword = (plainPassword, hashedPassword, callback) => {
  bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, isMatch);
  });
};

const authenticateUser = (email, password, callback) => {
  connection.query(
    "SELECT username, password FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback("Usuario no encontrado", null);
      }
      const { username, password: storedPassword } = results[0];

      verifyPassword(password, storedPassword, (error, isMatch) => {
        if (error) {
          return callback(error, null);
        }

        if (!isMatch) {
          return callback("Contraseña incorrecta", null);
        }
        //  generamos un token JWT después de la autenticación exitosa.
        const token = jwt.sign({ username, email }, SECRET_KEY);
        callback(null, token);
      });
    }
  );
};

module.exports = { User, authenticateUser };
