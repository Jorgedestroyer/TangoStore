// Array para almacenar los productos agregados al carrito
let carrito = [];

// Función para agregar un producto al carrito (sin talla)
function addToCart(nombreProducto, precio) {
  // Agrega el producto como objeto al carrito
  carrito.push({ nombre: nombreProducto, precio: precio });
  // Actualiza la visualización del carrito
  actualizarCarrito();
  // Actualiza el contador visual del carrito
  actualizarContadorCarrito();
  // Ya no se abre el modal automáticamente
}

// Función para mostrar el modal del carrito
function abrirCarrito() {
  document.getElementById("cart-modal").style.display = "block";
}

// Función para cerrar el modal del carrito
function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

// Función para eliminar un producto del carrito por su índice
function eliminarDelCarrito(index) {
  carrito.splice(index, 1); // Elimina el producto del array
  actualizarCarrito();      // Actualiza la visualización del carrito
  actualizarContadorCarrito(); // Actualiza el contador visual
}

// Función para actualizar la lista de productos en el carrito y mostrar el total
function actualizarCarrito() {
  const lista = document.getElementById("cart-items"); // Obtiene el elemento UL del carrito
  lista.innerHTML = ""; // Limpia la lista
  let total = 0;        // Variable para el total de la compra

  // Recorre cada producto en el carrito y lo muestra en la lista
  carrito.forEach((producto, index) => {
    const item = document.createElement("li");
    // Muestra nombre, talla (si existe) y precio, y un botón para eliminar
    item.innerHTML = `
      ${producto.nombre} - Talla: ${producto.talla} - $${producto.precio.toLocaleString()}
      <button class="eliminar-btn" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    lista.appendChild(item);
    total += producto.precio; // Suma el precio al total
  });

  // Agrega un elemento al final con el total de la compra
  const totalItem = document.createElement("li");
  totalItem.textContent = `Total: $${total.toLocaleString()}`;
  totalItem.style.fontWeight = "bold";
  totalItem.style.marginTop = "10px";
  lista.appendChild(totalItem);
}

// Función para actualizar el contador visual del carrito (ícono)
function actualizarContadorCarrito() {
  const contador = document.getElementById("cart-count");
  contador.textContent = carrito.length;
}

// Función para finalizar la compra y vaciar el carrito
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra😎");
  carrito = []; // Vacía el carrito
  actualizarCarrito();
  actualizarContadorCarrito();
  closeCart();
}

// Función para filtrar productos por categoría
function filterItems(categoria) {
  const productos = document.querySelectorAll(".product");
  productos.forEach(producto => {
    // Muestra solo los productos que tienen la clase de la categoría seleccionada
    producto.style.display = producto.classList.contains(categoria) ? "block" : "none";
  });
}

// Función para mostrar todos los productos (quita el filtro)
function showAll() {
  document.querySelectorAll(".product").forEach(p => p.style.display = "block");
}

// Inicializa el contador del carrito cuando la página termina de cargar
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

// Función para agregar productos con selección de talla (para ropa y zapatillas)
function agregarProductoConTalla(btn, nombreProducto, precio) {
  // Busca el select de talla dentro del mismo producto
  const select = btn.parentElement.querySelector('.talla-select');
  const talla = select ? select.value : '';
  // Si no se seleccionó talla, muestra una alerta
  if (!talla) {
    alert('Por favor selecciona una talla.');
    return;
  }
 // Agrega el producto con la talla seleccionada al carrito
  carrito.push({ nombre: nombreProducto, precio: precio, talla: talla });
  actualizarCarrito();
  actualizarContadorCarrito();
}