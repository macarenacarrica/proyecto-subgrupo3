// URL donde se encuentra la colección de productos en formato JSON
const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

// Realiza la petición GET
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la petición: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Muestra el nombre de la categoría
    document.getElementById('category-name').textContent = data.catName;

    // Selecciona el contenedor donde se mostrarán los productos
    const productList = document.getElementById('product-list');

    // Itera sobre los productos y genera el HTML
    data.products.forEach(producto => {
      // Crea un elemento div para cada producto
      const productDiv = document.createElement('div');
      productDiv.className = 'product';

      // Inserta el contenido en el div
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

      // Agrega el div al contenedor
      productList.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error('Hubo un problema con la petición:', error);
  });