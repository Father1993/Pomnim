import './styles/main.css'
import { initHeader } from './js/header'
import { icons } from './js/icons'

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
        console.log('Processing icon:', iconName)

        if (icons[iconName]) {
            placeholder.innerHTML = icons[iconName]
            console.log('Icon HTML:', placeholder.innerHTML)
        } else {
            console.warn(`Icon "${iconName}" not found`)
        }
    })
})

if (module.hot) {
    module.hot.accept()
}

console.log('Скрипт загружен')

document.addEventListener('DOMContentLoaded', function () {
    new Swiper('#slider_promo .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // Когда ширина окна >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // Когда ширина окна >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    })
})
