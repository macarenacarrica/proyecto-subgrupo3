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


//Bloque Carrito

// Función para obtener productos del carrito desde el localStorage
function getCartProducts() {
    return JSON.parse(localStorage.getItem('cartProducts')) || [];
}

// Función para mostrar los productos en el carrito
function displayCartProducts() {
    const cartContainer = document.getElementById('cart-container');
    const products = getCartProducts();

    if (products.length === 0) {
        // Si no hay productos, mostrar mensaje
        cartContainer.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

    let cartHTML = '';

    products.forEach(product => {
        const subtotal = product.price * product.quantity;

        cartHTML += `
            <div class="cart-product">
                <img src="${product.image}" alt="${product.name}" class="cart-product-image">
                <div class="cart-product-details">
                    <h4>${product.name}</h4>
                    <div class="quantity-control">
                        <label for="quantity-${product.id}"></label>
                        <input id="quantity-${product.id}" type="number" value="${product.quantity}" readonly>
                    </div>
                    <p> ${product.currency} ${subtotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = cartHTML;
}

// Cuando se cargue la página del carrito, mostramos los productos
document.addEventListener('DOMContentLoaded', displayCartProducts);
