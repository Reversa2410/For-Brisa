// main.js - ADAPTADO A SCROLLTRIGGER

document.addEventListener('DOMContentLoaded', () => {

    // 1. Registrar GSAP y ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Generador de Corazones (solo en el body, se mueven siempre)
    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      document.body.appendChild(heart);
      
      const x = Math.random() * window.innerWidth;
      const duration = 4 + Math.random() * 3;
      const size = 15 + Math.random() * 20;

      heart.style.left = x + "px";
      heart.style.width = size + "px";
      heart.style.height = size + "px";

      gsap.to(heart, {
        y: -window.innerHeight * 2, // Lo hacemos flotar mucho más para que salga de la vista
        opacity: 0,
        duration: duration,
        ease: "sine.out",
        onComplete: () => heart.remove()
      });
    }
    // Iniciamos la lluvia de corazones
    setInterval(createHeart, 400); 

    // 3. Función para configurar las animaciones de ScrollTrigger
    function setupScrollAnimations() {
        const screens = document.querySelectorAll(".screen");

        screens.forEach((screen, index) => {
            const screenId = screen.id;
            const title = screen.querySelector('h1') || screen.querySelector('h2');
            const text = screen.querySelector('p');
            const endMsg = screen.querySelector('#endMessage');
            const topImage = screen.querySelector('.top-image');
            const leftImages = screen.querySelectorAll('.left-image');
            const rightImages = screen.querySelectorAll('.right-image');

            // Creamos una línea de tiempo para la animación de cada pantalla
            const tl = gsap.timeline({
                // La animación se dispara cuando el top del elemento (.screen) llega al 70% del viewport
                scrollTrigger: {
                    trigger: screen,
                    start: "top 70%", 
                    end: "bottom top", 
                    toggleActions: "play none none reverse", // Se reproduce al entrar, se revierte al salir
                    // markers: true, // Descomenta esto para ver el trigger de GSAP
                }
            });

            // 1. Animación de entrada general
            tl.from(screen, { 
                opacity: 0, 
                duration: 0.5, 
                y: 50, 
                ease: "power1.out" 
            }, 0);

            // 2. Animación del Título
            if(title) {
                tl.from(title, { y: 30, opacity: 0, duration: 1, ease: "power2.out" }, 0.1);
            }
            
            // 3. Animación de Imagen Superior (Solo en la pantalla 1)
            if(topImage) {
                tl.from(topImage, { y: -30, opacity: 0, duration: 1, ease: "power2.out" }, 0);
            }

            // 4. Animación del Texto
            if(text) {
                tl.from(text, { y: 30, opacity: 0, duration: 1, ease: "power2.out" }, 0.3);
            }
            
            // 5. Animación de Imágenes Laterales
            if (leftImages.length > 0) {
                tl.from(leftImages, { x: -50, opacity: 0, duration: 0.8, ease: "power2.out" }, 0.2);
            }
            if (rightImages.length > 0) {
                tl.from(rightImages, { x: 50, opacity: 0, duration: 0.8, ease: "power2.out" }, 0.2);
            }

            // 6. Mensaje final (solo pantalla 4)
            if(endMsg) {
                tl.from(endMsg, { scale: 0.5, opacity: 0, duration: 1, ease: "back.out(1.7)" }, 0.5);
            }
        });
    }

    // Inicializamos las animaciones
    setupScrollAnimations();
});