// ctrl+} = Comment

/*array de productos*/
const productos = [
    /*categorias desayunos*/
    {
        id: "Medialunas",
        titulo: "Medialunas",
        imagen: "../img/Medialunasx3.jpg",
        categoria: {
            nombre: "Desayunos",
            id: "Desayunos"
        },
        precio: 2500
    },
    {
        id: "AlfajordeMaicena",
        titulo: "Alfajor de Maicena",
        imagen: "../img/ALF_Maicena.jpg",
        categoria: {
            nombre: "Desayunos",
            id: "Desayunos"
        },
        precio: 2500
    },
    {
        id: "Muffin",
        titulo: "Muffin",
        imagen: "../img/MuffinDDL-300x300.jpg",
        categoria: {
            nombre: "Desayunos",
            id: "Desayunos"
        },
        precio: 1500
    },
    // categorias meriendas
    {
        id: "Frola",
        titulo: "Frola",
        imagen: "../img/PASTAFROLA-1-300x300.jpg",
        categoria: {
            nombre: "Meriendas",
            id: "Meriendas"
        },
        precio: 2000
    },
    {
        id: "Brownie",
        titulo: "Brownie",
        imagen: "../img/BROWNIE-1-300x300.jpg",
        categoria: {
            nombre: "Meriendas",
            id: "Meriendas"
        },
        precio: 2000
    },
    {
        id: "BudinBananayDDL",
        titulo: "Budin Banana y DDL",
        imagen: "../img/BUDIN_BananaDDL-300x300.jpg",
        categoria: {
            nombre: "Meriendas",
            id: "Meriendas"
        },
        precio: 2500
    },
    /*categorias Almuerzos*/
    {
        id: "Hamburguesa",
        titulo: "Hamburguesa",
        imagen: "../img/Almuerzo.jpg",
        categoria: {
            nombre: "Almuerzos",
            id: "Almuerzos"
        },
        precio: 4500
    },
    {
        id: "EnsaladaCesar",
        titulo: "Ensalada Cesar",
        imagen: "../img/Ensalada-Cesar-cortada-600x443-1-300x300.jpg",
        categoria: {
            nombre: "Almuerzos",
            id: "Almuerzos"
        },
        precio: 4500
    },
    {
        id: "Empanadas",
        titulo: "Empanadas",
        imagen: "../img/EMPANADAS-1-300x300.jpg",
        categoria: {
            nombre: "Almuerzos",
            id: "Almuerzos"
        },
        precio: 2000
    }
]

const contenedorProdcutos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categorias");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

//funcion para cargar prodcutos al div
function cargarProdcutos(CategoriaElegida) {

    contenedorProdcutos.innerHTML = "";

    CategoriaElegida.forEach(productos => {
        const div = document.createElement("div");
        //al div le damos la class para que tenga la misma clase creada en el html
        div.classList.add("prodcuto-card");

        div.innerHTML = `
        <img class="producto-imagen" src="${productos.imagen}" alt="${productos.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${productos.titulo}</h3>
            <p class="producto-precio">$${productos.precio}</p>
            <button class="producto-agregar" id=${productos.id}>Agregar</button>
        </div>

        `;

        contenedorProdcutos.append(div);
    })
    actualizarBotonesAgregar();
}
//y

cargarProdcutos(productos);
/*<div class="producto-card">
<img class="producto-imagen" src="./img/Medialunasx3.jpg" alt="imag de medialunas">
<div class="producto-detalles">
    <h3 class="producto-titulo">Medialunas</h3>
    <p class="producto-precio">$1.500</p>
    <button class="producto-agregar">Agregar</button>
</div>*/


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        //lo hago un condicional para que no quede el home vacio, y digo si es diferente al home  y sino que haga un array de cargar todos con "la funcion cargar prodcutos(productos)"
        if (e.currentTarget.id != "Home") {

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosElegidos = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

            cargarProdcutos(productosElegidos);
        } else {

            tituloPrincipal.innerText = "Home";
            //llamo a la funcion que muestra todos los productos
            cargarProdcutos(productos);
        }

    })
})


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCArrito);
    });
}
// para que cuando se recargue la pagina no se vuleva a cero el carrito
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarnumero();
} else {

    productosEnCarrito = [];
}


function agregarAlCArrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarnumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarnumero() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}
//todo lo de arriba es apra quese cree el numerito en el carrito 