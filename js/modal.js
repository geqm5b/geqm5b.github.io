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