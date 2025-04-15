let flyingSprite=[
    "res/fly/piccolo_fly.png",
    "res/fly/vegeta_fly.png",
    "res/fly/goku_fly.png"
];
let idleSprite=[
    "res/idle/piccolo_idle.png",
    "res/idle/vegeta_idle.png",
    "res/idle/goku_idle.png"
];
let shootSprite=[
    "res/shoot/piccolo_shoot.png",
    "res/shoot/vegeta_shoot.png",
    "res/shoot/goku_shoot.png"
];
let deadSprite=[
    "res/dead/piccolo_dead.png",
    "res/dead/vegeta_dead.png",
    "res/dead/goku_dead.png",
]
let difficulty = 1;
let points = 0;

let currentState="none";
let desiredState="intro";

let introMusic= new Audio("sfx/intro.m4a");
let fireSound = new Audio("sfx/fire.m4a");
let winMusic = new Audio("sfx/win.m4a");
let loseMusic = new Audio("sfx/foul.m4a");

let output=document.getElementById("message-box");
let scoreBoard=document.getElementById("points-box");
let enemy=document.getElementById("enemy");

let enemyShot=0;
let playerShot=0;
let startTime;

let timeoutToClear;
function intro(){
    output.innerText="Get ready";
    introMusic.play();

    enemy.style.top="40%";
    enemy.style.left="40%";
    enemy.classList="fly";
    

    enemy.style.backgroundImage=`url(${flyingSprite[difficulty-1]})`;
    scoreBoard.innerText=points.toString();

    

    setTimeout(function(){output.innerText="3";
        enemy.classList="";
        enemy.style.backgroundImage=`url(${idleSprite[difficulty-1]})`;
    },1850);
    setTimeout(function(){output.innerText="2";},3000);
    setTimeout(function(){output.innerText="1";},4000);
    setTimeout(function(){output.innerText="Begin";},5000);
    setTimeout(function(){
        desiredState="fight";
        introMusic.pause();
    }, 6100);
}
function fight(){
    startTime=Date.now();
    enemy.style.top=(Math.floor(Math.random() * 70)).toString()+"%";
    enemy.style.left=(Math.floor(Math.random() * 80)).toString()+"%";
    enemyShot=1.5+0.6/difficulty+Math.floor(Math.random() * 3)/10;
    timeoutToClear=setTimeout(function(){
        enemy.style.backgroundImage=`url(${shootSprite[difficulty-1]})`;
        fireSound.play();
    },enemyShot*1000);
    
}
enemy.addEventListener("click", function(){
    if(desiredState=="fight"){
        desiredState="aftermatch";
        clearTimeout(timeoutToClear);
        playerShot=(Date.now()-startTime)/1000;
        output.textContent=`Your time: ${playerShot}\n Enemy time: ${Math.floor(enemyShot*1000)/1000}`;
        if(playerShot<enemyShot){
            setTimeout(function(){
                desiredState="win";
            },2500);
        }else{
            setTimeout(function(){
                desiredState="lost";
            },2500);
        }
    }
})
function win(){
    winMusic.play();
    enemy.style.backgroundImage=`url(${deadSprite[difficulty-1]})`;
    points+=100;
    scoreBoard.innerText=points.toString();
    output.innerText="You win!";
    if(difficulty<3){
        difficulty++;
        setTimeout(function(){
            desiredState="intro";
            winMusic.pause();
        },3000)
    }else{
        setTimeout(function(){
            desiredState="again";
            winMusic.pause();
        },3000)
    }

}
function lost(){
    loseMusic.play();
    
    
    
    output.innerText="You lost!";
    
    setTimeout(function(){
            desiredState="again";
            loseMusic.pause();
        },3000)

}
function again(){
    document.getElementById("restart-btn").classList="";
}

document.getElementById("restart-btn").addEventListener("click", function(){
    points=0;
    difficulty=1;
    desiredState="intro";
    document.getElementById("restart-btn").classList="hide";
})
setInterval(function(){
    if(currentState!==desiredState){
        currentState=desiredState;
        switch(desiredState){
            case "intro":
                intro();
                break;
            case "fight":
                fight();
                break;
            case "win":
                win();
                break;
            case "lost":
                lost();   
                break; 
            case "again":
                again();
                break;
            default:
                break;            
        }
    }
},50);