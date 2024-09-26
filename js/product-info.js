function fetchProduct() {
    // Obtiene el ID del producto seleccionado desde localStorage
    const selectedProductId = localStorage.getItem("selectedProductId");

    if (selectedProductId) {
        // URL con el ID del producto para obtener los datos
        const url = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición');
                }
                return response.json();
            })
             // Obtiene los elementos del DOM donde se mostrarán las imágenes y los detalles del producto
            .then(data => {
                const productList = document.getElementById('product');
                const carouselInner = document.getElementById('carousel-images');

                // Si se encuentra el producto seleccionado, genera el HTML para mostrarlo
                if (data) {
                    // Generar las imágenes para el carrusel
                    if (data.images && data.images.length > 0) {
                        data.images.forEach((image, index) => {
                            const carouselItem = document.createElement('div');
                            carouselItem.classList.add('carousel-item');
                            if (index === 0) {
                                carouselItem.classList.add('active');
                            }

                            const img = document.createElement('img');
                            img.src = image; // Asigna la ruta de la imagen
                            img.classList.add('d-block', 'w-100', 'img-fluid'); // Clases de Bootstrap para hacer la imagen responsiva
                            img.alt = data.name;

                            carouselItem.appendChild(img);
                            carouselInner.appendChild(carouselItem);
                        });
                    } else {
                        carouselInner.textContent = "No hay imágenes disponibles para este producto.";
                    }

                    // Luego, añadir la tarjeta con la información del producto
                    const productCard = document.createElement('div');
                    productCard.classList.add('card', 'p-3', 'mx-auto');

                    const cardBodyDiv = document.createElement('div');
                    cardBodyDiv.classList.add('card-body');

                    const productName = document.createElement('h1');
                    productName.classList.add('card-title');
                    productName.textContent = data.name;

                    const productDescription = document.createElement('p');
                    productDescription.classList.add('card-text');
                    productDescription.textContent = data.description;

                    const productCategory = document.createElement('p');
                    productCategory.classList.add('card-text', 'text-muted');
                    productCategory.textContent = `Categoría: ${data.category}`;

                    const productSold = document.createElement('p');
                    productSold.classList.add('btn', 'btn-secondary', 'text-white', 'mb-3', 'product-sold');
                    productSold.textContent = `Cantidad de vendidos: ${data.soldCount}`;

                    cardBodyDiv.appendChild(productName);
                    cardBodyDiv.appendChild(productCategory);
                    cardBodyDiv.appendChild(productDescription);
                    cardBodyDiv.appendChild(productSold);
                    productCard.appendChild(cardBodyDiv);
                    productList.appendChild(productCard);
                } else {
                    productList.textContent = "El producto seleccionado no existe.";
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la petición:', error);
            });
    } else {
        console.error('No se encontró el ID del producto en el localStorage.');
    }
}

// Ejecuta la función fetchProduct cuando el contenido del DOM se ha cargado
document.addEventListener('DOMContentLoaded', fetchProduct);
