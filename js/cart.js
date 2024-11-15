// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container-carrito");

    // Inicializa el carrito y actualiza el badge de cantidad
    function inicializarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarBadgeCarrito(carrito);
        return carrito;
    }
        // Actualiza el badge de cantidad de productos en el carrito
    function actualizarBadgeCarrito(carrito) {
        const badge = document.getElementById('cart-count'); // Elemento del badge
        if (badge) {
            const totalProductos = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
            badge.textContent = totalProductos; // Muestra el total en el badge
        }
    }
     
     // Obtiene el ID y otros detalles del producto seleccionado de localStorage
    const productId = localStorage.getItem('selectedProductId');
    let productName = localStorage.getItem('productName');
    let productCost = localStorage.getItem('productCost');
    let productCurrency = localStorage.getItem('productCurrency');
    let productImage = localStorage.getItem('carouselImage0');

    // Si hay información del producto, intenta cargarlo desde el JSON y añadirlo al carrito
    if (productName || productCost || productCurrency || productImage) {
        fetch(`https://japceibal.github.io/emercado-api/cats_products/101.json`)
            .then(response => response.json())
            .then(data => {
                const selectedProduct = data.products.find(product => product.id == productId);
                
                if (selectedProduct) {
                    agregarAlCarrito(selectedProduct); // Agrega el producto al carrito
                    renderCart(); // Muestra el carrito actualizado
                } else {
                    container.innerHTML = "<p>Tu carrito está vacío.</p>"; // Mensaje si no hay producto
                }
            });
    } else {
        renderCart();// Renderiza el carrito si no hay producto seleccionado
    }

    // Añade un producto al carrito
    function agregarAlCarrito(product) {
        let carrito = inicializarCarrito();
        const productoExistente = carrito.find(p => p.id === product.id);// Verifica si el producto ya existe

        if (productoExistente) {
            productoExistente.cantidad += 1;// Incrementa la cantidad si ya existe
        } else {
            carrito.push({ // Añade el nuevo producto con cantidad inicial de 1
                id: product.id,
                name: product.name,
                cost: product.cost,
                currency: product.currency,
                image: product.image,
                cantidad: 1
            });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito actualizado en localStorage
        actualizarBadgeCarrito(carrito);// Actualiza el badge
    }
    // Muestra el carrito en el contenedor HTML
    function renderCart() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length === 0) {
            container.innerHTML = "<p>Tu carrito está vacío.</p>";
        } else {
            // Contenido inicial del carrito
            container.innerHTML = `
                <button class="btn-clear-cart" onclick="clearCart()">
                    <i class="fa fa-trash"></i> Vaciar carrito
                </button>
                <br>
                <h1>Detalles del Pedido</h1>
            `;
            // Añade cada producto del carrito al contenedor
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

            const subtotal = calculateSubtotal(carrito); // Calcula el subtotal del carrito
            
            // Añade el resumen de costos y opciones adicionales
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

                    <p><strong>Forma de Pago:</strong></p>
                    <select id="paymentMethod">
                        <option value="">Seleccionar forma de pago</option>
                        <option value="credit-card">Tarjeta de Crédito</option>
                        <option value="bank-transfer">Transferencia Bancaria</option>
                    </select>
                    <div class="payment-fields">
                        <input type="text" class="payment-input" placeholder="Número de tarjeta" id="cardNumber" style="display: none;">
                        <input type="text" class="payment-input" placeholder="Fecha de vencimiento" id="expiryDate" style="display: none;">
                        <input type="text" class="payment-input" placeholder="CVV" id="cvv" style="display: none;">
                        <input type="text" class="payment-input" placeholder="Número de cuenta" id="accountNumber" style="display: none;">
                    </div>

                    <p><strong>Costo de Envío:</strong> <span>USD <span id="shippingCost">0.00</span></span></p>
                    <p><strong>TOTAL:</strong> <span>USD <span id="total">0.00</span></span></p>

                </div>
                <button class="btn-continue" onclick="window.location.href='categories.html'">Continuar comprando</button>
                <button class="btn-final">Finalizar compra</button>
            `;
             // Añade eventos para cambio de costo de envío y forma de pago
            document.getElementById("shippingType").addEventListener("change", updateShippingCost);
            updateShippingCost();// Actualiza el costo de envío
            document.getElementById("paymentMethod").addEventListener("change", togglePaymentFields);
            document.querySelector(".btn-final").addEventListener("click", finalizarCompra);
        }
    }
     // Calcula el subtotal del carrito
    function calculateSubtotal(carrito) {
        return carrito.reduce((total, producto) => total + producto.cost * producto.cantidad, 0);
    }
     // Actualiza el costo de envío basado en el tipo de envío seleccionado
    function updateShippingCost() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const shippingSelect = document.getElementById("shippingType");
        const shippingPercentage = parseFloat(shippingSelect.options[shippingSelect.selectedIndex].dataset.percentage);
        const subtotal = calculateSubtotal(carrito);
        const shippingCost = subtotal * shippingPercentage;

        document.getElementById("shippingCost").textContent = shippingCost.toFixed(2);
        updateTotal(subtotal, shippingCost);
    }
     // Actualiza el total (subtotal + costo de envío)
    function updateTotal(subtotal, shippingCost) {
        const total = subtotal + shippingCost;
        document.getElementById("total").textContent = total.toFixed(2);
    }
    // Cambia los campos de pago según la forma de pago seleccionada
    function togglePaymentFields() {
        const paymentMethod = document.getElementById("paymentMethod").value;
        document.querySelectorAll(".payment-input").forEach(input => input.style.display = "none");

        if (paymentMethod === "credit-card") {
            document.getElementById("cardNumber").style.display = "block";
            document.getElementById("expiryDate").style.display = "block";
            document.getElementById("cvv").style.display = "block";
        } else if (paymentMethod === "bank-transfer") {
            document.getElementById("accountNumber").style.display = "block";
        }
    }
    
    // Valida los campos obligatorios antes de finalizar la compra
    function validarCompra() {
        const department = document.getElementById("department").value.trim();
        const locality = document.getElementById("locality").value.trim();
        const street = document.getElementById("street").value.trim();
        const number = document.getElementById("number").value.trim();
        const corner = document.getElementById("corner").value.trim();

        if (!department || !locality || !street || !number || !corner) {
            alert("Por favor, completa todos los campos de dirección de envío.");
            return false;
        }

        const shippingType = document.getElementById("shippingType").value;
        if (!shippingType) {
            alert("Por favor, selecciona un tipo de envío.");
            return false;
        }

        const paymentMethod = document.getElementById("paymentMethod").value;
        if (!paymentMethod) {
            alert("Por favor, selecciona una forma de pago.");
            return false;
        }

        if (paymentMethod === "credit-card") {
            const cardNumber = document.getElementById("cardNumber").value.trim();
            const expiryDate = document.getElementById("expiryDate").value.trim();
            const cvv = document.getElementById("cvv").value.trim();
            if (!cardNumber || !expiryDate || !cvv) {
                alert("Por favor, completa todos los campos de la tarjeta de crédito.");
                return false;
            }
        } else if (paymentMethod === "bank-transfer") {
            const accountNumber = document.getElementById("accountNumber").value.trim();
            if (!accountNumber) {
                alert("Por favor, ingresa el número de cuenta para la transferencia bancaria.");
                return false;
            }
        }

        return true;
    }

    // Finaliza la compra si se han validado todos los datos
    function finalizarCompra() {
        if (validarCompra()) {
            alert("¡Compra realizada con éxito!");
        }
    }
    // Función para cambiar la cantidad de un producto específico
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
   //Función para eliminar un producto específico del carrito
    window.removeFromCart = function (productId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(producto => producto.id !== productId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCart();
        actualizarBadgeCarrito(carrito);
    };

    // Función para vaciar el carrito
    window.clearCart = function () {
        localStorage.removeItem('carrito');
        renderCart();
        actualizarBadgeCarrito([]);
    };
});

// Función para cambiar la moneda
window.changeCurrency = function (currency) {
    document.querySelectorAll(".btn-currency").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.btn-currency[onclick="changeCurrency('${currency}')"]`).classList.add("active");
};