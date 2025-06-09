function agregarEventListenerGlobal (type, selector, callback, parent = document){
      parent.addEventListener(type, e => {     
      if (e.target.classList.contains(selector)) {
        callback(e);
      }
    });
}
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

    divSideBack.appendChild(imgBack);
    divSideFront.appendChild(imgFront);
    divImageInner.appendChild(divSideFront);
    divImageInner.appendChild(divSideBack);
    divImageFlipContainer.appendChild(divImageInner);
    divCardContainer.appendChild(cardHeader);
    divCardContainer.appendChild(divImageFlipContainer);
    contenedor.appendChild(divCardContainer);
    
  });  
}
