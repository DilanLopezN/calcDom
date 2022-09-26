// seleção dos elementos html principais
const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')
const allowedKeys = [
  '(',
  ')',
  '/',
  '*',
  '-',
  '+',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1',
  '0',
  '.',
  '%',
  ' '
]

document.querySelectorAll('.charKey').forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener('click', function () {
    const value = charKeyBtn.dataset.value
    input.value += value
  })
})

// função do botão clear
document.getElementById('clear').addEventListener('click', function () {
  input.value = ''
  input.focus()
})

// bloqueando teclas fora dos caracters selecionados do allowedKeys
input.addEventListener('keydown', function (ev) {
  ev.preventDefault()
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key
    return
  }

  // era para ser backspace que apaga porém não muito usual no windows trocado por tab
  if (ev.key === 'Tab') {
    input.value = input.value.slice(0, -1)
  }
  if (ev.key === 'Enter') {
    calculate()
  }
})

// botão de igual
document.getElementById('equal').addEventListener('click', calculate)

// função de calcular
function calculate() {
  resultInput.value = 'ERROR'
  resultInput.classList.add('error')
  // eval tem uso arriscado utilizando somente em pequena aplicação
  const result = eval(input.value)
  resultInput.value = result
  resultInput.classList.remove('error')
}

// função de copia
document
  .getElementById('copyToClipboard')
  .addEventListener('click', function (ev) {
    const button = ev.currentTarget
    if (button.innerText === 'Copy') {
      button.innerText = 'Copied!'
      button.classList.add('success')
      navigator.clipboard.writeText(resultInput.value)
    } else {
      button.innerText = 'Copy'
      button.classList.remove('success')
    }
  })

// função de mudança de tema
document.getElementById('themeSwitcher').addEventListener('click', function () {
  if (main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#26834a')
    main.dataset.theme = 'light'
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#666')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dff91')
    main.dataset.theme = 'dark'
  }
})
