document.addEventListener("DOMContentLoaded", () => {
    //
    const menuResponsivo = document.getElementById("menuResponsivo");
    const navMenu = document.getElementById("nav-menu");
  
    // Abre e fecha o menu responsivo
    if (menuResponsivo && navMenu) {
      menuResponsivo.addEventListener("click", () => {
        navMenu.classList.toggle("active");
  
        const aberto = navMenu.classList.contains("active");
        menuResponsivo.setAttribute("aria-expanded", aberto);
      });
    }
  
    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll(".nav-menu a");
  
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuResponsivo.setAttribute("aria-expanded", "false");
      });
    });
  
    // Carrossel
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    let slideAtual = 0;
    let slideIntervalo;
  
    function showSlide(index) {
      if (slides.length === 0) return;
  
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });
  
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });
  
      slideAtual = (index + slides.length) % slides.length;
  
      slides[slideAtual].classList.add("active");
  
      if (dots[slideAtual]) {
        dots[slideAtual].classList.add("active");
      }
    }
  
    function nextSlide() {
      showSlide(slideAtual + 1);
    }
  
    function prevSlide() {
      showSlide(slideAtual - 1);
    }
  
    function startSlide() {
      if (slides.length > 1) {
        slideIntervalo = setInterval(nextSlide, 5000);
      }
    }
  
    function stopSlide() {
      console.log("Valor intervalo", slideIntervalo);
      clearInterval(slideIntervalo);
    }
  
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        stopSlide();
        startSlide();
      });
    }
  
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        stopSlide();
        startSlide();
      });
    }
  
    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.currentTarget.getAttribute("data-index"), 10);
  
        if (!Number.isNaN(index)) {
          showSlide(index);
          stopSlide();
          startSlide();
        }
      });
    });
  
    if (slides.length > 0) {
      showSlide(0);
      startSlide();
    }
  
    // Validação do formulário
    const contatoForm = document.getElementById("contatoForm");
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    if (contatoForm && nome && email && mensagem) {
      contatoForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        clearErro();
  
        let isValid = true;
  
        // Validação do campo nome (verificar mínimo 3 caracteres)
        if (nome.value.trim().length < 3) {
          showError(nome, "O nome deve ter no mínimo 3 caracteres");
          isValid = false;
        }
  
        // Validação do campo E-mail
        if (!isValidEmail(email.value.trim())) {
          showError(email, "Insira um e-mail válido");
          isValid = false;
        }
  
        // Validação do campo mensagem (mínimo 10 caracteres)
        if (mensagem.value.trim().length < 10) {
          showError(mensagem, "A mensagem deve conter no mínimo 10 caracteres");
          isValid = false;
        }
  
        // Validar se estiver tudo correto
        if (isValid) {
          clearErro();
          showToast("Formulário validado com sucesso!");
          contatoForm.reset();
        }
      });
  
      // Remover a borda vermelha dos inputs
      [nome, email, mensagem].forEach((input) => {
        input.addEventListener("input", () => {
          clearFielError(input);
        });
      });
    }
  
    function showToast(mensagem) {
      const toast = document.getElementById("toast");
      const toastMensagem = document.getElementById("toastMensagem");
  
      if (!toast || !toastMensagem) return;
  
      toastMensagem.textContent = mensagem;
      toast.classList.add("show");
  
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
  
    function showError(inputElement, mensagem) {
      const formGroup = inputElement.parentElement;
  
      clearFielError(inputElement);
  
      inputElement.classList.add("input-error");
  
      const errorMensagem = document.createElement("small");
      errorMensagem.className = "error-text";
      errorMensagem.innerText = mensagem;
  
      formGroup.appendChild(errorMensagem);
    }
  
    // Remover erro individual do campo
    function clearFielError(inputElement) {
      const formGroup = inputElement.parentElement;
  
      inputElement.classList.remove("input-error");
  
      const removerErro = formGroup.querySelector(".error-text");
  
      if (removerErro) {
        removerErro.remove();
      }
    }
  
    // Remover TODOS os erros do formulário
    function clearErro() {
      document.querySelectorAll(".error-text").forEach((el) => {
        el.remove();
      });
  
      document.querySelectorAll(".input-error").forEach((el) => {
        el.classList.remove("input-error");
      });
    }
  }); // Final do evento
  