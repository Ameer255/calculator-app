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


//evaluate the expression when user clicks equal button
equalBtn.addEventListener('click', () => {
    try {
        let result = eval(expression);
        if (result == 'Infinity' || result == '-Infinity') {
            resultArea.innerHTML = 'Division by zero.!';
        }
        else if(result == undefined){
            resultArea.innerHTML = 'Plz Enter a value.!'
        }
        else{
            resultArea.innerHTML = result;
        }
    }
    catch (err) {
        resultArea.innerHTML = 'Syntax error.!';
    }
});


//Remove last character from expression and user input field area and update both
backSpaceBtn.addEventListener('click', () => {

    expression = removeLastChar(expression);
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

