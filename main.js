let produCarrito = []
let precioTotalCompra = 0
let productosTotalCompra = 0
let productosBuscador = " "
let miStorage = window.localStorage;
let sidebarComponentes = document.getElementById("sidebar")
let botonCarrito = document.getElementById("carrito")
let carritoVaciar = document.getElementById("carritoVaciar")


const cargarCarritoLocal = () => {

    if (miStorage.getItem("carrito") !== null){
        produCarrito = JSON.parse(miStorage.getItem("carrito"))
    }
    if (miStorage.getItem("numeroPedidos") !== null){
        productosTotalCompra = JSON.parse(miStorage.getItem("numeroPedidos"))
        productos.innerText = productosTotalCompra
    } 

}


//calculaTotalesGeneral se encarga de calcular el numero total de productos agregados y el total del precio
const calculaTotalesGeneral = () => {    

    precioTotalCompra = productosBuscador.precio + precioTotalCompra
    productosTotalCompra++
    let productos = document.getElementById("productos")    
    productos.innerText = productosTotalCompra
    localStorage.setItem('numeroPedidos', JSON.stringify(productosTotalCompra)) 
    
}

//calculaTotales se encarga de inyectar los nuevos productos que el usuario selecciona en el nuevo arreglo
const calculaTotales = () => {

    if (produCarrito.some(el => el.id === productosBuscador.id )){
        const posicion = produCarrito.findIndex(el => el.id === productosBuscador.id)
        produCarrito[posicion].cantidad = produCarrito[posicion].cantidad + 1
    } else {               
            produCarrito.push({
                id: productosBuscador.id,
                cantidad: 1,
                producto: productosBuscador.producto,
                gramos: productosBuscador.gramos,
                precio: productosBuscador.precio              

            })
    }
    //crea sessionStorage con los  productos que el usuario selecciona en el carrito, se limpian si se cierra el navegador
    localStorage.setItem('carrito', JSON.stringify(produCarrito)) 

}

//plantilla se encarga de crear la pantilla para mostrar los productos
const plantilla = () => {
    let test = ''
    let contenido = document.getElementById("productos-contenido")
    for (const verProductos of productosCarrito){
        
        test +=  `
                <div class="card text-center" style="width: 18rem;">
                <img src="${verProductos.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${verProductos.producto}</h5>
                <p class="card-text">${verProductos.gramos}.</p>
                <p class="card-text">Precio: ${verProductos.precio}.</p>            
                <button type="button" class="btn btn-success" data-id=${verProductos.id} >Agregar</button>
                </div>
                </div>
                
                `       
    }
    contenido.innerHTML = test    

}

//agrega el evento click al boton de los productos
const eventoBoton = () => {
    
    const boton = document.querySelectorAll('button')
    boton.forEach(function(item){
        item.addEventListener('click', function(){            
            productosBuscador = productosCarrito.find(productosCarrito => productosCarrito.id == item.dataset.id)
            calculaTotalesGeneral()
            calculaTotales()        
         
        })    

    })   

}


//carritoS muestra los productos en el carrito y la cantidad
carritoS.onclick = () => {
    let probando = ''
    let testdos = document.getElementById("testdos")    
    for (const verProdu of produCarrito){
    
        probando +=  `
                    <tr>                    
                    <td>${verProdu.producto}</td>
                    <td>${verProdu.cantidad}</td>
                    <td>${verProdu.precio * verProdu.cantidad}</td>
                    </tr>                
                    `       
    }
    testdos.innerHTML = probando
}

//carritoVaciar limpia el carrito
carritoVaciar.onclick = () => {
    produCarrito = []
    precioTotalCompra = 0
    productosTotalCompra = 0
    localStorage.clear();  
    location.reload()
}

// Inicio
cargarCarritoLocal()
plantilla()
eventoBoton()