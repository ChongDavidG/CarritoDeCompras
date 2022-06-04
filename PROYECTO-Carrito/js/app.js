// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


function cargarEventListeners() {
    //cuando agregas un cursos presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);


    //Eliminar
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar elementos
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })
}
cargarEventListeners();


// Funciones
function agregarCurso(boton) {
    boton.preventDefault();

    if( boton.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = boton.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

// Eliminar productos
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso'));
        const cursoId = e.target.getAttribute('data-id') ;

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )

       carritoHTML();
}






function leerDatosCurso(curso) {
    // console.log(curso)

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // revisar si ya existe un elemento para no duplicar
    const existe = articulosCarrito.some( curso => curso.id ===infoCurso.id );
    if(existe) {
        const cursos = articulosCarrito.map( curso => {
            if( curso.id ===infoCurso.id ) {
                curso.cantidad++;
                return curso;  // retorna objeto actualiado
            } else {
                return curso; // retorna los no duplicados
            }
        } )
        articulosCarrito = [...cursos];
    } else {
        // Agregar elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {
    
    limpiarHTML();


    articulosCarrito.forEach( curso => {
        console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
            `;
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
    })
}

// Eliminar los cursos para no repetir

function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';       

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}