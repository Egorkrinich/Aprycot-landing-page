export function trendingTemplate(data) {
    return 
    `
    <div class="trending__card main-">
        <p class="trending__label">👑 ${data.label}</p>
        <h3 class="trending__title">${data.title}</h3>
        <ul class="trending__detail">
            <li>${data.calories} Calories</li>
            <li class="line"></li>
            <li>${data.persons} persons</li>
        </ul>
        <p class="trending__cost">$${data.cost}</p>
        <button class="add__button">+</button>
        <div class="trending__image">
            <img src="${data.img}" loading="lazy" alt="${data.title}">
        </div>
    </div>
    `
}