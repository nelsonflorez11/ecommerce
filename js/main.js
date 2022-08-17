let produCarrito = []
let precioTotalCompra = 0
let productosTotalCompra = 0
let productosBuscador = []
let miStorage = window.localStorage;
let sidebarComponentes = document.getElementById("sidebar")
let botonCarrito = document.getElementById("carrito")
let carritoVaciar = document.getElementById("carritoVaciar")
let contenido = document.getElementById("productos-contenido")
let input = document.getElementById("input")
let hola = document.getElementById("hola")
let productos = document.getElementById("productos")
let contadorSuma = []
 





//buscador se encarga de "buscar" concidencia en el array del JSON de los productos
const buscador = (array, texto) => {
    buscadorJson = array.filter(el => el.producto.toLowerCase().includes(texto.toLowerCase()))    
    return buscadorJson    
}

//disparadorRender  ejecuta la funcion buscador plantilla y le pasa los parametros necesarios
const disparadorRender = () => {   
        buscador(productosCarrito, input.value )
        plantilla(buscadorJson)

}

//renderJson carga productos desde un JSON con fetch
const renderJSON = () => {    
    const componentes = fetch('./js/componentes.json')
    componentes
    .then((res) => res.json())  
    .then((res) => {
        productosCarrito = res.productosCarrito        
        disparadorRender()
        
        //este evento esta alerta de lo que se escribe en el input del buscador
        input.addEventListener('input', () => {                     
        disparadorRender()         
               
        })   
            
    })    
} 
 
//cargarCarritoLocal carga data en localStorage del navegador
const cargarCarritoLocal = () => {
    
    if (miStorage.getItem("carrito") !== null){
        produCarrito = JSON.parse(miStorage.getItem("carrito"))
    }

    productos.innerText = productosTotalCompra
    
    if (miStorage.getItem("numeroPedidos") !== null){
        productosTotalCompra = JSON.parse(miStorage.getItem("numeroPedidos"))
        productos.innerText = productosTotalCompra
    } 
}   

let productosBuscadorElimina = []
//calculaTotalesGeneral se encarga de calcular el numero total de productos agregados y el total del precio
const calculaTotalesGeneral = (productosBuscadorElimina) => {

    sumall = contadorSuma.map(item => item.id).reduce((prev, curr) => prev + curr, 0)
    console.log(sumall)
    hola.innerText = sumall 
    if (productosBuscadorElimina != ''){
        holllll = sumall - productosBuscadorElimina.precio

        hola.innerText = holllll 
        eliminaProducto()
            
    }  
   
    productosTotalCompra++  
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

   
    contadorSuma.push({
        id: productosBuscador.precio         

    })    

    //crea localStorage con los  productos que el usuario selecciona en el carrito, se limpian si se cierra el navegador
    localStorage.setItem('carrito', JSON.stringify(produCarrito)) 

}

//plantilla se encarga de crear la pantilla para mostrar los productos
const plantilla = () => {  

    let productosTodosCarritoPlantilla = ''

    for (const verProductos of buscadorJson){
        
        productosTodosCarritoPlantilla +=  `
                <div class="card text-center" style="width: 18rem;">
                <img src="${verProductos.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${verProductos.producto}</h5>
                <p class="card-text">${verProductos.gramos}.</p>
                <p class="card-text">$ ${verProductos.precio}</p>            
                <button type="button" class="agregar btn btn-success" data-id=${verProductos.id} >Agregar</button>
                </div>
                </div>                
                `       
    }
    contenido.innerHTML = productosTodosCarritoPlantilla    
    

    const boton = document.querySelectorAll('.agregar')
    boton.forEach(function(item){
        item.addEventListener('click', function(){            
            productosBuscador = productosCarrito.find(el => el.id == item.dataset.id)

            calculaTotales()
            calculaTotalesGeneral(productosBuscadorElimina)
                    
        }) 
    })     

}



//eliminaProducto elimina los productos del carrito
const eliminaProducto = () => {
    const boton = document.querySelectorAll('.eliminar')    
    boton.forEach(function(item){
        item.addEventListener('click', function(){          
            
            productosBuscadorElimina = produCarrito.find(el => el.id == item.dataset.elimina) 
    
            const index = produCarrito.findIndex( (element) => element.id == item.dataset.elimina)                    

            if (productosBuscadorElimina.cantidad > 0 & productosTotalCompra > 0){
                calculaTotalesGeneral(productosBuscadorElimina)
                productosBuscadorElimina.cantidad = productosBuscadorElimina.cantidad - 1
                productosTotalCompra--
                productos.innerText = productosTotalCompra
                
                localStorage.setItem('numeroPedidos', JSON.stringify(productosTotalCompra))           
                
                imprimeProductosCarrito() 
                eliminaProducto()                           
                
                    if(productosBuscadorElimina.cantidad === 0 & productosTotalCompra === 0 ){
                        localStorage.clear()

                    } 
            }

            produCarrito.splice(index, 1, productosBuscadorElimina)      
  
            localStorage.setItem('carrito', JSON.stringify(produCarrito))
            
        }) 
        

    }) 

    
    
}

//imprimeProductosCarrito imprime los productos en el carrito
const imprimeProductosCarrito = () => {
    let productosCarritoMostrarPlantilla = ''
    let productosCarritoMostrar = document.getElementById("productosCarritoMostrar")    
    for (const verProdu of produCarrito){

        if (verProdu.cantidad > 0 ){
            productosCarritoMostrarPlantilla +=  `
            <tr>                    
            <td>${verProdu.producto}</td>
            <td>${verProdu.cantidad}</td>
            <td>${verProdu.precio * verProdu.cantidad}</td> 
            <td><button type="button" class="eliminar btn btn-danger" data-elimina=${verProdu.id}>Eliminar</button></td>        
            </tr> 
            `                
        }   

    }
    productosCarritoMostrar.innerHTML = productosCarritoMostrarPlantilla
    

}

//carritoS carga los productos en el carrito y la cantidad, y la funcion que elimina
carritoS.onclick = () => {
    imprimeProductosCarrito()
    eliminaProducto()

}

//carritoVaciar limpia el carrito
carritoVaciar.onclick = () => {

    swal("¿Deseas vaciar el carrito?", {
        icon: "warning",
        buttons: {
          cancel: "Vaciar",
          catch: {
            text: "Cancelar",
            value: "catch",
          },
          
        },
      })
      .then((value) => {
        switch (value) {      
          case "catch":            
            break;
       
          default:            
            produCarrito = []
            precioTotalCompra = 0
            productosTotalCompra = 0  
            localStorage.clear();  
            location.reload()
            
        }
      });    
}

//Inicio
renderJSON()
cargarCarritoLocal()


