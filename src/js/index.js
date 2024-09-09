import '../styles/main.css'
import { initHeader } from './header'
import { icons } from './icons'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

// Загрузка компонентов
const header = require('../components/header.html').default
const footer = require('../components/footer.html').default
const menu = require('../components/menu.html').default

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

    // Инициализация Swiper
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

    // Функция для управления аккордеоном
    function initAccordion() {
        const accordionButtons = document.querySelectorAll('.accordion-button')
        const accordionContents =
            document.querySelectorAll('.accordion-content')

        function toggleAccordion(index) {
            accordionButtons.forEach((btn, i) => {
                if (i === index) {
                    btn.setAttribute('aria-expanded', 'true')
                    btn.classList.add('active')
                    accordionContents[i].classList.remove('hidden')
                    accordionContents[i].classList.add('active')
                } else {
                    btn.setAttribute('aria-expanded', 'false')
                    btn.classList.remove('active')
                    accordionContents[i].classList.add('hidden')
                    accordionContents[i].classList.remove('active')
                }
            })

            // Прокрутка к началу открытой вкладки, только если индекс действителен
            if (index >= 0 && index < accordionButtons.length) {
                setTimeout(() => {
                    accordionButtons[index].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    })
                }, 100)
            }
        }

        accordionButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const isActive = button.classList.contains('active')
                if (isActive) {
                    toggleAccordion(-1) // Закрыть все вкладки
                } else {
                    toggleAccordion(index)
                }
            })
        })

        // Открыть первую вкладку при загрузке страницы
        toggleAccordion(0)
    }

    // Вызов функции инициализации аккордеона
    initAccordion()
})

// Функционал кнопки наверх
window.onscroll = function () {
    scrollFunction()
}

// Кнопка "Наверх"
let scrollToTopBtn
// Кнопка whatsapp
let whatsappBtn

document.addEventListener('DOMContentLoaded', () => {
    scrollToTopBtn = document.getElementById('scrollToTopBtn')
    whatsappBtn = document.getElementById('whatsAppBtn')
})

function scrollFunction() {
    if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
    ) {
        scrollToTopBtn.style.display = 'block'
        whatsappBtn.style.display = 'block'
    } else {
        scrollToTopBtn.style.display = 'none'
        whatsappBtn.style.display = 'none'
    }
}

// Делегирование событий для кнопки "Наверх"
document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'scrollToTopBtn') {
        // Получить текущую позицию прокрутки
        let currentPosition =
            document.documentElement.scrollTop || document.body.scrollTop

        // Прокрутить страницу вверх плавно
        let scrollInterval = setInterval(function () {
            if (currentPosition > 0) {
                window.scrollBy(0, -100) // Скорость прокрутки - 50px
                currentPosition -= 100
            } else {
                clearInterval(scrollInterval)
            }
        }, 10) // Интервал прокрутки - 10ms
    }
})
