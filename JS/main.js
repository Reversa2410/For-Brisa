// main.js - SOLUCIÓN DEFINITIVA DE ANIMACIONES EN MÓVIL

// CAMBIO IMPORTANTE: Usamos 'load' en vez de 'DOMContentLoaded'
// Esto asegura que las animaciones se configuren SÓLO después de que todas las imágenes han cargado.
window.addEventListener('load', () => {

    // 1. Registrar GSAP y ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Generador de Corazones 
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
        y: -window.innerHeight * 2, 
        opacity: 0,
        duration: duration,
        ease: "sine.out",
        onComplete: () => heart.remove()
      });
    }
    setInterval(createHeart, 400); 

    // 3. Función para configurar las animaciones
    function setupScrollAnimations() {
        const screens = document.querySelectorAll(".screen");

        screens.forEach((screen) => {
            const title = screen.querySelector('h1') || screen.querySelector('h2');
            const text = screen.querySelector('p');
            const endMsg = screen.querySelector('#endMessage');
            const topImage = screen.querySelector('.top-image');
            const leftImages = screen.querySelectorAll('.left-image');
            const rightImages = screen.querySelectorAll('.right-image');

            // Línea de tiempo con ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: screen,
                    start: "top 75%", // Se activa cuando el top del elemento está al 75% de la pantalla
                    end: "bottom top", 
                    toggleActions: "play none none reverse", 
                }
            });

            // 1. Entrada general de la pantalla
            tl.from(screen, { 
                opacity: 0, 
                duration: 0.5, 
                y: 30, 
                ease: "power1.out" 
            }, 0);

            // 2. Elementos internos
            if(title) tl.from(title, { y: 30, opacity: 0, duration: 1, ease: "power2.out" }, 0.2);
            if(topImage) tl.from(topImage, { y: -30, opacity: 0, duration: 1, ease: "power2.out" }, 0.1);
            if(text) tl.from(text, { y: 30, opacity: 0, duration: 1, ease: "power2.out" }, 0.4);
            
            if (leftImages.length > 0) {
                tl.from(leftImages, { x: -30, opacity: 0, duration: 0.8, ease: "power2.out" }, 0.3);
            }
            if (rightImages.length > 0) {
                tl.from(rightImages, { x: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, 0.3);
            }

            if(endMsg) {
                tl.from(endMsg, { scale: 0.5, opacity: 0, duration: 1, ease: "back.out(1.7)" }, 0.6);
            }
        });

        // ¡CLAVE! Recalcula todas las posiciones de ScrollTrigger después de que todo cargó.
        ScrollTrigger.refresh();
    }

    // Ejecutar configuración
    setupScrollAnimations();
});