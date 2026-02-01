const accordionData = [
  {
    title: "ETHICAL SOURCING",
    content: `All Eco-Mart products are sourced from suppliers who follow ethical labor practices and environmentally 
    responsible manufacturing standards. We prioritize fair wages, safe working conditions, and minimal environmental impact.`,
  },
  {
    title: "DURABILITY",
    content: `Our products are designed for long-term use. By focusing on quality materials and strong construction, 
    we reduce the need for frequent replacements, helping you save money while minimizing waste.`,
  },
  {
    title: "ARE THE PRODUCTS RECYCLABLE?",
    content: `Yes. Most Eco-Mart products are either fully recyclable or biodegradable. Product-specific recycling 
    information is provided on each product page to help you dispose of them responsibly.`,
  },
  {
    title: "HOW TO RECYCLE ECO-MART PRODUCTS",
    content: `Recycling instructions vary by product type. We recommend cleaning the product, separating materials 
    where possible, and following your local recycling guidelines. Detailed steps are included in our packaging and website.`,
  },
  {
    title: "QUERIES ABOUT AFFORDABILITY",
    content: `Eco-friendly does not have to mean expensive. We aim to offer sustainable products at competitive prices 
    by optimizing our supply chain and reducing unnecessary packaging and costs.`,
  },
  {
    title: "HOW TO PURCHASE",
    content: `You can purchase Eco-Mart products directly through our website. Simply browse the catalog, add items to 
    your cart, and complete checkout using our secure payment system.`,
  },
  {
    title: "PAYMENT METHODS AND SHIPPING FEES",
    content: `We accept multiple payment methods including cards and digital wallets. Shipping fees depend on your 
    location and order size, and the final cost is clearly shown before checkout.`,
  },
];


const addContainer = document.querySelector(".accordion-container");

const addAccordion = () => {
  accordionData.map((data) => {
    console.log(data);
    const addElements = document.createElement("ul");
    addElements.classList.add("accordion");
    addElements.innerHTML = `

        <li>
              <label class="accordion-label" for="first">${data.title} <i id="arrow-icon" class="fa-solid fa-angle-up"></i></label>
              <div class="content">
                <p>${data.content}</p>
            
              
              </div>
              </li>
        
        `;
    addContainer.appendChild(addElements);
  });
};
addAccordion();
document.querySelectorAll(".accordion-container label").forEach((label) => {
  label.onclick = function () {
    const currentLi = this.parentElement; // store the <li> element
    const isActive = currentLi.classList.contains("active");

    // Close all <li> items
    document.querySelectorAll(".accordion-container li").forEach((li) => {
      li.classList.remove("active");
    });

    // If it was closed, open it
    if (!isActive) {
      currentLi.classList.add("active");
    }
  };
});

// Select the sidebar
const sidebar = document.querySelector(
  ".side-navbar-ul-tags-container-homepage",
);

// Function to show sidebar
function showSideBar() {
  sidebar.style.transform = "translateX(0)";
}

// Function to close sidebar
function closeSideBar() {
  sidebar.style.transform = "translateX(-100%)";
}

// Initialize sidebar as hidden
sidebar.style.transform = "translateX(-100%)";
