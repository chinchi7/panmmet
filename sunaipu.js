const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageNames = ['24851338', 'bird', 'cactus', 'dino','1749617','22255261','25157092'];
const game = {
  counter: 0,
  backGrounds: [],
  bgm1: new Audio('bgm/fieldSong.mp3'),
  bgm2: new Audio('bgm/jump.mp3'),
  bgm3:new Audio('bgm/kansei.mp3'),
  bgm4:new Audio('bgm/sippai.mp3'),
  bgm5:new Audio('bgm/hando.mp3'),
  bgm6:new Audio('bgm/kougeki.mp3'),
  enemys: [],
  specialEnemies:[],
  enemyCountdown: 0,
  image: {},
  isGameOver: true,
  score: 0,
  state: 'loading',
  timer: null,
  startTime:null
};
game.bgm1.volume=0.3;
game.bgm5.volume=1.0;
game.bgm6.volume=0.4;
game.bgm1.loop = true;
let imageLoadCounter = 0;
for (const imageName of imageNames) {
  const imagePath = `image/${imageName}.png`;
  game.image[imageName] = new Image();
  game.image[imageName].src = imagePath;
  game.image[imageName].onload = () => {
    imageLoadCounter += 1;
    if (imageLoadCounter === imageNames.length) {
      console.log('画像のロードが完了しました。');
      init();
    }
  };
}
function init() {
  game.counter = 0;
  game.enemys = [];
  game.specialEnemies=[];
  game.enemyCountdown = 0;
  game.score = 0;
  game.state = 'init';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createDino();
  drawDino();
  createBackGround();
  drawBackGrounds();
  ctx.fillStyle = 'black';
  ctx.font = 'bold 60px serif';
  ctx.fillText(`Press Space key to start.`, 60, 150);
  ctx.fillText(`Wait till 2000`, 150, 230);
  game.startTime=null;
}
function start() {
  game.startTime = Date.now();
  game.state = 'gaming';
  game.bgm1.play();
  game.timer = setInterval(ticker, 30);
}
function drawCounter() {
  const currentGameMode=setGameMode();
  const countdown = Math.max(0, Math.ceil((timelimits[currentGameMode] - (Date.now() - game.startTime)) / 1000));
  ctx.fillStyle = 'black';
  ctx.font = '24px serif';
  ctx.fillText(`Time Limit: ${countdown}`, canvas.width - 200, 30);
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '24px serif';
  ctx.fillText(`score:${game.score}`, 0, 30);
}
function setGameMode(){
  if(game.score<500){return'easy';}
  else if(game.score<1000){return 'normal';}
  else if(game.score<1500){return 'hard';}
  else{return 'veryhard';}
}
const timelimits={easy:20000,normal:38000,hard:59000,veryhard:69600};
function ticker() {
  const currentGameMode = setGameMode(); 
  const elapsedTime = Date.now() - game.startTime;
  if (!game.startTime){game.startTime=Date.now();}
  const timeLimit=timelimits[currentGameMode];
  const countdown=Math.max(0,Math.ceil((timeLimit-elapsedTime)/1000));
  if(countdown===0&&game.score<2000){
    game.state='gameover';
    game.bgm1.pause();
    game.bgm4.play();
    ctx.fillStyle='black';
    ctx.font = 'bold 100px serif';
    ctx.fillText(`Game Over!`, 150, 200);
    clearInterval(game.timer);
    return;
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (elapsedTime <= 0) {
    game.state = 'gameover';
    game.bgm1.pause();
    game.bgm4.play();
    ctx.fillStyle = 'black';
    ctx.font = 'bold 100px serif';
    ctx.fillText(`Game Over!`, 150, 200);
    clearInterval(game.timer);
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (game.counter % 10 === 0) {
    createBackGround();
  }
  createEnemys();
  moveBackGrounds();
  moveDino();
  moveEnemys();
  moveSpecialEnemies();
  drawBackGrounds();
  drawDino();
  drawEnemys();
  drawSpecialEnemies();
  drawCounter();
  drawScore();
  hitCheck();
  attackWith1749617(); 
  game.counter = (game.counter + 1) % 1000000;
  game.enemyCountdown -= 1;
  if(countdown===0&&game.score<2000){
    game.state='gameover';
    game.bgm1.pause();
    game.bgm4.play();
    ctx.fillStyle='black';
    ctx.font='bold 100px serif';
    ctx.fillText(`Game Over!`,150,200);
    clearInterval(game.timer);
    return;
  }
  if(game.score>=2000&&game.state !=='Game Clear'){game.state='Game Clear';setTimeout(endGame, 100);}
};
function endGame() {
  game.state = 'Game Clear';
  game.bgm1.pause();
  game.bgm3.play();
  ctx.fillStyle = 'black';
  ctx.font = 'bold 100px serif';
  ctx.fillText(`Game Clear!`, 150, 200);
  clearInterval(game.timer);
}
function createDino() {
  game.dino = {
    x: game.image.dino.width / 2,
    y: canvas.height - game.image.dino.height / 2,
    moveY: 0,
    width: game.image.dino.width,
    height: game.image.dino.height,
    image: game.image.dino
  };
}

function createBackGround() {
  game.backGrounds = [];
  for (let x = 0; x <= canvas.width; x += 200) {
    game.backGrounds.push({
      x: x,
      y: canvas.height,
      width: 200,
      height: 30,
      moveX: -20
    });
  }
}
function createBird() {
  const birdY = Math.random() * (300 - game.image.bird.height) + 150;
  game.enemys.push({
    x: canvas.width + game.image.bird.width/2,
    y: birdY,
    width: game.image.bird.width,
    height: game.image.bird.height,
    moveX: -15,
    image: game.image.bird
  });
}
let lastTime22255261Created=0;
function create22255261(){  
  const currentTime = Date.now();
  const timeSinceLastCreation=currentTime-lastTime22255261Created;
  if(timeSinceLastCreation<6000){return;}
  const enemy={
  x:canvas.width+game.image['22255261'].width/2,
  y:canvas.height-game.image['22255261'].height*2.5,
  width:game.image['22255261'].width,
  height:game.image['22255261'].height,
  moveX:-10,
  image:game.image['22255261'],
  isPaused:false,
  isTilted:false,
};
game.enemys.push(enemy);
lastTime22255261Created=currentTime;
const lastEnemyIndex=game.enemys.length-1;
const {pauseDelay,pauseDuration}=getPauseTiming(game.score);
setTimeout(() => {
  if (lastEnemyIndex >= 0&&game.enemys[lastEnemyIndex]) {
    game.enemys[lastEnemyIndex].isPaused = true;
    game.enemys[lastEnemyIndex].isTilted=true;
    create25157092(game.enemys[lastEnemyIndex]);
  }},pauseDelay);
  setTimeout(()=>{
    if(lastEnemyIndex>=0&&game.enemys[lastEnemyIndex]){
      game.enemys[lastEnemyIndex].isPaused=false;
      game.enemys[lastEnemyIndex].isTilted=false;
    }
  },pauseDelay+pauseDuration);
}
function getPauseTiming(score){if(score<500){
  return{pauseDelay:700,pauseDuration:2000};
}
else if(score<1000){return{pauseDelay:400,pauseDuration:1000}
}
else if(score<1500){return{pauseDelay:300,pauseDuration:700}
}
else{return{pauseDelay:100,pauseDuration:400}}}
function createCactus(createX) {
  game.enemys.push({
    x: createX,
    y:canvas.height- game.image.cactus.height/2,
    width: game.image.cactus.width,
    height: game.image.cactus.height,
    moveX: -10,
    image: game.image.cactus

  })
}
// Add this new function
function getAngleByScore(score) {
  if (score >= 1500) {
    return Math.PI / 4; // -45 degrees
  } else if (score >= 1000) {
    return Math.PI / 6; // -30 degrees
  } else if (score >= 500) {
    return Math.PI / 9; // -20 degrees
  } else {
    return Math.PI /12; // -15 degrees
  }
}

// Update create25157092
function create25157092(parentEnemy) {
  const angle = getAngleByScore(game.score);
  const speed = 15; // speed of the enemy
  
  const enemy = {
    x: parentEnemy.x,
    y: parentEnemy.y,
    width: game.image['25157092'].width,
    height: game.image['25157092'].height,
    moveX: speed * Math.cos(angle),
    moveY: speed * Math.sin(angle),
    angle: angle,
    image: game.image['25157092'],
  };
game.bgm5.play();
  game.enemys.push(enemy);
}
function create24851338(createX) {
  let y = canvas.height-game.image['24851338'].height / 1.2;
  game.enemys.push({
  x: createX,
    y:y,
    width: game.image['24851338'].width,
    height: game.image['24851338'].height,
    moveX: -13,
    moveY:0,
    image: game.image['24851338']
  });
  game.enemyCountdown = 60;
setTimeout(()=>{const lastEnemyIndex = game.enemys.length - 1;if(lastEnemyIndex>=0){game.enemys[lastEnemyIndex].moveY = -6;}},1200);
setTimeout(()=>{const lastEnemyIndex = game.enemys.length - 1;if(1000>game.score&&game.score>490&&lastEnemyIndex>=0){game.enemys[lastEnemyIndex].moveY = -12;}},550);
setTimeout(()=>{const lastEnemyIndex = game.enemys.length - 1;if(1500>game.score&&game.score>=1000&&lastEnemyIndex>=0){game.enemys[lastEnemyIndex].moveY = -15;}},400);
setTimeout(()=>{const lastEnemyIndex = game.enemys.length - 1;if(game.score>=1500&&lastEnemyIndex>=0){game.enemys[lastEnemyIndex].moveY = -16;}},170);}
function moveBackGrounds() {
  for (const backGround of game.backGrounds) {
    backGround.x += backGround.moveX;
  }
  game.backGrounds=game.backGrounds.filter(bg=>bg.x+bg.width>0);
}
function createEnemys() {
  if (game.score<1000&&game.score>=0&&game.enemyCountdown === 0) {
    game.enemyCountdown = 60 - Math.floor(game.score / 100);
    const randomNumber = Math.floor(Math.random() * 4);
    switch (randomNumber) {
      case 0:
        createCactus(canvas.width + game.image.cactus.width / 2);
        break;
      case 1:
        create22255261();
        break;
      case 2:
        createBird();
        break;
      case 3:
        create24851338(canvas.width + game.image.cactus.width / 9);
        break;
    }
  }
  if (game.score>=1000&&game.enemyCountdown === 0) {
    game.enemyCountdown = 60 - Math.floor(game.score / 61);
    const randomNumber = Math.floor(Math.random() * 4);
    switch (randomNumber) {
      case 0:
        createCactus(canvas.width + game.image.cactus.width / 2);
        break;
      case 1:
        create22255261();
        break;
      case 2:
        createBird();
        break;
      case 3:
        create24851338(canvas.width + game.image.cactus.width / 9);
        break;
    }
  }
  }


function moveDino() {
  game.dino.y += game.dino.moveY;
  if (game.dino.y >= canvas.height - game.dino.height / 2) {
    game.dino.y = canvas.height - game.dino.height / 2;
    game.dino.moveY = 0;
  } else {
    game.dino.moveY += 3;
  }
}
function moveEnemys() {
  for (const enemy of game.enemys) {
    if (!enemy.isPaused) {
      let speedX = -10;
      if (game.score >= 1500) { speedX -= 35; }
      else if (game.score >= 1000) { speedX -= 15; }
      else if (game.score >= 500) { speedX -= 10; }

      if (enemy.image === game.image['25157092']) {
        enemy.x += enemy.moveX;
        enemy.y += enemy.moveY;
      } else {
        enemy.x += speedX;
        if (enemy.image === game.image['24851338']) {
          enemy.y += enemy.moveY;
        }
      }
    }
  }
  game.enemys = game.enemys.filter(enemy => enemy.x > -enemy.width);
}

function drawBackGrounds() {
  ctx.fillStyle = 'sienna';
  for (const backGround of game.backGrounds) {
    ctx.fillRect(backGround.x, backGround.y - 5, backGround.width, 5);
    ctx.fillRect(backGround.x+ 20, backGround.y - 10, backGround.width - 40, 5);
    ctx.fillRect(backGround.x + 50, backGround.y - 15, backGround.width - 100, 5);
  }
}

function drawDino() {
  ctx.drawImage(game.image.dino, game.dino.x - game.dino.width / 2, game.dino.y - game.dino.height / 2);
}

function drawEnemys() {
  for (const enemy of game.enemys) {
    if (enemy.image === game.image['25157092']) {
      let speedX = -44;
      let speedY = 6;

      if (game.score >= 1500) {
        speedX = -50;
        speedY=1
      } else if (game.score >= 1000) {
        speedX = -50;
        speedY=3
      } else if (game.score >= 500) {
        speedX = -48;
      }

      enemy.x += speedX;
      enemy.y += speedY;

      const angle = getAngleByScore(game.score);

      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(angle);
      ctx.drawImage(enemy.image, -enemy.width / 2, -enemy.height / 2);
      ctx.restore();

    } else if (enemy.image === game.image['22255261'] && enemy.isTilted) {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(-Math.PI / 7);
      ctx.drawImage(enemy.image, -enemy.width / 2, -enemy.height / 2);
      ctx.restore();

    } else {
      ctx.drawImage(enemy.image, enemy.x - enemy.width / 2, enemy.y - enemy.height / 2);
    }
  }
  game.enemys = game.enemys.filter(enemy => enemy.x > -enemy.width);
}

function drawSpecialEnemies() {
  for (const enemy of game.specialEnemies) {
    ctx.drawImage(enemy.image, enemy.x - enemy.width / 2, enemy.y - enemy.height / 2);
  }
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '24px serif';
  ctx.fillText(`score:${game.score}`, 0, 30);
}

function hitCheck() {
  for (const enemy of game.enemys) {
    if (Math.abs(game.dino.x - enemy.x) < game.dino.width * 0.8 / 2 + enemy.width * 0.9 / 2 &&
      Math.abs(game.dino.y - enemy.y) < game.dino.height * 0.5 / 2 + enemy.height * 0.9 / 2) {
      game.state = 'gameover';
      game.bgm1.pause();
      game.bgm4.play();
      ctx.fillStyle = 'black';
      ctx.font = 'bold 100px serif';
      ctx.fillText(`Game Over!`, 150, 200);
      clearInterval(game.timer);
    }
  }
}
let canCreateSpecialAttack=true;
let lastSpecialAttackTime=0;
document.onkeydown = function (e) {
  if (e.key === ' ' && game.state === 'init') {
    start();
  }
  if (e.key === ' ' && game.dino.moveY === 0) {
    game.dino.moveY = -41;
    game.bgm2.play();
  }
  if (e.key === 'Enter' && game.state === 'gameover') {
    init();
  }
  if (e.key === 'Enter' && game.state === 'Game Clear') {
    init();
  }
};
document.onkeyup=function(e){if(e.key==='ArrowUp'&&game.state==='gaming'&&canCreateSpecialAttack&&game.score<=1000){createSpecialAttack();
canCreateSpecialAttack=false;
setTimeout(()=>{canCreateSpecialAttack=true;},900);}
if(e.key==='ArrowUp'&&game.state==='gaming'&&canCreateSpecialAttack&&game.score>=1000){createSpecialAttack();
  canCreateSpecialAttack=false;
  setTimeout(()=>{canCreateSpecialAttack=true;},700);}if(e.key==='ArrowUp'&&game.state==='gaming'&&canCreateSpecialAttack&&game.score>=1500){createSpecialAttack();
    canCreateSpecialAttack=false;
    setTimeout(()=>{canCreateSpecialAttack=true;},500);}
};

function createSpecialAttack() {
  const dinoCenterX=game.dino.x+game.dino.width/2;
  const dinoCenterY=game.dino.y-game.dino.height/2;
  let speedMultiplier = 1;
  if (game.score >= 1500) {
    speedMultiplier = 3; 
  } else if (game.score >= 1000) {
    speedMultiplier = 2; }
    else if(game.score>=500){speedMultiplier=1.5;}
game.bgm6.play();
game.bgm6.currentTime = 0;
game.bgm6.play();
  game.specialEnemies.push({
    x: dinoCenterX,
    y: dinoCenterY + 30,
    width: game.image['1749617'].width,
    height: game.image['1749617'].height,
    moveX: 10 * speedMultiplier, // 速度をスコアに応じて調整
    image: game.image['1749617']
  });
}
function attackWith1749617() {
  for (let i = game.specialEnemies.length - 1; i >= 0; i--) {
    const specialEnemy = game.specialEnemies[i];
 for (let j = game.enemys.length - 1; j >= 0; j--) {
    const enemy = game.enemys[j];
      if (specialEnemy.x < enemy.x + enemy.width*0.8 &&
          specialEnemy.x + specialEnemy.width > enemy.x &&
          specialEnemy.y < enemy.y + enemy.height*0.8 &&
          specialEnemy.y + specialEnemy.height > enemy.y) {
            if (enemy.image === game.image.cactus){
              game.score += 50;
            }
            if (enemy.image === game.image.bird){
              game.score += 90;
            }
            if (enemy.image === game.image['24851338']){
              game.score += 70;
            }
            if(enemy.image===game.image['22255261']){
              game.score+=80
            }
            if(enemy.image===game.image['25157092']){
              game.score+=200
            }
            game.enemys.splice(j, 1);
        game.specialEnemies.splice(i, 1);
        break; 
    }}
  }
}
function moveSpecialEnemies()
 {
  for (const enemy of game.specialEnemies) {
    enemy.x += enemy.moveX;
  }
  game.specialEnemies = game.specialEnemies.filter(enemy => enemy.x < canvas.width);
  console.log(game.specialEnemies)
}
function startGame2(){
  ctx.fillStyle='red';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='yellow';
  ctx.font='30px Arial';
  ctx.fillText('Game 2:Playing!',50,100);
}
startGame2();