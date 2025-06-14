function agregarEventListenerGlobal (type, selector, callback, parent = document){
      parent.addEventListener(type, e => {     
      if (e.target.classList.contains(selector)) {
        callback(e);
      }
    });
}

agregarEventListenerGlobal('click', 'open-modal', e => {
  document.getElementById("modalTitulo").textContent = e.target.dataset.title;
  document.getElementById("modalBody").textContent = e.target.dataset.description;
  document.getElementById("modalPrecio").textContent = e.target.dataset.price;
  const modal = new bootstrap.Modal(document.getElementById("modalServicios"));
  modal.show();
})

fetch('data/servicios.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // ver qué levantó
    mostrarServicios(data); // mostrar los datos
    agregarEventListenerGlobal('change', 'form-check-input', e =>{ 
      aplicarFiltros(data);
    })
  })
  .catch(error => console.error('Error al cargar JSON:', error));

function aplicarFiltros(data) {
  const filtrosActivos = Array.from(document.querySelectorAll('.form-check-input:checked'))
    .map(input => input.value);
  console.log(filtrosActivos) //revisar que esta filtrando
  const filtrados = filtrosActivos.length === 0 ? data : data.filter(servicio => filtrosActivos.includes(servicio.categoria.toLowerCase()));
  mostrarServicios(filtrados);
}

function mostrarServicios (servicios) {
  const contenedor = document.getElementById("contenedor-servicios")
  contenedor.innerHTML = ''; // limpia todo el contenido
  servicios.forEach(servicio => {
    let divCardContainer = document.createElement("div");
    divCardContainer.classList.add("card", "card-servicio", "card-container");
    let cardHeader = document.createElement("h5");
    cardHeader.classList.add("card-header");
    cardHeader.textContent = `${servicio.categoria} ${servicio.nombre}`;
    let divImageFlipContainer = document.createElement("div");
    divImageFlipContainer.classList.add("image-flip-container");
    let divImageInner = document.createElement("div");
    divImageInner.classList.add("image-inner");
    let divSideFront = document.createElement("div");
    divSideFront.classList.add("image-side", "image-front");
    let imgFront = document.createElement("img");
    imgFront.src = servicio.imagenes.front;
    imgFront.alt = `${servicio.categoria} ${servicio.nombre}`;
    let divSideBack = document.createElement("div");
    divSideBack.classList.add("image-side", "image-back");
    let imgBack = document.createElement("img");
    imgBack.src = servicio.imagenes.back;
    imgBack.alt = `${servicio.categoria} ${servicio.nombre}`;
    let btnModal = document.createElement("button");
    btnModal.classList.add("btn","btn-sm", "open-modal", "btn-outline-dark");
    btnModal.setAttribute("data-title", `${servicio.categoria} ${servicio.nombre}`);
    btnModal.setAttribute("data-description", servicio.descripcion);
    btnModal.setAttribute("data-price", `${servicio.precio}$`);
    btnModal.textContent = "Ver detalles"

    divSideBack.appendChild(imgBack);
    divSideFront.appendChild(imgFront);
    divImageInner.appendChild(divSideFront);
    divImageInner.appendChild(divSideBack);
    divImageFlipContainer.appendChild(divImageInner);
    divCardContainer.appendChild(cardHeader);
    divCardContainer.appendChild(divImageFlipContainer);
    divCardContainer.append(btnModal);
    contenedor.appendChild(divCardContainer);
    
  });  
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

document.addEventListener('DOMContentLoaded', function () {
  // Modal Velomancia
  var modalVelomancia = document.getElementById('modalVelomancia');
  modalVelomancia.addEventListener('show.bs.modal', function (event) {
    var contenido = document.getElementById('contenidoModalVelomancia');
    contenido.innerHTML = '<div class="modal-body text-center p-5"><div class="spinner-border text-secondary" role="status"></div></div>';
    fetch('./form_velomancia.html')
      .then(response => response.text())
      .then(html => {
        contenido.innerHTML = html;
        activarValidacionBootstrap();
      })
      .catch(err => {
        contenido.innerHTML = '<p>Error al cargar el formulario.</p>';
      });
  });

  // Modal Tarot
  var modalTarot = document.getElementById('modalTarot');
  modalTarot.addEventListener('show.bs.modal', function (event) {
    var contenido = document.getElementById('contenidoModalTarot');
    contenido.innerHTML = '<div class="modal-body text-center p-5"><div class="spinner-border text-secondary" role="status"></div></div>';
    fetch('./form_tarot.html')
      .then(response => response.text())
      .then(html => {
        contenido.innerHTML = html;
        activarValidacionBootstrap();
      })
      .catch(err => {
        contenido.innerHTML = '<p>Error al cargar el formulario.</p>';
      });
  });

  // Modal Pendulo
  var modalPendulo = document.getElementById('modalPendulo');
  modalPendulo.addEventListener('show.bs.modal', function (event) {
    var contenido = document.getElementById('contenidoModalPendulo');
    contenido.innerHTML = '<div class="modal-body text-center p-5"><div class="spinner-border text-secondary" role="status"></div></div>';
    fetch('./form_pendulo.html')
      .then(response => response.text())
      .then(html => {
        contenido.innerHTML = html;
        activarValidacionBootstrap();
      })
      .catch(err => {
        contenido.innerHTML = '<p>Error al cargar el formulario.</p>';
      });
  });
});

function activarValidacionBootstrap() {
  const forms = document.querySelectorAll('.needs-validation');
  forms.forEach(form => {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });
}