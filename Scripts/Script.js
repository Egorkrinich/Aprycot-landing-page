const burgerButtons = document.querySelectorAll('.Burger__button')

burgerButtons.forEach((button) => {
    button.addEventListener('click', ()=> {
        const activeBtn = document.querySelector('.Burger__button.active')

        if (activeBtn && activeBtn !== button) {
            activeBtn.classList.remove('active')
        }
        button.classList.toggle('active')
    })
})

    // Accordion
const accordionButtons = document.querySelectorAll('.Accordion__button')

accordionButtons.forEach((el) => {
    el.addEventListener('click', () => {
        const content = el.nextElementSibling
        
        if (content.style.maxHeight) {
            document.querySelectorAll('.Accordion__content').forEach((el) => {
                el.style.maxHeight = null
            })
        } else {
             document.querySelectorAll('.Accordion__content').forEach((el) => {
                el.style.maxHeight = null
            })
            content.style.maxHeight = content.scrollHeight + 'px'
            
        }      
    })
})
    // Menus
const buttons = document.querySelectorAll('[data-button]')

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const clickTarget = btn.dataset.button

        const menus = document.querySelectorAll(`[data-menu="${clickTarget}"]`)
        const overlays = document.querySelectorAll(`[data-overlay="${clickTarget}"]`)

        menus.forEach(menu => menu.classList.toggle('active'))
        overlays.forEach(overlay => overlay.classList.toggle('active'))
    })
})

document.addEventListener('click', (e) => {
  const activeMenus = document.querySelectorAll('[data-menu].active')

  activeMenus.forEach(menu => {
    const target = menu.dataset.menu
    const button = document.querySelector(`[data-button="${target}"]`)
    const overlay = document.querySelector(`[data-overlay="${target}"]`)

    if (!menu.contains(e.target) &&
        !button.contains(e.target)
        ) 
        {
      menu.classList.remove('active')
      overlay.classList.remove('active')
    }
  })
})

