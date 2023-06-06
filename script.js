function Calculadora() {
  var self = this;
  this.pai = document.createElement('div');
  this.pai.className = 'calculadora';
  this.display = document.createElement('div');
  this.display.className = 'display';
  this.pai.appendChild(this.display);

  this.resultado = '';
  this.operador = '';
  this.primeiroNumero = '';
  this.segundoNumero = '';

  this.limpar = function () {
    this.resultado = '';
    this.operador = '';
    this.primeiroNumero = '';
    this.segundoNumero = '';
    this.atualizarDisplay();
  };

  this.criarBotao = function (texto, callback) {
    var botao = document.createElement('div');
    botao.className = 'botao';
    botao.textContent = texto;
    botao.addEventListener('click', callback.bind(self));
    this.pai.appendChild(botao);
  };

  this.atualizarDisplay = function () {
    this.display.textContent = this.resultado === '' ? '0' : this.resultado;
  };

  this.cliqueBotaoNumero = function (numero) {
    if (this.operador === '') {
      this.primeiroNumero += numero;
    } else {
      this.segundoNumero += numero;
    }
    this.resultado = this.operador === '' ? this.primeiroNumero : this.segundoNumero;
    this.atualizarDisplay();
  };

  this.cliqueBotaoOperador = function (operador) {
    this.operador = operador;
  };

  this.destruct = function () {
    var container = this.pai.parentNode;
    if (container) {
      container.removeChild(this.pai);
    }
  };

  this.cliqueBotaoIgual = function () {
    if (this.operador !== '') {
      switch (this.operador) {
        case '+':
          this.resultado = parseFloat(this.primeiroNumero) + parseFloat(this.segundoNumero);
          break;
        case '-':
          this.resultado = parseFloat(this.primeiroNumero) - parseFloat(this.segundoNumero);
          break;
        case '*':
          this.resultado = parseFloat(this.primeiroNumero) * parseFloat(this.segundoNumero);
          break;
        case '/':
          this.resultado = parseFloat(this.primeiroNumero) / parseFloat(this.segundoNumero);
          break;
      }
      this.operador = '';
      this.primeiroNumero = this.resultado.toString();
      this.segundoNumero = '';
      this.atualizarDisplay();
    }
  };

  this.limparEntrada = function () {
    if (this.operador === '') {
      this.primeiroNumero = '';
    } else {
      this.segundoNumero = '';
    }
    this.resultado = this.operador === '' ? this.primeiroNumero : this.segundoNumero;
    this.atualizarDisplay();
  };

  this.apagarUltimoNumero = function () {
    if (this.operador === '') {
      this.primeiroNumero = this.primeiroNumero.slice(0, -1);
    } else {
      this.segundoNumero = this.segundoNumero.slice(0, -1);
    }
    this.resultado = this.operador === '' ? this.primeiroNumero : this.segundoNumero;
    this.atualizarDisplay();
  };

  this.calcularPorcentagem = function () {
    if (this.operador === '') {
      this.resultado = parseFloat(this.primeiroNumero) / 100;
      this.primeiroNumero = this.resultado.toString();
    } else {
      this.resultado = parseFloat(this.segundoNumero) / 100;
      this.segundoNumero = this.resultado.toString();
    }
    this.atualizarDisplay();
  };

  this.calcularRaizQuadrada = function () {
    if (this.operador === '') {
      this.resultado = Math.sqrt(parseFloat(this.primeiroNumero));
      this.primeiroNumero = this.resultado.toString();
    } else {
      this.resultado = Math.sqrt(parseFloat(this.segundoNumero));
      this.segundoNumero = this.resultado.toString();
    }
    this.atualizarDisplay();
  };

  this.calcularQuadrado = function () {
    if (this.operador === '') {
      this.resultado = Math.pow(parseFloat(this.primeiroNumero), 2);
      this.primeiroNumero = this.resultado.toString();
    } else {
      this.resultado = Math.pow(parseFloat(this.segundoNumero), 2);
      this.segundoNumero = this.resultado.toString();
    }
    this.atualizarDisplay();
  };

  this.calcularInverso = function () {
    if (this.operador === '') {
      this.resultado = 1 / parseFloat(this.primeiroNumero);
      this.primeiroNumero = this.resultado.toString();
    } else {
      this.resultado = 1 / parseFloat(this.segundoNumero);
      this.segundoNumero = this.resultado.toString();
    }
    this.atualizarDisplay();
  };

  this.inverterSinal = function () {
    if (this.operador === '') {
      this.primeiroNumero = (parseFloat(this.primeiroNumero) * -1).toString();
      this.resultado = this.primeiroNumero;
    } else {
      this.segundoNumero = (parseFloat(this.segundoNumero) * -1).toString();
      this.resultado = this.segundoNumero;
    }
    this.atualizarDisplay();
  };

  this.cliqueBotaoPonto = function () {
    if (this.operador === '') {
      if (!this.primeiroNumero.includes('.')) {
        this.primeiroNumero += '.';
      }
    } else {
      if (!this.segundoNumero.includes('.')) {
        this.segundoNumero += '.';
      }
    }
    this.resultado = this.operador === '' ? this.primeiroNumero : this.segundoNumero;
    this.atualizarDisplay();
  };

  // Adicione um evento de teclado para capturar as teclas pressionadas
  document.addEventListener('keydown', function (event) {
    var tecla = event.key;

    if (!isNaN(tecla) && tecla !== ' ') {
      self.cliqueBotaoNumero(tecla);
    }

    if (tecla === '+' || tecla === '-' || tecla === '*' || tecla === '/') {
      self.cliqueBotaoOperador(tecla);
    }

    if (tecla === '=' || tecla === 'Enter') {
      self.cliqueBotaoIgual();
    }

    if (tecla === '.' || tecla === ',') {
      self.cliqueBotaoPonto();
    }

    if (tecla === 'Backspace') {
      self.apagarUltimoNumero();
    }

    if (tecla === 'Escape') {
      self.limpar();
    }

    if (tecla === 'Delete') {
      self.destruct();
    }
  });

  // Cria os botões e adiciona à calculadora
  var botoes = [
    ['%', self.calcularPorcentagem],
    ['√', self.calcularRaizQuadrada],
    ['x²', self.calcularQuadrado],
    ['1/x', self.calcularInverso],
    ['CE', self.limparEntrada],
    ['C', self.limpar],
    ['<-', self.apagarUltimoNumero],
    ['/', function () { self.cliqueBotaoOperador('/'); }],
    ['7', function () { self.cliqueBotaoNumero('7'); }],
    ['8', function () { self.cliqueBotaoNumero('8'); }],
    ['9', function () { self.cliqueBotaoNumero('9'); }],
    ['*', function () { self.cliqueBotaoOperador('*'); }],
    ['4', function () { self.cliqueBotaoNumero('4'); }],
    ['5', function () { self.cliqueBotaoNumero('5'); }],
    ['6', function () { self.cliqueBotaoNumero('6'); }],
    ['-', function () { self.cliqueBotaoOperador('-'); }],
    ['1', function () { self.cliqueBotaoNumero('1'); }],
    ['2', function () { self.cliqueBotaoNumero('2'); }],
    ['3', function () { self.cliqueBotaoNumero('3'); }],
    ['+', function () { self.cliqueBotaoOperador('+'); }],
    ['+/-', self.inverterSinal],
    ['0', function () { self.cliqueBotaoNumero('0'); }],
    ['.', self.cliqueBotaoPonto],
    ['=', self.cliqueBotaoIgual]
  ];

  for (var i = 0; i < botoes.length; i++) {
    var botaoTexto = botoes[i][0];
    var botaoCallback = botoes[i][1];
    this.criarBotao(botaoTexto, botaoCallback);
  }

  // this.destruct();

  // Adicionar a calculadora ao elemento com o ID "calculadora"
  var container = document.getElementById('calculadora');
  container.appendChild(this.pai);
}

// Cria uma instância da calculadora
var calc = new Calculadora();
