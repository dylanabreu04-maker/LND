const btn = document.getElementById("botonMenu");
const menu = document.getElementById("miMenu");

function mostrarMenu(){
    menu.classList.toggle("mostrar")
    if (menu.classList.contains("mostrar")) 
    {
        
        btn.textContent = "x"
    }
    else 
    {
        
        btn.textContent = "☰"
    }


}

btn.addEventListener("click", mostrarMenu);