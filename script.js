const lightMode = document.getElementById('lightMode')

lightMode.addEventListener('click', () => {
    lightMode.innerText = 'dark mode'
    lightMode.style.backgroundColor = 'black'
    lightMode.style.color = 'white'
})