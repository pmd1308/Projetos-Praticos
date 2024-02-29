const button_change = document.querySelector('#changeColor');
const button_visibiity = document.querySelector('#showContainer');
const container = document.querySelector('#container');
const showContainerButton = document.querySelector('#showContainer');
const hideContainerButton = document.querySelector('#hideContainer');

// Array de cores
const colorNames = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'teal', 'pink'];

// Fução para selecionar aleatoriamente cada cor
const getRandomColorName = () => {
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  return colorNames[randomIndex];
};

// Função que altera cor e texto e captura informações sobre o curso
button_change.addEventListener('click', function (e) {
  const newColor = getRandomColorName();
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
