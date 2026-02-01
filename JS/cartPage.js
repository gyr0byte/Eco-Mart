import { loadCart, saveCart, formatRs } from "./cart.js";

const cartItemsContainer = document.querySelector(".cart-items");
const recAddBtn = document.querySelector(".rec-add");
const backBtn = document.querySelector(".back");
const cancelBtn = document.querySelector(".cancel");
const checkoutBtn = document.querySelector(".checkout");

function renderCart() {
  const cart = loadCart();
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.dataset.index = idx;
    div.innerHTML = `
      <img src="${item.img}" alt="" />
      <div class="details">
        <p class="name">${item.name}</p>
        <p class="sub">${item.sub}</p>
      </div>
      <div class="qty">
        <button class="qty-decrease" data-index="${idx}">-</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-increase" data-index="${idx}">+</button>
      </div>
      <p class="price">${formatRs(item.price)}</p>
      <button class="remove" data-index="${idx}" title="Remove">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  updateSummary();
}

function updateSummary() {
  const cart = loadCart();
  const subtotal = cart.reduce(
    (s, item) => s + (Number(item.price) || 0) * (Number(item.qty) || 0),
    0,
  );
  const taxRate = 0.13; // 13%
  const tax = subtotal * taxRate;
  const shipping = subtotal > 0 ? 50 : 0; // flat shipping
  const total = subtotal + tax + shipping;

  const subtotalEl = document.querySelector(".subtotal");
  const taxEl = document.querySelector(".tax");
  const shippingEl = document.querySelector(".shipping");
  const totalEl = document.querySelector(".total-amount");

  if (subtotalEl) subtotalEl.innerText = formatRs(subtotal);
  if (taxEl) taxEl.innerText = formatRs(tax);
  if (shippingEl) shippingEl.innerText = formatRs(shipping);
  if (totalEl) totalEl.innerText = formatRs(total);
}

// Delegated click handlers for cart actions
if (cartItemsContainer) {
  cartItemsContainer.addEventListener("click", (e) => {
    const idx = e.target.dataset.index;
    if (e.target.classList.contains("qty-increase")) {
      const cart = loadCart();
      cart[idx].qty += 1;
      saveCart(cart);
      renderCart();
    }

    if (e.target.classList.contains("qty-decrease")) {
      const cart = loadCart();
      if (cart[idx].qty > 1) cart[idx].qty -= 1;
      else cart.splice(idx, 1);
      saveCart(cart);
      renderCart();
    }

    if (e.target.classList.contains("remove")) {
      const cart = loadCart();
      cart.splice(idx, 1);
      saveCart(cart);
      renderCart();
    }
  });
}

// Cancel button resets quantities / empties cart
if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    if (confirm("Cancel order and clear cart?")) {
      saveCart([]);
      renderCart();
    }
  });
}

// Back button goes to previous page
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}

// Simple checkout handler
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = loadCart();
    if (cart.length === 0) return alert("Your cart is empty.");
    // For now, simulate checkout
    alert(
      "Proceeding to checkout. Total: " +
        (document.querySelector(".total-amount")
          ? document.querySelector(".total-amount").innerText
          : "Rs.0"),
    );
    // Optionally clear cart after checkout
    // saveCart([]); renderCart();
  });
}

// initial render
renderCart();

// payment icons selection (visual only)
document.querySelectorAll(".payments img").forEach((img) => {
  img.addEventListener("click", () => {
    document
      .querySelectorAll(".payments img")
      .forEach((i) => i.classList.remove("selected"));
    img.classList.add("selected");
  });
});
