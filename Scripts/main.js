import RenderContent from "./Modules/RenderContent.js"
import Menu  from "./Modules/BurgerMenu.js"
import Accordion from "./Modules/Accordion.js"
import RenderProfile from "./Modules/RenderProfile.js"
import RenderCurrentUser from "./Modules/RenderCurrentUser.js"
import Tab from "./Modules/Tabs.js"
import Cart from "./Modules/Cart.js"
import RenderPosts from "./Modules/RenderPosts.js"
import RenderComments from "./Modules/RenderComment.js"

const path = window.location.pathname

if (path.endsWith('/') || path.endsWith('/index.html')) {
    new RenderContent('trending__content', 'trending', true, 8)
    new RenderContent('dishes', 'menuCategory', false, 4)
}
if (path.endsWith('/profile.html')) {
    // Profile Data
    const profileId = new URL(window.location.href).searchParams.get('id')
    fetch('./Data/Users.json')
    .then((res) => res.json())
    .then((json) => {
        let userData = null

        const data1 = json.find(({id}) => id === Number(profileId))

        if (data1.id === 1) {
            const data2 = JSON.parse(localStorage.getItem('userData'))
            userData = {...data1, ...data2}
        } else {
            userData = data1
        }
        new RenderProfile(userData)
        new RenderPosts(
            'posts__container',
            'posts__sentinel',
            userData.id,
            userData.avatar,
            userData.firstName,
            userData.lastName
        )
    })
    // Render Comments
    new RenderComments('column-2')
    // Tabs
    new Tab('profile__tab-container', 'data-tab-button', 'profile__tab-content')
}
// Is user register
document.addEventListener('DOMContentLoaded', () => {
    fetch('./Data/Users.json')
    .then((res) => res.json())
    .then((json) => {
        const data1 = JSON.parse(localStorage.getItem('userData'))
        if (data1) {
            const data2 = 
            json.find(({id}) => id === data1.userId)
            const userData = {...data1, ...data2}
            new RenderCurrentUser(userData)
        } else {
            window.location = 'register.html'
        }
    })
})
// Cart
new Cart('cart__container', 'main-add-button', 'delete-button', 'cart__checkout')
// Burger Menus
const BurgerMenus = document.querySelectorAll('[data-menu]')
.forEach((menu) => {
    new Menu(menu.dataset.menu, menu.dataset.menuOverlay === 'true')
})
// Burger Accordion
new Accordion(
    'burger__nav',
    'data-accordion-button',
    'data-accordion-content',
    'burger__button'
)