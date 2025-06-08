fetch('data/servicios.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // ver qué levantó
    mostrarServicios(data); // mostrar los datos
    document.body.addEventListener('change', (event) => {     // Delegación de eventos 
      if (event.target.classList.contains('form-check-input')) {
        aplicarFiltros(data);
      }
    });
  })
  .catch(error => console.error('Error al cargar JSON:', error));

function aplicarFiltros(data) {
  const filtrosActivos = Array.from(document.querySelectorAll('.form-check-input:checked'))
    .map(input => input.value);
  console.log(filtrosActivos)
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
    
    // cardDiv.classList.add("card");
    // cardDiv.style.width = "15rem"; //crear una clase para todos los estilos, esto es test

    // let header = document.createElement("h5");
    // header.classList.add("card-header", "text-center");
    // header.textContent = `${servicio.categoria} ${servicio.nombre}`

    // let img = document.createElement("img");
    // img.src = servicio.imagenes.front;
    // img.classList.add("card-img");
    // img.style.aspectRatio = "2 / 3";
    // img.style.objectFit = "cover";
    // img.alt = `${servicio.categoria} ${servicio.nombre}`

    // cardDiv.appendChild(header);
    // cardDiv.appendChild(img);
    // contenedor.appendChild(cardDiv);
  });  
}
