export function initHeader() {
    const burgerMenu = document.getElementById('burger-menu')
    const mobileMenu = document.getElementById('mobile-menu')

    if (burgerMenu && mobileMenu) {
        burgerMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden')
        })
    }
}
