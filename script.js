const randomQuoteURL = "https://api.quotable.io/random"
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
quoteInputElement.addEventListener('input', () => {
    let correct = true
    arrayQuote = quoteDisplayElement.querySelectorAll('span')
    arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((elementSpan, index) => {
        const character = arrayValue[index]
        if(character == null){
            elementSpan.classList.remove('correct')
            elementSpan.classList.remove('incorrect')
            correct = false
        }else if(character === elementSpan.innerText){
            elementSpan.classList.add('correct')
            elementSpan.classList.remove('incorrect')
        }else {
            elementSpan.classList.remove('correct')
            elementSpan.classList.add('incorrect')
            correct = false
        }
    })
    if(correct) {
        getNewQuote()
    }
})

function getRandomQuote() {
    return fetch(randomQuoteURL)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(element => {
        const elementSpan = document.createElement('span')
        elementSpan.innerText = element
        quoteDisplayElement.appendChild(elementSpan)
    });
    quoteInputElement.value = null
    startTimer()
}

let startTime 

function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

getNewQuote()
