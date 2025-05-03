const express = require("express");
const router = express.Router();

// Mock de dados do cardápio
const menuItems = [
  {
    id: 1,
    nome: "Feijoada Completa",
    descricao:
      "Feijão preto com linguiça, carne seca, costelinha e acompanhamentos",
    preco: 45.9,
    categoria: "Pratos",
    imagem: "/images/feijoada.jpg",
    ingredientes: [
      "Feijão preto",
      "Linguiça calabresa",
      "Carne seca",
      "Costelinha de porco",
      "Couve",
      "Farofa",
      "Laranja",
    ],
  },
  {
    id: 2,
    nome: "Brigadeiro Gourmet",
    descricao: "Brigadeiro feito com chocolate 70% cacau e granulado especial",
    preco: 12.5,
    categoria: "Sobremesas",
    imagem: "/images/brigadeiro.jpg",
    ingredientes: [
      "Chocolate 70% cacau",
      "Leite condensado",
      "Manteiga",
      "Granulado especial",
    ],
  },
];

// Rota para a página do cardápio
router.get("/", (req, res) => {
  res.render("menu", { title: "Cardápio - GOSTOSO" });
});

// Rota para obter itens do cardápio (API)
router.get("/items", (req, res) => {
  const category = req.query.category;

  if (category) {
    const filteredItems = menuItems.filter(
      (item) => item.categoria === category
    );
    res.json(filteredItems);
  } else {
    res.json(menuItems);
  }
});

// Rota para obter detalhes de um item específico
router.get("/item/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = menuItems.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item não encontrado" });
  }
});

module.exports = router;
