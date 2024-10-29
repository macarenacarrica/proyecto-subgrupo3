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

    // Obtiene el ID del producto seleccionado desde el localStorage
    const productId = localStorage.getItem('selectedProductId');

    // Verifica si hay detalles del producto almacenados en localStorage
    let productName = localStorage.getItem('productName');
    let productCost = localStorage.getItem('productCost');
    let productCurrency = localStorage.getItem('productCurrency');
    let productImage = localStorage.getItem('carouselImage0'); 

    // revisa si hay productos y realiza un fetch para obtenerlos
    if (productName || productCost || productCurrency || productImage) {
        fetch(`https://japceibal.github.io/emercado-api/cats_products/101.json`)
            .then(response => response.json())
            .then(data => {
                // Busca el producto en el JSON usando el ID almacenado en localStorage
                const selectedProduct = data.products.find(product => product.id == productId);
                
                if (selectedProduct) {
                    // Guarda los detalles del producto en localStorage como texto
                    localStorage.setItem('productName', selectedProduct.name);
                    localStorage.setItem('productCost', selectedProduct.cost);
                    localStorage.setItem('productCurrency', selectedProduct.currency);
                    localStorage.setItem('carouselImage0', selectedProduct.image);

                    // Asigna los valores obtenidos a las variables
                    productName = selectedProduct.name;
                    productCost = selectedProduct.cost;
                    productCurrency = selectedProduct.currency;
                    productImage = selectedProduct.image;

                    // Llama a la función para renderizar el carrito con los datos obtenidos
                    renderCart(productName, productCost, productCurrency, productImage);
                } else {
                    container.innerHTML = "<p>Tu carrito está vacío.</p>";
                }
            });
    } else {
        // Si los detalles ya están en localStorage, renderiza el carrito directamente
        renderCart(productName, productCost, productCurrency, productImage);
    }

    // Función para renderizar el carrito
    function renderCart(name, cost, currency, image) {
        container.innerHTML = `
            <button class="btn-clear-cart">
                <i class="fa fa-trash"></i> Vaciar carrito
            </button>
            <h1>Detalles del Pedido</h1>
            <div class="cart-item">
                <img src="${image}" alt="${name}" class="product-image">
                <div class="cart-details">
                    <h5>${name}</h5>
                    <div class="quantity-control">
                        <button class="btn-quantity" onclick="decreaseQuantity()">-</button>
                        <input type="text" id="quantity" value="1" readonly>
                        <button class="btn-quantity" onclick="increaseQuantity()">+</button>
                    </div>
                    <p>${currency} ${cost}</p>
                </div>
                <button class="btn-remove" onclick="removeFromCart()">×</button>
            </div>
            <div class="cart-summary">
                <p><strong>SUBTOTAL:</strong> ${currency} <span id="subtotal">${cost}</span></p>
                <p>¿En qué moneda quieres pagar?</p>
                <button class="btn-currency active" onclick="changeCurrency('USD')">USD</button>
                <button class="btn-currency" onclick="changeCurrency('UYU')">UYU</button>
                <p>¿Tienes un cupón de descuento?</p>
                <input type="text" class="discount-input" placeholder="INGRESA TU CODIGO" id="discountCode">
                <p><strong>TOTAL:</strong> ${currency} <span id="total">${cost}</span></p>
            </div>
        `;
    }
// Función para aumentar la cantidad
window.increaseQuantity = function () {
    const quantityInput = document.getElementById("quantity");
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1; // Incrementa la cantidad en 1
    updateTotal(currentQuantity + 1);
};

// Función para disminuir la cantidad
window.decreaseQuantity = function () {
    const quantityInput = document.getElementById("quantity");
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1; // Decrementa la cantidad en 1
        updateTotal(currentQuantity - 1);
    }
};

// Función para actualizar el total
function updateTotal(quantity) {
    const cost = parseFloat(localStorage.getItem('productCost')); // Obtén el costo del producto
    const currency = localStorage.getItem('productCurrency');
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const newSubtotal = (cost * quantity).toFixed(2); // Calcula el nuevo subtotal
    subtotalElement.textContent = newSubtotal; // Actualiza el subtotal
    totalElement.textContent = newSubtotal; // Actualiza el total (puedes ajustar si aplicas descuentos)
}

    // Función para vaciar el carrito
    window.removeFromCart = function () {
        localStorage.clear();
        container.innerHTML = "<p>Tu carrito está vacío.</p>";
    };

    // Función para cambiar la moneda
    window.changeCurrency = function (currency) {
        document.querySelectorAll(".btn-currency").forEach(btn => btn.classList.remove("active"));
        document.querySelector(`.btn-currency[onclick="changeCurrency('${currency}')"]`).classList.add("active");
    };
});