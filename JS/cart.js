// Lightweight cart API (ES module)
const CART_KEY = "ecomart_cart_v1";

export function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function parsePrice(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const n = String(value).replace(/[^0-9.]/g, "");
  return Number(n) || 0;
}

export function addToCart(product) {
  // product: { id, title/name, price, img, sub? }
  if (!product || !product.id) {
    console.warn("addToCart: invalid product", product);
    return;
  }

  const cart = loadCart();
  const existing = cart.find((i) => i.id === product.id);

  const price = parsePrice(
    product.price ?? product.newPrice ?? product.oldPrice ?? 0,
  );

  if (existing) {
    existing.qty = (existing.qty || 0) + 1;
  } else {
    const item = {
      id: product.id,
      name: product.title || product.name || "Product",
      sub: product.sub || product.subtitle || "",
      price: price,
      img: product.img || product.image || product.productImage || "",
      qty: 1,
    };
    cart.push(item);
  }

  saveCart(cart);
  // return current cart for caller convenience
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function formatRs(n) {
  return "Rs." + Number(n).toFixed(2);
}
