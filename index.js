const menu = document.getElementById('menu')
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById('cart-modal')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressBtn = document.getElementById('address')
const clinteBtn = document.getElementById('clinte')
const addressWarn = document.getElementById('address-warn')
const spanItem = document.getElementById("date-span")

// Abrir o modal de carrinho 

cartBtn.addEventListener("click", () => {
    upDateCart()
    cartModal.style.display = 'flex'

})

cartModal.addEventListener('click', (event) => {
    if (event.target === cartModal || event.target === closeModalBtn) {
        cartModal.style.display = 'none'
    }
})

menu.addEventListener("click", (event) => {

    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addCart(name, price)


    }

})

const cart = []

const addCart = (name, price) => {
    const existeItem = cart.find(item => item.name === name)

    if (existeItem) {
        existeItem.quantity++
    } else {

        cart.push({
            name,
            price,
            quantity: 1
        })
    }


    upDateCart()
}


const upDateCart = () => {
    cartItemsContainer.innerHTML = ""
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        cartItemElement.innerHTML = `
        
       <div class="flex items-center justify-between">
             <div>
                    <p class="font-medium">${item.name}</p>
                      <p>Qtd:${item.quantity}</p>
                     <p class="font=medium mt-2 ">${item.price.toFixed(2)}</p>
        
             </div>
        
             <button class="remove-btn" data-name="${item.name}">
               Remover
                 </button>
        
        
       
       </div>
      `

        total += item.price * item.quantity
        cartItemsContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCounter.innerText = cart.length


}

cartItemsContainer.addEventListener("click", (event) => {

    if (event.target.classList.contains("remove-btn")) {

        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
    }
})

const removeItemCart = (name) => {
    const index = cart.findIndex(item => item.name === name)
    if (index !== -1) {
        const item = cart[index]
        if (item.quantity > 1) {
            item.quantity -= 1
            upDateCart()
            return
        }
        cart.splice(index, 1)
        upDateCart()
    }
}


addressBtn.addEventListener("input", (event) => {

    let inputValue = event.target.value

    if (inputValue !== "") {
        addressBtn.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

clinteBtn.addEventListener("input", (event) => {

    let inputValue = event.target.value

    if (inputValue !== "") {
        addressBtn.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})
checkoutBtn.addEventListener("click", () => {

    const isOpen = checkRestaurantIsOpen()

    if(!isOpen){
        Toastify({

            text: "Restaurante Fechado No Momento",
            
            duration: 3000
            
            }).showToast();
    } 
    if (cart.length === 0) return
    if (addressBtn.value === "") {
        addressWarn.classList.remove("hidden")
        addressBtn.classList.add("border-red-500")
        return
    }

    const cartItems = cart.map((item)=>{
        return(
            `   
            ${item.name}
            Quantidade: ${item.quantity}
            Valor:RS$ ${item.price}|
            `
        )
    }).join("")
    
    const message = encodeURIComponent(cartItems)
    const phone = "11946918479"

    window.open(`http://wa.me/${phone}?text=${message} Endereço:${addressBtn.value} Nome:${clinteBtn.value}`,"_blank")
})


const checkRestaurantIsOpen = () => {
    const data = new Date()
    const hora = data.getHours()
    return hora < 18 && hora < 22
}

const isOpen = checkRestaurantIsOpen()

if (isOpen) {
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
} else {
    spanItem.classList.add("bg-red-500")
    spanItem.classList.remove("bg-green-600")
}


