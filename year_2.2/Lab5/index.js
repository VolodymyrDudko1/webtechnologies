lightTimer=0;
function lightSwitch(){
    let light = document.querySelector(".light");
    let newVisibility = light.style.visibility=="visible"?"hidden":"visible";
    light.style.visibility=newVisibility;
    
    if(lightTimer!=0&&newVisibility=="visible"){
        clearTimeout(lightSwitch);
        lightTimer=setTimeout(function(){
            light.style.visibility="hidden";
        }, 5000)
    }else if(lightTimer===0){
        lightTimer=setTimeout(function(){
            light.style.visibility="hidden";
        }, 5000)
    }
    
}
function changeLightBulb(){
    let option = document.querySelector(".radio-item [type=\"radio\"]:checked")
    console.log(option.value);
    switch(option.value){
        case "normal":
            document.querySelector(".light-bulb").src="res/lightbulb.png";
            console.log("n");
            break;
        case "old":
            document.querySelector("*.light-bulb").src="res/old_bulb.png";
            console.log("o");
            break;
        case "sun":
            document.querySelector(".light-bulb").src="res/sun.png";
            console.log("s");
            break;    
        default:
    }
}
function changeBrightness(){
    document.querySelector(".light").style.opacity=prompt("Enter brightness from 1% to 100%");
}
redDuration=5000;
yellowDuration=3000;
greenDuration=7000;
tlColor=document.querySelector(".traffic-light");
tlName=document.querySelector(".color-name p");
current=0;
animate=[];
// let trafficLightAnimation=function(){
//     tlColor.style.backgroundColor="red";
//     current=setTimeout(function(){
//         tlColor.style.backgroundColor="yellow";
//         current=setTimeout(function(){
//             tlColor.style.backgroundColor="green";
//             current=setTimeout(function(){
                
//                 tlColor.style.backgroundColor="yellow";
//                 animate.push(setTimeout(function(){
//                     tlColor.style.backgroundColor="transparent";
//                 }, yellowDuration/5));
//                 animate.push(setTimeout(function(){
//                     tlColor.style.backgroundColor="yellow";
//                 }, yellowDuration/5*2));
//                 animate.push(setTimeout(function(){
//                     tlColor.style.backgroundColor="transparent";
//                 }, yellowDuration/5*3));
//                 animate.push(setTimeout(function(){
//                     tlColor.style.backgroundColor="yellow";
//                 }, yellowDuration/5*4));    
                
                
                
//             },greenDuration)
//         },yellowDuration)
//     },redDuration)
// }
// setInterval(trafficLightAnimation,redDuration+yellowDuration+greenDuration+yellowDuration);
// trafficLightAnimation();
function nextColor(){
    clearTimeout(current);
    animate.forEach(element => {
        clearTimeout(element);
    });
    preferred_state=(preferred_state)%4+1;
}
preferred_state=1;
executed_state=0;
setInterval(function(){
    if(executed_state!=preferred_state){
        
        executed_state=preferred_state;
        console.log("Enter "+preferred_state);
        switch(preferred_state){
            case 1:
                
                tlColor.style.backgroundColor="red";
                tlName.innerText="RED";
                current=setTimeout(function(){preferred_state=2},redDuration);
                break;
            case 2:
                
                tlColor.style.backgroundColor="yellow";
                tlName.innerText="YELLOW";
                current=setTimeout(function(){preferred_state=3},yellowDuration);
                break;
            case 3:    
                
                
                
                tlColor.style.backgroundColor="green";
                tlName.innerText="GREEN";
                current=setTimeout(function(){preferred_state=4},greenDuration);
                break;
            case 4:
                
                tlColor.style.backgroundColor="yellow";
                tlName.innerText="YELLOW";
                animate.push(setTimeout(function(){
                    tlColor.style.backgroundColor="transparent";
                }, yellowDuration/5));
                animate.push(setTimeout(function(){
                    tlColor.style.backgroundColor="yellow";
                }, yellowDuration/5*2));
                animate.push(setTimeout(function(){
                    tlColor.style.backgroundColor="transparent";
                }, yellowDuration/5*3));
                animate.push(setTimeout(function(){
                    tlColor.style.backgroundColor="yellow";
                }, yellowDuration/5*4));  
                current=setTimeout(function(){preferred_state=1},yellowDuration);
                break;
        }
    }
},100);
function changeDuration(color){
    switch(color){
        case "red":
            redDuration=prompt("Enter duration in miliseconds");
            break;
        case "yellow":
            yellowDuration=prompt("Enter duration in miliseconds");
            break;
        case "green":
            greenDuration=prompt("Enter duration in miliseconds");
            break;
        default:            
    }
}
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = `<span class="blink">${String(now.getSeconds()).padStart(2, '0')}</span>`;
    document.getElementById('clock').innerHTML = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);


let countdownInterval;
document.getElementById('countdownDate').addEventListener('change', function() {
    clearInterval(countdownInterval);
    const endDate = new Date(this.value);
    
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "Time's up!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = 
            `${days}d ${hours}h ${minutes}min ${seconds}s`;
    }, 1000);
});


let birthdayDate = null;
const calendarMonth = document.getElementById('calendarMonth');
const calendar = document.getElementById('calendar');

function generateCalendar() {
    const date = new Date(calendarMonth.value || Date.now());
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    calendar.innerHTML = '';
    
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;
        
        const currentDate = new Date(year, month, i);
        if (currentDate.toDateString() === today.toDateString()) {
            day.classList.add('current-day');
        }
        
        if (birthdayDate && 
            currentDate.getDate() === birthdayDate.getDate() &&
            currentDate.getMonth() === birthdayDate.getMonth()) {
            day.classList.add('selected-birthday');
        }

        day.addEventListener('click', () => {
            birthdayDate = new Date(year, month, i);
            generateCalendar();
            updateBirthdayCountdown();
        });
        calendar.appendChild(day);
    }
}

calendarMonth.addEventListener('change', generateCalendar);
calendarMonth.value = new Date().toISOString().slice(0, 7);
generateCalendar();
    
function updateBirthdayCountdown() {
    if (!birthdayDate) return;

    setInterval(() => {
        const now = new Date();
        let nextBirthday = new Date(
            now.getFullYear(),
            birthdayDate.getMonth(),
            birthdayDate.getDate()
        );

        if (nextBirthday < now) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const diff = nextBirthday - now;
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('birthdayCountdown').innerHTML = 
            `Till next birthday:<br>
            ${months} months<br>
            ${days} days<br>
            ${hours} hours<br>
            ${minutes} minutes<br>
            ${seconds} seconds`;
    }, 1000);
}

const products = new Map();        
const orders = new Set();          
const productHistory = new WeakMap(); 
const productUsers = new WeakSet();   

let productIdCounter = 1;


class Product {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

// Додавання продукту
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);
    
    const id = productIdCounter++;
    const product = new Product(id, name, price, quantity);
    
    products.set(id, product);
    productHistory.set(product, [{
        date: new Date(),
        changes: `Item created: ${name}`
    }]);
    
    updateProductsList();
}


function deleteProduct(id) {
    const product = products.get(id);
    products.delete(id);
    productUsers.delete(product); 
    updateProductsList();
}


function updateProduct(id) {
    const product = products.get(id);
    const newPrice = prompt('New price:', product.price);
    const newQuantity = prompt('New amount:', product.quantity);

    if (newPrice && newQuantity) {
        product.price = parseFloat(newPrice);
        product.quantity = parseInt(newQuantity);
        
        
        const history = productHistory.get(product) || [];
        history.push({
            date: new Date(),
            changes: `Renewed price → ${newPrice}, ammount → ${newQuantity}`
        });
        productHistory.set(product, history);
        
        updateProductsList();
    }
}


function searchProduct() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const result = [...products.values()].filter(p => 
        p.name.toLowerCase().includes(searchTerm)
    );
    
    const output = result.map(p => `
        ID: ${p.id}<br>
        Name: ${p.name}<br>
        Price: ${p.price}<br>
        Ammount: ${p.quantity}
    `).join('<hr>');
    
    document.getElementById('searchResult').innerHTML = output || 'Not found';
}


function placeOrder() {
    const productId = parseInt(document.getElementById('orderProductId').value);
    const quantity = parseInt(document.getElementById('orderQuantity').value);
    
    const product = products.get(productId);
    if (!product || product.quantity < quantity) {
        alert('Not available');
        return;
    }

    product.quantity -= quantity;
    orders.add(`ORDER_${Date.now()}`);
    productUsers.add(product); 
    
    
    const history = productHistory.get(product) || [];
    history.push({
        date: new Date(),
        changes: `Sold ${quantity} `
    });
    productHistory.set(product, history);
    
    updateProductsList();
}


function updateProductsList() {
    const tbody = document.getElementById('productsList');
    tbody.innerHTML = '';
    
    products.forEach((product, id) => {
        const row = `
            <tr>
                <td>${id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>
                    <button onclick="updateProduct(${id})">Update</button>
                    <button onclick="deleteProduct(${id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}


updateProductsList();