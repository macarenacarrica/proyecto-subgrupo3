document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container-carrito");

    function inicializarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarBadgeCarrito(carrito);
        return carrito;
    }

    function actualizarBadgeCarrito(carrito) {
        const badge = document.getElementById('cart-badge');
        if (badge) {
            const totalProductos = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
            badge.textContent = totalProductos;
        }
    }

    const productId = localStorage.getItem('selectedProductId');
    let productName = localStorage.getItem('productName');
    let productCost = localStorage.getItem('productCost');
    let productCurrency = localStorage.getItem('productCurrency');
    let productImage = localStorage.getItem('carouselImage0');

    if (productName || productCost || productCurrency || productImage) {
        fetch(`https://japceibal.github.io/emercado-api/cats_products/101.json`)
            .then(response => response.json())
            .then(data => {
                const selectedProduct = data.products.find(product => product.id == productId);
                
                if (selectedProduct) {
                    agregarAlCarrito(selectedProduct);
                    renderCart();
                } else {
                    container.innerHTML = "<p>Tu carrito está vacío.</p>";
                }
            });
    } else {
        renderCart();
    }

    function agregarAlCarrito(product) {
        let carrito = inicializarCarrito();
        const productoExistente = carrito.find(p => p.id === product.id);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                id: product.id,
                name: product.name,
                cost: product.cost,
                currency: product.currency,
                image: product.image,
                cantidad: 1
            });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarBadgeCarrito(carrito);
    }

    function renderCart() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length === 0) {
            container.innerHTML = "<p>Tu carrito está vacío.</p>";
        } else {
            container.innerHTML = `
                <button class="btn-clear-cart" onclick="clearCart()">
                    <i class="fa fa-trash"></i> Vaciar carrito
                </button>
                <br>
                <h1>Detalles del Pedido</h1>
            `;

            carrito.forEach(producto => {
                container.innerHTML += `
                    <div class="cart-item">
                        <img src="${producto.image}" alt="${producto.name}" class="product-image">
                        <div class="cart-details">
                            <h5>${producto.name}</h5>
                            <div class="quantity-control">
                                <button class="btn-quantity" onclick="changeQuantity(${producto.id}, -1)">-</button>
                                <input type="text" id="quantity-${producto.id}" value="${producto.cantidad}" readonly>
                                <button class="btn-quantity" onclick="changeQuantity(${producto.id}, 1)">+</button>
                            </div>
                            <p>USD <span id="subtotal-${producto.id}">${(producto.cost * producto.cantidad).toFixed(2)}</span></p>
                        </div>
                        <button class="btn-remove" onclick="removeFromCart(${producto.id})">×</button>
                    </div>
                `;
            });

            const subtotal = calculateSubtotal(carrito);

            container.innerHTML += `
                <div class="cart-summary">
                    <p><strong>SUBTOTAL:</strong> <span> USD <span id="subtotal">${subtotal.toFixed(2)}</span></p>
                    <p>¿En qué moneda quieres pagar?</p>
                    <button class="btn-currency active" onclick="changeCurrency('USD')">USD</button>
                    <button class="btn-currency" onclick="changeCurrency('UYU')">UYU</button>

                    <p><strong>Tipo de Envío:</strong></p>
                    <select id="shippingType">
                        <option value="premium" data-percentage="0.15">Premium 2 a 5 días (+15%)</option>
                        <option value="express" data-percentage="0.07">Express 5 a 8 días (+7%)</option>
                        <option value="standard" data-percentage="0.05">Standard 12 a 15 días (+5%)</option>
                    </select>

                    <p><strong>Dirección de Envío:</strong></p>
                    <input type="text" class="address-input" placeholder="Departamento" id="department">
                    <input type="text" class="address-input" placeholder="Localidad" id="locality">
                    <input type="text" class="address-input" placeholder="Calle" id="street">
                    <input type="text" class="address-input" placeholder="Número" id="number">
                    <input type="text" class="address-input" placeholder="Esquina" id="corner">

                    <p><strong>Costo de Envío:</strong> <span>USD <span id="shippingCost">0.00</span></span></p>
                    <p><strong>TOTAL:</strong> <span>USD <span id="total">0.00</span></span></p>

                </div>
                <button class="btn-continue" onclick="window.location.href='categories.html'">Continuar comprando</button>
                <button class="btn-final">Finalizar compra</button>
            `;

            document.getElementById("shippingType").addEventListener("change", updateShippingCost);
            updateShippingCost(); // Inicializar costo de envío
        }
    }

    function calculateSubtotal(carrito) {
        return carrito.reduce((total, producto) => total + producto.cost * producto.cantidad, 0);
    }

    function updateShippingCost() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const shippingSelect = document.getElementById("shippingType");
        const shippingPercentage = parseFloat(shippingSelect.options[shippingSelect.selectedIndex].dataset.percentage);
        const subtotal = calculateSubtotal(carrito);
        const shippingCost = subtotal * shippingPercentage;

        document.getElementById("shippingCost").textContent = shippingCost.toFixed(2);
        updateTotal(subtotal, shippingCost);
    }

    function updateTotal(subtotal, shippingCost) {
        const total = subtotal + shippingCost;
        document.getElementById("total").textContent = total.toFixed(2);
    }

    window.changeQuantity = function (productId, delta) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const producto = carrito.find(producto => producto.id === productId);

        if (producto) {
            producto.cantidad = Math.max(1, producto.cantidad + delta);
            document.getElementById(`quantity-${productId}`).value = producto.cantidad;
            document.getElementById(`subtotal-${productId}`).textContent = (producto.cost * producto.cantidad).toFixed(2);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
        }
    };

    window.removeFromCart = function (productId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(producto => producto.id !== productId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCart();
        actualizarBadgeCarrito(carrito);
    };

    window.clearCart = function () {
        localStorage.removeItem('carrito');
        renderCart();
        actualizarBadgeCarrito([]);
    };

    window.changeCurrency = function (currency) {
        document.querySelectorAll(".btn-currency").forEach(btn => btn.classList.remove("active"));
        document.querySelector(`.btn-currency[onclick="changeCurrency('${currency}')"]`).classList.add("active");
        // Aquí puedes agregar lógica para cambiar los precios a la moneda seleccionada si tienes el tipo de cambio.
    };
});
