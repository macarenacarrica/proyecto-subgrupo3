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
                     // Sección para productos relacionados
                     const relatedProductsDiv = document.createElement('div');
                     relatedProductsDiv.classList.add('related-products', 'mt-4');
 
                     // Añadir título para productos relacionados
                     const relatedTitle = document.createElement('h2');
                     relatedTitle.textContent = "Productos Relacionados:";
                     relatedProductsDiv.appendChild(relatedTitle);
 
                     // Contenedor para las imágenes de productos relacionados
                     const relatedImagesDiv = document.createElement('div');
                     relatedImagesDiv.classList.add('d-flex', 'flex-wrap', 'justify-content-start');
 
                     if (data.relatedProducts && data.relatedProducts.length > 0) {
                         data.relatedProducts.forEach(relatedProduct => {
                             const relatedCard = document.createElement('div');
                             relatedCard.classList.add('card', 'm-2', 'text-center', 'small-card');
                             relatedCard.style.width = '300px'; // Ajusta el ancho de la tarjeta
 
                             // Añade un evento de clic para redirigir al producto relacionado
                             relatedCard.addEventListener('click', () => {
                                 localStorage.setItem("selectedProductId", relatedProduct.id);
                                 window.location.reload(); // Recargar la página para mostrar el producto seleccionado
                             });
 
                             const relatedImg = document.createElement('img');
                             relatedImg.src = relatedProduct.image; // Asegúrate de que el objeto relacionado tiene la propiedad 'image'
                             relatedImg.classList.add('card-img-top', 'img-fluid');
                             relatedImg.alt = relatedProduct.name;
 
                             const relatedCardBody = document.createElement('div');
                             relatedCardBody.classList.add('card-body');
 
                             const relatedProductName = document.createElement('h5');
                             relatedProductName.classList.add('card-title', 'small-card-title');
                             relatedProductName.textContent = relatedProduct.name;
 
                             relatedCardBody.appendChild(relatedProductName);
                             relatedCard.appendChild(relatedImg);
                             relatedCard.appendChild(relatedCardBody);
                             relatedImagesDiv.appendChild(relatedCard); // Agregar al contenedor de imágenes
                         });
                     } else {
                         relatedImagesDiv.textContent = "No hay productos relacionados disponibles.";
                     }
 
                     relatedProductsDiv.appendChild(relatedImagesDiv); // Agregar el contenedor de imágenes al div de productos relacionados
                     productList.appendChild(relatedProductsDiv);
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

// Función para obtener y mostrar los comentarios del producto
function fetchProductComments() {
    const selectedProductId = localStorage.getItem("selectedProductId");  // Obtener el ID del producto

    if (selectedProductId) {
        const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`;

        fetch(commentsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición de comentarios');
                }
                return response.json();
            })
            .then(comments => {
                const commentsList = document.getElementById('comments-list');

                commentsList.innerHTML = '';  // Limpia los comentarios anteriores

                if (comments && comments.length > 0) {
                    comments.forEach(comment => {
                        const commentCard = document.createElement('div');
                        commentCard.classList.add('card', 'm-2', 'p-3', 'w-75', 'mx-auto'); // Ajustar tamaño y centrar

                        const user = document.createElement('h5');
                        user.classList.add('card-title', 'text-center'); // Centrar el nombre del usuario
                        user.textContent = comment.user;

                        const description = document.createElement('p');
                        description.classList.add('card-text', 'text-center'); // Centrar el comentario
                        description.textContent = comment.description;

                        // Crear el elemento para las estrellas
                        const scoreDiv = document.createElement('div');
                        scoreDiv.classList.add('text-center'); // Centrar la puntuación

                        // Generar estrellas
                        for (let i = 1; i <= 5; i++) {
                            const star = document.createElement('i');
                            star.classList.add('fa', i <= comment.score ? 'fa-star' : 'fa-star-o'); // Llenar o vaciar según la puntuación
                            scoreDiv.appendChild(star);
                        }

                        const dateTime = document.createElement('p');
                        dateTime.classList.add('card-text', 'small', 'text-muted', 'text-center'); // Centrar la fecha
                        dateTime.textContent = `Fecha: ${new Date(comment.dateTime).toLocaleString()}`;

                        // Agregar elementos a la tarjeta de comentario
                        commentCard.appendChild(user);
                        commentCard.appendChild(description);
                        commentCard.appendChild(scoreDiv); // Agregar la sección de estrellas
                        commentCard.appendChild(dateTime);

                        // Agregar la tarjeta de comentario a la lista
                        commentsList.appendChild(commentCard);
                    });
                } else {
                    commentsList.textContent = "No hay comentarios disponibles para este producto.";
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la petición de comentarios:', error);
            });
    } else {
        console.error('No se encontró el ID del producto en el localStorage.');
    }
}

document.addEventListener('DOMContentLoaded', fetchProductComments);
