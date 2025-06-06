fetch('data/servicios.json')
  .then(response => response.json())
  .then(data => {
    console.log(data) //log para ver que levanto el json
    mostrarServicios(data); // llamada a mostrar datos
  })
  .catch(error => console.error('Error al cargar JSON:', error));


function mostrarServicios (servicios) {
  const contenedor = document.getElementById("contenedor-servicios")
  servicios.forEach(servicio => {
    let cardDiv = document.createElement("Div");
    cardDiv.classList.add("card");
    cardDiv.style.width = "15rem"; //crear una clase para todos los estilos, esto es test

    let header = document.createElement("h5");
    header.classList.add("card-header", "text-center");
    header.textContent = `${servicio.categoria} ${servicio.nombre}`

    let img = document.createElement("img");
    img.src = servicio.imagen;
    img.classList.add("card-img");
    img.style.aspectRatio = "2 / 3";
    img.style.objectFit = "cover";
    img.alt = `${servicio.categoria} ${servicio.nombre}`

    cardDiv.appendChild(header);
    cardDiv.appendChild(img);
    contenedor.appendChild(cardDiv);
  });  
}
