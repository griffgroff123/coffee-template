// Switches between the "Location & hours" and "Send a message" panels.
// Unlike the menu tabs (which loop over data), this only ever has
// two fixed options, so it's simpler to just wire them up directly.

function setupVisitTabs() {
  const infoTab = document.getElementById("tab-info");
  const formTab = document.getElementById("tab-form");
  const infoPanel = document.getElementById("panel-info");
  const formPanel = document.getElementById("panel-form");

  if (!infoTab || !formTab || !infoPanel || !formPanel) return;

  infoTab.addEventListener("click", () => {
    infoPanel.style.display = "block";
    formPanel.style.display = "none";
    infoTab.classList.add("menu-tab-active");
    formTab.classList.remove("menu-tab-active");
  });

  formTab.addEventListener("click", () => {
    formPanel.style.display = "block";
    infoPanel.style.display = "none";
    formTab.classList.add("menu-tab-active");
    infoTab.classList.remove("menu-tab-active");
  });
}

setupVisitTabs();
