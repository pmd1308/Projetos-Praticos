// XMLHttpRequest

const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/dados");
xhr.onload = function(){
  if (xhr.status === 200 ){
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error("Erro ao buscar dados:", xhr.statusText);
  }
};
xhr.send();

// Fetch API
fetch("/api/dados")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Erro ao buscar dados: ", error);
  })

// classes
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }
  apresentar(){
    console.log(`${this.nome}, ${this.idade}`);
  }
}

//Gerador
function* fibonacci() {
  let a = 0, b=1;
  while(true) {
    yield a;
    [a, b] = [b, a +b];
  }
}
const fibonacciGenerator = fibonacci();
console.log(fibonacciGenerator.next().value); // 0
console.log(fibonacciGenerator.next().value); // 1
console.log(fibonacciGenerator.next().value); // 1
console.log(fibonacciGenerator.next().value); // 2
for (let i =0; i <10; i++){
  console.log(fibonacciGenerator.next().value);
}

//callback, promises async/await
function obterDados(callback) {
  setTimeout(() => {
    const dados = {nome: "João", idade: 30};
    callback(dados);
  }, 1000);
}
obterDados((dados) => {
  console.log("Dados recebidos usando callback: ", dados);
});

const obterDadosPromisse = () => {
  return new Promise((resolve) => {
    obterDados((dados) =>{
      resolve(dados);
    });
  });
};

obterDadosPromisse().then((dados) => {
  console.log("Dados: ", dados);
});

async function obterDadosAsync() {
  const dados = await obterDadosPromisse();
  console.log("Dados", dados)
}

obterDadosAsync