const container = document.querySelector(".container");
const menus = [...document.querySelectorAll(".menu")].map(menu => ({
  menu,
  trigger: menu.querySelector("button.menu__trigger"),
  dropdown: menu.querySelector(".menu__dropdown"),
})).filter(({ trigger, dropdown }) => trigger && dropdown);

function setOpen(item, open) {
  item.menu.classList.toggle("open", open);
  item.trigger.setAttribute("aria-expanded", String(open));
  item.dropdown.hidden = !open;
}

menus.forEach(item => {
  const { menu, trigger, dropdown } = item;
  setOpen(item, false);

  // Native buttons provide Enter and Space activation.
  trigger.addEventListener("click", () => {
    const open = trigger.getAttribute("aria-expanded") !== "true";
    menus.forEach(other => setOpen(other, false));
    setOpen(item, open);
    if (open && container) {
      dropdown.style.left = "";
      dropdown.style.right = "";
      if (dropdown.getBoundingClientRect().right > container.getBoundingClientRect().right) {
        dropdown.style.left = "auto";
        dropdown.style.right = "0";
      }
    }
  });

  menu.addEventListener("keydown", event => {
    if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
      event.preventDefault();
      setOpen(item, false);
      trigger.focus();
    }
  });

  menu.addEventListener("focusout", event => {
    if (!menu.contains(event.relatedTarget)) setOpen(item, false);
  });
});

document.addEventListener("click", event => {
  menus.forEach(item => {
    if (!item.menu.contains(event.target) || event.target.closest("a")) {
      setOpen(item, false);
    }
  });
});

window.addEventListener("resize", () => {
  menus.forEach(item => {
    // Avoid leaving focus inside a dropdown that is about to be hidden.
    if (item.dropdown.contains(document.activeElement)) {
      const target = item.trigger.getClientRects().length
        ? item.trigger : document.querySelector(".header__logo a");
      target?.focus();
    }
    setOpen(item, false);
  });
});
