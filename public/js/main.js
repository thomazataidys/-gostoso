// Função principal que é executada quando o DOM está carregado
document.addEventListener("DOMContentLoaded", function () {
  // Verifica em qual página estamos
  if (document.querySelector(".menu-items")) {
    loadMenuItems();
    setupCart();
  }
});

// Carrega os itens do cardápio
function loadMenuItems() {
  // Simulação de requisição AJAX para obter os itens do cardápio
  // Na implementação real, isso seria uma chamada para o backend
  setTimeout(() => {
    const menuItems = [
      {
        id: 1,
        nome: "Feijoada Completa",
        descricao:
          "Feijão preto com linguiça, carne seca, costelinha e acompanhamentos",
        preco: 45.9,
        categoria: "Pratos",
        imagem: "/images/feijoada.jpg",
      },
      {
        id: 2,
        nome: "Brigadeiro Gourmet",
        descricao:
          "Brigadeiro feito com chocolate 70% cacau e granulado especial",
        preco: 12.5,
        categoria: "Sobremesas",
        imagem: "/images/brigadeiro.jpg",
      },
      // Mais itens podem ser adicionados aqui
    ];

    renderMenuItems(menuItems);
  }, 500);
}

// Renderiza os itens do cardápio na página
function renderMenuItems(items) {
  const menuContainer = document.querySelector(".menu-items");
  menuContainer.innerHTML = "";

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "menu-item";
    itemElement.innerHTML = `
            <div class="item-image" style="background-image: url('${
              item.imagem
            }')"></div>
            <div class="item-info">
                <h3>${item.nome}</h3>
                <p class="item-description">${item.descricao}</p>
                <div class="item-footer">
                    <span class="item-price">R$ ${item.preco.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${item.id}">+</button>
                </div>
            </div>
        `;

    menuContainer.appendChild(itemElement);
  });
}

// Configura o carrinho de compras
function setupCart() {
  // Inicializa o carrinho se não existir no localStorage
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  // Atualiza o total do carrinho
  updateCartTotal();

  // Adiciona event listeners para os botões "Adicionar ao carrinho"
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
      const itemId = parseInt(e.target.getAttribute("data-id"));
      addItemToCart(itemId);
    }
  });
}

// Adiciona um item ao carrinho
function addItemToCart(itemId) {
  // Obter o carrinho atual do localStorage
  const cart = JSON.parse(localStorage.getItem("cart"));

  // Verificar se o item já está no carrinho
  const existingItem = cart.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: itemId, quantity: 1 });
  }

  // Salvar o carrinho atualizado
  localStorage.setItem("cart", JSON.stringify(cart));

  // Atualizar o total exibido
  updateCartTotal();

  // Feedback visual para o usuário
  alert("Item adicionado ao carrinho!");
}

// Atualiza o total do carrinho no footer
function updateCartTotal() {
  // Na implementação real, isso calcularia o total baseado nos itens do carrinho
  // Aqui estamos simulando com um valor fixo para demonstração
  const cartTotalElement = document.querySelector(".sacola-total");
  if (cartTotalElement) {
    cartTotalElement.textContent = "R$ 0,00"; // Substituir por cálculo real
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contentArea = document.querySelector(".menu-list");

  const tabContent = {
    Pratos: `
          <div class="category-section">
              <h3>Pratos</h3>
              <div class="item-circle"></div>
              <div class="item-circle"></div>
          </div>
      `,
    Sobremesas: `
          <div class="category-section">
              <h3>Sobremesas</h3>
              <div class="item-circle"></div>
              <div class="item-circle"></div>
          </div>
      `,
    Bebidas: `
          <div class="category-section">
              <h3>Bebidas</h3>
              <div class="item-circle"></div>
              <div class="item-circle"></div>
          </div>
      `,
  };

  function updateTab(tabName) {
    tabs.forEach((tab) => tab.classList.remove("active"));
    const activeTab = Array.from(tabs).find(
      (tab) => tab.textContent === tabName
    );
    if (activeTab) activeTab.classList.add("active");
    contentArea.innerHTML = tabContent[tabName];
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      updateTab(tab.textContent);
    });
  });

  updateTab("Pratos"); // Carrega padrão
});
