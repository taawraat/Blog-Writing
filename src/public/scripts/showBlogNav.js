const burger = document.querySelector('.burger')
const nav = document.querySelector('.blog-nav')

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active')
    burger.classList.toggle('toggle')
})