// Obtén el identificador de la categoría desde el almacenamiento local
const catID = localStorage.getItem('catID');

// Verifica si el identificador de la categoría está disponible en el localStorage
if (catID) {
  // Construye la URL usando el identificador de la categoría
  const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;


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
      productDiv.innerHTML = ` 
        <div class="producto">
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
  .catch(error => {
    console.error('Hubo un problema con la petición:', error);
  });
} else {
  console.error('No se encontró el identificador de categoría en el localStorage.');
}
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PRICE = "Precio";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PRICE) {
        result = array.sort(function(a, b) {
            let aPrice = parseFloat(a.price);
            let bPrice = parseFloat(b.price);

            if (aPrice > bPrice) { return -1; }
            if (aPrice < bPrice) { return 1; }
            return 0;
        });
    }

    return result;
}
