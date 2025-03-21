// Функция для отображения всплывающего уведомления о персональных данных и куки
export function initCookieConsent() {
    document.addEventListener('DOMContentLoaded', function () {
        // Проверяем, было ли уже показано уведомление и принято пользователем
        if (!localStorage.getItem('policyAccepted')) {
            // Создаем элемент уведомления
            const consentBanner = document.createElement('div')
            consentBanner.className =
                'policy-banner fixed bottom-0 left-0 w-full bg-blue-600 text-white p-4 shadow-lg z-50'
            consentBanner.innerHTML = `
                <div class="container mx-auto px-2 sm:px-4 flex flex-col items-center justify-between">
                    <div class="mb-4 text-center">
                        <p class="mb-2 text-sm sm:text-base">
                            Продолжая использовать наш сайт, вы даете согласие на обработку данных в соответствии с нашими юридическими документами
                        </p>
                    </div>
                    <div class="flex space-x-2 mb-2">
                        <a href="/juridical-info.html" class="text-white underline text-xs sm:text-sm">Подробнее</a>
                        <button id="acceptPolicy" class="bg-white text-blue-600 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded">Принять</button>
                        <button id="declinePolicy" class="border border-white text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded">Отклонить</button>
                    </div>
                </div>
            `

            // Добавляем на страницу
            document.body.appendChild(consentBanner)

            // Обработчики событий для кнопок
            document
                .getElementById('acceptPolicy')
                .addEventListener('click', function () {
                    localStorage.setItem('policyAccepted', 'true')
                    consentBanner.remove()
                })

            document
                .getElementById('declinePolicy')
                .addEventListener('click', function () {
                    alert(
                        'Для использования сайта необходимо принять правовую информацию и дать согласие на обработку данных.'
                    )
                })
        }
    })
}
