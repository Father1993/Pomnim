import './styles/main.css'
import { initHeader } from './js/header'
import { icons } from './js/icons'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

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

    // Вставка иконок
    document.querySelectorAll('.icon-placeholder').forEach((placeholder) => {
        const iconName = placeholder.dataset.icon

        if (icons[iconName]) {
            placeholder.innerHTML = icons[iconName]
        }
    })
})

if (module.hot) {
    module.hot.accept()
}

document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        // ваши настройки Swiper
    })
})
