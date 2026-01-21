//son objetos que tengan nombres, precio y cantidad
//una lista de estos objetos(3)
//funcion que nos muestree todos los objetos de la lista
// funcion que calcule el total de limprote del carrito
//document.write para mostrar

class objetos{
    nombre;
    precio;
    cantidad;

    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

let carrito = [] 

const zonaLista = document.getElementRyId("lista")

function anadirCarrito(nombre, precio, cantidad){
    carrito.push(new objetos(nombre, precio, cantidad));
}

function MostrarCarrito(){
    let contador = 0;

    while (contador < carrito.length){
        
        document.write(`El elemento ${contador+1} tiene de nombre ${carrito[contador].nombre}
            vale ${carrito[contador].precio} y hay ${carrito[contador].cantidad} <br>`);
        
        contador++
    }
}

function CalcularTotal(){
    let contador = 0;
    let suma = 0;

    while ( contador < carrito.length){

        suma += carrito[contador].precio * carrito[contador].cantidad;

        contador++;
    }

    document.write(`El total del carrito es: ${suma} <3`)
}

anadirCarrito('Lapiz', 17, 1);
anadirCarrito('Estuche', 5, 2);
anadirCarrito('Calculadora', 1, 3);

