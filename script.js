// script.js

// Pegando o canvas e o contexto 2D
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamanho dos quadradinhos do jogo
const box = 20;

// Criando a cobrinha como uma lista de posições
let snake = [{ x: 9 * box, y: 9 * box }];

// Direção inicial
let direction = "";

// Posição inicial da comida
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};

// Quando o usuário aperta uma tecla
document.addEventListener("keydown", updateDirection);

// Atualiza a direção com base na tecla pressionada
function updateDirection(event) {
  const key = event.key;

  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

// Desenha tudo na tela
function draw() {
  // Fundo
  ctx.fillStyle = "#16213e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobrinha
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#e94560" : "#0f3460";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Desenha a comida
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(food.x, food.y, box, box);

  // Posição da cabeça
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Verifica colisão com o corpo
  for (let i = 1; i < snake.length; i++) {
    if (headX === snake[i].x && headY === snake[i].y) {
      clearInterval(game);
      alert("Game Over! 🐍");
      return;
    }
  }

  // Adiciona nova cabeça
  const newHead = { x: headX, y: headY };

  // Come a comida
  if (headX === food.x && headY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop(); // Remove o rabo se não comeu
  }

  snake.unshift(newHead);

  // Game Over se bater na parede
  if (
    headX < 0 ||
    headX >= canvas.width ||
    headY < 0 ||
    headY >= canvas.height
  ) {
    clearInterval(game);
    alert("Game Over! 🐍");
  }
}

// Chama a função draw a cada 100ms
const game = setInterval(draw, 100);
