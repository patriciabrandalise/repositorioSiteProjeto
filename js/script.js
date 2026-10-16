document.addEventListener("DOMContentLoaded", () =>{
    const menuResponsivo = document.getElementById("menuResponsivo");
    const navMenu = document.getElementById("nav-menu");

    menuResponsivo.addEventListener("click", () => {
        navMenu.classList.toggle("active")
    });
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    const slides = document.querySelectorAll(".carousel-slide");
    const dots =document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prvBtn");
    const nextBtn = document.getElementById("nextBtn");
    let slideAtual = 0;
    let slideIntervalo;

    function showSlide(index){
        slides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));
        slideAtual = (index + slides.length)
            % slides.length;

        slides[slideAtual].classList.add("active");
        dots[slideAtual].classList.add("active");
        }
    function nextSlide() {
        showSlide(slideAtual + 1);
    }
    function prevSlide() {
        showSlide(slideAtual - 1);
    }
    function startSlide() {
        slideIntervalo = setInterval(nextSlide, 5000);
    }
    function stopSlide() {
        clearInterval(slideIntervalo);
    }
    nextBtn.addEventListener("click", () => {
        nextSlide();
        stopSlide();
        startSlide();
    });
        
    prevBtn.addEventListener("click", () => {
        prevSlide();
        stopSlide();
        startSlide();
    });

    dots.forEach((dot) =>{
        dot.addEventListener("click",(e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            showSlide(index);
            stopSlide();
            startSlide();
        });
    });

    startSlide();

    //validação do formulário
    const form = document.getElementById("contactForm");
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

        function isValidEmail(email){
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        }

    contatoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let isValid = true;

        //Validação do campo nome (verificar minime 3 características)
        if(nome.value.trim().length < 3){
            showError(nome, "O nome deve ter no mínimo 3 caracteres");
            isValid = false;
        }
        //validação do campo email
        if(!isValidEmail(email.value.trim())){
            showError(email, "insira um e-mail válido");
            isValid = false;
        }
        //validação do campo mensagem
        if(mensagem.value.trim().length < 10){
            showError(mensagem, "a mensagem deve ter no mínimo 10 caracteres");
            isValid = false;
        }
        //validar se tiver tudo certo
        if(isValid){
            clearError();
            alert("mensagem enviada com sucesso");
            contatoForm.reset();
        }
    });
    
    function showError(inputElement, menssagem){
        const formGroup = inputElement.parentElement;
        inputElement.classList.add("input-error");
        const erroMensagem = document.createElement("small");
        erroMensagem.className = "erro-text";
        erroMensagem.innerText = menssagem;
        formGroup.appendChild(erroMensagem);
    }

});//final função evento