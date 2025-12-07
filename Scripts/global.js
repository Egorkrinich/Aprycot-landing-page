// Profile link
document.addEventListener('click', (e) => {
    const profile = e.target.closest('[data-profile-link]')
    if (profile) {
        e.preventDefault()
        window.location = `./profile.html?id=${profile.dataset.userId}`
    }
})
// Scroll
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.scrollTo(0, 0)
    }, 50)
});
