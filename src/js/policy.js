import '../styles/main.css'
import { initHeader } from './header'
import { icons } from './icons'

// Загрузка компонентов
const header = require('../components/header.html').default
const footer = require('../components/footer.html').default

document.addEventListener('DOMContentLoaded', () => {
    // Вставка header
    document.getElementById('header').innerHTML = header

    // Вставка footer
    document.getElementById('footer').innerHTML = footer

    // Инициализация header
    initHeader()

    // Вставка иконок
    document.querySelectorAll('.icon-placeholder').forEach((placeholder) => {
        const iconName = placeholder.dataset.icon
        if (icons[iconName]) {
            placeholder.innerHTML = icons[iconName]
        }
    })
})
