import RenderContent from "./Modules/RenderContent.js"
import Menu  from "./Modules/BurgerMenu.js"
import AccordionList from "./Modules/Accordion.js"
import RenderProfile from "./Modules/RenderProfile.js"
import RenderUserData from "./Modules/RenderUserData.js"
import Tab from "./Modules/Tabs.js"
import Cart from "./Modules/Cart.js"
import RenderPosts from "./Modules/RenderPosts.js"

const path = window.location.pathname

if (path.endsWith('/') || path.endsWith('/index.html')) {
    new RenderContent('trending__content', 'trending', true, 8)
    new RenderContent('dishes', 'menuCategory', false, 4)
}
if (path.endsWith('/profile.html')) {
    const profileId = new URL(window.location.href).searchParams.get('id')
    fetch('/Data/users.json')
    .then((res) => res.json())
    .then((json) => {
        const data1 = JSON.parse(localStorage.getItem('userData'))
        const data2 = 
        json.find(({id}) => id === profileId) ||
        json.find(({id}) => id === 'demo')
        const userData = {...data1, ...data2}

        new RenderProfile(userData)
        new RenderPosts(
            'posts__container',
            'posts__sentinel',
            profileId,
            userData.firstName,
            userData.lastName
        )
    })
    new Tab('profile__tab-container', 'data-tab-button', 'profile__tab-content')
}
// Burger Accordion
new AccordionList(
    'burger__nav',
    'data-accordion-button',
    'data-accordion-content',
    'burger__button'
)
// Burger Menus
const BurgerMenus = document.querySelectorAll('[data-menu]')
.forEach((menu) => {
    new Menu(menu.dataset.menu, menu.dataset.menuOverlay === 'true')
})
// Profile load
const profiles = document.querySelectorAll('[data-profile-container]')
profiles.forEach((profile) => {
    profile.addEventListener('click', (e) => {
        e.preventDefault()
        window.location = `./profile.html?id=${e.currentTarget.dataset.userId}`
    })
})
// Is user register
document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('userData')
    if (userData) {
        new RenderUserData(userData,'data-userName', 'data-profile-container')
    } else {
        window.location = 'register.html'
    }
})
new Cart('cart__container', 'main-add-button', 'delete-button', 'cart__checkout')
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.scrollTo(0, 0)
    }, 50)
});