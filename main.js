
//Esta es la estructura general de como agregar productos al carrito de compras
//muestra por html los pasillos y los productos del pasillo frutas y verduras
//porfavor abrir el inspector del navegador para ver la logica por el console 
//el navegador, a partir de esta entrega se armara le segunda entrega incorporar 
//eventos, en este desafio se interactua con HTML


let produCarrito = []
let precioTotalCompra = 0
let productosTotalCompra = 0
let sidebarComponentes = document.getElementById("sidebar")
let botonCarrito = document.getElementById("carrito")
let carritoVaciar = document.getElementById("carritoVaciar")



const calculaTotalesGeneral = () => {

    precioTotalCompra = productosBuscador.precio + precioTotalCompra
    productosTotalCompra++

    let productos = document.getElementById("productos")
    let total = document.getElementById("total")

    productos.innerText = productosTotalCompra
    total.innerText = precioTotalCompra

}

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
                precio: productosBuscador.precio,
                imagen : productosBuscador.imagen

            })
    }  

}

//construye la plantilla para mostrar dinamicamente los objetos del arreglo productosCarrito con su respectivo boton
for (const verProductos of productosCarrito){
    let contenido = document.createElement("div")
    contenido.innerHTML =  `${verProductos.producto}
                            Precio: ${verProductos.precio}
                            <button type="button" class="btn btn-success" data-id=${verProductos.id} >Agregar</button>
                        `
    document.body.appendChild(contenido)    
}


//agrega el evento click al boton
const boton = document.querySelectorAll('button')
    boton.forEach(function(item){
        item.addEventListener('click', function(){
            productosBuscador = productosCarrito.find(productosCarrito => productosCarrito.id == item.dataset.id)
            calculaTotalesGeneral()
            calculaTotales()
         
    })

})

botonCarrito.onclick = () => {
    let productosCarritoIteracion = produCarrito.map(function(element){
        return `    ${element.producto}, Cantidad: ${element.cantidad}`;
    })
    if (produCarrito != ''){
        alert("Productos en tu carrito \n\n" + " " + productosCarritoIteracion.join("\n"))
    }else{
        alert("El carrito de compras está vacío ")
    }

}

carritoVaciar.onclick = () => {
    produCarrito = []
    precioTotalCompra = 0
    productosTotalCompra = 0
    alert("El carrito de compras esta vacio")
    location.reload()    


}
















   
  








