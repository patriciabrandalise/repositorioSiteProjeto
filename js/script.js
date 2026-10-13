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
    const prevBtn = document.querySelectorAll(".prevBtn");
    const nextBtn = document.querySelectorAll(".nextBtn");
    let slideAtual = 0;
    let slideIntervalo;

    function showSlide(index){
        slides.forEach((slide) => 
            slide.classList.remove("active"));
        dots.forEach((dot) =>
        dot.classList.remove("active"));
        slideAtual = (index + slides.length)
            % slides.length;

        slides[slideAtual].classList.add("active");
        dots[slideAtual].classList.add("active");
        }

});//final função evento