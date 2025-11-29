import RenderContent from "./Modules/RenderContent.js"
import Menu  from "./Modules/BurgerMenu.js"
import AccordionList from "./Modules/Accordion.js"
import RenderProfile from "./Modules/RenderProfile.js"
import RenderUserData from "./Modules/RenderUserData.js"
import Tab from "./Modules/Tabs.js"

const path = window.location.pathname

if (path.endsWith('/') || path.endsWith('/index.html')) {
    new RenderContent('trending__content', 'trending', true, 8)
    new RenderContent('dishes', 'menuCategory', false, 4)
}
if (path.endsWith('/profile.html')) {
    new Tab('profile__tab-container', 'data-tab-button', 'profile__tab-content')
    new RenderProfile(new URL(window.location.href).searchParams.get('id'))
}
new AccordionList(
    'burger__nav',
    'data-accordion-button',
    'data-accordion-content',
    'burger__button'
)
const BurgerMenus = document.querySelectorAll('[data-menu]')
.forEach((menu) => {
    new Menu(menu.dataset.menu, menu.dataset.menuOverlay === 'true')
})

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