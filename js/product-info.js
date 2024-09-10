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
                    // div contenedor principal
                    const containerDiv = document.createElement('div');
                    containerDiv.classList.add('container', 'text-center', 'mb-4');

                    // Imagen del producto
                    const productImage = document.createElement('img');
                    productImage.src = selectedProduct.image;
                    productImage.alt = selectedProduct.name;
                    productImage.classList.add('img-fluid', 'mx-auto', 'd-block', 'mb-3', 'imagen-principal'); //product image es la clase para dar estilo en css

                    // Tarjeta para la información del producto
                    const productCard = document.createElement('div');
                    productCard.classList.add('card', 'p-3','mx-auto'); // mx-auto centra la tarjeta
                    // Cuerpo del tarjeta
                    const cardBodyDiv = document.createElement('div');
                    cardBodyDiv.classList.add('card-body');

                    // Nombre
                    const productName = document.createElement('h1');
                    productName.classList.add('card-title');
                    productName.textContent = selectedProduct.name;

                    // Descripción
                    const productDescription = document.createElement('p');
                    productDescription.classList.add('card-text');
                    productDescription.textContent = selectedProduct.description;

                    // Categoría
                    const productCategory = document.createElement('p');
                    productCategory.classList.add('card-text', 'text-muted');
                    productCategory.textContent = `Categoría: ${data.catName}`;
                    

                    // Cantidad de vendidos con estilo de botón
                    const productSold = document.createElement('p');
                    productSold.classList.add('btn', 'btn-secondary', 'text-white', 'mb-3');
                    productSold.classList.add('button-text'); //Clase para acceder desde css
                    productSold.style.border = 'none'; 
                    productSold.textContent = `Cantidad de vendidos: ${selectedProduct.soldCount}`;


                    // Para añadir los elementos a la tarjeta
                    cardBodyDiv.appendChild(productName);
                    cardBodyDiv.appendChild(productCategory);
                    cardBodyDiv.appendChild(productDescription);
                    cardBodyDiv.appendChild(productSold);

                    // Añadir el cuerpo de la tarjeta al la principal
                    productCard.appendChild(cardBodyDiv);

                    // Añadir la imagen y la tarjeta al contenedor principal
                    containerDiv.appendChild(productImage);
                    containerDiv.appendChild(productCard);

                    // Añade el contenedor principal al productList
                    productList.appendChild(containerDiv);
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
