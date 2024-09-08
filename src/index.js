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
        slidesPerView: 1, // По умолчанию показываем 1 слайд
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // Когда ширина окна >= 768px
            768: {
                slidesPerView: 2, // Показываем 2 слайда на десктопах
                spaceBetween: 30,
            },
        },
    })
})

// Функционал кнопки наверх
window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
    ) {
        document.getElementById('scrollToTopBtn').style.display = 'block'
    } else {
        document.getElementById('scrollToTopBtn').style.display = 'none'
    }
}

// Найти кнопку "Наверх"
const scrollToTopBtn = document.getElementById('scrollToTopBtn')

// Делегирование событий для кнопки "Наверх"
document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'scrollToTopBtn') {
        // Получить текущую позицию прокрутки
        var currentPosition =
            document.documentElement.scrollTop || document.body.scrollTop

        // Прокрутить страницу вверх плавно
        var scrollInterval = setInterval(function () {
            if (currentPosition > 0) {
                window.scrollBy(0, -50) // Скорость прокрутки - 50px
                currentPosition -= 50
            } else {
                clearInterval(scrollInterval)
            }
        }, 10) // Интервал прокрутки - 10ms
    }
})

// Получаю кнопку
const whatsappBtn = document.getElementById('whatsappBtn')

document.addEventListener('scroll', () => {
    if (whatsappBtn) {
        if (window.scrollY > 200) {
            whatsappBtn.style.display = 'block'
        } else {
            whatsappBtn.style.display = 'none'
        }
    }
})
