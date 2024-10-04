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
                             relatedImg.src = relatedProduct.image; 
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

// Función para generar dinámicamente el calificador de estrellas y la pantalla de calificación
function setupQualify() {
    const qualifyDiv = document.getElementById('qualify');

  // Crea el título del cuadro de texto
    const title1 = document.createElement('h1');
    title1.textContent = 'Realice su comentario';
    qualifyDiv.appendChild(title1);  

     // Crea el cuadro de texto
    const textBox = document.createElement('textarea');
    textBox.placeholder = 'Escribe tu comentario aquí';
    textBox.rows = 4;  // Ajusta el número de filas según sea necesario
    textBox.cols = 50; // Ajusta el número de columnas según sea necesario
    qualifyDiv.appendChild(textBox);

    // Crea el título para las estrellas
    const title2 = document.createElement('h2');  
    title2.textContent = '¿Cuántas estrellas le das a este producto?';
    qualifyDiv.appendChild(title2);  

    // Crea el contenedor de estrellas
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars-container');

     // Crea las estrellas y las añade al contenedor
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.classList.add('fa', 'fa-star');
        star.setAttribute('data-value', i);// Asigna el valor de la calificación a cada estrella (del 1 al 5)
        starsContainer.appendChild(star);// Añade la estrella al contenedor de estrellas
    }
    qualifyDiv.appendChild(starsContainer);  

   // Crea el texto que mostrará la calificación
    const ratingText = document.createElement('p');
    ratingText.innerHTML = 'Has calificado con <span id="rating-display">0</span> estrellas.';
    qualifyDiv.appendChild(ratingText);

    // Ahora configura el evento de clic para las estrellas
    const stars = starsContainer.querySelectorAll('.fa-star');
    const ratingDisplay = qualifyDiv.querySelector('#rating-display');
    let selectedRating = 0;

    // Evento para seleccionar las estrellas
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            selectedRating = rating;

            // Resetea todas las estrellas
            stars.forEach(s => s.classList.remove('checked'));

            // Aplica la clase 'checked' a las estrellas seleccionadas
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('checked');
            }

             // Actualiza la calificación mostrada en pantalla
            ratingDisplay.textContent = rating;
        });
    });

     // Botón de enviar
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Enviar';
    sendButton.type = 'submit'; 
    qualifyDiv.appendChild(sendButton);

    // Evento click del botón de enviar
    sendButton.addEventListener('click', () => {
        const commentText = textBox.value;

        if (commentText && selectedRating > 0) {
            // Crear la nueva tarjeta de comentario
            const commentCard = document.createElement('div');
            commentCard.classList.add('card', 'm-2', 'p-3', 'w-75', 'mx-auto');

            // Añadir fecha 
            const dateTime = document.createElement('p');
            dateTime.classList.add('card-text', 'small', 'text-muted', 'text-right');
            dateTime.textContent = `Fecha: ${new Date().toLocaleString()}`;
            dateTime.style.position = 'absolute';
            dateTime.style.top = '10px';
            dateTime.style.right = '10px';
            dateTime.style.margin = '0';

            // Añadir el nombre del usuario (puedes modificar esto según el sistema de autenticación)
            const user = document.createElement('h5');
            user.classList.add('card-title', 'text-center', 'mt-3');
            user.textContent = "Usuario Anónimo"; // Este nombre puede venir del sistema de autenticación

            // Añadir el comentario
            const description = document.createElement('p');
            description.classList.add('card-text', 'text-center');
            description.textContent = commentText;

            // Crear las estrellas
            const scoreDiv = document.createElement('div');
            scoreDiv.classList.add('text-center');
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('i');
                star.classList.add('fa', i <= selectedRating ? 'fa-star' : 'fa-star-o', 'yellow-stars');
                star.style.color = 'gold';
                scoreDiv.appendChild(star);
            }

            // Añadir los elementos a la tarjeta
            commentCard.appendChild(dateTime);
            commentCard.appendChild(user);
            commentCard.appendChild(description);
            commentCard.appendChild(scoreDiv);

            // Insertar la tarjeta de comentario al final de la lista de comentarios
            const commentsList = document.getElementById('comments-list');
            commentsList.appendChild(commentCard);

            // Limpiar el cuadro de texto y resetear las estrellas
            textBox.value = '';
            stars.forEach(s => s.classList.remove('checked'));
            ratingDisplay.textContent = '0';

            console.log('Comentario añadido correctamente');
        } else {
            console.log('Debe escribir un comentario y seleccionar una calificación.');
        }
    });
}

 // Asegúrate de que la función se ejecute cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', setupQualify);

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


