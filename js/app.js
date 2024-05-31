// CONSTRUCTORES

// Constructor para el Seguro
function Insurance(brand, year, type) {
    this.brand = brand; // Marca del coche
    this.year = year; // Año de fabricación
    this.type = type; // Tipo de cobertura (básico o completo)
}

// MÉTODO PARA COTIZAR SEGURO

// Método en el prototipo para calcular la cotización del seguro
Insurance.prototype.quoteInsurance = function() {
    let amount; // Variable para almacenar el monto calculado
    const base = 2000; // Monto base del seguro

    // Ajustar el monto base según la marca del coche
    switch (this.brand) {
        case '1': 
            amount = base * 1.15;
            break;
        case '2': 
            amount = base * 1.05;
            break;
        case '3': 
            amount = base * 1.35;
            break;
        default:
            break;
    }

    // Calcular la diferencia en años desde el año actual
    const difference = new Date().getFullYear() - this.year;

    // Reducir el monto basado en la antigüedad del coche (3% por año)
    amount -= ((difference * 3) * amount) / 100;

    // Ajustar el monto según el tipo de cobertura
    if (this.type === 'basico') {
        amount *= 1.30;
    } else {
        amount *= 1.50;
    }

    return amount; // Retornar el monto calculado
};

// Constructor para la Interfaz de Usuario
function UserInterface() {}

// Método en el prototipo para llenar las opciones del año en el elemento select
UserInterface.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(), // Año actual
          min = max - 20; // Año mínimo (hace 20 años)

    const selectYear = document.querySelector('#year');
    
    // Llenar el select con opciones de años desde max hasta min
    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// Instanciar la interfaz de usuario
const ui = new UserInterface();

// Llenar las opciones del select al cargar el contenido
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
});

// EVENT LISTENERS
eventListeners();

// Función para los event listeners
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', quoteInsurance);
}

// Función para cotizar el seguro
function quoteInsurance(e) {
    e.preventDefault();

    // LEER MARCA SELECCIONADA
    const brand = document.querySelector('#marca').value;

    // LEER AÑO SELECCIONADO
    const year = document.querySelector('#year').value;
    
    // LEER TIPO DE COBERTURA SELECCIONADO
    const type = document.querySelector('input[name="tipo"]:checked').value;

    // Verificar si todos los campos están completos
    if (brand === '' || year === '' || type === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    } 
    
    ui.mostrarMensaje('Cotizando', 'correcto');

    // OCULTAR COTIZACIONES PREVIAS
    const results = document.querySelector('#resultado div');
    if(results != null) {
        results.remove();
    }

    // INSTANCIAR SEGURO
    const insurance = new Insurance(brand, year, type);
    const total = insurance.quoteInsurance();

    // UTILIZAR PROTOTYPE PARA MOSTRAR EL RESULTADO DEL SEGURO
    ui.mostrarResultado(total, insurance);
}

// MOSTRAR ALERTAS
UserInterface.prototype.mostrarMensaje = (message, type) => {
    const div = document.createElement('div');

    // Asignar clase según el tipo de mensaje
    if (type === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = message;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    // Eliminar el mensaje después de 2 segundos
    setTimeout(() => {
        div.remove();
    }, 2000);
}

// MOSTRAR RESULTADO DE LA COTIZACIÓN
UserInterface.prototype.mostrarResultado = (total, insurance) => {
    const div = document.createElement('div');
    div.classList.add('mt-10');

    // Crear el HTML para mostrar el resultado
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Total: $ ${total}</p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    const spinner = document.querySelector('#cargando');

    // Mostrar el spinner y luego el resultado
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 2000);
}
