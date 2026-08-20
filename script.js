const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

const setMenuOpen = (open) => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  mobileMenu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
};

menuToggle?.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));

window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 22), { passive: true });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const serviceRows = [...document.querySelectorAll(".service-row")];
const serviceImage = document.querySelector("#service-image");
const serviceName = document.querySelector("#service-name");
const serviceCaption = document.querySelector("#service-caption");

serviceRows.forEach((row) => {
  const preload = new Image();
  preload.src = row.dataset.image;
  row.addEventListener("click", () => {
    if (!serviceImage || row.classList.contains("is-active")) return;
    serviceRows.forEach((item) => item.classList.remove("is-active"));
    row.classList.add("is-active");
    serviceImage.classList.add("is-changing");
    const nextImage = new Image();
    nextImage.alt = row.dataset.alt || "Lucrare Wash by Pepelea";
    nextImage.onload = () => {
      serviceImage.src = nextImage.src;
      serviceImage.alt = nextImage.alt;
      serviceName.textContent = row.dataset.service;
      serviceCaption.textContent = row.dataset.caption;
      requestAnimationFrame(() => serviceImage.classList.remove("is-changing"));
    };
    nextImage.src = row.dataset.image;
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const closeLightbox = () => {
  if (!lightbox) return;
  if (typeof lightbox.close === "function") lightbox.close();
  else lightbox.removeAttribute("open");
};

document.querySelectorAll(".gallery-item").forEach((item) => item.addEventListener("click", () => {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector("img")?.alt || "Lucrare Wash by Pepelea";
  lightboxCaption.textContent = item.dataset.caption || "Lucrare Wash by Pepelea";
  if (typeof lightbox.showModal === "function") lightbox.showModal();
  else lightbox.setAttribute("open", "");
}));
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });

const desktopLinks = [...document.querySelectorAll(".desktop-nav a[href^='#']")];
const sections = desktopLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    desktopLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
  }, { rootMargin: "-30% 0px -60%", threshold: [0, .25, .6] });
  sections.forEach((section) => navObserver.observe(section));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
