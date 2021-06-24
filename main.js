const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div');
      car.classList.add('car');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 5,
  traffic: 4
};

function getQuantityElementElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}
 
function startGame() {
  start.classList.add('hide');
  gameArea.innerHTML = '';
  car.style.left = '125px';
  car.style.top = 'auto';
  car.style.bottom = '10px';

  for (let i = 0; i < getQuantityElementElements(50); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 75) + 'px';
    line.y = i * 75;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElementElements(50 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -50 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    gameArea.appendChild(enemy);

  }
  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  if (setting.start) {
    setting.score++;
    score.innerHTML = `Score:<br> ${setting.score}`;
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.speed;
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.speed;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    
    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';

    requestAnimationFrame(playGame);
  }  
}

function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
}

function stopRun(event) {
  event.preventDefault();
  keys[event.key] = false;
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach((line) => {
    line.y += setting.speed;
    line.style.top = line.y + 'px';
    if (line.y >= document.documentElement.clientHeight) {
      line.y = -75;
    }
  });
}

function moveEnemy() {
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach((enemy) => {
    let carRect = car.getBoundingClientRect(); // метод с помощью которого можно получить объект с данными left, right и другими свойствами
    let enemyRect = enemy.getBoundingClientRect();
    
    if (carRect.top <= enemyRect.bottom &&
        carRect.right >= enemyRect.left &&
        carRect.left <= enemyRect.right &&
        carRect.bottom >= enemyRect.top) {
      setting.start = false;
      start.classList.remove('hide');
      start.innerHTML = `Начать игру<br>Last Score: ${setting.score}`;
    }
    
    enemy.y += setting.speed / 2;
    enemy.style.top = enemy.y + 'px';
    if (enemy.y >= document.documentElement.clientHeight) {
      enemy.y = -50 * setting.traffic;
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }  
  });
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
