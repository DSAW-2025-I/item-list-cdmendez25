document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const confirmOrderBtn = document.getElementById("confirm-order");
    const orderModal = document.getElementById("order-modal");
    const newOrderBtn = document.getElementById("new-order");

    let cart = [];

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        let count = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <div>
                    <button class="cart-item__decrease" data-id="${item.id}">-</button>
                    <button class="cart-item__increase" data-id="${item.id}">+</button>
                    <button class="cart-item__remove" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = count;
    }

    productList.addEventListener("click", event => {
        if (event.target.classList.contains("product__button")) {
            const productElement = event.target.closest(".product");
            const productId = parseInt(productElement.dataset.id);
            const productName = productElement.querySelector(".product__name").textContent;
            const productPrice = parseFloat(productElement.dataset.price);
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
        }
    });

    cartItems.addEventListener("click", event => {
        const productId = parseInt(event.target.dataset.id);
        const cartItem = cart.find(item => item.id === productId);

        if (event.target.classList.contains("cart-item__increase")) {
            cartItem.quantity++;
        } else if (event.target.classList.contains("cart-item__decrease")) {
            cartItem.quantity--;
            if (cartItem.quantity === 0) {
                cart = cart.filter(item => item.id !== productId);
            }
        } else if (event.target.classList.contains("cart-item__remove")) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCart();
    });

    confirmOrderBtn.addEventListener("click", () => {
        orderModal.classList.add("visible");
    });

    newOrderBtn.addEventListener("click", () => {
        cart = [];
        updateCart();
        orderModal.classList.remove("visible");
    });

    updateCart();
});