// Definimos la URL donde se encuentra el archivo JSON con la colección de productos.
const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

// Realiza la petición GET. Devuelve una promesa que se resuelve en la respuesta del servidor
fetch(url)
  .then(response => {
    if (!response.ok) { //Verifica si la respuesta es satisfactoria, si no es asi, lanza un error.
      throw new Error('Error en la petición: ' + response.statusText);
    }
    return response.json();
  })

  // Manejo de los datos
  .then(data => {
    // Se accede a la propiedad 'catName' para obtener el nombre de la categoría
    document.getElementById('category-name').textContent = data.catName;

    // Selecciona el contenedor donde se mostrarán los productos
    const productList = document.getElementById('product-list');

    // Itera sobre los productos y genera el HTML
    data.products.forEach(producto => { 
      //Se utiliza 'data.products' para acceder a la lista de productos en los datos JSON.
      //'forEach(producto => {...}' Itera sobre cada producto en la lista.
      
      // Crea un elemento div para cada producto
      const productDiv = document.createElement('div');
      productDiv.className = 'product';

      // Inserta el contenido en el div
      // Se construye una plantilla de HTML utilizando literles de plantilla que permiten la inserción de valores dinámicos.
      //Onclick para que al dar clic en un producto, se ejecute la función selectProduct
      productDiv.innerHTML = ` 
          <div class="producto" onclick="selectProduct(${producto.id})"> 
            <img src="${producto.image}" alt="${producto.name}">
            <div class="contenido">
              <div class="info">
                <h2>${producto.name}</h2>
                <p>${producto.description}</p>
              </div>
              <div class="detalles">
                <p>Vendidos: ${producto.soldCount}</p>
                <p>Precio: ${producto.cost} ${producto.currency}</p>
              </div>
            </div>
          </div>`;

      // Agrega cada div del producto al contenedor principal 'product-list'
      productList.appendChild(productDiv);
    });
  })

  // Manejo de errores. Si ocurre un error en alguna de las promesas, este bloqueo lo captura e imprime un mensaje de error en la consola.
  .catch(error => {
    console.error('Hubo un problema con la petición:', error);
  });

  // Función para seleccionar el producto
function selectProduct(productId) {
  // Guardar el ID del producto en el localStorage
  localStorage.setItem('selectedProductId', productId);
  
  // Redirigir a la página del producto
  window.location.href = 'product-info.html';
}