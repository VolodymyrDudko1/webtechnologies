let cardDeck=document.getElementById("cards-container");

let currentState="none";
let desiredState="Settings";

let rounds=1;
let multiplayer=false;
let rowsCount=0;
let columnsCount=0;
let difficulty=0;

let cardsCount;


let otherTurn=false;
let timeForRounds1=[];
let timeForRounds2=[];

let openedCard;

let values=[];

function reset(){
    location.reload();
}
function apply(){

    multiplayer=document.getElementById("pl_count").checked;
    rowsCount=parseInt(document.getElementById("rows").value);
    columnsCount=parseInt(document.getElementById("columns").value);
    difficulty=parseInt(document.querySelector("input[type=\"radio\"]:checked").value);
    
    rounds=parseInt(document.getElementById("rounds"));
    document.getElementById("settings-panel").style.display="none";
    desiredState="Generate";

}
function shuffle(array) {
    let currentIndex = array.length;
  
    
    while (currentIndex != 0) {
  
      
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}
function increaseTurnCount(){
    if(otherTurn===false){
        document.getElementById("turns1").innerText=parseInt(document.getElementById("turns1").innerText)+1;
    }else{
        document.getElementById("turns2").innerText=parseInt(document.getElementById("turns2").innerText)+1;
    }
}
// function isAllWs(nod) {
//     return !/[^\t\n\r ]/.test(nod.textContent);
//   }
// function isIgnorable(nod) {
//     return (
//       nod.nodeType === 8 || 
//       (nod.nodeType === 3 && isAllWs(nod))
//     ); 
//   }
function areCards(){
    cardDeck.querySelectorAll("div.cards").forEach((element) => {
        
            if(element.style.visibility!=="hidden"||element.style.visibility==""){
                return true;
            }
            console.log(element);
        
    });
    return false;
}
function openCard(card){
    if(currentState=="FirstPick"){
        card.classList.add("open");
        openedCard=card;
        
        openedCard.innerHTML=`<p>${values[openedCard.id]}</p>`;
        desiredState="SecondPick";
    }else if(currentState=="SecondPick"){
        card.classList.add("open");
        card.innerHTML=`<p>${values[card.id]}</p>`;
        if(values[parseInt(openedCard.id)]==values[parseInt(card.id)]){
            setTimeout(function(){
                cardsCount-=2;
                card.style.visibility="hidden";
                openedCard.style.visibility="hidden";
                
                if(!otherTurn){
                    document.getElementById("moves1").innerText=parseInt(document.getElementById("moves1").innerText)+1;
                    
                }else{
                    document.getElementById("moves2").innerText=parseInt(document.getElementById("moves2").innerText)+1;
                    
                }
                if(multiplayer){
                    otherTurn=!otherTurn;
                }
                // console.log(areCards());
                if(cardsCount!==0){
                    desiredState="FirstPick";
                }else{
                    rounds--;
                    if(rounds!==0){
                        document.getElementById("moves1").innerText="0";
                        document.getElementById("moves2").innerText="0";
                        clearInterval(timer1);
                        clearInterval(timer2);
                        timeForRounds1.push(parseInt(document.getElementById("timer1").innerText));
                        timeForRounds2.push(parseInt(document.getElementById("timer2").innerText));
                        desiredState="Generate";
                    }else{
                        desiredState="Win";
                    }
                }
            },2000);
        }else{
            setTimeout(function(){
                card.classList.remove("open");
                openedCard.classList.remove("open");
                card.innerText="";
                openedCard.innerText="";
                
                if(!otherTurn){
                    document.getElementById("moves1").innerText=parseInt(document.getElementById("moves1").innerText)+1;
                    
                }else{
                    document.getElementById("moves2").innerText=parseInt(document.getElementById("moves2").innerText)+1;
                    
                }
                if(multiplayer){
                    otherTurn=!otherTurn;
                }
            },1500);
        }
    }
}  
function makeTimer1(){
    time1=difficulty==1?180:difficulty==2?360:540;
    return setInterval(function(){
        if(!otherTurn){
            document.getElementById("timer1").innerText=(--time1);
        }
    },1000);
}
function makeTimer2(){
    time2=difficulty==1?180:difficulty==2?360:540;
    return setInterval(function(){
        if(otherTurn){
            document.getElementById("timer2").innerText=(--time2);
        }
    },1000);
}
function generate(){
    

    cardDeck.style.gridTemplate=`repeat(${rowsCount}, 1fr) / repeat(${columnsCount}, 1fr)`;
    cardsCount=rowsCount*columnsCount;
    cardsCount-=cardsCount%2;
    cardDeck.innerHTML="";
    for(let i=0; i<cardsCount; ++i){
        cardDeck.innerHTML+=`
        <div class="card" onclick="openCard(this)" id="${i}">
            <p> </p>
        </div>
        `
    }
    for(let i=1; i<=cardsCount/2; ++i){
        values.push(i);
        values.push(i);
    }
    
    shuffle(values);
    timer1=makeTimer1();
    if(multiplayer){
        timer2=makeTimer2();
    }
    desiredState="FirstPick";
}

setInterval(function(){
    if(currentState!=desiredState){
        currentState=desiredState;
        switch(desiredState){
            case "Settings":
                break;
            case "Generate":
                generate();
                break;    
            case "FirstPick":
                break;
            case "SecondPick":
                break;
            case "Lose":
                document.getElementById("message-box").innerHTML=`<p>You lost</p><button onclick="reset()">Again</button>`;

                break;
            case "FirstPlayerWon" :
                document.getElementById("message-box").innerHTML=`<h2>First player win</h2><p>${timeForRounds1.toString()}</p><button onclick="reset()">Again</button>`;
                break;
            case "SecondPlayerWon":
                document.getElementById("message-box").innerHTML=`<h2>Second player win</h2><p>${timeForRounds2.toString()}</p><button onclick="reset()">Again</button>`;
                break;       
            case "Win":
                document.getElementById("message-box").innerHTML=`<h2>Win</h2><p>${timeForRounds1.toString()}</p><p>${timeForRounds2.toString()}</p><button onclick="reset()">Again</button>`;
                break;                
        }
    }
}, 100);