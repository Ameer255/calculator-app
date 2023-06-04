//Getting the reference to required elements
let modeOption = document.querySelector('.options');
let switchBtn = document.querySelector('#switch-btn');
let valueButtons = document.querySelectorAll('.value-btn');
let userInput = document.querySelector('.user-input-field');
let resultArea = document.querySelector('.result');
let equalBtn = document.querySelector('.equal');
let backSpaceBtn = document.querySelector('.backspace');
let resetBtn = document.querySelector('.reset');
let expression = '';


//Hide or show the change mode element when options icon clicked
modeOption.addEventListener('click', () => {
    document.querySelector('.mode-container').classList.toggle('shown');
})


//switch between light and dark mode when switch button clicked
switchBtn.addEventListener('click', () => {
    document.querySelector('.calc').classList.toggle('light');
})

//Adding click event listener to each button whose value is required.
valueButtons.forEach((el) => {
    el.addEventListener('click', (e) => {
        //set element's textContent as the value of userInput area
        userInput.value += e.target.textContent;

        //push element's data-value to expression 
        expression += e.target.dataset.value;

    })
})


//Remove last character from expression and user input field area and update both
backSpaceBtn.addEventListener('click', () => {

    expression = removeLastChar(expression);
    console.log('New expression is ', expression);
    userInput.value = removeLastChar(userInput.value);
})

//Function that takes a string as input, removes its last char and returns updated string
const removeLastChar = (str) => {
    let newStr = str.split('');
    newStr.pop();
    return newStr.join('');
}

//Reset everyting when AC/reset button clicked
resetBtn.addEventListener('click', () => {
    expression = '';
    resultArea.innerHTML = '';
    userInput.value = ''
})



//evaluate the expression when user clicks equal button
equalBtn.addEventListener('click', calculate)

let operators = '+, -, /, *, %';

function calculate() {
    // try {
    //     let result = eval(expression);
    //     if (result == 'Infinity' || result == '-Infinity') {
    //         resultArea.innerHTML = 'Division by zero.!';
    //     }
    //     else if(result == undefined){
    //         resultArea.innerHTML = 'Plz Enter a value.!'
    //     }
    //     else{
    //         resultArea.innerHTML = result;
    //     }
    // }
    // catch (err) {
    //     resultArea.innerHTML = 'Syntax error.!';
    // }

    if (validate(expression) && expression.match(/[%/*+-]/g)) {
        expression = performCalculation(expression) + '';
        resultArea.innerHTML = expression;
        userInput.value = expression;
    }
    else if (validate(expression)) {
        resultArea.innerHTML = expression;
        userInput.value = expression;
    }
    else {
        resultArea.innerHTML = 'invalid expression'
    }


}


const performCalculation = (exp) => {

    let numbers = exp.split(/[-+*/%]/);
    let operations = exp.match(/[-+*/%]/g);
    console.log(operations);

    // Perform multiplication and division operations first
    let index = 0;
    while (index < operations.length) {
        if (operations[index] === '*' || operations[index] === '/') {
            let leftOperand = parseFloat(numbers[index]);
            let rightOperand = parseFloat(numbers[index + 1]);
            let operation = operations[index];

            let result;
            switch (operation) {
                case '*':
                    result = leftOperand * rightOperand;
                    break;
                case '/':
                    if (rightOperand === 0) {
                        throw new Error('Division by zero');
                    }
                    result = leftOperand / rightOperand;
                    break;
            }

            numbers.splice(index, 2, result);
            operations.splice(index, 1);
        } else {
            index++;
        }
    }

    // Perform addition and subtraction operations next
    let answer = parseFloat(numbers[0]);
    for (let i = 0; i < operations.length; i++) {
        let operand = parseFloat(numbers[i + 1]);
        let operator = operations[i];
      

        switch (operator) {
            case '+':
                answer += operand;
                break;
            case '-':
                answer -= operand;
                break;
            case '%':
                answer = answer % operand;
                break;
        }
    }

    return answer.toString().includes('.') ? answer.toFixed(2) : answer;
}





const validate = (str) => {
    let operators = "+ - * / % .";
    //check if the expression ends on an operator
    let endsCorrectly = (str.charCodeAt(str.length - 1) >= 48 && str.charCodeAt(str.length - 1) <= 57 && str[str.length - 1] !== '.');
    //check if the expression starts with /, *, 0r % which makes it invalid
    let startsCorrectly = ((str[0] !== '/' && str[0] !== '*' && str[0] !== '%' && str[0] !== '+' && str[0] !== '-'));

    let hasConsecutiveOperators = false;

    //check if expression contains division by zero
    let isDivisionByZero = str.includes('/0');

    //check if the expressiion has two consecutive operators like ++ or ** 
    for (let i = 0; i < str.length; i++) {
        if (operators.includes(str[i]) && operators.includes(str[i + 1])) {
            hasConsecutiveOperators = true;
        }

    }

    if (startsCorrectly && endsCorrectly && !hasConsecutiveOperators && !isDivisionByZero) {
        return true;
    }
    else {
        return false;
    }

}
