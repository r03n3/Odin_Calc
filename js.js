function sum(num1, num2){
    let result=num1+num2;
    return result;
}

function div(num1, num2){
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

function calculator(){

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