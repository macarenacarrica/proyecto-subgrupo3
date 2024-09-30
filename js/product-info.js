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


// Función para obtener y mostrar los comentarios del producto
function fetchProductComments() {
    // Obtener el ID almacenado en localStorage
    const selectedProductId = localStorage.getItem("selectedProductId");

    // Si existe un ID de producto almacenado
    if (selectedProductId) {
        // URL para obtener los comentarios del producto basado en el ID
        const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`;

        // Realiza la petición fetch
        fetch(commentsUrl)
            .then(response => {
                // Verificar la respuesta
                if (!response.ok) {
                    throw new Error('Error en la petición de comentarios');
                }
                // Convertir la respuesta a formato JSON
                return response.json();
            })
            .then(comments => {
                // Obtenemos el elemento del DOM donde se mostrarán los comentarios
                const commentsList = document.getElementById('comments-list');

                // Limpia los comentarios anteriores
                commentsList.innerHTML = '';

                // Se verifica si existen comentarios para mostrar
                if (comments && comments.length > 0) {
                    // Recorre cada comentario
                    comments.forEach(comment => {
                        // Creamos la tarjeta para cada comentario
                        const commentCard = document.createElement('div');
                        commentCard.classList.add('card', 'm-2', 'p-3', 'w-75', 'mx-auto'); // Ajusta el tamaño y centrar la tarjeta

                        // Creamos el elemento para la fecha y hora del comentario
                        const dateTime = document.createElement('p');
                        dateTime.classList.add('card-text', 'small', 'text-muted', 'text-right'); // Alinea el texto a la derecha
                        dateTime.textContent = `Fecha: ${new Date(comment.dateTime).toLocaleString()}`; // Muestra la fecha y hora
                        dateTime.style.position = 'absolute';  // Situar en la esquina superior
                        dateTime.style.top = '10px';           // Distancia parte superior
                        dateTime.style.right = '10px';         // Alineación derecha
                        dateTime.style.margin = '0';

                        // Creamos el elemento, para mostrar el nombre del usuario
                        const user = document.createElement('h5');
                        user.classList.add('card-title', 'text-center', 'mt-3'); //Nombre centrado y añadiendo margen superior
                        user.textContent = comment.user;  // Nombre del usuario

                        // Creamos el párrafo para el texto del comentario
                        const description = document.createElement('p');
                        description.classList.add('card-text', 'text-center'); // Centrando el comentario
                        description.textContent = comment.description;  // Texto del comentario

                        // Creamos un contenedor para las estrellas de calificación
                        const scoreDiv = document.createElement('div');
                        scoreDiv.classList.add('text-center'); // Centrar el contenedor de estrellas

                        // Generar las estrellas según la puntuación del comentario
                        for (let i = 1; i <= 5; i++) {
                            const star = document.createElement('i');
                            // Agrega una estrella llena o vacía dependiendo de la puntuación
                            star.classList.add('fa', i <= comment.score ? 'fa-star' : 'fa-star-o', 'yellow-stars');
                            star.style.color = 'gold';  // Cambiar el color de las estrellas a gold
                            scoreDiv.appendChild(star); // Agregar la estrella al contenedor
                        }

                        // Lo añadimos a la tarjeta de comentario
                        commentCard.appendChild(dateTime);
                        commentCard.appendChild(user);
                        commentCard.appendChild(description);
                        commentCard.appendChild(scoreDiv);

                        // Finalmente, agregamos la tarjeta de comentario a la lista de comentarios en el DOM
                        commentsList.appendChild(commentCard);
                    });
                } else {
                    // Si no hay comentarios, mostrar un mensaje de aviso
                    commentsList.textContent = "No hay comentarios disponibles para este producto.";
                }
            })
            .catch(error => {
                // Manejar cualquier error durante la petición
                console.error('Hubo un problema con la petición de comentarios:', error);
            });
    } else {
        // Si no se encuentra el ID del producto en el localStorage
        console.error('No se encontró el ID del producto en el localStorage.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    fetchProduct(); // Llamar a la función para obtener detalles del producto
    fetchProductComments(); // Llamar a la función para obtener comentarios del producto
});

