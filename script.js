document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll("nav a");
  const quoteForm = document.querySelector("#quoteForm");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const revealOnScroll = () => {
    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  };

  const setActiveLink = () => {
    let currentSection = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop - 140 <= window.scrollY) {
        currentSection = section;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", currentSection && link.getAttribute("href") === `#${currentSection.id}`);
    });
  };

  window.addEventListener("scroll", () => {
    revealOnScroll();
    setActiveLink();
  });

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(quoteForm);
      const nombre = formData.get("nombre");
      const empresa = formData.get("empresa") || "No especificada";
      const telefono = formData.get("telefono");
      const productos = formData.get("productosInteres");
      const message = [
        "Hola, quiero solicitar una cotización.",
        "",
        `Nombre: ${nombre}`,
        `Empresa: ${empresa}`,
        `Teléfono: ${telefono}`,
        `Productos de interés: ${productos}`,
      ].join("\n");

      window.open(`https://wa.me/573133200865?text=${encodeURIComponent(message)}`, "_blank");
    });
  }

  revealOnScroll();
  setActiveLink();
});
