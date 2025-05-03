// routes/index.js
// Arquivo de rotas principais do aplicativo GOSTOSO

// Importação dos módulos necessários
const express = require("express");
const router = express.Router();

/**
 * Rota principal (página inicial)
 * GET /
 * Renderiza a página inicial do aplicativo com o formulário de acesso
 */
router.get("/", (req, res) => {
  try {
    // Renderiza a view 'index' com os dados necessários
    res.render("index", {
      title: "GOSTOSO - Cardápio Digital",
      // Pode-se adicionar aqui qualquer dado adicional necessário para a página
    });
  } catch (error) {
    console.error("Erro ao carregar a página inicial:", error);
    res.status(500).send("Erro ao carregar a página");
  }
});

/**
 * Rota de entrada rápida (sem login)
 * POST /entrada-rapida
 * Processa os dados do formulário de entrada rápida (nome e telefone)
 */
router.post("/entrada-rapida", (req, res) => {
  try {
    const { nome, telefone } = req.body;

    // Validação básica dos campos
    if (!nome || !telefone) {
      return res.status(400).render("index", {
        title: "GOSTOSO - Cardápio Digital",
        error: "Por favor, preencha todos os campos",
        valores: { nome, telefone },
      });
    }

    // Validação simples do telefone (pelo menos 8 dígitos)
    if (telefone.replace(/\D/g, "").length < 8) {
      return res.status(400).render("index", {
        title: "GOSTOSO - Cardápio Digital",
        error: "Por favor, insira um telefone válido",
        valores: { nome, telefone },
      });
    }

    // Em uma aplicação real, aqui poderíamos:
    // 1. Salvar os dados em uma sessão
    // 2. Registrar o acesso
    // 3. Enviar um SMS de confirmação

    // Redireciona para o cardápio
    res.redirect("/menu");
  } catch (error) {
    console.error("Erro no processamento da entrada rápida:", error);
    res.status(500).render("index", {
      title: "GOSTOSO - Cardápio Digital",
      error: "Ocorreu um erro ao processar sua solicitação",
    });
  }
});

/**
 * Rota de criação de conta (mock)
 * POST /criar-conta
 * Simula o processo de criação de conta
 */
router.post("/criar-conta", (req, res) => {
  try {
    const { nome, telefone, email, senha } = req.body;

    // Validação básica dos campos
    if (!nome || !telefone || !email || !senha) {
      return res.status(400).render("index", {
        title: "GOSTOSO - Cardápio Digital",
        error: "Por favor, preencha todos os campos",
        valores: { nome, telefone, email },
      });
    }

    // Validação simples do email
    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).render("index", {
        title: "GOSTOSO - Cardápio Digital",
        error: "Por favor, insira um email válido",
        valores: { nome, telefone, email },
      });
    }

    // Validação da senha (pelo menos 6 caracteres)
    if (senha.length < 6) {
      return res.status(400).render("index", {
        title: "GOSTOSO - Cardápio Digital",
        error: "A senha deve ter pelo menos 6 caracteres",
        valores: { nome, telefone, email },
      });
    }

    // Em uma aplicação real, aqui faríamos:
    // 1. Verificação se o email já está cadastrado
    // 2. Hash da senha
    // 3. Criação do usuário no banco de dados
    // 4. Envio de email de confirmação

    // Simula um tempo de processamento
    setTimeout(() => {
      res.json({
        success: true,
        message: "Conta criada com sucesso! Redirecionando...",
        redirect: "/menu",
      });
    }, 1500);
  } catch (error) {
    console.error("Erro na criação de conta:", error);
    res.status(500).render("index", {
      title: "GOSTOSO - Cardápio Digital",
      error: "Ocorreu um erro ao criar sua conta",
    });
  }
});

/**
 * Rota de login (mock)
 * POST /login
 * Simula o processo de login
 */
router.post("/login", (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação básica dos campos
    if (!email || !senha) {
      return res.status(400).render("index", {
        title: "GOSTOSO - Cardápio Digital",
        error: "Por favor, preencha todos os campos",
        valores: { email },
      });
    }

    // Em uma aplicação real, aqui faríamos:
    // 1. Busca do usuário pelo email
    // 2. Comparação da senha hash
    // 3. Criação da sessão
    // 4. Geração do token JWT se necessário

    // Mock de usuário válido
    const usuarioMock = {
      email: "cliente@gostoso.com",
      senha: "senha123", // Nunca fazer isso em produção!
    };

    if (email !== usuarioMock.email || senha !== usuarioMock.senha) {
      return res.status(401).render("index", {
        title: "GOSTOSO - Cardápio Digital",
        error: "Email ou senha incorretos",
        valores: { email },
      });
    }

    // Simula um tempo de processamento
    setTimeout(() => {
      res.json({
        success: true,
        message: "Login realizado com sucesso! Redirecionando...",
        redirect: "/menu",
      });
    }, 1500);
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).render("index", {
      title: "GOSTOSO - Cardápio Digital",
      error: "Ocorreu um erro ao realizar o login",
    });
  }
});

/**
 * Rota para login com Google (mock)
 * GET /auth/google
 * Simula o início do fluxo de OAuth com Google
 */
router.get("/auth/google", (req, res) => {
  try {
    // Em uma aplicação real, aqui seria o início do fluxo OAuth 2.0
    // Redirecionando para o Google com os parâmetros necessários

    // Para este mock, simulamos o redirecionamento
    res.json({
      message: "Fluxo de autenticação com Google iniciado",
      // Em produção, seria uma URL real do Google
      url: "https://accounts.google.com/o/oauth2/auth?client_id=CLIENT_ID&redirect_uri=CALLBACK_URL&scope=profile email&response_type=code",
    });
  } catch (error) {
    console.error("Erro no login com Google:", error);
    res.status(500).json({ error: "Erro ao iniciar autenticação com Google" });
  }
});

/**
 * Rota de callback para login com Google (mock)
 * GET /auth/google/callback
 * Simula o callback do fluxo de OAuth com Google
 */
router.get("/auth/google/callback", (req, res) => {
  try {
    // Em uma aplicação real, aqui processaríamos o código de autorização
    // obteríamos os tokens de acesso e os dados do usuário

    // Mock de dados do usuário
    const usuarioGoogle = {
      id: "google-123456",
      nome: "Cliente Google",
      email: "cliente@gmail.com",
      foto: "https://example.com/photo.jpg",
    };

    // Simula o processamento
    setTimeout(() => {
      res.redirect("/menu?login=google");
    }, 1000);
  } catch (error) {
    console.error("Erro no callback do Google:", error);
    res.redirect("/?error=google_login");
  }
});

// Exporta o router para ser utilizado na aplicação principal
module.exports = router;
