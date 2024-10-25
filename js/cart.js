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