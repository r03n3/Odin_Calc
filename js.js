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
  const backspaceButton = document.querySelector('.backspace');

 function keyLogic(event) {
  const key = event.key;
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '/', '*', '-', '+', '=', 'c', 'Backspace'];

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
    } else if (key === 'c') {
      keyClear();
    } else if (key === 'Backspace') {
      backspace();
    }
      else {
      keyNum(key);
    }
  }
}

function backspace(){
  const str = display.toString();
  if (numcount === 1) {
    // if the last typed in value is a number
    if (str.length === 1) {
      // if the number is a single digit number
      display = 0;
      numcount = 0;
      disp(display);
    } else {
      // if the number has multiple digits and check for a . in special cases
      if(str.slice(-1)==="." || str.slice(-2, -1)==="."){
        dotpressed = !dotpressed;
      } 
      display = parseFloat(str.slice(0, -1));
      disp(display);
    }
  }
  else if (opcount === 1) {
    // if the last typed in value is an operator
    opcount = 0;
    valueOpStore = null;
    disp(firstOp);
  } else if (opcount > 1) {
    // if there are multiple operators typed in
    opcount -= 1;
    display = firstOp;
    valueOpStore = null;
    for (let i = 0; i < opcount; i++) {
      const opButton = document.querySelector(`[data-value="${valueOpStore}"]`);
      valueOpStore = opButton.getAttribute('data-value');
      display = operate(firstOp, display, valueOpStore);
      firstOp = display;
    }
    disp(display);
  }
}


backspaceButton.addEventListener('click', () => {
  const str = display.toString();
  if (numcount === 1) {
    // if the last typed in value is a number
    if (str.length === 1) {
      // if the number is a single digit number
      display = 0;
      numcount = 0;
      disp(display);
    } else {
      // if the number has multiple digits, including a check if a number is a decimal
      if(str.slice(-1)==="." || str.slice(-2, -1)==="."){
        dotpressed = !dotpressed;
      }
      console.log(str.slice(-2, -1));
      display = parseFloat(str.slice(0, -1));
      disp(display);
    }
  }
  else if (opcount === 1) {
    // if the last typed in value is an operator
    opcount = 0;
    valueOpStore = null;
    disp(firstOp);
  } else if (opcount > 1) {
    // if there are multiple operators typed in
    opcount -= 1;
    display = firstOp;
    valueOpStore = null;
    for (let i = 0; i < opcount; i++) {
      const opButton = document.querySelector(`[data-value="${valueOpStore}"]`);
      valueOpStore = opButton.getAttribute('data-value');
      display = operate(firstOp, display, valueOpStore);
      firstOp = display;
    }
    disp(display);
  }
});

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

function keyOp(key) {
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
        display=Math.round((display+ Number.EPSILON) * 100) / 100;
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

 buttonsNum.forEach(buttonNum => { // number button logic
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
  
 buttonsOp.forEach(buttonOp =>{ //operator button logic
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

 equals.addEventListener('click', () => { // equal button logic
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

 //clear the display and all variables that need to be reset
clear.addEventListener('click', () => {
    clearCalc();
    firstOp=0;
    opcount=0;
    numcount=0;
    display=0;
    dotpressed = false;
})

// . logic for decimal numbers
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

//operator logics for arithmetic operations
function operate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        return "ERROR!ALARM!";
      }
      return num1 / num2;
    default:
      return 0;
  }
}



calculator();

disp(0);