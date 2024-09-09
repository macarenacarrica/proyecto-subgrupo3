// Obtener el ID del producto y la categoría guardados en el localStorage
const catID = localStorage.getItem("catID");
const selectedProductId = localStorage.getItem("selectedProductId");

function fetchProduct() {
    // Verifica si ambos valores (catID y selectedProductId) están presentes en el localStorage
    if (catID && selectedProductId) {
        // URL dinámica utilizando el ID de la categoría 
        const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        // Realiza una petición GET a la URL especificada
        fetch(url)
            .then(response => {
                // Verifica si la respuesta es correcta 
                if (!response.ok) {
                    throw new Error('Error en la petición');
                }
                // Lo convierte en un objeto JSON
                return response.json();
            })
            .then(data => {
                // Selecciona el contenedor donde se va a mostrar la información del producto
                const productList = document.getElementById('product');

                // Busca el producto específico por su ID en la lista de productos obtenidos
                const selectedProduct = data.products.find(producto => producto.id == selectedProductId);

                // Si se encuentra el producto seleccionado, se genera el HTML para mostrarlo
                if (selectedProduct) {
                    // Crea un div para contener la información del producto seleccionado
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('selectedProduct');

                    // Crea y añade la imagen del producto
                    const productImage = document.createElement('img');
                    productImage.src = selectedProduct.image; // URL de la imagen
                    productImage.alt = selectedProduct.name;  // Texto alternativo para la imagen
                    productImage.classList.add('img-fluid');  // Clase para hacer la imagen responsiva

                    // Crea y añade el nombre del producto
                    const productName = document.createElement('h2');
                    productName.textContent = selectedProduct.name;

                    // Crea y añade la descripción del producto
                    const productDescription = document.createElement('p');
                    productDescription.textContent = selectedProduct.description;

                    // Crea y añade el nombre de la categoría
                    const productCategory = document.createElement('p');
                    productCategory.textContent = `Categoría: ${data.catName}`;

                    // Crea y añade el número de productos vendidos
                    const productSold = document.createElement('p');
                    productSold.textContent = `Vendidos: ${selectedProduct.soldCount}`;

                    // Añade todos los elementos al div principal del producto
                    productDiv.appendChild(productImage);
                    productDiv.appendChild(productName);
                    productDiv.appendChild(productCategory);
                    productDiv.appendChild(productDescription);
                    productDiv.appendChild(productSold);

                    // Añade el div con toda la información del producto al contenedor principal
                    productList.appendChild(productDiv);
                } else {
                    // Si no se encuentra el producto, muestra un mensaje de error
                    productList.textContent = "El producto seleccionado no existe.";
                }
            })
            .catch(error => {
                // Muestra un mensaje de error en la consola si algo sale mal en la petición
                console.error('Hubo un problema con la petición:', error);
            });
    } else {
        // Muestra un mensaje de error si no se encontraron los IDs en el localStorage
        console.error('No se encontró el ID de categoría o producto en el localStorage.');
    }
}

// Espera a que el documento haya cargado completamente y luego ejecuta la función fetchProduct
document.addEventListener('DOMContentLoaded', fetchProduct);
