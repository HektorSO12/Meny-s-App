
        // Data
        const menuItems = [
            { id: 1, name: "Hamburguesa Especial", description: "Carne , lechuga, tomate, cebolla, mayonesa, mostaza, catsup, aguacate y queso", category: "hamburguesas", price: 85.00, available: true },
            { id: 2, name: "Hamburguesa Western", description: "Carne, tocino, aros de cebolla, mayonesa, queso americano y salsa BBQ", category: "hamburguesas", price: 105.00, available: true },
            { id: 3, name: "Hamburguesa Spacy", description: "Carne, mayonesa, queso americano, aros de cebolla y salsa bufalo", category: "hamburguesas", price: 95.00, available: true },
            { id: 4, name: "Tacos de Sirlon", description: "Tacos con carne de Sirloin, acompañada con cilantro, cebolla, limon, cebolla caramelizada y salsa", category: "tacos", price: 25.00, available: true },
            { id: 5, name: "Pirata", description: "Tortilla de harina, aguacate, queso monterrrey jack, carne de Sirloin, acompañada con cebolla, cilantro, limon y salsa", category: "tacos", price: 30.00, available: true },
            { id: 6, name: "Tacos Gratinados", description: "Tacos con carne de Sirloin, queso monterrey jack, acompañados con cebolla, cilantro, limon y salsa", category: "tacos", price: 22.00, available: true },
            { id: 7, name: "Refresco 600ml", description: "Coca-Cola, Fanta, Sprite", category: "bebidas", price: 20.00, available: true },
            { id: 8, name: "Agua Natural", description: "Agua purificada 500ml", category: "bebidas", price: 15.00, available: true },
            { id: 9, name: "Jugo Natural", description: "Jugo de naranja o limon", category: "bebidas", price: 25.00, available: true },
            { id: 10, name: "Pay de Queso", description: "Rebanada de pay de queso con chocolate hershey's", category: "postres", price: 40.00, available: true },
            { id: 11, name: "Brownie", description: "Brownie de chocolate con nuez", category: "postres", price: 35.00, available: true }
        ];

        let cart = [];
        let inPersonCart = [];
        let orders = [
            { 
                id: 1001, 
                customerName: "Jesus", 
                type: "pickup", 
                orderType: "online",
                address: null, 
                items: [
                    { id: 1, name: "Hamburguesa Clásica", price: 85.00, quantity: 2 },
                    { id: 7, name: "Refresco 500ml", price: 20.00, quantity: 1 }
                ], 
                specifications: "Sin mayonesa en las hamburguesas",
                total: 190.00,
                status: "pending",
                date: "2023-10-15 12:30"
            },
            { 
                id: 1002, 
                customerName: "Chuy", 
                type: "delivery", 
                orderType: "online",
                address: "Colonia Centro, Calle Hidalgo #123", 
                items: [
                    { id: 4, name: "Tacos al Pastor", price: 25.00, quantity: 4 },
                    { id: 8, name: "Agua Mineral", price: 15.00, quantity: 2 }
                ], 
                specifications: "Salsa aparte",
                total: 130.00,
                status: "preparing",
                date: "2023-10-15 13:15"
            },
            { 
                id: 1003, 
                customerName: "Alex", 
                type: "inperson", 
                orderType: "local",
                address: "Recoge en local", 
                items: [
                    { id: 2, name: "Hamburguesa BBQ", price: 105.00, quantity: 1 },
                    { id: 10, name: "Pay de Queso", price: 40.00, quantity: 1 }
                ], 
                specifications: "Hamburguesa bien cocida",
                total: 145.00,
                status: "completed",
                date: "2023-10-15 11:45"
            }
        ];

        let currentUser = null;
        let editingMenuItemId = null;

        // DOM Elements
        const loginScreen = document.getElementById('login-screen');
        const clientApp = document.getElementById('client-app');
        const adminApp = document.getElementById('admin-app');
        
        // Login elements
        const clientLoginBtn = document.getElementById('client-login-btn');
        const adminLoginBtn = document.getElementById('admin-login-btn');
        const loginForm = document.getElementById('login-form');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        
        // Client elements
        const clientMenuSection = document.getElementById('client-menu-section');
        const clientCartSection = document.getElementById('client-cart-section');
        const clientOrderSection = document.getElementById('client-order-section');
        const menuItemsContainer = document.getElementById('menu-items-container');
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartCount = document.getElementById('cart-count');
        const cartTotalPrice = document.getElementById('cart-total-price');
        const categoryButtons = document.querySelectorAll('.category-btn');
        const checkoutBtn = document.getElementById('checkout-btn');
        const pickupBtn = document.getElementById('pickup-btn');
        const deliveryBtn = document.getElementById('delivery-btn');
        const pickupForm = document.getElementById('pickup-form');
        const deliveryForm = document.getElementById('delivery-form');
        const placeOrderBtn = document.getElementById('place-order-btn');
        const backToCartBtn = document.getElementById('back-to-cart-btn');
        
        // Admin elements
        const adminDashboardSection = document.getElementById('admin-dashboard-section');
        const adminMenuSection = document.getElementById('admin-menu-section');
        const adminOrdersSection = document.getElementById('admin-orders-section');
        const adminInpersonSection = document.getElementById('admin-inperson-section');
        const adminProfileSection = document.getElementById('admin-profile-section');
        const adminCashoutSection = document.getElementById('admin-cashout-section');
        const adminMenuItemsContainer = document.getElementById('admin-menu-items-container');
        const activeOrdersContainer = document.getElementById('active-orders-container');
        const allOrdersContainer = document.getElementById('all-orders-container');
        const addMenuItemBtn = document.getElementById('add-menu-item-btn');
        const adminAddMenuItemBtn = document.getElementById('admin-add-menu-item-btn');
        const viewAllOrdersBtn = document.getElementById('view-all-orders-btn');
        const createInpersonOrderBtn = document.getElementById('create-inperson-order-btn');
        const doCashoutBtn = document.getElementById('do-cashout-btn');
        const updateAdminProfileBtn = document.getElementById('update-admin-profile-btn');
        const calculateCashoutBtn = document.getElementById('calculate-cashout-btn');
        const orderFilter = document.getElementById('order-filter');
        
        // In-person order elements
        const inpersonMenuItemsContainer = document.getElementById('inperson-menu-items-container');
        const inpersonCartItemsContainer = document.getElementById('inperson-cart-items-container');
        const inpersonCartTotal = document.getElementById('inperson-cart-total');
        const clearInpersonCartBtn = document.getElementById('clear-inperson-cart');
        const completeInpersonOrderBtn = document.getElementById('complete-inperson-order');
        
        // Modals
        const menuItemModal = document.getElementById('menu-item-modal');
        const orderDetailsModal = document.getElementById('order-details-modal');
        const closeMenuModal = document.getElementById('close-menu-modal');
        const cancelMenuItem = document.getElementById('cancel-menu-item');
        const closeOrderModal = document.getElementById('close-order-modal');
        const menuItemForm = document.getElementById('menu-item-form');
        const orderDetailsContent = document.getElementById('order-details-content');

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Set current date for cashout
            document.getElementById('cashout-date').valueAsDate = new Date();
            
            // Login events
            clientLoginBtn.addEventListener('click', function() {
                clientLoginBtn.classList.add('active');
                adminLoginBtn.classList.remove('active');
            });
            
            adminLoginBtn.addEventListener('click', function() {
                adminLoginBtn.classList.add('active');
                clientLoginBtn.classList.remove('active');
            });
            
            loginForm.addEventListener('submit', handleLogin);
            
            // Client navigation
            document.getElementById('client-menu-link').addEventListener('click', function(e) {
                e.preventDefault();
                showClientSection('menu');
            });
            
            document.getElementById('client-cart-link').addEventListener('click', function(e) {
                e.preventDefault();
                showClientSection('cart');
            });
            
            document.getElementById('client-orders-link').addEventListener('click', function(e) {
                e.preventDefault();
                showClientSection('order');
            });
            
            document.getElementById('client-logout-link').addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
            
            // Admin navigation
            document.getElementById('admin-dashboard-link').addEventListener('click', function(e) {
                e.preventDefault();
                showAdminSection('dashboard');
            });
            
            document.getElementById('admin-menu-link').addEventListener('click', function(e) {
                e.preventDefault();
                showAdminSection('menu');
            });
            
            document.getElementById('admin-orders-link').addEventListener('click', function(e) {
                e.preventDefault();
                showAdminSection('orders');
            });
            
            document.getElementById('admin-inperson-link').addEventListener('click', function(e) {
                e.preventDefault();
                showAdminSection('inperson');
            });
            
            document.getElementById('admin-profile-link').addEventListener('click', function(e) {
                e.preventDefault();
                showAdminSection('profile');
            });
            
            document.getElementById('admin-cashout-link').addEventListener('click', function(e) {
                e.preventDefault();
                showAdminSection('cashout');
            });
            
            document.getElementById('admin-logout-link').addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
            
            // Client cart and order events
            checkoutBtn.addEventListener('click', function() {
                if (cart.length === 0) {
                    alert('Tu carrito está vacío. Agrega productos antes de continuar.');
                    return;
                }
                showClientSection('order');
            });
            
            backToCartBtn.addEventListener('click', function() {
                showClientSection('cart');
            });
            
            pickupBtn.addEventListener('click', function() {
                pickupBtn.classList.add('active');
                deliveryBtn.classList.remove('active');
                pickupForm.classList.add('active');
                deliveryForm.classList.remove('active');
            });
            
            deliveryBtn.addEventListener('click', function() {
                deliveryBtn.classList.add('active');
                pickupBtn.classList.remove('active');
                deliveryForm.classList.add('active');
                pickupForm.classList.remove('active');
            });
            
            placeOrderBtn.addEventListener('click', function() {
                placeOrder();
            });
            
            // Category filter events
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.getAttribute('data-category');
                    
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    displayMenuItems(category);
                });
            });
            
            // Admin events
            addMenuItemBtn.addEventListener('click', function() {
                openMenuItemModal();
            });
            
            adminAddMenuItemBtn.addEventListener('click', function() {
                openMenuItemModal();
            });
            
            viewAllOrdersBtn.addEventListener('click', function() {
                showAdminSection('orders');
            });
            
            createInpersonOrderBtn.addEventListener('click', function() {
                showAdminSection('inperson');
            });
            
            doCashoutBtn.addEventListener('click', function() {
                showAdminSection('cashout');
            });
            
            updateAdminProfileBtn.addEventListener('click', function() {
                updateAdminProfile();
            });
            
            calculateCashoutBtn.addEventListener('click', function() {
                calculateCashout();
            });
            
            orderFilter.addEventListener('change', function() {
                displayAllOrders(this.value);
            });
            
            // In-person order events
            clearInpersonCartBtn.addEventListener('click', function() {
                inPersonCart = [];
                updateInPersonCartDisplay();
            });
            
            completeInpersonOrderBtn.addEventListener('click', function() {
                createInPersonOrder();
            });
            
            // Modal events
            closeMenuModal.addEventListener('click', function() {
                menuItemModal.classList.remove('active');
            });
            
            cancelMenuItem.addEventListener('click', function() {
                menuItemModal.classList.remove('active');
            });
            
            closeOrderModal.addEventListener('click', function() {
                orderDetailsModal.classList.remove('active');
            });
            
            menuItemForm.addEventListener('submit', function(e) {
                e.preventDefault();
                saveMenuItem();
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === menuItemModal) {
                    menuItemModal.classList.remove('active');
                }
                if (e.target === orderDetailsModal) {
                    orderDetailsModal.classList.remove('active');
                }
            });
            
            // Initial display
            displayMenuItems('all');
            updateCartDisplay();
        });

        // Functions
        function handleLogin(e) {
            e.preventDefault();
            
            const username = usernameInput.value;
            const password = passwordInput.value;
            const isAdmin = adminLoginBtn.classList.contains('active');
            
            // Simple authentication
            if (isAdmin) {
                if (username === 'admin' && password === 'admin123') {
                    currentUser = { username, role: 'admin' };
                    showAdminApp();
                } else {
                    alert('Credenciales de administrador incorrectas');
                }
            } else {
                if (username === 'cliente' && password === 'cliente123') {
                    currentUser = { username, role: 'client' };
                    showClientApp();
                } else {
                    alert('Credenciales de cliente incorrectas');
                }
            }
        }

        function logout() {
            currentUser = null;
            cart = [];
            inPersonCart = [];
            loginScreen.style.display = 'flex';
            clientApp.style.display = 'none';
            adminApp.style.display = 'none';
            usernameInput.value = '';
            passwordInput.value = '';
        }

        function showClientApp() {
            loginScreen.style.display = 'none';
            clientApp.style.display = 'block';
            adminApp.style.display = 'none';
            showClientSection('menu');
        }

        function showAdminApp() {
            loginScreen.style.display = 'none';
            clientApp.style.display = 'none';
            adminApp.style.display = 'block';
            showAdminSection('dashboard');
            
            // Update admin dashboard
            displayActiveOrders();
            updateAdminDashboardStats();
            displayAdminMenuItems();
            displayAllOrders('all');
            displayInPersonMenuItems();
        }

        function showClientSection(section) {
            clientMenuSection.style.display = 'none';
            clientCartSection.style.display = 'none';
            clientOrderSection.style.display = 'none';
            
            // Update navigation active state
            document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
            
            if (section === 'menu') {
                clientMenuSection.style.display = 'block';
                document.getElementById('client-menu-link').classList.add('active');
            } else if (section === 'cart') {
                clientCartSection.style.display = 'block';
                document.getElementById('client-cart-link').classList.add('active');
            } else if (section === 'order') {
                clientOrderSection.style.display = 'block';
                document.getElementById('client-orders-link').classList.add('active');
            }
        }

        function showAdminSection(section) {
            adminDashboardSection.style.display = 'none';
            adminMenuSection.style.display = 'none';
            adminOrdersSection.style.display = 'none';
            adminInpersonSection.style.display = 'none';
            adminProfileSection.style.display = 'none';
            adminCashoutSection.style.display = 'none';
            
            // Update navigation active state
            document.querySelectorAll('#admin-app .nav-menu a').forEach(link => link.classList.remove('active'));
            
            if (section === 'dashboard') {
                adminDashboardSection.style.display = 'block';
                document.getElementById('admin-dashboard-link').classList.add('active');
                displayActiveOrders();
                updateAdminDashboardStats();
            } else if (section === 'menu') {
                adminMenuSection.style.display = 'block';
                document.getElementById('admin-menu-link').classList.add('active');
                displayAdminMenuItems();
            } else if (section === 'orders') {
                adminOrdersSection.style.display = 'block';
                document.getElementById('admin-orders-link').classList.add('active');
                displayAllOrders('all');
            } else if (section === 'inperson') {
                adminInpersonSection.style.display = 'block';
                document.getElementById('admin-inperson-link').classList.add('active');
                displayInPersonMenuItems();
                updateInPersonCartDisplay();
            } else if (section === 'profile') {
                adminProfileSection.style.display = 'block';
                document.getElementById('admin-profile-link').classList.add('active');
            } else if (section === 'cashout') {
                adminCashoutSection.style.display = 'block';
                document.getElementById('admin-cashout-link').classList.add('active');
            }
        }

        function displayMenuItems(category = 'all') {
            menuItemsContainer.innerHTML = '';
            
            const filteredItems = category === 'all' 
                ? menuItems.filter(item => item.available)
                : menuItems.filter(item => item.category === category && item.available);
            
            filteredItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'menu-item';
                itemElement.innerHTML = `
                    <div style="background-color: var(--primary-light); height: 160px; display: flex; align-items: center; justify-content: center; color: var(--primary-dark); font-size: 50px;">
                        <i class="fas fa-${getItemIcon(item.category)}" style="color: var(--black);"></i>
                    </div>
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <p class="menu-item-desc">${item.description}</p>
                        <div class="menu-item-footer">
                            <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                            <button class="add-to-cart-btn" data-id="${item.id}">
                                <i class="fas fa-baseball-ball" style="color: var(--white);"></i> Agregar
                            </button>
                        </div>
                    </div>
                `;
                
                menuItemsContainer.appendChild(itemElement);
            });
            
            // Add event listeners to add to cart buttons
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    addToCart(itemId);
                });
            });
        }

        function displayInPersonMenuItems() {
            inpersonMenuItemsContainer.innerHTML = '';
            
            const filteredItems = menuItems.filter(item => item.available);
            
            filteredItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'menu-item';
                itemElement.innerHTML = `
                    <div style="background-color: var(--primary-light); height: 140px; display: flex; align-items: center; justify-content: center; color: var(--primary-dark); font-size: 40px;">
                        <i class="fas fa-${getItemIcon(item.category)}" style="color: var(--black);"></i>
                    </div>
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <p class="menu-item-desc">${item.description}</p>
                        <div class="menu-item-footer">
                            <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                            <button class="add-to-inperson-cart-btn" data-id="${item.id}">
                                <i class="fas fa-plus" style="color: var(--white);"></i> Agregar
                            </button>
                        </div>
                    </div>
                `;
                
                inpersonMenuItemsContainer.appendChild(itemElement);
            });
            
            // Add event listeners to add to in-person cart buttons
            document.querySelectorAll('.add-to-inperson-cart-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    addToInPersonCart(itemId);
                });
            });
        }

        function getItemIcon(category) {
            switch(category) {
                case 'hamburguesas': return 'baseball-ball';
                case 'tacos': return 'baseball-ball';
                case 'bebidas': return 'baseball-ball';
                case 'postres': return 'baseball-ball';
                default: return 'baseball-ball';
            }
        }

        function addToCart(itemId) {
            const item = menuItems.find(i => i.id === itemId);
            if (!item) return;
            
            const existingItem = cart.find(i => i.id === itemId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1
                });
            }
            
            updateCartDisplay();
            showClientSection('cart');
        }

        function addToInPersonCart(itemId) {
            const item = menuItems.find(i => i.id === itemId);
            if (!item) return;
            
            const existingItem = inPersonCart.find(i => i.id === itemId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                inPersonCart.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1
                });
            }
            
            updateInPersonCartDisplay();
        }

        function updateCartDisplay() {
            // Update cart count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart items display
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 30px;">Tu carrito está vacío</p>';
                cartTotalPrice.textContent = '0.00';
                return;
            }
            
            let totalPrice = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} c/u</p>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                        </div>
                        <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                        <button class="remove-item-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            // Update total price
            cartTotalPrice.textContent = totalPrice.toFixed(2);
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.decrease-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    updateCartItemQuantity(itemId, -1);
                });
            });
            
            document.querySelectorAll('.increase-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    updateCartItemQuantity(itemId, 1);
                });
            });
            
            document.querySelectorAll('.remove-item-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    removeFromCart(itemId);
                });
            });
        }

        function updateInPersonCartDisplay() {
            // Update in-person cart items display
            inpersonCartItemsContainer.innerHTML = '';
            
            if (inPersonCart.length === 0) {
                inpersonCartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 20px;">Carrito vacío - Agrega productos</p>';
                inpersonCartTotal.textContent = '0.00';
                return;
            }
            
            let totalPrice = 0;
            
            inPersonCart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} c/u</p>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease-inperson-quantity" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase-inperson-quantity" data-id="${item.id}">+</button>
                        </div>
                        <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                        <button class="remove-item-btn remove-inperson-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                inpersonCartItemsContainer.appendChild(cartItemElement);
            });
            
            // Update total price
            inpersonCartTotal.textContent = totalPrice.toFixed(2);
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.decrease-inperson-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    updateInPersonCartItemQuantity(itemId, -1);
                });
            });
            
            document.querySelectorAll('.increase-inperson-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    updateInPersonCartItemQuantity(itemId, 1);
                });
            });
            
            document.querySelectorAll('.remove-inperson-item').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    removeFromInPersonCart(itemId);
                });
            });
        }

        function updateCartItemQuantity(itemId, change) {
            const itemIndex = cart.findIndex(i => i.id === itemId);
            
            if (itemIndex !== -1) {
                cart[itemIndex].quantity += change;
                
                if (cart[itemIndex].quantity <= 0) {
                    cart.splice(itemIndex, 1);
                }
                
                updateCartDisplay();
            }
        }

        function updateInPersonCartItemQuantity(itemId, change) {
            const itemIndex = inPersonCart.findIndex(i => i.id === itemId);
            
            if (itemIndex !== -1) {
                inPersonCart[itemIndex].quantity += change;
                
                if (inPersonCart[itemIndex].quantity <= 0) {
                    inPersonCart.splice(itemIndex, 1);
                }
                
                updateInPersonCartDisplay();
            }
        }

        function removeFromCart(itemId) {
            const itemIndex = cart.findIndex(i => i.id === itemId);
            
            if (itemIndex !== -1) {
                cart.splice(itemIndex, 1);
                updateCartDisplay();
            }
        }

        function removeFromInPersonCart(itemId) {
            const itemIndex = inPersonCart.findIndex(i => i.id === itemId);
            
            if (itemIndex !== -1) {
                inPersonCart.splice(itemIndex, 1);
                updateInPersonCartDisplay();
            }
        }

        function placeOrder() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            const orderType = pickupBtn.classList.contains('active') ? 'pickup' : 'delivery';
            const specifications = document.getElementById('order-specifications').value;
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            let customerName = '';
            let address = null;
            
            if (orderType === 'pickup') {
                customerName = document.getElementById('customer-name').value;
                if (!customerName.trim()) {
                    alert('Por favor ingresa tu nombre para recoger el pedido');
                    return;
                }
            } else {
                const colonia = document.getElementById('colonia').value;
                const calle = document.getElementById('calle').value;
                const casa = document.getElementById('casa').value;
                
                if (!colonia.trim() || !calle.trim() || !casa.trim()) {
                    alert('Por favor completa todos los campos de dirección');
                    return;
                }
                
                customerName = 'Cliente a domicilio';
                address = `Colonia ${colonia}, Calle ${calle} #${casa}`;
            }
            
            // Create order
            const newOrder = {
                id: 1000 + orders.length + 1,
                customerName,
                type: orderType,
                orderType: 'online',
                address,
                items: [...cart],
                specifications,
                total,
                status: 'pending',
                date: new Date().toLocaleString('es-MX')
            };
            
            orders.push(newOrder);
            cart = [];
            
            // Clear forms
            document.getElementById('customer-name').value = '';
            document.getElementById('colonia').value = '';
            document.getElementById('calle').value = '';
            document.getElementById('casa').value = '';
            document.getElementById('delivery-notes').value = '';
            document.getElementById('order-specifications').value = '';
            
            // Show confirmation
            alert(`¡Pedido realizado con éxito! Tu número de pedido es: #${newOrder.id}. Total: $${total.toFixed(2)}`);
            
            // Update displays
            updateCartDisplay();
            showClientSection('menu');
            
            // If admin is logged in, update their display
            if (currentUser && currentUser.role === 'admin') {
                displayActiveOrders();
                updateAdminDashboardStats();
                displayAllOrders('all');
            }
        }

        function createInPersonOrder() {
            if (inPersonCart.length === 0) {
                alert('El carrito está vacío. Agrega productos antes de crear el pedido.');
                return;
            }
            
            const customerName = document.getElementById('inperson-customer-name').value;
            const specifications = document.getElementById('inperson-order-specifications').value;
            const total = inPersonCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (!customerName.trim()) {
                alert('Por favor ingresa el nombre del cliente');
                return;
            }
            
            // Create in-person order
            const newOrder = {
                id: 1000 + orders.length + 1,
                customerName,
                type: 'inperson',
                orderType: 'local',
                address: 'Recoge en local',
                items: [...inPersonCart],
                specifications,
                total,
                status: 'pending',
                date: new Date().toLocaleString('es-MX')
            };
            
            orders.push(newOrder);
            inPersonCart = [];
            
            // Clear forms
            document.getElementById('inperson-customer-name').value = '';
            document.getElementById('inperson-order-specifications').value = '';
            
            // Show confirmation
            alert(`¡Pedido en local creado con éxito! Número de pedido: #${newOrder.id}. Total: $${total.toFixed(2)}`);
            
            // Update displays
            updateInPersonCartDisplay();
            
            // Update admin dashboard
            displayActiveOrders();
            updateAdminDashboardStats();
            displayAllOrders('all');
        }

        function displayAdminMenuItems() {
            adminMenuItemsContainer.innerHTML = '';
            
            menuItems.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.available ? 'Sí' : 'No'}</td>
                    <td>
                        <button class="btn btn-outline edit-menu-item" data-id="${item.id}" style="padding: 5px 10px; margin-right: 5px;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline delete-menu-item" data-id="${item.id}" style="padding: 5px 10px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                
                adminMenuItemsContainer.appendChild(row);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.edit-menu-item').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    editMenuItem(itemId);
                });
            });
            
            document.querySelectorAll('.delete-menu-item').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                        deleteMenuItem(itemId);
                    }
                });
            });
        }

        function openMenuItemModal(editId = null) {
            editingMenuItemId = editId;
            const modalTitle = document.getElementById('menu-modal-title');
            const form = document.getElementById('menu-item-form');
            
            if (editId) {
                modalTitle.textContent = 'Editar Producto';
                const item = menuItems.find(i => i.id === editId);
                
                document.getElementById('item-name').value = item.name;
                document.getElementById('item-description').value = item.description;
                document.getElementById('item-category').value = item.category;
                document.getElementById('item-price').value = item.price;
                document.getElementById('item-available').value = item.available.toString();
            } else {
                modalTitle.textContent = 'Agregar Producto';
                form.reset();
            }
            
            menuItemModal.classList.add('active');
        }

        function saveMenuItem() {
            const name = document.getElementById('item-name').value;
            const description = document.getElementById('item-description').value;
            const category = document.getElementById('item-category').value;
            const price = parseFloat(document.getElementById('item-price').value);
            const available = document.getElementById('item-available').value === 'true';
            
            if (!name || !category || isNaN(price)) {
                alert('Por favor completa todos los campos requeridos');
                return;
            }
            
            if (editingMenuItemId) {
                // Update existing item
                const itemIndex = menuItems.findIndex(i => i.id === editingMenuItemId);
                if (itemIndex !== -1) {
                    menuItems[itemIndex] = {
                        ...menuItems[itemIndex],
                        name,
                        description,
                        category,
                        price,
                        available
                    };
                }
            } else {
                // Add new item
                const newId = menuItems.length > 0 ? Math.max(...menuItems.map(i => i.id)) + 1 : 1;
                menuItems.push({
                    id: newId,
                    name,
                    description,
                    category,
                    price,
                    available
                });
            }
            
            menuItemModal.classList.remove('active');
            displayAdminMenuItems();
            displayMenuItems('all'); // Update client view too
            displayInPersonMenuItems(); // Update in-person view too
            
            // Reset editing ID
            editingMenuItemId = null;
        }

        function editMenuItem(itemId) {
            openMenuItemModal(itemId);
        }

        function deleteMenuItem(itemId) {
            const itemIndex = menuItems.findIndex(i => i.id === itemId);
            if (itemIndex !== -1) {
                menuItems.splice(itemIndex, 1);
                displayAdminMenuItems();
                displayMenuItems('all'); // Update client view too
                displayInPersonMenuItems(); // Update in-person view too
            }
        }

        function displayActiveOrders() {
            activeOrdersContainer.innerHTML = '';
            
            // Get pending and preparing orders
            const activeOrders = orders.filter(order => order.status === 'pending' || order.status === 'preparing');
            
            if (activeOrders.length === 0) {
                activeOrdersContainer.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 30px;">No hay pedidos activos</p>';
                return;
            }
            
            activeOrders.forEach(order => {
                const orderElement = createOrderElement(order, true);
                activeOrdersContainer.appendChild(orderElement);
            });
        }

        function displayAllOrders(filter = 'all') {
            allOrdersContainer.innerHTML = '';
            
            let filteredOrders = [...orders];
            
            if (filter !== 'all') {
                filteredOrders = orders.filter(order => order.status === filter);
            }
            
            if (filteredOrders.length === 0) {
                allOrdersContainer.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 30px;">No hay pedidos</p>';
                return;
            }
            
            // Sort by date (newest first)
            filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            filteredOrders.forEach(order => {
                const orderElement = createOrderElement(order, false);
                allOrdersContainer.appendChild(orderElement);
            });
        }

        function createOrderElement(order, isActive) {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            
            let statusText = '';
            let statusClass = '';
            
            switch(order.status) {
                case 'pending':
                    statusText = 'Pendiente';
                    statusClass = 'status-pending';
                    break;
                case 'preparing':
                    statusText = 'En preparación';
                    statusClass = 'status-preparing';
                    break;
                case 'ready':
                    statusText = 'Listo';
                    statusClass = 'status-ready';
                    break;
                case 'completed':
                    statusText = 'Completado';
                    statusClass = 'status-completed';
                    break;
            }
            
            const orderTypeText = order.type === 'pickup' ? 'Recoger en local' : 
                                order.type === 'delivery' ? 'Envío a domicilio' : 
                                'Pedido en local';
            const addressText = order.address ? order.address : 'Cliente pasa por el pedido';
            const orderSource = order.orderType === 'online' ? 'En línea' : 'En local';
            
            orderElement.innerHTML = `
                <div class="order-item-header">
                    <div>
                        <span class="order-id">Pedido #${order.id}</span>
                        <span style="margin-left: 10px; color: var(--dark-gray); font-size: 14px;">${order.date}</span>
                        <span style="margin-left: 10px; color: var(--accent); font-size: 12px; background-color: ${order.orderType === 'online' ? '#e3f2fd' : '#e8f5e9'}; padding: 2px 8px; border-radius: 10px;">${orderSource}</span>
                    </div>
                    <span class="order-status ${statusClass}">${statusText}</span>
                </div>
                <div class="order-details">
                    <p><strong>Cliente:</strong> ${order.customerName}</p>
                    <p><strong>Tipo:</strong> ${orderTypeText}</p>
                    <p><strong>Dirección:</strong> ${addressText}</p>
                    ${order.specifications ? `<p><strong>Especificaciones:</strong> ${order.specifications}</p>` : ''}
                    <div class="order-items-list">
                        ${order.items.map(item => `
                            <div class="order-item-product">
                                <span>${item.name} x${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <p style="margin-top: 10px; font-weight: bold; text-align: right;">Total: $${order.total.toFixed(2)}</p>
                </div>
                ${isActive ? `
                <div class="admin-actions">
                    ${order.status === 'pending' ? `
                        <button class="btn btn-secondary update-order-status" data-id="${order.id}" data-status="preparing" style="padding: 8px 12px;">
                            <i class="fas fa-clock"></i> En preparación
                        </button>
                    ` : ''}
                    ${order.status === 'preparing' ? `
                        <button class="btn btn-primary update-order-status" data-id="${order.id}" data-status="ready" style="padding: 8px 12px;">
                            <i class="fas fa-check"></i> Marcar como listo
                        </button>
                    ` : ''}
                    ${order.status === 'ready' ? `
                        <button class="btn btn-secondary update-order-status" data-id="${order.id}" data-status="completed" style="padding: 8px 12px;">
                            <i class="fas fa-check-double"></i> Completar
                        </button>
                    ` : ''}
                    <button class="btn btn-outline view-order-details" data-id="${order.id}" style="padding: 8px 12px;">
                        <i class="fas fa-eye"></i> Ver detalles
                    </button>
                </div>
                ` : ''}
            `;
            
            // Add event listeners
            if (isActive) {
                orderElement.querySelectorAll('.update-order-status').forEach(button => {
                    button.addEventListener('click', function() {
                        const orderId = parseInt(this.getAttribute('data-id'));
                        const newStatus = this.getAttribute('data-status');
                        updateOrderStatus(orderId, newStatus);
                    });
                });
            }
            
            orderElement.querySelectorAll('.view-order-details').forEach(button => {
                button.addEventListener('click', function() {
                    const orderId = parseInt(this.getAttribute('data-id'));
                    showOrderDetails(orderId);
                });
            });
            
            return orderElement;
        }

        function updateOrderStatus(orderId, newStatus) {
            const orderIndex = orders.findIndex(o => o.id === orderId);
            
            if (orderIndex !== -1) {
                orders[orderIndex].status = newStatus;
                
                // Update displays
                displayActiveOrders();
                updateAdminDashboardStats();
                displayAllOrders('all');
                
                alert(`Estado del pedido #${orderId} actualizado a: ${newStatus}`);
            }
        }

        function showOrderDetails(orderId) {
            const order = orders.find(o => o.id === orderId);
            
            if (!order) return;
            
            let statusText = '';
            switch(order.status) {
                case 'pending': statusText = 'Pendiente'; break;
                case 'preparing': statusText = 'En preparación'; break;
                case 'ready': statusText = 'Listo'; break;
                case 'completed': statusText = 'Completado'; break;
            }
            
            const orderTypeText = order.type === 'pickup' ? 'Recoger en local' : 
                                order.type === 'delivery' ? 'Envío a domicilio' : 
                                'Pedido en local';
            const addressText = order.address ? order.address : 'Cliente pasa por el pedido';
            const orderSource = order.orderType === 'online' ? 'En línea' : 'En local';
            
            orderDetailsContent.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--primary-dark); margin-bottom: 10px;">Pedido #${order.id}</h4>
                    <p><strong>Fecha:</strong> ${order.date}</p>
                    <p><strong>Estado:</strong> ${statusText}</p>
                    <p><strong>Origen:</strong> ${orderSource}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--primary-dark); margin-bottom: 10px;">Información del Cliente</h4>
                    <p><strong>Nombre:</strong> ${order.customerName}</p>
                    <p><strong>Tipo de entrega:</strong> ${orderTypeText}</p>
                    <p><strong>Dirección:</strong> ${addressText}</p>
                    ${order.specifications ? `<p><strong>Especificaciones:</strong> ${order.specifications}</p>` : ''}
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--primary-dark); margin-bottom: 10px;">Items del Pedido</h4>
                    <div style="border: 1px solid #eee; border-radius: 6px; overflow: hidden;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background-color: var(--primary-light);">
                                    <th style="padding: 10px; text-align: left;">Producto</th>
                                    <th style="padding: 10px; text-align: center;">Cantidad</th>
                                    <th style="padding: 10px; text-align: right;">Precio</th>
                                    <th style="padding: 10px; text-align: right;">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items.map(item => `
                                    <tr>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
                                        <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">$${item.price.toFixed(2)}</td>
                                        <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">$${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                                    <td style="padding: 10px; text-align: right; font-weight: bold; color: var(--primary);">$${order.total.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                
                <div style="text-align: right;">
                    <button class="btn btn-outline" id="close-order-details-modal" style="margin-right: 10px;">
                        Cerrar
                    </button>
                    ${order.status !== 'completed' ? `
                        <button class="btn btn-primary" id="update-status-from-modal" data-id="${order.id}">
                            Actualizar Estado
                        </button>
                    ` : ''}
                </div>
            `;
            
            // Add event listeners for buttons in modal
            document.getElementById('close-order-details-modal').addEventListener('click', function() {
                orderDetailsModal.classList.remove('active');
            });
            
            if (document.getElementById('update-status-from-modal')) {
                document.getElementById('update-status-from-modal').addEventListener('click', function() {
                    const orderId = parseInt(this.getAttribute('data-id'));
                    const order = orders.find(o => o.id === orderId);
                    
                    if (!order) return;
                    
                    let newStatus = '';
                    let statusText = '';
                    
                    switch(order.status) {
                        case 'pending':
                            newStatus = 'preparing';
                            statusText = 'En preparación';
                            break;
                        case 'preparing':
                            newStatus = 'ready';
                            statusText = 'Listo';
                            break;
                        case 'ready':
                            newStatus = 'completed';
                            statusText = 'Completado';
                            break;
                    }
                    
                    if (newStatus) {
                        updateOrderStatus(orderId, newStatus);
                        orderDetailsModal.classList.remove('active');
                    }
                });
            }
            
            orderDetailsModal.classList.add('active');
        }

        function updateAdminDashboardStats() {
            const today = new Date().toDateString();
            const todayOrders = orders.filter(order => new Date(order.date).toDateString() === today);
            
            const totalSales = todayOrders.reduce((sum, order) => sum + order.total, 0);
            const totalOrders = todayOrders.length;
            const pendingOrders = todayOrders.filter(order => order.status === 'pending' || order.status === 'preparing').length;
            
            document.getElementById('daily-sales').textContent = totalSales.toFixed(2);
            document.getElementById('total-orders').textContent = totalOrders;
            document.getElementById('pending-orders').textContent = pendingOrders;
        }

        function updateAdminProfile() {
            const newUsername = document.getElementById('admin-username').value;
            const currentPassword = document.getElementById('admin-current-password').value;
            const newPassword = document.getElementById('admin-new-password').value;
            const confirmPassword = document.getElementById('admin-confirm-password').value;
            
            // Verify current password
            if (currentPassword !== 'admin123') {
                alert('La contraseña actual es incorrecta');
                return;
            }
            
            // Check if new passwords match
            if (newPassword && newPassword !== confirmPassword) {
                alert('Las nuevas contraseñas no coinciden');
                return;
            }
            
            // In a real app, this would be sent to a server
            // For this demo, we'll just show a success message
            alert('Perfil actualizado correctamente. Nota: En una aplicación real, estos cambios se guardarían en el servidor.');
            
            // Clear form
            document.getElementById('admin-username').value = '';
            document.getElementById('admin-current-password').value = '';
            document.getElementById('admin-new-password').value = '';
            document.getElementById('admin-confirm-password').value = '';
        }

        function calculateCashout() {
            const date = document.getElementById('cashout-date').value;
            
            if (!date) {
                alert('Por favor selecciona una fecha');
                return;
            }
            
            // Filter orders by date
            const selectedDate = new Date(date).toDateString();
            const dayOrders = orders.filter(order => new Date(order.date).toDateString() === selectedDate);
            
            // Calculate totals
            const totalOrders = dayOrders.length;
            const onlineOrders = dayOrders.filter(order => order.orderType === 'online');
            const localOrders = dayOrders.filter(order => order.orderType === 'local');
            
            const onlineSales = onlineOrders.reduce((sum, order) => sum + order.total, 0);
            const localCashSales = localOrders.reduce((sum, order) => sum + order.total, 0) * 0.8; // 80% cash for local orders
            const localCardSales = localOrders.reduce((sum, order) => sum + order.total, 0) * 0.2; // 20% card for local orders
            
            const totalSales = onlineSales + localCashSales + localCardSales;
            
            // Display results
            document.getElementById('cashout-total-orders').textContent = totalOrders;
            document.getElementById('cashout-cash').textContent = localCashSales.toFixed(2);
            document.getElementById('cashout-card').textContent = localCardSales.toFixed(2);
            document.getElementById('cashout-online').textContent = onlineSales.toFixed(2);
            document.getElementById('cashout-total').textContent = totalSales.toFixed(2);
            
            document.getElementById('cashout-results').style.display = 'block';
        }
