const buttons = [
    { label: '+/-', type: 'operation', html: '<img src="/images/sign.png" alt="">'},    //Cambia de signo
    { label: 'MRC', type: 'memory' },    //Borra la memoria
    { label: 'M-', type: 'memory' },
    { label: 'M+', type: 'memory' },
    { label: '·/·', type: 'operation', html: '<img src="/images/divide.png" alt="">' },
    { label: '%', type: 'operation' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: 'x', type: 'operation', html: '<img src="/images/product.png" alt="">' },
    { label: '√', type: 'operation', html: '<img src="/images/sqrt.png" alt="">' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '-', type: 'operation', html: '<img src="/images/substract.png" alt="">' },
    { label: 'C', type: 'operation' },      //Borra la pantalla actual
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '+', type: 'operation' },
    { label: 'AC', type: 'operation' },     //Borra la pantalla actual, la operacion guardada y el numero guardado
    { label: '0', type: 'number' },
    { label: '.', type: 'number' },
    { label: '=', type: 'result' }
];

const calculator = document.getElementById('calculator')
const screen = document.getElementById('screen')
const memoryScreen = document.getElementById('memory-screen')

const drawCalculator = (buttons) => {
    buttons.map(button => {
        let calculatorButton = document.createElement('button')
        calculatorButton.dataset.label = button.label
        calculatorButton.dataset.type = button.type
        if (button.label === '+'){
            calculatorButton.className = 'plus'
        }
        if (button.html){
            calculatorButton.innerHTML = button.html
        } else {
            calculatorButton.innerText = button.label
        }
        calculator.appendChild(calculatorButton)
    })

}

let lastNumber = ''
let operation = ''
let memory = 0
let needsCleaning = true
let MRCClicked = false


const writeScreen = (key) => {
    if (needsCleaning) {
        screen.value = ''
        needsCleaning = false
    }
    screen.value = screen.value+key
}

const calculate = (key) => {
    switch (key) {
        case '+':
        case '-':
        case 'x':
        case '·/·':
            operation = key
            lastNumber = screen.value
            needsCleaning = true
            break;
        case '+/-':
            screen.value = screen.value.startsWith('-') ? screen.value.substring(1) : ('-' + screen.value)
            break;
        case '%':
            screen.value = divide(Number(screen.value), 100)
            needsCleaning = true
            break;
        case '√':
            screen.value = sqrt(Number(screen.value))
            needsCleaning = true
            break;
        case 'C':
            screen.value = '0'
            needsCleaning = true
            break;
        case 'AC':
            operation = ''
            lastNumber = ''
            screen.value = '0'
            needsCleaning = true
    }
    
}

const memorize = (key) => {
    needsCleaning = true
    switch (key) {
        case 'M+':
            memory = add(Number(memory),Number(screen.value))
            break;
        case 'M-':
            memory = subtract(Number(memory),Number(screen.value))

            break;
        default:
            if (MRCClicked) {
                memory = 0
                screen.value = '0'
                needsCleaning = true
                MRCClicked = false
            } else {
                screen.value = memory
                MRCClicked = true
            }
    }
    memoryScreen.value = memory
}

const calculateResult = () => {
    needsCleaning = true
    switch (operation) {
        case '+':
            screen.value = add(Number(lastNumber),Number(screen.value))
            break;
        case '-':
            screen.value = subtract(Number(lastNumber),Number(screen.value))
            break;
        case 'x':
            screen.value = multiply(Number(lastNumber),Number(screen.value))
            break;
        case '·/·':
            screen.value = divide(Number(lastNumber),Number(screen.value))
            break;
        default:
            screen.value = screen.value
            break;

    }
}

drawCalculator(buttons)

addEventListener('click', e => {
    key = e.target.dataset.label
    type = e.target.dataset.type
    if (key) {
        switch (type) {
            case 'number':
                writeScreen(key)
                break;
            case 'operation':
                calculate(key)
                break;
            case 'memory':
                memorize(key)
                break;
            case 'result':
                calculateResult()
                break;
        }
    }
})