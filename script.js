let carrito = [];

function addToCart(nombreProducto, precio) {
  carrito.push({ nombre: nombreProducto, precio: precio });
  actualizarCarrito();
  actualizarContadorCarrito();
  // Ya no se abre el modal automáticamente
}

function abrirCarrito() {
  document.getElementById("cart-modal").style.display = "block";
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  actualizarContadorCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("cart-items");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach((producto, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      ${producto.nombre} - $${producto.precio.toLocaleString()}
      <button class="eliminar-btn" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    lista.appendChild(item);
    total += producto.precio;
  });

  const totalItem = document.createElement("li");
  totalItem.textContent = `Total: $${total.toLocaleString()}`;
  totalItem.style.fontWeight = "bold";
  totalItem.style.marginTop = "10px";
  lista.appendChild(totalItem);
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("cart-count");
  contador.textContent = carrito.length;
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra😎");
  carrito = [];
  actualizarCarrito();
  actualizarContadorCarrito();
  closeCart();
}

// Filtrar productos
function filterItems(categoria) {
  const productos = document.querySelectorAll(".product");
  productos.forEach(producto => {
    producto.style.display = producto.classList.contains(categoria) ? "block" : "none";
  });
}

function showAll() {
  document.querySelectorAll(".product").forEach(p => p.style.display = "block");
}

// Inicializa el contador al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);