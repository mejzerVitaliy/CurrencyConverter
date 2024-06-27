
const body = document.body;
const lightModeBtn = document.getElementById('lightModeBtn')
const headAndFoot = document.querySelectorAll('#headAndFoot')
const converter = document.querySelector('.converter')

lightModeBtn.addEventListener('click', themeSwitcher)

async function themeSwitcher() {
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
