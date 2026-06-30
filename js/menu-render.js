// Renders the menu as clickable category tabs.
// Only the active category's items are shown at a time —
// clicking a tab swaps which category is visible.

let activeCategory = null; // tracks which category tab is currently selected

function renderTabs() {
  const tabContainer = document.getElementById("menu-tabs");
  tabContainer.innerHTML = ""; // clear before rebuilding, so we don't duplicate tabs on re-render

  menu.forEach(categoryBlock => {
    const tab = document.createElement("button");
    tab.className = "menu-tab";
    tab.textContent = categoryBlock.category;

    if (categoryBlock.category === activeCategory) {
      tab.classList.add("menu-tab-active");
    }

    tab.addEventListener("click", () => {
      activeCategory = categoryBlock.category;
      renderTabs();   // re-render tabs so the clicked one shows as active
      renderItems();  // re-render items to show only this category
    });

    tabContainer.appendChild(tab);
  });
}

function renderItems() {
  const container = document.getElementById("menu-container");
  container.innerHTML = ""; // clear previous category's items

  const categoryBlock = menu.find(block => block.category === activeCategory);
  if (!categoryBlock) return;

  const list = document.createElement("div");
  list.className = "menu-list";

  categoryBlock.items.forEach(item => {
    const row = document.createElement("div");
    row.className = "menu-item reveal";

    row.innerHTML = `
      <div class="menu-item-top">
        <span class="menu-item-name">${item.name}</span>
        <span class="menu-item-price">$${item.price.toFixed(2)}</span>
      </div>
      <p class="menu-item-desc">${item.description}</p>
      <div class="menu-item-spec">
        <span><b>Origin</b>${item.origin}</span>
        <span><b>Process</b>${item.process}</span>
        <span><b>Notes</b>${item.notes}</span>
      </div>
    `;

    list.appendChild(row);
  });

  container.appendChild(list);

  // trigger reveal animation on the newly rendered cards
  requestAnimationFrame(() => {
    list.querySelectorAll(".reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("is-visible"), i * 60);
    });
  });
}

function initMenu() {
  activeCategory = menu[0].category; // default to the first category on page load
  renderTabs();
  renderItems();
}

initMenu();
