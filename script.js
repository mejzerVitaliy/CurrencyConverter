
const body = document.body;
const lightModeBtn = document.getElementById('lightModeBtn');
const headAndFoot = document.querySelectorAll('#headAndFoot');
const converter = document.querySelector('.converter');


const clientCurrencyInp = document.getElementById('yourCurrency');
const intoCurrencyInp = document.getElementById('intoCurrency');
const clientValueInp = document.getElementById('clientValueInp');
const resultValueInp = document.getElementById('resultValueInp');
const host = 'api.frankfurter.app';

let clientCurrency, intoCurrency, clientValue, resultValue, link;

lightModeBtn.addEventListener('click', themeSwitcher);

makeAUrl(clientCurrencyInp, intoCurrencyInp, clientValueInp)

function themeSwitcher() {
    if (lightModeBtn.innerText === "light mode") {
        lightModeBtn.innerText = "dark mode"
        lightModeBtn.classList.remove('lightModeBtn')
        lightModeBtn.classList.add('darkModeBtn')

        body.style.color = 'var(--darkThemeColor)'
        
        headAndFoot.forEach(item => {
            item.style.backgroundColor = 'var(--darkThemeBgColor)'
        })
        converter.style.backgroundColor = 'var(--darkConverterBgColor)'
    
    } else if (lightModeBtn.innerText === "dark mode") {
        lightModeBtn.innerText = "light mode"
        lightModeBtn.classList.remove('darkModeBtn')
        lightModeBtn.classList.add('lightModeBtn')

        body.style.color = 'var(--lightThemeColor)'
        headAndFoot.forEach(item => {
            item.style.backgroundColor = 'var(--lightThemeBgColor)'
        })
        converter.style.backgroundColor = 'var(--lightConverterBgColor)'
    }
}

function makeAUrl(clientCurrencyInp, intoCurrencyInp, clientValueInp) {
    clientCurrencyInp.addEventListener('change', () => {
        clientCurrency = clientCurrencyInp.value;
        link = `https://${host}/latest?amount=${clientValue}&from=${clientCurrency}&to=${intoCurrency}`
        dataAboutClientCurrency()
    });
    
    intoCurrencyInp.addEventListener('change', () => {
        intoCurrency = intoCurrencyInp.value;
        link = `https://${host}/latest?amount=${clientValue}&from=${clientCurrency}&to=${intoCurrency}`
        dataAboutClientCurrency()
    });
    
    clientValueInp.addEventListener('change', () => {
        clientValue = clientValueInp.value;
        link = `https://${host}/latest?amount=${clientValue}&from=${clientCurrency}&to=${intoCurrency}`
        dataAboutClientCurrency()
    });
}

async function dataAboutClientCurrency() {
    if (clientCurrency != undefined && 
        intoCurrency != undefined &&
        clientValue != undefined
    ) {
        try {
            const res = await fetch(link);
            const data = await res.json()
            logResult(data, resultValue)
        } catch (error) {
            console.error(error)
        } 
    }
    
}

function logResult(data, resultValue) {
    if (clientCurrency != intoCurrency) {
        resultValue = Object.values(data.rates)[0] 
        resultValueInp.value = resultValue
    } else {
        resultValue = clientValue;
        resultValueInp.value = resultValue
    }   
}