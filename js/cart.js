function getProductCost(productId) {
    const productCost = localStorage.getItem(`productCost_${productId}`);
    if (productCost) {
        console.log(`El costo del producto con ID ${productId} es: ${productCost}`);
        return productCost;
    } else {
        console.log(`No se encontró información del costo para el producto con ID ${productId}`);
        return null;
    }
}

// Ejemplo de uso
const costoProducto1 = getProductCost(1); // Recupera el costo del producto con ID 1

// Carrito
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el contenedor principal del carrito
    const container = document.querySelector(".container-carrito");

    // Inicializa el carrito en localStorage si no existe y actualiza el badge
    function inicializarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarBadgeCarrito(carrito);
        return carrito;
    }

    // Actualiza el badge en el botón "Mi carrito" con el total de productos
    function actualizarBadgeCarrito(carrito) {
        const badge = document.getElementById('cart-badge');
        if (badge) {
            const totalProductos = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
            badge.textContent = totalProductos;
        }
    }

    // Obtiene el ID del producto seleccionado desde el localStorage
    const productId = localStorage.getItem('selectedProductId');

    // Verifica si hay detalles del producto almacenados en localStorage
    let productName = localStorage.getItem('productName');
    let productCost = localStorage.getItem('productCost');
    let productCurrency = localStorage.getItem('productCurrency');
    let productImage = localStorage.getItem('carouselImage0');

    // Si el producto seleccionado está en el localStorage, intenta cargar los datos
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

    // **Función para agregar el producto al carrito o actualizar cantidad si ya existe**
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

    // Función para renderizar el carrito
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
                            <p>${producto.currency} <span id="subtotal-${producto.id}">${(producto.cost * producto.cantidad).toFixed(2)}</span></p>
                        </div>
                        <button class="btn-remove" onclick="removeFromCart(${producto.id})">×</button>
                    </div>
                `;
            });

            container.innerHTML += `
                <div class="cart-summary">
                    <p><strong>SUBTOTAL:</strong> <span id="subtotal">${calculateSubtotal(carrito)}</span></p>
                    <p>¿En qué moneda quieres pagar?</p>
                    <button class="btn-currency active" onclick="changeCurrency('USD')">USD</button>
                    <button class="btn-currency" onclick="changeCurrency('UYU')">UYU</button>
                    <p>¿Tienes un cupón de descuento?</p>
                    <input type="text" class="discount-input" placeholder="INGRESA TU CODIGO" id="discountCode">
                    <p><strong>TOTAL:</strong> <span id="total">${calculateSubtotal(carrito)}</span></p>
                </div>
                 <button class="btn-continue" onclick="window.location.href='categories.html'">Continuar comprando</button>
            `;
        }
    }
      // ACTUALIZA EN TIEMPO REAL EL CARRITO//
    function actualizarBadgeCarrito(carrito) {
        const badge = document.getElementById('cart-count');
        if (badge) {
            const totalProductos = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
            badge.textContent = totalProductos;
            badge.classList.toggle("d-none", totalProductos === 0); // Oculta si está vacío
        }
    }
    

    // **Función para calcular el subtotal del carrito**
    function calculateSubtotal(carrito) {
        return 'USD ' + (carrito.reduce((total, producto) => total + producto.cost * producto.cantidad, 0).toFixed(2));
    }

    // **Función para cambiar la cantidad de un producto específico**
    window.changeQuantity = function(productId, delta) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const producto = carrito.find(producto => producto.id === productId);

        if (producto) {
            producto.cantidad = Math.max(1, producto.cantidad + delta);
            document.getElementById(`quantity-${productId}`).value = producto.cantidad; // Actualiza la cantidad en el campo de texto
            document.getElementById(`subtotal-${productId}`).textContent = 'USD ' + (producto.cost * producto.cantidad).toFixed(2); // Actualiza el subtotal
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
            actualizarBadgeCarrito(carrito);
        }
    };

    // **Función para eliminar un producto específico del carrito**
    window.removeFromCart = function(productId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(producto => producto.id !== productId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCart();
        actualizarBadgeCarrito(carrito);
        updateCartNotification(0); // Resetea la notificación del carrito
    };

    // **Función para vaciar el carrito**
    window.clearCart = function() {
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