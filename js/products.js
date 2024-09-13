// Obtén el identificador de la categoría desde el almacenamiento local
const catID = localStorage.getItem('catID');
const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

if (catID) {
    // Realiza la petición GET. Devuelve una promesa que se resuelve en la respuesta del servidor
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Se accede a la propiedad 'catName' para obtener el nombre de la categoría
            document.getElementById('category-name').textContent = data.catName;

            // Inicializa currentProductsArray con los productos
            currentProductsArray = data.products;

            // Muestra los productos ordenados y filtrados inicialmente
            showProductsList();
        })
        .catch(error => {
            console.error('Hubo un problema con la petición:', error);
        });
} else {
    console.error('No se encontró el identificador de categoría en el localStorage.');
}

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_COST = "Cost";
let currentProductsArray = [];
let currentSortCriteria = ORDER_ASC_BY_NAME; // Orden inicial
let minCost = undefined;
let maxCost = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.slice().sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === ORDER_BY_COST) {
        result = array.slice().sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
    }
    return result;
}

function showProductsList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ""; // Limpiar la lista actual

    // Filtrar productos según el rango de precios
    const filteredProducts = currentProductsArray.filter(product => {
        return (!minCost || product.cost >= minCost) &&
               (!maxCost || product.cost <= maxCost);
    });

    // Ordenar los productos filtrados
    const sortedProducts = sortProducts(currentSortCriteria, filteredProducts);

    // Mostrar los productos ordenados
    //Onclick en linea 70 para que al dar clic en un producto, se ejecute la función selectProduct
    sortedProducts.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
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

        productList.appendChild(productDiv);
    });
}

function sortAndShowProducts(sortCriteria) {
    currentSortCriteria = sortCriteria;
    showProductsList();
}

// Configuración de eventos para ordenamiento y filtrado
document.getElementById("sortAsc").addEventListener("click", function() {
    sortAndShowProducts(ORDER_ASC_BY_NAME);
});

document.getElementById("sortDesc").addEventListener("click", function() {
    sortAndShowProducts(ORDER_DESC_BY_NAME);
});

document.getElementById("sortByCost").addEventListener("click", function() {
    sortAndShowProducts(ORDER_BY_COST);
});

document.getElementById("rangeFilterCost").addEventListener("click", function() {
    minCost = parseFloat(document.getElementById("rangeFilterCostMin").value) || undefined;
    maxCost = parseFloat(document.getElementById("rangeFilterCostMax").value) || undefined;
    showProductsList(); // Mostrar productos con nuevo rango de precios
});

document.getElementById("clearRangeFilter").addEventListener("click", function() {
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList(); // Mostrar productos con filtros eliminados
});

  // Función para seleccionar el producto
function selectProduct(productId) {
  // Guardar el ID del producto en el localStorage
  localStorage.setItem('selectedProductId', productId);
  
  // Redirigir a la página del producto
  window.location.href = 'product-info.html';
}
 
    // Selecciona el campo de entrada de búsqueda y el contenedor donde se mostrará el valor
const input = document.querySelector("input#searchInput"); // Asegúrate de que el input tenga el id 'searchInput'
const log = document.getElementById("product-list"); // Este es el contenedor donde se muestra la lista de productos

// Evento para escuchar cambios en el campo de búsqueda
input.addEventListener("input", updateValue);

function updateValue(e) {
    const searchText = e.target.value.toLowerCase(); // Obtén el valor del input y conviértelo a minúsculas

    // Filtrar los productos que coincidan con el texto ingresado
    const filteredProducts = currentProductsArray.filter(product => {
        return product.name.toLowerCase().includes(searchText) || product.description.toLowerCase().includes(searchText);
    });

    // Llama a una función para mostrar los productos filtrados
    showFilteredProductsList(filteredProducts);
}

// Función que muestra la lista de productos filtrados
function showFilteredProductsList(products) {
    log.innerHTML = ""; // Limpiar la lista actual
};