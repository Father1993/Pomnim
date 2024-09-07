import './styles/main.css'
import { initHeader } from './js/header'

// Загрузка компонентов
const header = require('./components/header.html').default
const footer = require('./components/footer.html').default
const menu = require('./components/menu.html').default

document.addEventListener('DOMContentLoaded', () => {
    // Вставка header
    document.getElementById('header').innerHTML = header

    // Вставка меню в header
    document.getElementById('menu-container').innerHTML = menu

    // Вставка footer
    document.getElementById('footer').innerHTML = footer

    // Инициализация header
    initHeader()
})

console.log('Скрипт загружен')
