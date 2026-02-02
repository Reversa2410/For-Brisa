window.addEventListener('load', () => {

    // 1. Registrar GSAP y ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Generador de Corazones (Fondo)
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

    // 3. Función de Animaciones
    function setupScrollAnimations() {
        // Seleccionamos todas las pantallas, incluyendo la nueva #screen5
        const screens = document.querySelectorAll(".screen");

        screens.forEach((screen) => {
            const title = screen.querySelector('h1') || screen.querySelector('h2');
            const text = screen.querySelector('p');
            const endMsg = screen.querySelector('#endMessage');
            const topImage = screen.querySelector('.top-image');
            const leftImages = screen.querySelectorAll('.left-image');
            const rightImages = screen.querySelectorAll('.right-image');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: screen,
                    start: "top 80%", // Se activa un poco antes
                    toggleActions: "play none none reverse", 
                }
            });

            tl.from(screen, { opacity: 0, duration: 0.5, y: 30, ease: "power1.out" }, 0);
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
    }

    // 4. Lógica del Corazón
    const plantillaCorazon = [
        "  ***** ***** ",
        " ******* ******* ",
        "*****************",
        " *************** ",
        "  ************* ",
        "   *********** ",
        "    ********* ",
        "     ******* ",
        "      ***** ",
        "       *** ",
        "        * "
    ];

    const input = document.getElementById('inputNombre');
    const contenedor = document.getElementById('corazonContenedor');

    function dibujarCorazon(nombre) {
        if (!nombre || !contenedor) {
            if(contenedor) contenedor.innerText = "";
            return;
        }
        const textolimpio = nombre.replace(/\s/g, "");
        let resultado = "";
        let charIndex = 0;

        for(let fila of plantillaCorazon) {
            for(let caracter of fila) {
                if(caracter === "*") {
                    resultado += textolimpio[charIndex % textolimpio.length];
                    charIndex++;
                } else {
                    resultado += " ";
                }
            }
            resultado += "\n";
        }
        contenedor.innerText = resultado;
    }

    if (input) {
        // Esto evita que la página se recargue si ella presiona Enter
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') e.preventDefault();
        });

        // Esto dibuja el corazón letra por letra
        input.addEventListener('input', (e) => {
            console.log("Escribiendo:", e.target.value); // Para que tú veas en consola que funciona
            dibujarCorazon(e.target.value);
        });
    }

    // Inicializar todo
    setupScrollAnimations();

    // ¡ESTO ES LO MÁS IMPORTANTE! 
    // Obliga al navegador a ver la nueva altura de la página.
    ScrollTrigger.refresh();
});