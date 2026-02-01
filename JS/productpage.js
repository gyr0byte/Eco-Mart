import { productCardData } from "./productData.js";
import { addToCart } from "./cart.js";

window.showSideBar = () => {
  const sidebar = document.querySelector(".side-navbar-ul-tags-container");
  const filterPanel = document.querySelector(".vertical");
  const overlay = document.querySelector(".overlay");

  if (filterPanel && filterPanel.classList.contains("active")) {
    filterPanel.classList.remove("active");
  }
  sidebar.style.transform = "translateX(0)";
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeSideBar = () => {
  const sidebar = document.querySelector(".side-navbar-ul-tags-container");
  const overlay = document.querySelector(".overlay");
  sidebar.style.transform = "translateX(100%)";
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
};

window.showFilterPannel = () => {
  const filterPanel = document.querySelector(".vertical");
  if (!filterPanel) return;

  const overlay = document.querySelector(".overlay");
  const sidebar = document.querySelector(".side-navbar-ul-tags-container");

  if (sidebar.style.transform === "translateX(0px)") {
    sidebar.style.transform = "translateX(100%)";
  }

  filterPanel.classList.toggle("active");

  if (filterPanel.classList.contains("active")) {
    if (overlay) overlay.classList.add("active");
  } else {
    if (overlay) overlay.classList.remove("active");
  }
};

window.closeFilterPanel = () => {
  const filterPanel = document.querySelector(".vertical");
  const overlay = document.querySelector(".overlay");
  if (filterPanel) filterPanel.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
};

/* ===========================
   NAVBAR SCROLL EFFECT (works on all pages)
=========================== */
window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar-container")
    ?.classList.toggle("scrolled-window", window.scrollY > 50);
});

/* ===========================
   PRODUCT PAGE ONLY CODE
=========================== */
// Only run if we're on the product page
if (document.querySelector(".product-card-container")) {
  import("./productData.js").then(({ productCardData }) => {
    /* ===========================
       DOM REFERENCES
    =========================== */
    const productGrid = document.querySelector(".product-card-container");
    const searchInput = document.querySelector(".search-bar-container input");
    const priceSlider = document.querySelector(".price-slider");
    const priceLabel = document.querySelector(".current-price");
    const clearFiltersButton = document.querySelector(".clear-filters");
    const quickViewModal = document.querySelector(".quick-view-container");

    let minimumRating = 0;
    let ratingMax = Infinity;

    /* ===========================
       HELPERS
    =========================== */
    function parsePrice(value) {
      if (typeof value === "number") return value;
      if (!value) return 0;
      return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
    }

    /* ===========================
       PRODUCT CARD
    =========================== */
    function buildProductCard(product, index) {
      const cardWrapper = document.createElement("div");
      cardWrapper.className = "card-wrapper";

      const imageSrc =
        Array.isArray(product.images) && product.images.length
          ? product.images[0]
          : product.productImage;

      cardWrapper.innerHTML = `
        <div class="card">
          <div class="card-info">
            <div class="product-image">
              <img src="${imageSrc}" alt="${product.title}">
             
              <div onclick="location.href='/HTML/view-product-page.html';" class="quick-view-link-mobile"><span>View product</span></div>
              <div class="quick-view-link"><span>Quick view</span></div>
            </div>

            <div class="product-info-container">
              <h1>${product.title}</h1>
              <div class="rating">
                ${"★".repeat(Math.round(product.rating || 0))}
                <span>${product.rating || ""}</span>
              </div>
              <p class="new-price">
                <span class="old-price">${product.oldPrice || ""}</span>
                ${product.newPrice || ""}
              </p>
              <p class="natural-wood">${product.desc1 || ""}</p>
              <button class="add-to-cart-btn">ADD TO CART</button>
            </div>
          </div>
        </div>
      `;

      cardWrapper
        .querySelector(".quick-view-link")
        .addEventListener("click", () => openQuickView(product));

      // Attach add-to-cart handler
      const addBtn = cardWrapper.querySelector(".add-to-cart-btn");
      if (addBtn) {
        addBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const id =
            product.id ||
            product.slug ||
            product.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
            Date.now().toString();
          addToCart({
            id,
            title: product.title,
            price: product.newPrice || product.price || product.oldPrice,
            img: imageSrc,
          });
          // optional: provide small visual feedback
          addBtn.textContent = "ADDED";
          setTimeout(() => (addBtn.textContent = "ADD TO CART"), 900);
        });
      }

      return cardWrapper;
    }

    function renderProducts(list) {
      productGrid.innerHTML = "";

      if (!list.length) {
        productGrid.innerHTML = '<p class="no-results">No products found.</p>';
        return;
      }

      list.forEach((product, i) =>
        productGrid.appendChild(buildProductCard(product, i)),
      );
    }

    /* ===========================
       FILTER STATE
    =========================== */
    function getSelectedFilters() {
      const filters = {
        categories: [],
        materials: [],
        maxPrice: Number(priceSlider?.value) || Infinity,
        searchText: searchInput?.value.toLowerCase().trim() || "",
        minRating: minimumRating,
        maxRating: ratingMax,
      };

      document
        .querySelectorAll('.filter-content input[type="checkbox"]')
        .forEach((checkbox) => {
          if (!checkbox.checked) return;

          const labelText = checkbox.parentElement.textContent.trim();
          const sectionTitle =
            checkbox.closest(".filter-section")?.querySelector(".filter-toggle")
              ?.textContent || "";

          if (/category/i.test(sectionTitle))
            filters.categories.push(labelText);
          else if (/material/i.test(sectionTitle))
            filters.materials.push(labelText);
        });

      return filters;
    }

    /* ===========================
       FILTER LOGIC
    =========================== */
    function applyFilters() {
      const filters = getSelectedFilters();

      const filteredProducts = productCardData.filter((product) => {
        const price =
          parsePrice(product.price) ||
          parsePrice(product.newPrice) ||
          parsePrice(product.oldPrice);

        if (price > filters.maxPrice) return false;

        if (
          filters.categories.length &&
          !filters.categories.some(
            (c) => product.category?.toLowerCase() === c.toLowerCase().trim(),
          )
        )
          return false;

        if (
          filters.materials.length &&
          !filters.materials.some((m) =>
            product.material?.toLowerCase().includes(m.toLowerCase()),
          )
        )
          return false;

        if (filters.minRating) {
          const r = Number(product.rating) || 0;
          if (r < Number(filters.minRating)) return false;
          if (
            filters.maxRating !== undefined &&
            filters.maxRating !== Infinity &&
            r >= Number(filters.maxRating)
          )
            return false;
        }

        if (filters.searchText) {
          const text =
            `${product.title} ${product.desc1 || ""} ${product.desc2 || ""}`.toLowerCase();
          if (!text.includes(filters.searchText)) return false;
        }

        return true;
      });

      renderProducts(filteredProducts);
    }

    /* ===========================
       PRICE SLIDER SETUP
    =========================== */
    if (priceSlider && priceLabel) {
      const prices = productCardData.map((p) =>
        parsePrice(p.price || p.newPrice || p.oldPrice),
      );

      priceSlider.min = Math.min(...prices);
      priceSlider.max = Math.max(...prices);
      priceSlider.value ||= priceSlider.max;

      priceLabel.textContent = `Rs ${priceSlider.value}`;

      priceSlider.addEventListener("input", () => {
        priceLabel.textContent = `Rs ${priceSlider.value}`;
        applyFilters();
      });
    }

    /* ===========================
       EVENT LISTENERS
    =========================== */
    searchInput?.addEventListener("input", applyFilters);

    document
      .querySelectorAll('.filter-content input[type="checkbox"]')
      .forEach((cb) => cb.addEventListener("change", applyFilters));

    // Clear filters
    if (clearFiltersButton) {
      clearFiltersButton.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(
          '.filter-content input[type="checkbox"]',
        );
        checkboxes.forEach((cb) => {
          cb.checked = false;
          cb.dispatchEvent(new Event("change", { bubbles: true }));
        });

        if (searchInput) {
          searchInput.value = "";
          searchInput.dispatchEvent(new Event("input", { bubbles: true }));
        }

        if (priceSlider) {
          if (!priceSlider.max || priceSlider.max === "") {
            const prices = Array.from(productCardData, (p) =>
              parsePrice(p.price || p.newPrice || p.oldPrice),
            );
            priceSlider.max = Math.max(...prices);
          }
          priceSlider.value = priceSlider.max;
          priceSlider.dispatchEvent(new Event("input", { bubbles: true }));
        }

        minimumRating = 0;
        ratingMax = Infinity;
        document
          .querySelectorAll(".filter-content.stars .rating-btn")
          .forEach((l) => l.classList.remove("active-star"));

        if (priceSlider && priceLabel) {
          const prices = Array.from(productCardData, (p) =>
            parsePrice(p.price || p.newPrice || p.oldPrice),
          );
          priceSlider.min = Math.min(...prices);
          priceSlider.max = Math.max(...prices);
          priceSlider.value = priceSlider.max;
          priceLabel.textContent = `Rs ${priceSlider.value}`;
        }

        renderProducts(productCardData);
      });
    }

    // Rating filters
    function initRatingFilters() {
      const ratingBtns = document.querySelectorAll(
        ".filter-content.stars .rating-btn",
      );
      ratingBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const r = Number(btn.getAttribute("data-rating")) || 0;
          if (minimumRating === r) {
            minimumRating = 0;
            ratingMax = Infinity;
          } else {
            minimumRating = r;
            ratingMax = r === 5 ? Infinity : r + 1;
          }

          ratingBtns.forEach((b) => b.classList.remove("active-star"));
          if (minimumRating) {
            btn.classList.add("active-star");
          }

          applyFilters();
        });
      });
    }

    initRatingFilters();

    /* ===========================
       QUICK VIEW
    =========================== */
    function openQuickView(product) {
      document.querySelector(".quick-view-title").textContent = product.title;
      document.querySelector(".quick-view-price").textContent =
        product.newPrice;

      const image =
        Array.isArray(product.images) && product.images.length
          ? product.images[0]
          : product.productImage;

      document.querySelector(".quick-view-image").src = image || "";
      quickViewModal.classList.add("active");
      localStorage.setItem("selectedProduct", JSON.stringify(product));
    }

    document
      .querySelector(".cross-icon")
      ?.addEventListener("click", () =>
        quickViewModal.classList.remove("active"),
      );

    // quick-view add to cart button
    const quickViewAddBtn = document.querySelector(".quick-view-btn button");
    if (quickViewAddBtn) {
      quickViewAddBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const prod = JSON.parse(
          localStorage.getItem("selectedProduct") || "null",
        );
        if (prod) {
          const id =
            prod.id ||
            prod.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
            Date.now().toString();
          const image =
            Array.isArray(prod.images) && prod.images.length
              ? prod.images[0]
              : prod.productImage || prod.image || "";
          addToCart({
            id,
            title: prod.title,
            price: prod.newPrice || prod.price || prod.oldPrice,
            img: image,
          });
          quickViewModal.classList.remove("active");
          alert("Added to cart");
        }
      });
    }

    // Initial render
    applyFilters();
  });
}
