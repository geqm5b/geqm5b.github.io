fetch('data/servicios.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Aquí puedes procesar los datos
  })
  .catch(error => console.error('Error al cargar JSON:', error));