let distritos = [];
function obtenerDistritos() {
  fetch("./distritos.json")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((lista) => {
      distritos= lista;
      distritos.forEach((distrito, i) => {
        let option = document.createElement("option");
        option.value = distrito.id;
        option.text = distrito.nombre;
        selectDistritos.appendChild(option);
      });
    });
}

obtenerDistritos()

let tabla = document.getElementById("table");
let selectDistritos = document.getElementById("selectDistrito");

// --------------- Lógica para agregar distritos al localStorage ---------------
localStorage.setItem("distritosSeleccionados", JSON.stringify([]));

selectDistritos.addEventListener('change', () => {
  // Get the selected option within the select element
  let selectedOption = selectDistritos.options[selectDistritos.selectedIndex];

  // Code to be executed when an option within the select is changed
  
  let distritosSeleccionados = JSON.parse(localStorage.getItem("distritosSeleccionados")) || [];

  let id = selectedOption.value;
  let distrito = distritos[id - 1]

  distritosSeleccionados.push(distrito);

  localStorage.setItem("distritosSeleccionados", JSON.stringify(distritosSeleccionados))

  modifyTable(distrito);
  calculoVotosTotales();
});

// --------------- Lógica para modificar la tabla---------------
function modifyTable(distrito) {
  let tbody = table.getElementsByTagName("tbody")[0];

  // Create a new row
  let newRow = tbody.insertRow();

  // Add cells to the new row
  let nombre = newRow.insertCell(0);
  let votos = newRow.insertCell(1);

  // Add content to the cells 
  nombre.innerHTML = distrito.nombre;
  votos.innerHTML = distrito.votantes;
}

// --------------- Calculo de votos totales ---------------

function calculoVotosTotales () {
  let cantidadVotos = 0;
  for (let i = 1; i < tabla.rows.length-1; i++) {
    let votosActuales = parseInt(table.rows[i].cells[1].textContent);
    cantidadVotos += votosActuales;
  }
  
  let totalVotos = document.getElementById("totalVotos");
  
  totalVotos.innerText = "Total: " + cantidadVotos
}

calculoVotosTotales();

//--------------------- BOTON VACIAR TABLA ---------------------

let reset = document.getElementById("reset-button");
let tableBody = document.getElementById("table-body");

reset.addEventListener("click", event => {
  tableBody.innerHTML = "";
  calculoVotosTotales();
})

// Fetch con APIs
// Libreria, promesas y asincronía

let temperatura = document.getElementById("temperatura");
let imagenClima = document.getElementById("imagen-clima");

// Con async - await
async function fetchClima() {
  let response = await fetch("http://api.weatherapi.com/v1/current.json?key=b16ca27c27d348248cd130410232612&q=Buenos%20Aires&aqi=no");
  let clima = await response.json();
  temperatura.innerText = clima.current.temp_c + " C°";
  imagenClima.src = clima.current.condition.icon;
  Swal.fire({
    title: 'Temperatura',
    text: clima.current.temp_c + " C°",
    icon: 'info',
    confirmButtonText: 'Continuar'
  })
}

fetchClima();