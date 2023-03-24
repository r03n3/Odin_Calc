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

function clearCalc(){
    disp(0);
}

function calculator(){
 let display=0;
 let value=0;
 let numcount = 0;
 let firstOp=0;
 let opcount=0;
 let valueOpStore;
 let dotpressed = false;

 const buttonsNum = document.querySelectorAll('.number');
 const buttonsOp =  document.querySelectorAll('.operand');
 const equals = document.querySelector('.equals');
 const clear = document.querySelector('.clear');
 const dot = document.querySelector('.dot');
 document.addEventListener('keydown', keyLogic);

 function keyLogic(event) {
  const key = event.key;
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '/', '*', '-', '+', '='];

  if (allowedKeys.includes(key)) {
    event.preventDefault();

    if (key === 'Enter') {
      keyEquals();
    } else if (key === '=') {
      keyEquals();
    } else if (key === '/') {
      keyOp('/', 'divide');
    } else if (key === '*') {
      keyOp('*', 'multiply');
    } else if (key === '-') {
      keyOp('-', 'subtract');
    } else if (key === '+') {
      keyOp('+', 'add');
    } else {
      keyNum(key);
    }
  }
}

function keyNum(key) {
  if (numcount === 0) {
    value = key;
    numcount++;
    display = parseFloat(value);
    disp(display);
  } else {
    value = key;
    if (value === '.') {
      if (!dotpressed) {
        dotpressed = true;
        display = display.toString() + '.';
        disp(display);
      }
    } else {
      display = parseFloat(display.toString() + value.toString());
      disp(display);
    }
  }
}

function keyOp(key, opType) {
  let valueOp = key;
  valueOpStore = valueOp;
  numcount=0;
  if (opcount === 0){
      firstOp=display;
      dotpressed = false;
  }
  if (opcount>0){
      display=operate(firstOp,display,valueOpStore);
      firstOp=display;
      dotpressed = false;
      if(typeof display === 'number'){
          display=Math.round((display+ Number.EPSILON) * 100) / 100; //Round displayed number to 2 decimals to avoid an overflowing display
      }
      disp(display);
    }
  opcount++;
}

function keyEquals() {
  if(opcount===0){
      disp(display)
      numcount=0;
      dotpressed=false;
  }else{
      display=operate(firstOp,display,valueOpStore);
      opcount=0;
      numcount=0;
      dotpressed=false;
      if(typeof display === 'number'){
          display=Math.round((display+Number.EPSILON) * 100) / 100;
      }
      disp(display);
  }
}

function keyClear() {
  clearCalc();
  firstOp=0;
  opcount=0;
  numcount=0;
  display=0;
  dotpressed = false;
}

function keyDot() {
  if (dotpressed) {
    disp(display);
  } else {
    dotpressed = true;
    display = display.toString() + '.';
    disp(display);
  }
}



 buttonsNum.forEach(buttonNum => {
    buttonNum.addEventListener('click', () => {
      if (numcount === 0) {
        value = buttonNum.getAttribute('data-value');
        numcount++;
        display = parseFloat(value);
        disp(display);
      } else {
        value = buttonNum.getAttribute('data-value');
        if (value === '.') {
          if (!dotpressed) {
            dotpressed = true;
            display = display.toString() + '.';
            disp(display);
          }
        } else {
          display = parseFloat(display.toString() + value.toString());
          disp(display);
        }
      }
    })
  });
 buttonsOp.forEach(buttonOp =>{
    buttonOp.addEventListener('click', () =>{
        let valueOp = buttonOp.getAttribute('data-value');
        valueOpStore = valueOp;
        numcount=0;

        if (opcount === 0){
            firstOp=display;
            dotpressed = false;
        }
        if (opcount>0){
            display=operate(firstOp,display,valueOpStore);
            firstOp=display;
            dotpressed = false;
            if(typeof display === 'number'){
                display=Math.round((display+ Number.EPSILON) * 100) / 100; //Round displayed number to 2 decimals to avoid an overflowing display
            }
            disp(display);
          }
        opcount++;
           
    })
 })

 equals.addEventListener('click', () => {
    if(opcount===0){
        disp(display)
        numcount=0;
        dotpressed=false;
    }else{
        display=operate(firstOp,display,valueOpStore);
        opcount=0;
        numcount=0;
        dotpressed=false;
        if(typeof display === 'number'){
            display=Math.round((display+ Number.EPSILON) * 100) / 100;
        }
        disp(display);
    }
 })

clear.addEventListener('click', () => {
    clearCalc();
    firstOp=0;
    opcount=0;
    numcount=0;
    display=0;
    dotpressed = false;
})

dot.addEventListener('click', () => {
    if (dotpressed) {
      disp(display);
    } else {
      dotpressed = true;
      display = display.toString() + '.';
      disp(display);
    }
  })

}

function operate(num1, num2, operand){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
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

disp(0);