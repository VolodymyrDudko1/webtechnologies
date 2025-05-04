let cardDeck=document.getElementById("cards-container");

let currentState="none";
let desiredState="Settings";

let rounds=1;
let multiplayer=false;
let rowsCount=0;
let columnsCount=0;
let difficulty=0;

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
    difficulty=parseInt(document.querySelectorAll("input[type=\"radio\"]:checked").value);
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
function isAllWs(nod) {
    return !/[^\t\n\r ]/.test(nod.textContent);
  }
function isIgnorable(nod) {
    return (
      nod.nodeType === 8 || 
      (nod.nodeType === 3 && isAllWs(nod))
    ); 
  }
function areCards(){
    cardDeck.childNodes.forEach(element => {
        if(!isIgnorable(element)){
            if(element.style.visibility!=="hidden"||element.style.visibility==""){
                return true;
            }
            console.log(element);
        }
        
        
        
    });
    console.log(cardDeck.childNodes);
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
                card.style.visibility="hidden";
                openedCard.style.visibility="hidden";
                if(multiplayer){
                    otherTurn=!otherTurn;
                }
                if(!otherTurn){
                    document.getElementById("moves1").innerText=parseInt(document.getElementById("moves1").innerText)+1;
                    
                }else{
                    document.getElementById("moves2").innerText=parseInt(document.getElementById("moves2").innerText)+1;
                    
                }
                // console.log(areCards());
                if(areCards()){
                    desiredState="FirstPick";
                }else{
                    rounds--;
                    if(rounds!==0){
                        document.getElementById("moves1").innerText="0";
                        document.getElementById("moves1").innerText="0";
                        clearInterval(timer1);
                        clearInterval(timer2);
                        desiredState="Generate";
                    }else{
                        desiredState="Won";
                    }
                }
            },2000);
        }else{
            setTimeout(function(){
                card.classList.remove("open");
                openedCard.classList.remove("open");
                card.innerText="";
                openedCard.innerText="";
                if(multiplayer){
                    otherTurn=!otherTurn;
                }
                if(!otherTurn){
                    document.getElementById("moves1").innerText=parseInt(document.getElementById("moves1").innerText)+1;
                    
                }else{
                    document.getElementById("moves2").innerText=parseInt(document.getElementById("moves2").innerText)+1;
                    
                }
            },1500);
        }
    }
}  
function makeTimer1(){
    time1=difficulty==1?540:difficulty==2?360:180;
    return setInterval(function(){
        if(!otherTurn){
            document.getElementById("timer1").innerText=(--time1);
        }
    },1000);
}
function makeTimer2(){
    time2=difficulty==1?540:difficulty==2?360:180;
    return setInterval(function(){
        if(!otherTurn){
            document.getElementById("timer2").innerText=(--time2);
        }
    },1000);
}
function generate(){
    cardDeck.style.gridTemplate=`repeat(${rowsCount}, 1fr) / repeat(${columnsCount}, 1fr)`;
    let cardsCount=rowsCount*columnsCount;
    cardsCount-=cardsCount%2;
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
    timer1=makeTimer1;
    if(multiplayer){
        timer2=makeTimer2;
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
                break;
            case "FirstPlayerWon" :
                break;
            case "SecondPlayerWon":
                break;       
            case "Win":
                break;                
        }
    }
}, 100);