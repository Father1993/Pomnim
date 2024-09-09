import '../styles/main.css'
import { initHeader } from './header'
import { icons } from './icons'

// Загрузка компонентов
const header = require('../components/header.html').default
const footer = require('../components/footer.html').default
const menu = require('../components/menu.html').default

// Список изображений
const images = Array.from({ length: 51 }, (_, i) => ({
    src: `assets/img/gallery/${i + 10}.webp`,
    title: `Благоустройство мест захоронений ${i + 10}`,
}))

document.addEventListener('DOMContentLoaded', () => {
    // Вставка header и footer
    document.getElementById('header').innerHTML = header
    document.getElementById('menu-container').innerHTML = menu
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

    // Создание галереи
    const galleryContainer = document.getElementById('gallery')

    images.forEach((image, index) => {
        const imageElement = document.createElement('div')
        imageElement.className = 'gallery-item'
        imageElement.innerHTML = `
            <img src="${image.src}" alt="${image.title}" class="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer">
        `
        galleryContainer.appendChild(imageElement)

        // Обработчик клика по изображению для открытия в полном размере
        imageElement.querySelector('img').addEventListener('click', () => {
            openFullscreen(index)
        })
    })

    // Функция для открытия изображения в полном размере
    function openFullscreen(index) {
        const fullscreenContainer = document.createElement('div')
        fullscreenContainer.className =
            'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'
        fullscreenContainer.innerHTML = `
            <div class="max-w-4xl max-h-full p-4 relative">
                <img src="${images[index].src}" alt="${images[index].title}" class="max-w-full max-h-full object-contain">
                <p class="text-white text-center mt-4">${images[index].title}</p>
                <button class="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-6xl" id="prev-button">&lt;</button>
                <button class="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-6xl" id="next-button">&gt;</button>
            </div>
            <button class="absolute top-4 right-4 text-white text-6xl" id="close-button">&times;</button>
        `
        document.body.appendChild(fullscreenContainer)

        const prevButton = fullscreenContainer.querySelector('#prev-button')
        const nextButton = fullscreenContainer.querySelector('#next-button')
        const closeButton = fullscreenContainer.querySelector('#close-button')
        const fullscreenImage = fullscreenContainer.querySelector('img')
        const fullscreenTitle = fullscreenContainer.querySelector('p')

        let touchStartX = 0
        let touchEndX = 0

        function updateFullscreenImage(newIndex) {
            fullscreenImage.src = images[newIndex].src
            fullscreenImage.alt = images[newIndex].title
            fullscreenTitle.textContent = images[newIndex].title
            index = newIndex
        }

        function handlePrevious() {
            const newIndex = (index - 1 + images.length) % images.length
            updateFullscreenImage(newIndex)
        }

        function handleNext() {
            const newIndex = (index + 1) % images.length
            updateFullscreenImage(newIndex)
        }

        prevButton.addEventListener('click', handlePrevious)
        nextButton.addEventListener('click', handleNext)

        function closeFullscreen() {
            cleanup()
            document.body.removeChild(fullscreenContainer)
        }

        closeButton.addEventListener('click', closeFullscreen)

        // Закрытие при клике на фон
        fullscreenContainer.addEventListener('click', (e) => {
            if (e.target === fullscreenContainer) {
                closeFullscreen()
            }
        })

        // Навигация с помощью клавиш
        function handleKeyDown(e) {
            switch (e.key) {
                case 'ArrowLeft':
                    handlePrevious()
                    break
                case 'ArrowRight':
                    handleNext()
                    break
                case 'Escape':
                    closeFullscreen()
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        // Обработка свайпов на мобильных устройствах
        function handleTouchStart(e) {
            touchStartX = e.changedTouches[0].screenX
        }

        function handleTouchEnd(e) {
            touchEndX = e.changedTouches[0].screenX
            handleSwipe()
        }

        function handleSwipe() {
            const swipeThreshold = 50 // минимальное расстояние для свайпа
            if (touchStartX - touchEndX > swipeThreshold) {
                handleNext() // Свайп влево
            } else if (touchEndX - touchStartX > swipeThreshold) {
                handlePrevious() // Свайп вправо
            }
        }

        fullscreenContainer.addEventListener('touchstart', handleTouchStart)
        fullscreenContainer.addEventListener('touchend', handleTouchEnd)

        // Удаление обработчиков событий при закрытии
        function cleanup() {
            document.removeEventListener('keydown', handleKeyDown)
            fullscreenContainer.removeEventListener(
                'touchstart',
                handleTouchStart
            )
            fullscreenContainer.removeEventListener('touchend', handleTouchEnd)
        }
    }
})

if (module.hot) {
    module.hot.accept()
}
