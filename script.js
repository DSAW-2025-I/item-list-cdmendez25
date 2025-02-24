document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const confirmOrderBtn = document.getElementById("confirm-order");
    const orderModal = document.getElementById("order-modal");
    const newOrderBtn = document.getElementById("new-order");
    const orderDetails = document.getElementById("modal-order-details");
    const orderTotalElement = document.getElementById("modal-order-total");

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
            const productImage = productElement.querySelector("img").src;
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1, image: productImage });
            }
            updateCart();
        }
    });

    confirmOrderBtn.addEventListener("click", () => {
        orderDetails.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const orderItem = document.createElement("div");
            orderItem.classList.add("modal__order-item");
            orderItem.innerHTML = `
                <div class="modal__order-item-content" style="display: flex; align-items: center; gap: 10px;">
                    <img src="${item.image}" alt="${item.name}" class="modal__order-image" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">
                    <div style="display: grid; grid-template-columns: auto auto; gap: 5px; align-items: center;">
                        <p class="modal__order-name" style="font-weight: bold;">${item.name}</p>
                        <p class="modal__order-quantity">Qty: ${item.quantity}</p>
                        <p class="modal__order-price">Unit: $${item.price.toFixed(2)}</p>
                        <p class="modal__order-total-item" style="font-weight: bold;">Total: $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
            `;
            orderDetails.appendChild(orderItem);
        });
        
        orderTotalElement.innerHTML = `<strong>Order Total:</strong> $${total.toFixed(2)}`;
        orderModal.classList.add("visible");
    });

    newOrderBtn.addEventListener("click", () => {
        cart = [];
        updateCart();
        orderModal.classList.remove("visible");
        orderDetails.innerHTML = "";
        orderTotalElement.innerHTML = "";
    });

    updateCart();
});
