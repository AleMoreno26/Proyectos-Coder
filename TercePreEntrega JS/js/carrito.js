// llamo al array desde el localStorage
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const contenedorTotal = document.querySelector("#total")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

function cargarProductosCArrito () {

if (productosEnCarrito && productosEnCarrito.length > 0) {

    contenedorCarritoVacio.classList.add("disabled");
    contenedorProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorProductos.innerHTML = "";

    productosEnCarrito.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
        <img class="imagen-producto-carrito" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-prodcuto-titulo">
            <small>Titulo</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-prodcuto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>${producto.precio}</p>
        </div>
        <div class="carrito-prodcuto-subtotal">
            <small>Subtotal</small>
            <p>${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
        `;

        contenedorProductos.append(div);
    })
} else {

    
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");

}
actualizarBotonesEliminar();
actualizarTotal();
}

cargarProductosCArrito ();

// para el boton mas pequeño de eliminar
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCArrito);
    });
}

function eliminarDelCArrito (e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCArrito ();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// para el boton principal de eliminar
botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito () {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCArrito ();
}

// actualizar la suma total
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", ComprarCarrito);

// darle una funcion al boton comprar
function ComprarCarrito () {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}
