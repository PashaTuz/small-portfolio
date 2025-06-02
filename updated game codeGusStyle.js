// Основні параметри — динамічні
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
const FPS = 60;

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

// При зміні розміру вікна оновлюємо canvas і параметри
window.addEventListener("resize", () => {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
});

// Завантаження зображень
const images = {};
const playerFrames = ["1-1.png", "1-2.png", "1-3.png", "1-4.png", "1-5.png"];

function loadImages(paths, callback) {
    let loaded = 0;
    for (const key in paths) {
        images[key] = new Image();
        images[key].src = "images/" + paths[key];
        images[key].onload = () => {
            loaded++;
            if (loaded === Object.keys(paths).length) {
                callback();
            }
        };
    }
}

// Параметри об’єктів гри
const bgSpeed = 3;
let bgX1 = 0;
let bgX2 = WIDTH;

const enemies = [];
const bonuses = [];

let score = 0;
let playerFrameIndex = 0;
let frameCounter = 0;

// Об’єкти гри
const player = {
    x: 50,
    y: HEIGHT / 2 - 60,
    width: 90,
    height: 120,
    speed: 4,
    currentFrame: 0,
    frameCount: playerFrames.length,
};

function createEnemy() {
    return {
        x: WIDTH,
        y: Math.random() * (HEIGHT - 90),
        width: 200,
        height: 90,
        speedX: - (4 + Math.random() * 4)
    };
}

function createBonus() {
    return {
        x: Math.random() * (WIDTH - 90),
        y: 0,
        width: 90,
        height: 120,
        speedY: 4 + Math.random() * 4
    };
}

// Клавіатура
const keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// Основний цикл гри
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    bgX1 -= bgSpeed;
    bgX2 -= bgSpeed;
    if (bgX1 <= -WIDTH) bgX1 = WIDTH;
    if (bgX2 <= -WIDTH) bgX2 = WIDTH;

    if ((keys["ArrowDown"] || keys["Down"]) && player.y + player.height < HEIGHT) player.y += player.speed;
    if ((keys["ArrowUp"] || keys["Up"]) && player.y > 0) player.y -= player.speed;
    if ((keys["ArrowRight"] || keys["Right"]) && player.x + player.width < WIDTH) player.x += player.speed;
    if ((keys["ArrowLeft"] || keys["Left"]) && player.x > 0) player.x -= player.speed;

    if (Math.random() < 0.02) enemies.push(createEnemy());
    if (Math.random() < 0.015) bonuses.push(createBonus());

    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].x += enemies[i].speedX;
        if (enemies[i].x + enemies[i].width < 0) enemies.splice(i, 1);
        else if (collide(player, enemies[i])) {
            alert("GAME OVER! Рахунок: " + score);
            score = 0;
            enemies.length = 0;
            bonuses.length = 0;
            player.x = 50;
            player.y = HEIGHT / 2 - player.height / 2;
        }
    }

    for (let i = bonuses.length - 1; i >= 0; i--) {
        bonuses[i].y += bonuses[i].speedY;
        if (bonuses[i].y > HEIGHT) bonuses.splice(i, 1);
        else if (collide(player, bonuses[i])) {
            bonuses.splice(i, 1);
            score++;
        }
    }

    frameCounter++;
    if (frameCounter % 10 === 0) {
        playerFrameIndex++;
        if (playerFrameIndex >= player.frameCount) playerFrameIndex = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(images.background, bgX1, 0, WIDTH, HEIGHT);
    ctx.drawImage(images.background, bgX2, 0, WIDTH, HEIGHT);

    enemies.forEach(enemy => {
        ctx.drawImage(images.enemy, enemy.x, enemy.y, enemy.width, enemy.height);
    });

    bonuses.forEach(bonus => {
        ctx.drawImage(images.bonus, bonus.x, bonus.y, bonus.width, bonus.height);
    });

    ctx.drawImage(images["player" + (playerFrameIndex + 1)], player.x, player.y, player.width, player.height);

    // Відображення рахунку в канвасі
    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Рахунок: " + score, 20, 40);
}

function collide(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// Запуск гри після завантаження всіх зображень
loadImages({
    background: "background.png",
    enemy: "enemy.png",
    bonus: "bonus.png",
    player1: "1-1.png",
    player2: "1-2.png",
    player3: "1-3.png",
    player4: "1-4.png",
    player5: "1-5.png",
}, () => {
    gameLoop();
});
