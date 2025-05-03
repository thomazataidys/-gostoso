// Importação dos módulos necessários
const express = require("express");
const path = require("path");
const ejs = require("ejs");

// Criação da aplicação Express
const app = express();

// Configuração do EJS como engine de visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const indexRouter = require("./routes/index");
const menuRouter = require("./routes/menu");
app.use("/", indexRouter);
app.use("/menu", menuRouter);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
