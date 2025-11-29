export const Templates = {
    trending(data) {
    return `
        <div class="trending__card main-dish
        main-dish--${data.title.toLowerCase().replace(/\s+/g, '-')}">
            <p class="trending__label">👑 ${data.label}</p>
            <h3 class="trending__title">${data.title}</h3>
            <ul class="trending__detail">
                <li class="trending__calories">${data.calories} Calories</li>
                <li class="line"></li>
                <li class="trending__persons">${data.persons} persons</li>
            </ul>
            <p class="main-cost">$${data.cost}</p>
            <button class="main-add-button">+</button>
            <div class="trending__image main-dish__image">
                <img src="${data.img}" loading="lazy" alt="${data.title}">
            </div>
        </div>
    `
    },
    menuCategory(data) {
        return `
        <div class="dishes__card main-dish
        main-dish--${data.title.toLowerCase().replace(/\s+/g, '-')}">
            <div class="dishes__image main-dish__image">
                <img src="${data.img}" loading="lazy" alt="${data.title}">
            </div>
            <div class="dishes__info">
                <h4 dishes__title>${data.title}</h4>
                <div class="dishes__rating">                              
                    <i class="fa-solid fa-star checked"></i>
                    <i class="fa-solid fa-star checked"></i>
                    <i class="fa-solid fa-star checked"></i>
                    <i class="fa-solid fa-star checked"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <p class="main-cost">$${data.cost}</p>
                <button class="main-add-button">+</button>
            </div>
        </div>        
        `
    }
}