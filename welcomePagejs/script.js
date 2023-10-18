let checkbox = document.getElementById('check-welcome-page');
let button = document.getElementById('btnWelcomePage')

checkbox.addEventListener('click', function () {
    if (checkbox.checked) {
        button.removeAttribute('disabled')
    }else{
        button.disabled = 'true'
    }
})
