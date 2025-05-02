const listaTareas = document.getElementById("listaTareas");
const input = document.getElementById("tareaInput");
const mensaje = document.getElementById("mensajeError");
const mensajeVacio = document.getElementById("mensajeVacio");

document.getElementById("agregarBtn").addEventListener("click", agregarTarea);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        agregarTarea();
    }
});

function agregarTarea(){
    const textoTarea = input.value.trim();

    if (textoTarea === "") {
        mensaje.style.display = "block";
        return;
    } else {
        mensaje.style.display = "none";
    }

    crearTarea(textoTarea);
    input.value = "";
    guardarLocalStorage();
}

function crearTarea(texto, completada = false){
    const li = document.createElement("li");

    const spanTexto = document.createElement("span");
    spanTexto.textContent = texto;
    spanTexto.classList.add("texto-tarea");
    li.appendChild(spanTexto);

    if (completada) {
        li.classList.add("completada");
    }

    li.addEventListener("click", () => {
        li.classList.toggle("completada");
        guardarLocalStorage();
    });

    const eliminar = document.createElement("button");
    eliminar.textContent = "Borrar";
    eliminar.classList.add("eliminar");
    eliminar.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        guardarLocalStorage();
    });

    li.appendChild(eliminar);
    listaTareas.appendChild(li);
}

function guardarLocalStorage(){
    const tareas = [];
    listaTareas.querySelectorAll("li").forEach(li => {
        const texto = li.querySelector(".texto-tarea").textContent;
        tareas.push({
            texto: texto,
            completada: li.classList.contains("completada")
        });
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));

    if (tareas.length === 0) {
        mensajeVacio.style.display = "block"; 
    } else {
        mensajeVacio.style.display = "none"; 
    }
}

function cargarDesdeLocalStorage(){
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareasGuardadas.forEach(tarea => crearTarea(tarea.texto, tarea.completada));

    if (tareasGuardadas.length === 0) {
        mensajeVacio.style.display = "block"; 
    } else {
        mensajeVacio.style.display = "none";
    }
}

cargarDesdeLocalStorage();