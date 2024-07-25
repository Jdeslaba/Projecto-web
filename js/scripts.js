console.log("funciona");

const form = document.getElementById('formularioadd')
form.onsubmit = añadirProducto
let prodcutos = []


function añadirProducto(ev) {
    ev.preventDefault()
    // console.log(ev);
    let nombre = document.getElementById('nombre').value
    let precio = document.getElementById('precio').value
    let descripcion = document.getElementById('descripcion').value
    let imagen = document.getElementById('imagen').value

    // console.log(nombre);
    // console.log(prodcutos);
    if (nombre != "" && precio != "" && descripcion != "" && imagen != "") {
        prodcutos.push({ nombre, precio, descripcion, imagen })
        mostrarProducto(prodcutos)
        sumado(prodcutos)

    } else {
        alert("rellena todos los campos")
    }

    form.reset()
}

function mostrarProducto(carrito) {
    if (carrito != null && carrito.length > 0) {
        let generado = "<div><h2>Listado de Prodcutos</h2></div>"
        let listado = document.getElementById('cuerpoListado');
        for (let index = 0; index < carrito.length; index++) {
            let imagen = `<div class="listado"><div class="imag"><img src="${carrito[index].imagen}"
            alt="Foto de ${carrito[index].nombre}" onerror="reemplaza_imagen(this);">
            </div>`

            let info = `<div class="info">
            <h2>${carrito[index].nombre}</h2>
            <span>${carrito[index].descripcion}</span>
            </div> `
            let ide = parseInt(index)
            let precio = `<div class="precio">
                    <div>
                    <h3>Precio:
                        <label for="precio">${carrito[index].precio} €</label></h3> 
                        </div>
                        <div>
                        
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="confirmarEliminar(event,${ide})">
        Eliminar
    </button>
                         </div>
                        
                        </div> </div>`
            generado = generado + imagen + info + precio


        }
        listado.innerHTML = generado
    }
    // console.log(prodcutos)
}

function sumado(carrito) {
    if (carrito != null && carrito.length >= 0) {
        let resultado = 0;
        for (let index = 0; index < carrito.length; index++) {
            resultado = parseFloat(resultado) + parseFloat(carrito[index].precio)
        }
        let operacion = document.getElementById('suma')
        operacion.innerHTML = "<b>" + parseFloat(resultado) + " € <b></b>";
    }
}

function confirmarEliminar(ev, numero) {
    ev.preventDefault()

    // let modal = document.getElementById('confirm')
    let modal = document.querySelector('.modal-footer')
    let body = document.querySelector('.modal-body')
    body.innerHTML = `Estas Seguro que deseas eliminar el producto <b>${prodcutos[numero].nombre}</b>? `
    modal.innerHTML = `<button type="button" data-bs-dismiss="modal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="eliminarProducto(event,${numero})">
        Eliminar    
    </button>`


}

function eliminarProducto(ev, numero) {
    ev.preventDefault()
    prodcutos.splice(numero, 1)
    if (prodcutos.length == 0) {
        let listado = document.getElementById('cuerpoListado');
        listado.innerHTML = ""
    }
    // console.log(prodcutos.length);

    mostrarProducto(prodcutos)
    sumado(prodcutos)
}


function reemplaza_imagen(imagen) {
    imagen.onerror = "";
    imagen.src = "../img/no-fotos.png";
    return true;
}
// eliminarProducto()


// console.log(prodcutos);


