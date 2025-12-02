export const Templates = {
    trending(data) {
    return `
        <div class="trending__card main-dish
        main-dish--${data.title.toLowerCase().replace(/\s+/g, '-')}"
        data-dish-id="${data.id}">
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
        main-dish--${data.title.toLowerCase().replace(/\s+/g, '-')}"
        data-dish-id="${data.id}">
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
    },
    cartItem(data) {
        return `
            <div class="cart__item"
            data-cart-id="${data.id}">
                <div class="cart__image">
                    <img src="${data.img}" loading="lazy" alt="${data.title}">
                </div>
                <div class="cart__details">
                    <div class="cart__details__info">
                    <p class="cart__item__name">${data.title}</p>
                    <p class="cart__amount">
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.875244" y="2.55372" width="1.66667" height="10" rx="0.833333" transform="rotate(-45 0.875244 2.55372)" fill="#EA6A12"/>
                            <rect x="2.05371" y="9.62478" width="1.66666" height="10" rx="0.833332" transform="rotate(-135 2.05371 9.62478)" fill="#EA6A12"/>
                        </svg>
                        <span>${data.amount}</span>
                    </p>
                    </div>
                    <div class="cart__details__action">
                        <p class="delete-button">
                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.6433 7.48844C16.6433 7.55643 16.1104 14.2972 15.806 17.1341C15.6154 18.875 14.493 19.931 12.8095 19.961C11.516 19.99 10.2498 20 9.00394 20C7.68127 20 6.38778 19.99 5.13221 19.961C3.50513 19.922 2.38183 18.845 2.20094 17.1341C1.88778 14.2872 1.36454 7.55643 1.35482 7.48844C1.34509 7.28344 1.41123 7.08845 1.54544 6.93046C1.67771 6.78446 1.86833 6.69646 2.06867 6.69646H15.9392C16.1386 6.69646 16.3195 6.78446 16.4624 6.93046C16.5957 7.08845 16.6628 7.28344 16.6433 7.48844Z" fill="#E60A0A"/>
                                <path d="M18 3.97686C18 3.56588 17.6761 3.24389 17.2871 3.24389H14.3714C13.7781 3.24389 13.2627 2.8219 13.1304 2.22692L12.967 1.49795C12.7385 0.616978 11.9498 0 11.0647 0H6.93624C6.0415 0 5.26054 0.616978 5.02323 1.54595L4.87054 2.22792C4.7373 2.8219 4.22185 3.24389 3.62957 3.24389H0.713853C0.32386 3.24389 0 3.56588 0 3.97686V4.35685C0 4.75783 0.32386 5.08982 0.713853 5.08982H17.2871C17.6761 5.08982 18 4.75783 18 4.35685V3.97686Z" fill="#E60A0A"/>
                            </svg>
                        </p>
                        <p class="Cost">$${data.cost * data.amount}</p>
                    </div>
                </div>
            </div>
        `
    },
    postItem(data, firstName, lastName) {
        return `
        <div class="post__item general-column__item">
            <div class="post__header">
                <div class="post__avatar">
                    <img src="./Image/Avatars/Profile.png" alt="">
                </div>    
                <div class="post__user">
                    ${firstName} ${lastName}
                </div>
                <div class="post__time">
                    29 mins
                </div>
            </div>
            <div class="post__content">
                <div class="post__img">
                    <img src="${data.image}" alt="">
                </div>
                <div class="post__text">${data.body}</div>
            </div>
            <div class="post__interaction">
                    <div class="post__like-button svg-leveling">
                        <span class="post__like-svg">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 4.70493C0.5 2.38261 2.38261 0.5 4.70493 0.5C6.0243 0.5 7.26717 1.11925 8.06176 2.17251L9.5 4.07895L10.9382 2.17251C11.7328 1.11925 12.9757 0.5 14.2951 0.5C16.6174 0.5 18.5 2.38261 18.5 4.70493V4.91664C18.5 6.39191 17.9463 7.81345 16.9484 8.9L9.05 17.5L1.8942 8.88837C0.993227 7.8041 0.5 6.43878 0.5 5.02903V4.70493Z" stroke="#07143B"/>
                            </svg>
                        </span>
                        <span class="post__like-value">
                            Like
                        </span>
                    </div>
                    <div class="post__comments-button svg-leveling">
                        <span class="post__comments-svg">
                            <svg width="21" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 1.5C0.5 0.947715 0.947715 0.5 1.5 0.5H18.5C19.0523 0.5 19.5 0.947715 19.5 1.5V14.5C19.5 15.0523 19.0523 15.5 18.5 15.5H11.5L6.5 19.5V15.5H1.5C0.947715 15.5 0.5 15.0523 0.5 14.5V1.5Z" stroke="#07143B"/>
                            </svg>
                        </span>
                        <span class="post__comments-value">
                            140
                        </span>
                    </div>
                    <div class="post__share-button svg-leveling ">
                        <span class="post__share-svg">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="20.1362" cy="20.4151" rx="4.36376" ry="4.08498" stroke="#EA6A12"/>
                                <ellipse cx="4.36376" cy="4.08498" rx="4.36376" ry="4.08498" transform="matrix(1 0 0 -1 15.7725 8.66992)" stroke="#EA6A12"/>
                                <ellipse cx="4.86376" cy="12.2451" rx="4.36376" ry="4.08498" stroke="#EA6A12"/>
                                <line y1="-0.5" x2="8.66051" y2="-0.5" transform="matrix(0.88177 0.471679 -0.521024 0.853542 8.13715 15.3066)" stroke="#EA6A12"/>
                                <line y1="-0.5" x2="8.66051" y2="-0.5" transform="matrix(0.88177 -0.471679 -0.521024 -0.853542 8.13715 9.69141)" stroke="#EA6A12"/>
                            </svg>
                        </span>
                        <span class="post__share-value">
                            <span>99</span> 
                            Share
                        </span>
                    </div>
                    <div class="post__comment-input svg-leveling">
                        <input type="text" placeholder="Lovely!">
                    </div>
            </div>
            <div class="comments">
            </div>
        </div>
        `
    }
}