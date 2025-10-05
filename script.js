// Cargar datos de habitaciones desde JSON
async function cargarHabitaciones() {
  const response = await fetch("data.json");
  const data = await response.json();
  const select = document.getElementById("tipoHabitacion");

  data.habitaciones.forEach(hab => {
    const option = document.createElement("option");
    option.value = hab.precio;
    option.textContent = `${hab.tipo} - $${hab.precio}/noche`;
    select.appendChild(option);
  });
}

// Función para calcular total
function calcularTotal(precioPorNoche, noches) {
  return precioPorNoche * noches;
}

// Evento principal del formulario
document.getElementById("formReserva").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const checkin = new Date(document.getElementById("checkin").value);
  const checkout = new Date(document.getElementById("checkout").value);
  const tipoHabitacion = document.getElementById("tipoHabitacion");
  const precio = parseInt(tipoHabitacion.value);
  const personas = parseInt(document.getElementById("personas").value);

  const noches = (checkout - checkin) / (1000 * 60 * 60 * 24);

  if (noches <= 0 || isNaN(noches)) {
    Swal.fire("Error", "Las fechas ingresadas no son válidas.", "error");
    return;
  }

  const total = calcularTotal(precio, noches);

  const resumen = `
    <p>Cliente: <b>${nombre}</b></p>
    <p>Habitación: ${tipoHabitacion.selectedOptions[0].text}</p>
    <p>Noches: ${noches}</p>
    <p>Personas: ${personas}</p>
    <p>Total: <b>$${total.toLocaleString()}</b></p>
  `;

  document.getElementById("resultado").innerHTML = resumen;

  Swal.fire({
    title: "Reserva simulada con éxito ",
    html: resumen,
    icon: "success"
  });
});

// Inicializar carga de habitaciones
cargarHabitaciones();