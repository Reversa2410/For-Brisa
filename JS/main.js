// main.js - VERSIÓN ESTABLE, SEGURA y CON IMÁGENES ANIMADAS

document.addEventListener('DOMContentLoaded', () => {

    // 1. Declaración de variables globales
    const allScreens = document.querySelectorAll(".screen");
    const navButtons = document.querySelectorAll(".nav-btn");

    // 2. Función para animar la entrada (ACTUALIZADA CON ANIMACIONES LATERALES PARA IMÁGENES)
    function animateScreenEntry(screenId) {
        
        gsap.killTweensOf(".pulse-btn"); 

        // Selección de elementos
        const title = document.querySelector(`#${screenId} h1`) || document.querySelector(`#${screenId} h2`);
        const text = document.querySelector(`#${screenId} p`);
        const buttons = document.querySelectorAll(`#${screenId} .nav-btn`);
        const endMsg = document.querySelector(`#${screenId} #endMessage`);
        
        // Seleccionamos la imagen superior (si existe)
        const topImage = document.querySelector(`#${screenId} .top-image`);
        // Seleccionamos las imágenes laterales (si existen)
        const leftImages = document.querySelectorAll(`#${screenId} .left-image`);
        const rightImages = document.querySelectorAll(`#${screenId} .right-image`);


        // --- ANIMACIÓN CENTRAL ---
        const tl = gsap.timeline();

        // 1. Título
        if(title) {
            tl.from(title, { y: 30, duration: 1, ease: "power2.out", clearProps: "all" }, 0.1);
        }
        
        // 2. Imagen Superior (si existe)
        if(topImage) {
            tl.from(topImage, { y: -30, duration: 1, ease: "power2.out", clearProps: "all" }, 0);
        }

        // 3. Texto
        if(text) {
            tl.from(text, { y: 30, duration: 1, ease: "power2.out", clearProps: "all" }, 0.3);
        }

        // 4. Mensaje final
        if(endMsg) {
            tl.from(endMsg, { rotation: 360, scale: 0.5, duration: 1, ease: "back.out(1.7)", clearProps: "all" }, 0.5);
        }
        
        // 5. Botones
        if(buttons.length > 0) {
            tl.from(buttons, { 
                y: 30, 
                duration: 0.8, 
                stagger: 0.1, 
                ease: "back.out(1.7)",
                clearProps: "all" 
            }, ">");
        }
        
        // --- ANIMACIÓN LATERAL (FUERA DE LA LÍNEA DE TIEMPO PRINCIPAL PARA ENTRAR AL MISMO TIEMPO) ---
        
        // Imágenes Izquierdas (Entran desde la izquierda)
        if (leftImages.length > 0) {
            gsap.from(leftImages, { 
                x: -50, 
                duration: 0.8, 
                delay: 0.2, // Entran casi al inicio de la pantalla
                ease: "power2.out", 
                clearProps: "all" 
            });
        }
        
        // Imágenes Derechas (Entran desde la derecha)
        if (rightImages.length > 0) {
            gsap.from(rightImages, { 
                x: 50, 
                duration: 0.8, 
                delay: 0.2, // Entran casi al inicio de la pantalla
                ease: "power2.out", 
                clearProps: "all" 
            });
        }
        
        // Efecto especial botón pantalla 3
        if(screenId === 'screen3') {
            gsap.to("#screen3 .pulse-btn", {
                scale: 1.05, repeat: -1, yoyo: true, duration: 0.6, ease: "sine.inOut"
            });
        }
    }

    // 3. Función de Transición entre pantallas (SIN CAMBIOS)
    function transitionScreens(currentScreenId, nextScreenId, direction) {
        const currentScreen = document.getElementById(currentScreenId);
        const nextScreen = document.getElementById(nextScreenId);

        const exitX = (direction === 'back') ? 100 : -100;
        const entryX = (direction === 'back') ? -100 : 100;

        gsap.to(currentScreen, {
            x: exitX,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                currentScreen.classList.add('hidden');
                nextScreen.classList.remove('hidden');

                gsap.set(currentScreen, { clearProps: "all" });
                gsap.set(nextScreen, { x: entryX, opacity: 0 });

                gsap.to(nextScreen, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    onComplete: () => {
                        animateScreenEntry(nextScreenId);
                    }
                });
            }
        });
    }

    // 4. Configuración de Botones (SIN CAMBIOS)
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextScreenId = button.getAttribute('data-target');
            const direction = button.getAttribute('data-direction') || 'forward'; 
            
            let currentScreen = null;
            allScreens.forEach(s => {
                if (!s.classList.contains('hidden')) {
                    currentScreen = s;
                }
            });

            if (currentScreen && nextScreenId) {
                transitionScreens(currentScreen.id, nextScreenId, direction);
            }
        });
    });

    // 5. Generador de Corazones (SIN CAMBIOS)
    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      
      let isAnyScreenVisible = false;
      for(let s of allScreens) {
          if(!s.classList.contains('hidden')) isAnyScreenVisible = true;
      }

      if (isAnyScreenVisible) { 
          document.body.appendChild(heart);
          const x = Math.random() * window.innerWidth;
          const duration = 4 + Math.random() * 3;
          const size = 15 + Math.random() * 20;

          heart.style.left = x + "px";
          heart.style.width = size + "px";
          heart.style.height = size + "px";

          gsap.to(heart, {
            y: -window.innerHeight - 50, 
            opacity: 0,
            duration: duration,
            ease: "sine.out",
            onComplete: () => heart.remove()
          });
      }
    }
    setInterval(createHeart, 400); 

    // 6. Animación Inicial
    animateScreenEntry('screen1');
});