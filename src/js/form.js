import IMask from 'imask'
import emailjs from 'emailjs-com'

export function initForm() {
    document.addEventListener('DOMContentLoaded', function () {
        const phoneInput = document.getElementById('phone')
        const maskOptions = {
            mask: '+{7}(000)000-00-00',
            lazy: false,
        }
        const mask = IMask(phoneInput, maskOptions)

        phoneInput.addEventListener('input', function () {
            if (this.value.startsWith('8')) {
                this.value = '+7' + this.value.slice(1)
                mask.updateValue()
            }
        })

        const form = document.getElementById('contactForm')
        form.addEventListener('submit', function (e) {
            e.preventDefault()

            const phone = phoneInput.value.replace(/\D/g, '') // Получаем только цифры из номера телефона

            if (phone.length !== 11) {
                alert('Пожалуйста, введите корректный номер телефона')
                return
            }

            emailjs
                .sendForm(
                    'service_rnp5rzo',
                    'template_znw1zvo',
                    this,
                    'QlnHU5eUYzTWAA9kN'
                )
                .then(
                    (result) => {
                        alert('Ваша заявка успешно отправлена!')
                        form.reset()
                    },
                    (error) => {
                        alert(
                            'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.'
                        )
                    }
                )
        })
    })
}
