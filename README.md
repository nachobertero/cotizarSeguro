# Cotizador de Seguros

Este proyecto es una aplicación de cotización de seguros de automóviles. Los usuarios pueden seleccionar la marca de su coche, el año de fabricación y el tipo de cobertura para obtener una cotización del seguro.

## Características

- **Seleccionar Marca:** Los usuarios pueden elegir entre diferentes marcas de automóviles.
- **Seleccionar Año:** Los usuarios pueden seleccionar el año de fabricación de su coche desde un rango de 20 años.
- **Seleccionar Tipo de Cobertura:** Los usuarios pueden optar por una cobertura básica o completa.
- **Mostrar Cotización:** La aplicación calcula y muestra el costo del seguro basado en las selecciones del usuario.

## Código

### Constructores

El constructor `Insurance` se utiliza para crear una nueva instancia de un seguro con las propiedades `brand`, `year` y `type`.

```javascript
function Insurance(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
}
```

### Método de Cotización

El método `quoteInsurance` calcula el costo del seguro basado en la marca del coche, el año de fabricación y el tipo de cobertura.

```javascript
Insurance.prototype.quoteInsurance = function() {
    let amount;
    const base = 2000;

    switch (this.brand) {
        case '1': amount = base * 1.15; break;
        case '2': amount = base * 1.05; break;
        case '3': amount = base * 1.35; break;
        default: break;
    }

    const difference = new Date().getFullYear() - this.year;
    amount -= ((difference * 3) * amount) / 100;

    if (this.type === 'basico') {
        amount *= 1.30;
    } else {
        amount *= 1.50;
    }

    return amount;
};
```

### Interfaz de Usuario

El constructor `UserInterface` maneja la interacción con el usuario, como llenar las opciones de año y mostrar mensajes y resultados.

```javascript
function UserInterface() {}

UserInterface.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');
    
    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

const ui = new UserInterface();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
});
```

### Eventos

Se establecen los event listeners para manejar el formulario de cotización.

```javascript
eventListeners();

function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', quoteInsurance);
}
```

### Cotización del Seguro

Función que maneja la cotización del seguro cuando el usuario envía el formulario.

```javascript
function quoteInsurance(e) {
    e.preventDefault();

    const brand = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const type = document.querySelector('input[name="tipo"]:checked').value;

    if (brand === '' || year === '' || type === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    } 
    
    ui.mostrarMensaje('Cotizando', 'correcto');

    const results = document.querySelector('#resultado div');
    if(results != null) {
        results.remove();
    }

    const insurance = new Insurance(brand, year, type);
    const total = insurance.quoteInsurance();

    ui.mostrarResultado(total, insurance);
}
```

### Mostrar Mensajes y Resultados

Métodos para mostrar mensajes al usuario y mostrar el resultado de la cotización.

```javascript
UserInterface.prototype.mostrarMensaje = (message, type) => {
    const div = document.createElement('div');
    div.classList.add('mensaje', 'mt-10', type === 'error' ? 'error' : 'correcto');
    div.textContent = message;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
}

UserInterface.prototype.mostrarResultado = (total, insurance) => {
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Total: $ ${total}</p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    const spinner = document.querySelector('#cargando');

    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 2000);
}
```

## Demostración

Puedes ver una demostración de la aplicación [aquí](https://cotizarunseguro.netlify.app/).

## Instalación y Uso

1. Clona este repositorio.
2. Abre `index.html` en tu navegador.
3. Completa el formulario para obtener una cotización de seguro.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerencias o mejoras.
