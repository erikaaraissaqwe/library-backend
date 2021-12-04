const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch(err => {
    console.log("Não foi possível conectar ao banco de dados", err);
    process.exit();
  });

app.get("/", (req, res) => {
    res.json({ msg: "Está funcionando!" });
  });

require("./src/routes/user.routes")(app);
require("./src/routes/book.routes")(app);
require("./src/routes/admin.routes")(app);
require("./src/routes/bookUser.routes")(app);

const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}.`);
  });