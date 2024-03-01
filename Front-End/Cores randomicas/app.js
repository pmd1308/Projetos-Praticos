const button_change = document.querySelector('#changeColor');
const button_visibiity = document.querySelector('#showContainer');
const container = document.querySelector('#container');
const showContainerButton = document.querySelector('#showContainer');
const hideContainerButton = document.querySelector('#hideContainer');

// Função para gerar cores
const colorNames = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}


// Função que altera cor e texto e captura informações sobre o curso
button_change.addEventListener('click', function (e) {
  const newColor = colorNames();
  container.style.backgroundColor = newColor;
  e.stopPropagation(); // Previne propragação de evento
});


// Esconde ou mostra o container
showContainerButton.addEventListener('click', function () {
  container.classList.toggle('hide');
  const isHidden = container.classList.contains('hide');
  button_visibiity.textContent = isHidden ? 'Mostrar Container' : 'Esconder Container';
});


// Adiciona efeitos hover
container.addEventListener('mouseover', function () {
  container.classList.add('hover'); 
});
container.addEventListener('mouseout', function () {
  container.classList.remove('hover');
});
