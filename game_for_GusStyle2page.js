const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = 1200;
const HEIGHT = 800;
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Çàâàíòàæåííÿ çîáðàæåíü
const bgImage = new Image();
bgImage.src = 'background.png';

const playerImagesSrc = ['player1.png', 'player2.png', 'player3.png']; // Ïðèêëàä àí³ìàö³¿
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

// Îá'ºêòè ãðè
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

// Êëàâ³àòóðíèé ââîä
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Ôóíêö³¿ ñòâîðåííÿ âîðîã³â òà áîíóñ³â
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

// Òàéìåðè äëÿ ñòâîðåííÿ âîðîã³â ³ áîíóñ³â
setInterval(() => {
  if (!gameOver) createEnemy();
}, 1500);

setInterval(() => {
  if (!gameOver) createBonus();
}, 2000);

// Àí³ìàö³ÿ ãðàâöÿ (çì³íà êàðòèíîê)
setInterval(() => {
  playerImageIndex = (playerImageIndex + 1) % playerImages.length;
  player.image = playerImages[playerImageIndex];
}, 200);

// Ôóíêö³ÿ ïåðåâ³ðêè êîë³ç³¿
function isColliding(a, b) {
  return !(
    a.x > b.x + b.width ||
    a.x + a.width < b.x ||
    a.y > b.y + b.height ||
    a.y + a.height < b.y
  );
}

// Îñíîâíèé öèêë ãðè
function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '48px Verdana';
    ctx.fillText('GAME OVER', WIDTH / 2 - 150, HEIGHT / 2);
    ctx.fillText(`Score: ${score}`, WIDTH / 2 - 100, HEIGHT / 2 + 60);
    return;
  }

  // Î÷èùåííÿ åêðàíó
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Ðóõ ôîíó (ïàðàëàêñ)
  bgX1 -= bgSpeed;
  bgX2 -= bgSpeed;
  if (bgX1 <= -WIDTH) bgX1 = WIDTH;
  if (bgX2 <= -WIDTH) bgX2 = WIDTH;
  ctx.drawImage(bgImage, bgX1, 0, WIDTH, HEIGHT);
  ctx.drawImage(bgImage, bgX2, 0, WIDTH, HEIGHT);

  // Ðóõ ãðàâöÿ
  if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
  if (keys['ArrowDown'] && player.y + player.height < HEIGHT) player.y += player.speed;
  if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
  if (keys['ArrowRight'] && player.x + player.width < WIDTH) player.x += player.speed;

  // Ìàëþºìî ãðàâöÿ
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);

  // Ðóõ òà â³äîáðàæåííÿ âîðîã³â
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    e.x -= e.speed;
    ctx.drawImage(enemyImage, e.x, e.y, e.width, e.height);

    if (isColliding(player, e)) {
      gameOver = true;
    }

    if (e.x + e.width < 0) enemies.splice(i, 1);
  }

  // Ðóõ òà â³äîáðàæåííÿ áîíóñ³â
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

  // Â³äîáðàæåííÿ ðàõóíêó
  ctx.fillStyle = 'black';
  ctx.font = '20px Verdana';
  ctx.fillText(`Score: ${score}`, WIDTH - 150, 30);

  requestAnimationFrame(gameLoop);
}

// ×åêàºìî çàâàíòàæåííÿ ôîíó ³ ñòàðòóºìî ãðó
bgImage.onload = () => {
  enemyImage.onload = () => {
    bonusImage.onload = () => {
      playerImages[0].onload = () => {
        gameLoop();
      };
    };
  };
};
