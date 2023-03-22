function sum(num1, num2){
    let result=num1+num2;
    return result;
}

function div(num1, num2){
    if(num2===0){
        return "ERROR!ALARM!";
    }
    let result=num1/num2;
    return result;
}

function mul(num1, num2){
    let result=num1*num2;
    return result;
}

function sub(num1, num2){
    let result=num1-num2;
    return result;
}

function disp(num){
 const dis = document.getElementById("display");
 dis.innerHTML = num;
}

function calculator(){
 let display=0;
 let value=0;
 let numcount = 0;
 let firstOp=0;
 let opcount=0;
 let valueOpStore;
 const buttonsNum = document.querySelectorAll('.number');
 const buttonsOp =  document.querySelectorAll('.operand');
 const equals = document.querySelector('.equals');
 buttonsNum.forEach(buttonNum =>{
    buttonNum.addEventListener('click', () =>{
        if(numcount===0){
            value = buttonNum.getAttribute('data-value');
            numcount++;
            display=parseInt(value);
            disp(display);
        }
        else{
            value = buttonNum.getAttribute('data-value');
            display = display*10 + parseInt(value);
            disp(display);
        }
    })
 })
 buttonsOp.forEach(buttonOp =>{
    buttonOp.addEventListener('click', () =>{
        let valueOp = buttonOp.getAttribute('data-value');
        valueOpStore = valueOp;
        firstOp=display;
        numcount=0;
        if (opcount>0 && numcount===0){
            display=operate(firstOp,display,valueOpStore);
            disp(display);
          }
        opcount++;      
    })
 })
 equals.addEventListener('click', () => {
    if(opcount===0){
        disp(display)
        numcount=0;
    }else{
        display=operate(firstOp,display,valueOpStore);
        opcount=0;
        numcount=0;
        disp(display);
    }
 })
}

function operate(num1, num2, operand){
    let result;
    if (operand==='+'){
        result=sum(num1, num2);
    }
    if (operand==='-'){
        result=sub(num1, num2);
    }
    if (operand==='*'){
        result=mul(num1, num2);
    }
    if (operand==='/'){
        result=div(num1, num2);
    }
   return result;
}
calculator();