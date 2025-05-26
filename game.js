const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = 1200;
const HEIGHT = 800;
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Завантаження зображень
const bgImage = new Image();
bgImage.src = 'background.png';

const playerImagesSrc = ['player1.png', 'player2.png', 'player3.png']; // Приклад анімації
const playerImages = [];
let playerImageIndex = 0;

const enemyImage = new Image();
enemyImage.src = 'enemy.png';

const bonusImage = new Image();
bonusImage.src = 'bonus.png';

playerImagesSrc.forEach(src => {
  const img = new Image();
  img.src = src;
  playerImages.push(img);
});

// Об'єкти гри
let bgX1 = 0;
let bgX2 = WIDTH;
const bgSpeed = 3;

const player = {
  x: 100,
  y: HEIGHT / 2,
  width: 90,
  height: 120,
  speed: 4,
  image: playerImages[0]
};

const enemies = [];
const bonuses = [];

let score = 0;
let gameOver = false;

// Клавіатурний ввод
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Функції створення ворогів та бонусів
function createEnemy() {
  const y = Math.random() * (HEIGHT - 90);
  enemies.push({
    x: WIDTH,
    y: y,
    width: 200,
    height: 90,
    speed: 4 + Math.random() * 4
  });
}

function createBonus() {
  const x = Math.random() * (WIDTH - 90);
  bonuses.push({
    x: x,
    y: 0,
    width: 90,
    height: 120,
    speed: 4 + Math.random() * 4
  });
}

// Таймери для створення ворогів і бонусів
setInterval(() => {
  if (!gameOver) createEnemy();
}, 1500);

setInterval(() => {
  if (!gameOver) createBonus();
}, 2000);

// Анімація гравця (зміна картинок)
setInterval(() => {
  playerImageIndex = (playerImageIndex + 1) % playerImages.length;
  player.image = playerImages[playerImageIndex];
}, 200);

// Функція перевірки колізії
function isColliding(a, b) {
  return !(
    a.x > b.x + b.width ||
    a.x + a.width < b.x ||
    a.y > b.y + b.height ||
    a.y + a.height < b.y
  );
}

// Основний цикл гри
function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '48px Verdana';
    ctx.fillText('GAME OVER', WIDTH / 2 - 150, HEIGHT / 2);
    ctx.fillText(`Score: ${score}`, WIDTH / 2 - 100, HEIGHT / 2 + 60);
    return;
  }

  // Очищення екрану
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Рух фону (паралакс)
  bgX1 -= bgSpeed;
  bgX2 -= bgSpeed;
  if (bgX1 <= -WIDTH) bgX1 = WIDTH;
  if (bgX2 <= -WIDTH) bgX2 = WIDTH;
  ctx.drawImage(bgImage, bgX1, 0, WIDTH, HEIGHT);
  ctx.drawImage(bgImage, bgX2, 0, WIDTH, HEIGHT);

  // Рух гравця
  if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
  if (keys['ArrowDown'] && player.y + player.height < HEIGHT) player.y += player.speed;
  if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
  if (keys['ArrowRight'] && player.x + player.width < WIDTH) player.x += player.speed;

  // Малюємо гравця
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);

  // Рух та відображення ворогів
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    e.x -= e.speed;
    ctx.drawImage(enemyImage, e.x, e.y, e.width, e.height);

    if (isColliding(player, e)) {
      gameOver = true;
    }

    if (e.x + e.width < 0) enemies.splice(i, 1);
  }

  // Рух та відображення бонусів
  for (let i = bonuses.length - 1; i >= 0; i--) {
    const b = bonuses[i];
    b.y += b.speed;
    ctx.drawImage(bonusImage, b.x, b.y, b.width, b.height);

    if (isColliding(player, b)) {
      bonuses.splice(i, 1);
      score++;
    }

    if (b.y > HEIGHT) bonuses.splice(i, 1);
  }

  // Відображення рахунку
  ctx.fillStyle = 'black';
  ctx.font = '20px Verdana';
  ctx.fillText(`Score: ${score}`, WIDTH - 150, 30);

  requestAnimationFrame(gameLoop);
}

// Чекаємо завантаження фону і стартуємо гру
bgImage.onload = () => {
  enemyImage.onload = () => {
    bonusImage.onload = () => {
      playerImages[0].onload = () => {
        gameLoop();
      };
    };
  };
};
