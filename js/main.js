document.addEventListener('DOMContentLoaded', () => {
    // --- DADOS DE EXEMPLO DOS PRODUTOS ---
    const products = [
        { id: 1, name: "Lady Killers: Assassinas em Série", author: "Tori Telfer", price: 49.90, image: "imagens/lady killers.jpg", category: "Mistério" },
        { id: 2, name: "A Culpa é das Estrelas", author: "John Green", price: 35.50, image: "imagens/A Culpa é Das Estrelas.jpg", category: "Romance" },
        { id: 3, name: "A Seleção", author: "Kiera Cass", price: 59.00, image: "imagens/seleçao.jpg", category: "Fantasia" },
        { id: 4, name: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", price: 42.75, image: "imagens/harry potter.jpg", category: "Fantasia" },
        { id: 5, name: "Coraline", author: "Neil Gaiman", price: 38.90, image: "imagens/coraline.jpg", category: "Fantasia" },
        { id: 6, name: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", price: 29.90, image: "imagens/PequenoPrincipe.jpg", category: "Infantil" },
        { id: 7, name: "1984", author: "George Orwell", price: 45.00, image: "imagens/1984.jpg", category: "Ficção" },
        { id: 8, name: "Orgulho e Preconceito", author: "Jane Austen", price: 52.50, image: "imagens/Orgulhoepreconceito.jpg", category: "Romance" },
        { id: 9, name: "O Sol é Para Todos", author: "Harper Lee", price: 48.70, image: "imagens/osoleparatodos.jpg", category: "Ficção" },
        { id: 10, name: "Cidades de Papel", author: "John Green", price: 33.20, image: "imagens/cidadesdepapel.jpg", category: "Romance" },
        {
            id: '13',
            title: 'Além da Capa', // 'name' para consistência
            name: 'Além da Capa',
            author: 'Gue Oliveira',
            price: 39.90,
            image: 'imagens/alem da capa.jpg',
            category: 'ficcao',
            description: 'Prepare-se para uma experiência única que entrelaça histórias e revela camadas.'
        },
        {
            id: '14',
            title: 'O Livro da Capa Verde: Um ensaio sobre a realidade', // 'name' para consistência
            name: 'O Livro da Capa Verde: Um ensaio sobre a realidade',
            author: 'Bruno Eduardo Freitas Gontijo',
            price: 29.50,
            image: 'imagens/capa verde ne.jpg',
            category: 'nao-ficcao',
            description: 'Um ensaio profundo sobre a percepção da realidade e suas múltiplas facetas.'
        },
        {
            id: '15',
            title: 'Coraline e o Mundo Secreto', // 'name' para consistência
            name: 'Coraline e o Mundo Secreto',
            author: 'Neil Gaiman',
            price: 45.00,
            image: 'imagens/coraline.jpg',
            category: 'fantasia',
            description: 'Uma menina descobre uma porta secreta para um mundo alternativo, estranhamente parecido com o seu.'
        },
        {
            id: '16',
            title: 'Harry Potter e a Pedra Filosofal', // 'name' para consistência
            name: 'Harry Potter e a Pedra Filosofal',
            author: 'J.K. Rowling',
            price: 55.90,
            image: 'imagens/harry potter.jpg',
            category: 'fantasia',
            description: 'O início da jornada de um jovem bruxo em um mundo de magia e aventura.'
        },
        {
            id: '17',
            title: 'A Seleção', // 'name' para consistência
            name: 'A Seleção',
            author: 'Kiera Cass',
            price: 38.70,
            image: 'imagens/seleçao.jpg',
            category: 'romance',
            description: 'Em um futuro distópico, trinta e cinco garotas competem pela mão de um príncipe.'
        }
    ];


    // --- ELEMENTOS GLOBAIS ---
    const productsContainer = document.getElementById('productsContainer');
    const cartItemCountElement = document.getElementById('cart-item-count');
    const mainNav = document.getElementById('mainNav');
    const menuToggle = document.getElementById('menuToggle');
    const currentYearElement = document.getElementById('currentYear');

    // --- INICIALIZAÇÃO ---
    let cart = loadCart();
    let favorites = loadFavorites();
    updateCartCount();
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- RENDERIZAÇÃO DE PRODUTOS NA HOME ---
    function renderProducts(productsToRender = products) {
        if (!productsContainer) return;
        productsContainer.innerHTML = ''; 

        if (productsToRender.length === 0) {
            productsContainer.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;">Nenhum livro encontrado com esses termos. Tente uma nova busca!</p>';
            return;
        }

        productsToRender.forEach(product => {
            const isFavorite = favorites.includes(product.id);
            const productCard = `
                <article class="product-card" data-id="${product.id}">
                    <a href="#" class="product-image-link">
                        <img src="${product.image}" alt="Capa do Livro ${product.name}">
                    </a>
                    <h3>${product.name}</h3>
                    <p class="author">Por ${product.author}</p>
                    <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                    <div class="product-card-actions">
                        <button class="btn btn-primary add-to-cart-button">
                            <i class="fas fa-cart-plus"></i> Comprar
                        </button>
                        <button class="btn favorite-button ${isFavorite ? 'active' : ''}" aria-label="Adicionar aos Favoritos">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </article>
            `;
            // O ícone do coração antigo com <img> foi removido, mantendo o <i> que já é FontAwesome.
            // <img src="imagens/favorite_24dp_E3E3E3_FILLO_wght400_GRADO_opsz24.png" alt="">
            productsContainer.insertAdjacentHTML('beforeend', productCard);
        });
        addEventListenersToProductCards();
    }

    // --- MENU HAMBÚRGUER ---
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            const headerContent = document.querySelector('.header-content');
            if (headerContent) headerContent.classList.toggle('nav-open');
        });
    }

    // --- CARRINHO DE COMPRAS ---
    function loadCart() {
        return JSON.parse(localStorage.getItem('almaDePapelCart')) || [];
    }

    function saveCart() {
        localStorage.setItem('almaDePapelCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        if (cartItemCountElement) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartItemCountElement.textContent = totalItems;
            cartItemCountElement.classList.toggle('hidden', totalItems === 0);
        }
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        updateCartCount();
        showFeedbackMessage(`"${product.name}" foi adicionado ao seu cesto!`, 'success', 'feedbackMessageContainer');
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartCount();
        renderCartPage(); 
        if (cart.length > 0) { 
            showFeedbackMessage(`Item removido do cesto.`, 'success', 'cartFeedback');
        }
    }

    function updateQuantityInCart(productId, quantity) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity = quantity;
            if (cartItem.quantity <= 0) {
                removeFromCart(productId); 
            } else {
                saveCart();
            }
        }
        updateCartCount();
        renderCartPage(); 
    }

    function renderCartPage() {
        const cartTableBody = document.getElementById('cartTableBody');
        const cartSubtotalEl = document.getElementById('cartSubtotal');
        const cartTotalEl = document.getElementById('cartTotal');
        const emptyCartMessageEl = document.getElementById('emptyCartMessage');
        const cartTableEl = document.getElementById('cartTable');
        const cartSummaryWrapperEl = document.getElementById('cartSummaryWrapper');
        
        if (!cartTableBody) return; 

        if (cart.length === 0) {
            emptyCartMessageEl.classList.remove('hidden');
            cartTableEl.classList.add('hidden');
            cartSummaryWrapperEl.classList.add('hidden');
            return;
        }

        emptyCartMessageEl.classList.add('hidden');
        cartTableEl.classList.remove('hidden');
        cartSummaryWrapperEl.classList.remove('hidden');

        cartTableBody.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;
            const row = `
                <tr data-id="${item.id}">
                    <td data-label="Produto">
                        <div class="cart-product-info">
                            <img src="${item.image}" alt="${item.name}">
                            <div>
                                <h4>${item.name}</h4>
                                <p>${item.author}</p>
                            </div>
                        </div>
                    </td>
                    <td data-label="Preço Unit.">R$ ${item.price.toFixed(2).replace('.', ',')}</td>
                    <td data-label="Quantidade">
                        <div class="quantity-controls">
                            <button type="button" class="decrease-quantity" title="Diminuir">-</button>
                            <input type="number" value="${item.quantity}" min="1" aria-label="Quantidade" class="item-quantity">
                            <button type="button" class="increase-quantity" title="Aumentar">+</button>
                        </div>
                    </td>
                    <td data-label="Subtotal">R$ ${itemSubtotal.toFixed(2).replace('.', ',')}</td>
                    <td data-label="Remover">
                        <button class="btn-remove-item remove-from-cart-button" title="Remover Item"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
            `;
            cartTableBody.insertAdjacentHTML('beforeend', row);
        });

        cartSubtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        cartTotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`; 
        addEventListenersToCartItems();
    }

    // --- FAVORITOS ---
    function loadFavorites() {
        return JSON.parse(localStorage.getItem('almaDePapelFavorites')) || [];
    }

    function saveFavorites() {
        localStorage.setItem('almaDePapelFavorites', JSON.stringify(favorites));
    }

    function toggleFavorite(productId, buttonElement) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const productIndex = favorites.indexOf(productId);
        let message = '';
        let type = 'success';

        if (productIndex > -1) {
            favorites.splice(productIndex, 1); 
            buttonElement.classList.remove('active');
            buttonElement.setAttribute('aria-label', 'Adicionar aos Favoritos');
            message = `"${product.name}" foi removido dos seus favoritos.`;
        } else {
            favorites.push(productId); 
            buttonElement.classList.add('active');
            buttonElement.setAttribute('aria-label', 'Remover dos Favoritos');
            message = `"${product.name}" foi adicionado aos seus favoritos! <i class="fas fa-heart"></i>`;
        }
        saveFavorites();
        const feedbackContainerId = document.getElementById('favoritesContainer') ? 'feedbackMessageFavorites' : 'feedbackMessageContainer';
        showFeedbackMessage(message, type, feedbackContainerId);

        if (document.getElementById('favoritesContainer')) {
            renderFavoritesPage();
        }
    }

    function renderFavoritesPage() {
        const favoritesContainer = document.getElementById('favoritesContainer');
        const emptyFavoritesMessageEl = document.getElementById('emptyFavoritesMessage');

        if (!favoritesContainer) return;

        favoritesContainer.innerHTML = '';
        const favoriteProducts = products.filter(p => favorites.includes(p.id));

        if (favoriteProducts.length === 0) {
            emptyFavoritesMessageEl.classList.remove('hidden');
            favoritesContainer.classList.add('hidden'); 
            return;
        }

        emptyFavoritesMessageEl.classList.add('hidden');
        favoritesContainer.classList.remove('hidden');

        favoriteProducts.forEach(product => {
            const productCard = `
                <article class="product-card" data-id="${product.id}">
                    <a href="#" class="product-image-link">
                        <img src="${product.image}" alt="Capa do Livro ${product.name}">
                    </a>
                    <h3>${product.name}</h3>
                    <p class="author">Por ${product.author}</p>
                    <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                    <div class="product-card-actions">
                        <button class="btn btn-primary add-to-cart-button">
                            <i class="fas fa-cart-plus"></i> Comprar
                        </button>
                        <button class="btn favorite-button active" aria-label="Remover dos Favoritos">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </article>
            `;
            favoritesContainer.insertAdjacentHTML('beforeend', productCard);
        });
        addEventListenersToProductCards(); 
    }

    // --- ADICIONAR EVENT LISTENERS AOS CARDS DE PRODUTO (Home e Favoritos) ---
    function addEventListenersToProductCards() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = parseInt(card.dataset.id);
            const addToCartBtn = card.querySelector('.add-to-cart-button');
            const favoriteBtn = card.querySelector('.favorite-button');

            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => addToCart(productId));
            }
            if (favoriteBtn) {
                favoriteBtn.addEventListener('click', () => toggleFavorite(productId, favoriteBtn));
            }
        });
    }

    // --- ADICIONAR EVENT LISTENERS AOS ITENS DO CARRINHO ---
    function addEventListenersToCartItems() {
        document.querySelectorAll('#cartTableBody tr').forEach(row => {
            const productId = parseInt(row.dataset.id);
            const decreaseBtn = row.querySelector('.decrease-quantity');
            const increaseBtn = row.querySelector('.increase-quantity');
            const quantityInput = row.querySelector('.item-quantity');
            const removeBtn = row.querySelector('.remove-from-cart-button');

            decreaseBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(quantityInput.value);
                if (currentQuantity > 1) {
                    updateQuantityInCart(productId, currentQuantity - 1);
                } else {
                    removeFromCart(productId);
                }
            });

            increaseBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(quantityInput.value);
                updateQuantityInCart(productId, currentQuantity + 1);
            });

            quantityInput.addEventListener('change', () => { 
                let newQuantity = parseInt(quantityInput.value);
                if (isNaN(newQuantity) || newQuantity < 1) {
                    newQuantity = 1; 
                    quantityInput.value = 1;
                }
                updateQuantityInCart(productId, newQuantity);
            });

            removeBtn.addEventListener('click', () => removeFromCart(productId));
        });
    }

    // --- BUSCA (Simples na Home) ---
    const searchBar = document.getElementById('searchBar'); 
    const searchInput = document.getElementById('searchInput');

    if (searchBar && searchInput && productsContainer) {
        searchBar.addEventListener('submit', function (event) {
            event.preventDefault();
            performSearch();
        });
        searchInput.addEventListener('keyup', function (event) { 
            if (event.key === "Enter") {
                performSearch();
            } else if (searchInput.value.trim() === "") { 
                renderProducts(products); 
            }
        });
    }
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === "") {
            renderProducts(products);
            return;
        }
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.author.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    }
    document.querySelectorAll('#searchBarPage').forEach(form => {
        form.addEventListener('submit', e => e.preventDefault());
    });


    // --- FORMULÁRIOS (Simulação de Envio) ---
    function handleFormSubmit(formId, feedbackContainerId, successMessage) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showFeedbackMessage(successMessage, 'success', feedbackContainerId);
                form.reset();
            });
        }
    }
    handleFormSubmit('newsletterForm', 'newsletterFeedback', 'Obrigada por se inscrever! Suas cartas literárias chegarão em breve. <i class="fas fa-heart"></i>');
    handleFormSubmit('contactForm', 'contactFormFeedback', 'Sua mensagem foi enviada com sucesso! Responderemos em breve. ✨');
    handleFormSubmit('loginForm', 'loginFeedback', 'Login simulado com sucesso! Redirecionando...');
    handleFormSubmit('signupForm', 'signupFeedback', 'Cadastro simulado com sucesso! Você já pode fazer login.');


    // --- MOSTRAR MENSAGEM DE FEEDBACK ---
    function showFeedbackMessage(message, type = 'success', containerId = 'feedbackMessageContainer') {
        const container = document.getElementById(containerId);
        if (!container) {
            const generalContainer = document.querySelector('.feedback-message-container');
            if (generalContainer) {
                generalContainer.innerHTML = `<div class="feedback-message ${type}">${message}</div>`;
                setTimeout(() => { generalContainer.innerHTML = ''; }, 4000);
            } else {
                console.warn("Feedback container not found:", containerId);
            }
            return;
        }
        container.innerHTML = `<div class="feedback-message ${type}">${message}</div>`;
        setTimeout(() => {
            container.innerHTML = '';
        }, 4000); 
    }

    // --- PASSWORD TOGGLE ---
    document.querySelectorAll('.password-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = button.previousElementSibling;
            const icon = button.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    });

    // --- CARROSSEL PARA PÁGINA DE CATEGORIAS ---
    function initializeCategoryCarousels() {
        const carousels = document.querySelectorAll('.category-card-detailed-image-carousel');
        carousels.forEach(carousel => {
            const images = carousel.querySelectorAll('.carousel-image');
            if (images.length <= 1) return; // Não precisa de carrossel para 1 ou 0 imagens

            let currentIndex = 0;
            images[currentIndex].classList.add('active'); // Garante que a primeira imagem está ativa

            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 3500); // Muda a imagem a cada 3.5 segundos (ajuste conforme preferir)
        });
    }


    // --- LÓGICA ESPECIAL DE PÁGINA ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html"; // Garante que currentPage não seja ""

    if (currentPage === 'index.html') {
        renderProducts();
    } else if (currentPage === 'carrinho.html') {
        renderCartPage();
        const checkoutButton = document.getElementById('checkoutButton');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (cart.length > 0) {
                    alert('Obrigada pela sua compra!\n(Isso é uma simulação. Nenhum pedido real foi feito.)');
                    cart = []; 
                    saveCart();
                    updateCartCount();
                    renderCartPage();
                } else {
                    alert('Seu cesto está vazio.');
                }
            });
        }
    } else if (currentPage === 'favoritos.html') {
        renderFavoritesPage();
    } else if (currentPage === 'categorias.html') {
        initializeCategoryCarousels(); // Chama a função do carrossel aqui
    }

    // Remover o código do carrossel genérico que estava aqui, pois não é mais necessário
    // e não corresponde à estrutura atual.
    // const carousel = document.querySelector('.carousel'); ...etc.

});