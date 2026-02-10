document.addEventListener("DOMContentLoaded", function () {

    /* --- 1. MENU BURGER & MEGA MENU MOBILE --- */
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu");
    const hasMegaMenu = document.querySelector(".has-mega-menu");

    if (burger && menu) {
        burger.addEventListener("click", function () {
            menu.classList.toggle("active");
        });
    }

    // Gestion du clic pour le sous-menu sur mobile
    if (hasMegaMenu) {
        hasMegaMenu.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
                const mega = this.querySelector(".mega-menu");
                if (mega) mega.classList.toggle("open-mobile");
            }
        });
    }

    /* --- 2. CARROUSEL (SLIDER) --- */
    const container = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (container && track && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;
        const intervalTime = 5000;

        // Création des indicateurs (dots)
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                stopAutoSlide();
                moveToSlide(index);
                startAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function moveToSlide(index) {
            if (index < 0 || index >= totalSlides) return;
            const slideWidth = slides[0].offsetWidth;
            track.style.transform = `translateX(${index * -slideWidth}px)`;
            currentIndex = index;
            updateDots();
        }

        function updateDots() {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        }

        function nextSlide() {
            let nextIndex = (currentIndex + 1 >= totalSlides) ? 0 : currentIndex + 1;
            moveToSlide(nextIndex);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, intervalTime);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                stopAutoSlide();
                let prevIndex = (currentIndex - 1 < 0) ? totalSlides - 1 : currentIndex - 1;
                moveToSlide(prevIndex);
                startAutoSlide();
            });
        }

        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
        window.addEventListener('resize', () => moveToSlide(currentIndex));

        // Initialisation du slider
        moveToSlide(currentIndex);
        startAutoSlide();
    }

    /* --- 3. FORMULAIRE DE DON --- */
    const donationForm = document.getElementById('donationForm');

    if (donationForm) {
        const freqButtons = donationForm.querySelectorAll('.freq-btn');
        const amountButtons = donationForm.querySelectorAll('.amount-btn');
        const customAmountInput = donationForm.querySelector('.amount-custom');
        const amountDescription = document.getElementById('amount-desc');

        const impactDescriptions = {
            '25': "💰 Vous offrez une trousse complète de fournitures scolaires pour un élève (Action Sociale) !",
            '50': "🌳 Vous achetez 5 plants pour notre prochain projet de reboisement (Développement Durable).",
            '100': "💡 Vous contribuez à l'achat d'un mini-ordinateur pour nos ateliers numériques (Technologie).",
            'default_unique': "Choisissez un montant ou entrez le vôtre. Votre don unique nous est précieux.",
            'default_mensuel': "Choisissez un montant pour soutenir nos actions chaque mois et assurer leur pérennité."
        };

        // Gestion des boutons de Fréquence
        freqButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                freqButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const currentFreq = btn.dataset.freq;
                amountDescription.textContent = (currentFreq === 'mensuel') ? impactDescriptions['default_mensuel'] : impactDescriptions['default_unique'];
                
                amountButtons.forEach(ab => ab.classList.remove('active'));
                customAmountInput.value = '';
            });
        });

        // Gestion des boutons de Montant
        amountButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                amountButtons.forEach(b => b.classList.remove('active'));
                customAmountInput.value = '';
                btn.classList.add('active');
                
                const amount = btn.dataset.amount;
                amountDescription.textContent = impactDescriptions[amount] || impactDescriptions['default_unique'];
            });
        });

        // Gestion du montant personnalisé
        customAmountInput.addEventListener('input', () => {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            const value = parseInt(customAmountInput.value);
            
            if (value > 0) {
                amountDescription.textContent = `Votre don de ${value} € contribuera directement à nos actions. Merci !`;
            } else {
                const activeFreq = donationForm.querySelector('.freq-btn.active').dataset.freq;
                amountDescription.textContent = (activeFreq === 'mensuel') ? impactDescriptions['default_mensuel'] : impactDescriptions['default_unique'];
            }
        });

        // Initialisation du don unique
        const uniqueBtn = donationForm.querySelector('.freq-btn[data-freq="unique"]');
        if (uniqueBtn) uniqueBtn.classList.add('active');
        if (amountDescription) amountDescription.textContent = impactDescriptions['default_unique'];
    }
});s
