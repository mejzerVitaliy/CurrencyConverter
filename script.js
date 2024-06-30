
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

makeAUrltoApi(clientCurrencyInp, intoCurrencyInp, clientValueInp)

saveDataBeetwenSession()



function saveDataBeetwenSession() {
    window.addEventListener('load', () => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            applyTheme(savedTheme)
        }

        clientCurrency = localStorage.getItem('clientCurrency')
        clientValue = localStorage.getItem('clientValue')
        intoCurrency = localStorage.getItem('intoCurrency')
        resultValue = localStorage.getItem('resultValue')
        
        
        saveInputs(clientCurrency, clientValue, intoCurrency, resultValue)
        
    })

}

function themeSwitcher() {
    
    let theme

    if (lightModeBtn.innerText === "light mode") {
        theme = 'dark'
    } else if (lightModeBtn.innerText === "dark mode") {
        theme = 'light'
    }
    applyTheme(theme)
    localStorage.setItem('theme', theme)
}

function applyTheme(theme) {
    if (theme === "dark") {
        lightModeBtn.innerText = "dark mode"
        lightModeBtn.classList.remove('lightModeBtn')
        lightModeBtn.classList.add('darkModeBtn')
        
        body.style.color = 'var(--darkThemeColor)';
        headAndFoot.forEach(item => {
            item.style.backgroundColor = 'var(--darkThemeBgColor)';
        });
        converter.style.backgroundColor = 'var(--darkConverterBgColor)';
    } else {
        lightModeBtn.innerText = "light mode"
        lightModeBtn.classList.remove('darkModeBtn')
        lightModeBtn.classList.add('lightModeBtn')
        
        body.style.color = 'var(--lightThemeColor)';
        headAndFoot.forEach(item => {
            item.style.backgroundColor = 'var(--lightThemeBgColor)';
        });
        converter.style.backgroundColor = 'var(--lightConverterBgColor)';
    }
}

function makeAUrltoApi(clientCurrencyInp, intoCurrencyInp, clientValueInp) {
    clientCurrencyInp.addEventListener('change', () => {
        clientCurrency = clientCurrencyInp.value;
        link = `https://${host}/latest?amount=${clientValue}&from=${clientCurrency}&to=${intoCurrency}`
        dataAboutClientCurrency()

        localStorage.setItem('clientCurrency', clientCurrency)
    });
    
    intoCurrencyInp.addEventListener('change', () => {
        intoCurrency = intoCurrencyInp.value;
        link = `https://${host}/latest?amount=${clientValue}&from=${clientCurrency}&to=${intoCurrency}`
        dataAboutClientCurrency()

        localStorage.setItem('intoCurrency', intoCurrency)
    });
    
    clientValueInp.addEventListener('change', () => {
        clientValue = clientValueInp.value;
        link = `https://${host}/latest?amount=${clientValue}&from=${clientCurrency}&to=${intoCurrency}`
        dataAboutClientCurrency()

        localStorage.setItem('clientValue', clientValue)
    });
}

function saveInputs(clientCurrency, clientValue, intoCurrency, resultValue) {
    if (clientCurrency) clientCurrencyInp.value = clientCurrency;
    if (clientValue) clientValueInp.value = clientValue;
    if (intoCurrency) intoCurrencyInp.value = intoCurrency;
    if (resultValue) resultValueInp.value = resultValue
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
    localStorage.setItem('resultValue', resultValue)
}

