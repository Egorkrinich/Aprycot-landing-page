import {Templates} from "./Templates.js"

export default class Cart {
    constructor(container, addButton, delButton, checkout) {
        this.container = document.querySelector(`.${container}`)
        this.checkout = document.querySelector(`.${checkout}`)

        this.addButton = addButton
        this.delButton = delButton

        this.DishesData = null
        this.orderData = null

        this.renderCart()
        this.initListeners()
    }
    async renderCart() {
        const dishData = await this.getData()
        if (dishData) {
            this.container.innerHTML = dishData
            .map((data) => Templates.cartItem(data)).join('')
        }
    }
    async getData() {
        try {
            if (!this.DishesData) {
            const res = await fetch('/Data/Dishes.json')
            if (!res.ok) throw new Error('failed to load cart')
            this.DishesData = await res.json()
            }
        } catch (rej) {
            console.error(rej)
        }
        const cartData = this.getCartList()
        let dishArray = []
        
        cartData.forEach(({id, amount}) => {
            const dishData = this.DishesData
            .find((data) => data.id === Number(id))
            if (!dishData) return
            
            dishArray.push({...dishData, amount})
        })
        this.orderData = dishArray
        return dishArray;
    }
    getCartList() {
        return JSON.parse(localStorage.getItem('cartList')) || []
    }
    saveCartList(list) {
        localStorage.setItem('cartList', JSON.stringify(list))
    }
    deleteCartItem(deleteId) {
        const cartList = this.getCartList()
        const order = cartList.find(({id}) => id === deleteId)
        if (order) {
            order.amount--
        }
        if (!order?.amount) {
            const index = cartList.findIndex(({id}) => id === deleteId)
            cartList.splice(index, 1)
        }

        this.saveCartList(cartList)
        document.dispatchEvent(new CustomEvent('cart-updated'))
    }
    addDish(id) {
        let cartList = this.getCartList()
        const order = cartList.find((order) => order.id === id)
        if (order) {
            order.amount++
        } else {
            const cartItem = {
            id: id,
            amount: 1
            }
            cartList.push(cartItem)
        }

        this.saveCartList(cartList)
    }
    initListeners() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest(`.${this.addButton}`)
            if (btn) {
                this.addDish(btn.closest('[data-dish-id]').dataset.dishId)
            }
        })
        document.addEventListener('cart-updated', () => this.renderCart())
        this.container.addEventListener('click', (e) => {
            const btn = e.target.closest(`.${this.delButton}`)
            if (btn) {
                this.deleteCartItem(
                    btn.closest('[data-cart-id]').dataset.cartId
                )
            }
        })
        // this.checkout.addEventListener('click', () => {
        // })
    }
}
