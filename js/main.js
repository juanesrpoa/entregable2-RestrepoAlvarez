const productos = [
  { id: 1, nombre: "Camiseta", precio: 20 },
  { id: 2, nombre: "Pantalón", precio: 40 },
  { id: 3, nombre: "Zapatos", precio: 60 }
];

let carrito = [];

const form = document.getElementById("formProducto");
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const botonVaciar = document.getElementById("vaciarCarrito");

function agregarAlCarrito(idProducto, cantidad) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  const itemExistente = carrito.find(p => p.id === idProducto);
  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalCarrito.textContent = total;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const data = localStorage.getItem("carrito");
  if (data) {
    carrito = JSON.parse(data);
    mostrarCarrito();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById("producto").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);
  agregarAlCarrito(id, cantidad);
});

botonVaciar.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
});

cargarCarrito();