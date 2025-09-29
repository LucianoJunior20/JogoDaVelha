// Importando a biblioteca readline-sync
const readlineSync = require("readline-sync");

// Criando o tabuleiro como uma matriz 3x3
let tabuleiro = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

// Função para mostrar o tabuleiro na tela
function mostrarTabuleiro() {
  console.log("\n");
  console.log("  0   1   2");
  for (let i = 0; i < 3; i++) {
    console.log(i + " " + tabuleiro[i][0] + " | " + tabuleiro[i][1] + " | " + tabuleiro[i][2]);
    if (i < 2) console.log("  ---------");
  }
  console.log("\n");
}

// Função que verifica se alguém ganhou
function verificarVencedor(simbolo) {
  // Verificando linhas
  for (let i = 0; i < 3; i++) {
    if (tabuleiro[i][0] === simbolo && tabuleiro[i][1] === simbolo && tabuleiro[i][2] === simbolo) {
      return true;
    }
  }

  // Verificando colunas
  for (let i = 0; i < 3; i++) {
    if (tabuleiro[0][i] === simbolo && tabuleiro[1][i] === simbolo && tabuleiro[2][i] === simbolo) {
      return true;
    }
  }

  // Verificando diagonais
  if (tabuleiro[0][0] === simbolo && tabuleiro[1][1] === simbolo && tabuleiro[2][2] === simbolo) {
    return true;
  }
  if (tabuleiro[0][2] === simbolo && tabuleiro[1][1] === simbolo && tabuleiro[2][0] === simbolo) {
    return true;
  }

  return false;
}

// Função que verifica se deu empate
function verificarEmpate() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tabuleiro[i][j] === " ") {
        return false;
      }
    }
  }
  return true;
}

// Início do jogo
console.log("=== JOGO DA VELHA ===");
let jogadorAtual = "X"; // X sempre começa

while (true) {
  mostrarTabuleiro();
  console.log("Vez do jogador: " + jogadorAtual);

  // Pedindo a linha e a coluna
  let linha = readlineSync.questionInt("Digite a linha (0, 1 ou 2): ");
  let coluna = readlineSync.questionInt("Digite a coluna (0, 1 ou 2): ");

  // Verifica se a posição é válida
  if (linha < 0 || linha > 2 || coluna < 0 || coluna > 2) {
    console.log("Posição inválida! Tente de novo.");
    continue;
  }

  // Verifica se a posição já está ocupada
  if (tabuleiro[linha][coluna] !== " ") {
    console.log("Essa posição já está ocupada! Tente de novo.");
    continue;
  }

  // Marca a jogada no tabuleiro
  tabuleiro[linha][coluna] = jogadorAtual;

  // Verifica se o jogador ganhou
  if (verificarVencedor(jogadorAtual)) {
    mostrarTabuleiro();
    console.log("Jogador " + jogadorAtual + " venceu!");
    break;
  }

  // Verifica se deu empate
  if (verificarEmpate()) {
    mostrarTabuleiro();
    console.log("Deu empate!");
    break;
  }

  // Troca o jogador
  jogadorAtual = (jogadorAtual === "X") ? "O" : "X";
}
