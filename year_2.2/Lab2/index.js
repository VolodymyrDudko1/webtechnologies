Object.defineProperty(window, "first", {
    get: function () {
        let x=[1,2,4,-2];
        minMax(x);
    }   
  });

  Object.defineProperty(window, "second", {
    get: function () {
        let x=prompt("Enter number");
        console.log(inRange(x));
    }   
  });  
  Object.defineProperty(window, "third", {
    get: function () {
        let x=prompt("Enter month");
        console.log(defineSeason(x.toLowerCase()));
        let y=prompt("Enter mark");
        console.log(defineGrade(y));
    }   
  });  
function minMax(arr){
    if(arr[0]){
        let min=arr[0];
        let max=arr[0];
        for(let i=0; i<arr.length; i++){
            if(arr[i]<min){
                min=arr[i];
            }
            if(arr[i]>max){
                max=arr[i];
            }
        }
        console.log([min,max]);
    }
}
function inRange(value){
    let range=[-2, 7];
    return !(value<range[0]||value>range[1]);
}
function defineSeason(month){
    if(month=="december"||month=="january"||month=="february"){
        console.count("winter");
    }else if(month=="march"||month=="april"||month=="may"){
        console.count("spring");
    }else if(month=="june"||month=="july"||month=="august"){
        console.count("summer");
    }else if(month=="september"||month=="october"||month=="november"){
        console.count("autumn");
    }else{
        console.count("not a month");
    }
}
function defineGrade(grade){
    console.log(grade<=2&&grade>=0?"F":grade<=5&&grade>2?"E":grade<7&&grade>5?"D":grade<=8&&grade>=7?"C":grade<10&&grade>8?"B":grade<=12&&grade>=10?"A":"Not a mark");
}