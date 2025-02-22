Object.defineProperty(window, "first", {
    get: function () {
        natSum();
    }   
});
Object.defineProperty(window, "second", {
    get: function () {
        let x=prompt("Enter number");
        
        if(Number.isInteger(Number(x))&&x){
            console.log(x);
            console.log(factorial(x));
        }else{
            alert("Not an Integer Number");
        }
    }   
});
Object.defineProperty(window, "third", {
    get: function () {
        let x=prompt("Enter number");
        
        if(Number.isInteger(Number(x))){
            console.log(monthConverter(x));
        }else{
            alert("Not an Integer Number");
        }
    }   
});
Object.defineProperty(window, "forth", {
    get: function () {
        let x=[1, 2, 3, 4, 5, 6];
        console.log(evenSumm(x));
    }   
});
Object.defineProperty(window, "fifth", {
    get: function () {
        let x=prompt("Enter string");
        let arrowFunc=
        x=>{
            let vowelAmount=0;
            for(const letter in x){
            
            if(["a","o","i","u","e","y"].includes(x.charAt(letter))){
                vowelAmount++;
            }
            
        }
        return vowelAmount;
        }

        console.log(arrowFunc(x));
    }   
});
Object.defineProperty(window, "sixth", {
    get: function () {
        let x=2;
        let y=3;
        console.log(exp(2, 3));
    }   
});
function natSum(){
    let i=1;
    let sum=0;
    while(i<51){
        sum+=i;
        i++;
    }
    console.log("1. "+sum);
}
function factorial(n){
    return n<=1?1:n*factorial(n-1);
}
function monthConverter(month){
    switch(month){
        case "1":
            console.log("January");
            break;
        case "2":
            console.log("Fabruary");
            break;
        case "3":
            console.log("March");
            break;
        case "4":
            console.log("April");
            break; 
        case "5":
            console.log("May");
            break;    
        case "6":
            console.log("June");
            break;     
        case "7":
            console.log("July");
            break;
        case "8":
            console.log("August");
            break;
        case "9":
            console.log("September");
            break;
        case "10":
            console.log("October");
            break; 
        case "11":
            console.log("November");
            break;    
        case "12":
            console.log("December");
            break;
        default:
            console.log("Not a month");          
    }
}
function evenSumm(arr){
    let summ=0;
    for(let i=0; i<arr.length; ++i){
        if(arr[i]%2===0){
            summ+=arr[i];
        }
    }
    return summ;
}
function exp(x, y){
    return x**y;
}