const lista = document.getElementById("carrito");
const lista2 = document.getElementById("total")
const botones = document.querySelectorAll(".btn-agregar")

let carrito = [];

class Producto{
    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = cantidad;
    }
}


// Crear una funcion que recorra la lista de botones y les cargue un evento
function cargaBotones(){
    botones.forEach((boton)=> {
        boton.addEventListener("click", () => {
            const nombre = boton.dataset.nombre;
            const precio = boton.dataset.precio;
            añadircarrito(boton.dataset.nombre, boton.dataset.precio)//añado item
            mostrarCarrito(); //muestro item
            importeTotal();
            
        })
    })
}

function añadircarrito(nombre, precio){
    let existe = false

    //const productoExistente = carrito.find(producto => producto.nombre === nombre);
    //if (productoExistente) productoExistente.cantidad++;
    //else carrito.push(new Producto(nombre, precio, 1));

    carrito.forEach((producto) => {
        if(producto.nombre === nombre){
            producto.cantidad ++;
            existe = true;
        }
        
    })
    if (!existe) carrito.push(new Producto(nombre, precio, 1));
    
}



//Funcion para mostrar el nombre precio y cantidad de los articulos
function mostrarCarrito(){

    lista.innerHTML = `CARRITO`;
    let contador = 0;

    while (contador < carrito.length){
        //creo elemento div
        let divlista = document.createElement("div");

        //modifica html
        divlista.innerHTML = `El nombre del ${contador+1}º es <strong>${carrito[contador].nombre}</strong>         <button id="bonon ${contador+1}" data-nombre="${carrito[contador].nombre}">+</button>      <button>-</button><br>
        El precio del ${contador+1}º es ${carrito[contador].precio}💰<br>
        La cantidad del ${contador+1}º es ${carrito[contador].cantidad}<br><hr><hr>`

        
        //añade una clase
        divlista.classList.add("elemento-lista") 

        //hace hijo el elemento
        lista.appendChild(divlista); 

        contador++;
    }
    
        
}


//Funcion que calcule el importe total
//producto1.precio * producto1.cantidad + produtcto2.precio * producto2.cantiodad.. ........
function importeTotal()
{
    let contador = 0;
    let total = 0;
    
    while (contador < carrito.length)
    {
        total += carrito[contador].precio * carrito[contador].cantidad;
        contador ++;
    }

    lista2.innerHTML = `El total es: ${total}`;
    
}

cargaBotones();