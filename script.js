document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  if (burger && menu) {
    burger.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  } else {
    console.log("Burger ou menu introuvable");
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // SÉLECTION DES ÉLÉMENTS (déjà présent)
    const container = document.querySelector('.carousel-container'); // On ajoute le conteneur ici
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // =========================================================
    // CODE CORRIGÉ/AJOUTÉ POUR L'AUTO-DÉFILEMENT
    // Les variables DOIVENT être à l'intérieur de cette fonction.
    // =========================================================
    let autoSlideInterval; 
    const intervalTime = 5000; // 5 secondes
    
    // Assurez-vous que les slides existent avant de continuer
    if (totalSlides === 0) return;

    // 1. Création des indicateurs (dots)
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            stopAutoSlide(); // NOUVEAU : Arrêt temporaire
            moveToSlide(index);
            startAutoSlide(); // NOUVEAU : Redémarrage
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // 2. Fonction de Déplacement du Carrousel (inchangée)
    function moveToSlide(index) {
        if (index < 0 || index >= totalSlides) return; 
        
        const slideWidth = slides[0].offsetWidth; 
        const offset = index * -slideWidth; 
        
        track.style.transform = `translateX(${offset}px)`; 
        currentIndex = index;
        
        updateDots();
    }

    // 3. Mise à jour des indicateurs (inchangée)
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    // NOUVEAU : Fonction pour faire avancer (appelée par l'intervalle)
    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0; // Boucle
        }
        moveToSlide(nextIndex);
    }
    
    // NOUVEAU : Fonctions de gestion de l'intervalle
    function startAutoSlide() {
        stopAutoSlide(); // Évite les intervalles multiples
        autoSlideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // 4. Gestion du bouton "Suivant" (MODIFIÉ pour pause/reprise)
    nextButton.addEventListener('click', () => {
        stopAutoSlide(); 
        nextSlide(); // Utilise la fonction nextSlide pour le clic
        startAutoSlide(); 
    });

    // 5. Gestion du bouton "Précédent" (MODIFIÉ pour pause/reprise)
    prevButton.addEventListener('click', () => {
        stopAutoSlide(); 
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1; 
        }
        moveToSlide(prevIndex);
        startAutoSlide(); 
    });

    // NOUVEAU : Pause/Reprise au survol (UX)
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);

    // OPTIONNEL : Recalculer la position si la fenêtre est redimensionnée (inchangé)
    window.addEventListener('resize', () => {
        moveToSlide(currentIndex); 
    });
    
    // NOUVEAU : Initialisation
    moveToSlide(currentIndex);
    startAutoSlide(); // Démarre le défilement automatique au chargement
});


    // Variables de sélection des éléments
    const donationForm = document.getElementById('donationForm');
    const freqButtons = donationForm.querySelectorAll('.freq-btn');
    const amountButtons = donationForm.querySelectorAll('.amount-btn');
    const customAmountInput = donationForm.querySelector('.amount-custom');
    const amountDescription = document.getElementById('amount-desc');

    // Mappage des montants aux descriptions d'impact pour l'association
    const impactDescriptions = {
        '25': "💰 Vous offrez une trousse complète de fournitures scolaires pour un élève (Action Sociale) !",
        '50': "🌳 Vous achetez 5 plants pour notre prochain projet de reboisement (Développement Durable).",
        '100': "💡 Vous contribuez à l'achat d'un mini-ordinateur pour nos ateliers numériques (Technologie).",
        'default_unique': "Choisissez un montant ou entrez le vôtre. Votre don unique nous est précieux.",
        'default_mensuel': "Choisissez un montant pour soutenir nos actions chaque mois et assurer leur pérennité."
    };

    // --- 1. Gestion des boutons de Fréquence (Unique vs. Mensuel) ---
	freqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Désactiver tous les boutons de fréquence
            freqButtons.forEach(b => b.classList.remove('active'));
            // Activer le bouton cliqué
            btn.classList.add('active');
            
            // Mise à jour de la description par défaut
            const currentFreq = btn.dataset.freq;
            if (currentFreq === 'mensuel') {
                amountDescription.textContent = impactDescriptions['default_mensuel'];
            } else {
                 // Remettre la description par défaut si rien n'est sélectionné
                amountDescription.textContent = impactDescriptions['default_unique'];
            }
            
            // Si un bouton de montant était déjà actif, le désactiver pour forcer un nouveau choix
            amountButtons.forEach(ab => ab.classList.remove('active'));
            customAmountInput.value = '';
        });
    });

    // --- 2. Gestion des boutons de Montant ---
    amountButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Désactiver tous les boutons de montant et effacer le champ personnalisé
            amountButtons.forEach(b => b.classList.remove('active'));
            customAmountInput.value = '';
            
            // Activer le bouton cliqué
            btn.classList.add('active');
            
            // Afficher la description d'impact correspondante
            const amount = btn.dataset.amount;
            amountDescription.textContent = impactDescriptions[amount] || impactDescriptions['default_unique'];
        });
    });

    // --- 3. Gestion du Champ de Montant Personnalisé ---
    customAmountInput.addEventListener('input', () => {
        // Désactiver tous les boutons de montant quand l'utilisateur tape un chiffre
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        const value = parseInt(customAmountInput.value);
        if (value > 0) {
            amountDescription.textContent = `Votre don de ${value} € contribuera directement à l'ensemble de nos actions citoyennes. Merci !`;
        } else if (value === 0) {
             amountDescription.textContent = "Veuillez entrer un montant supérieur à zéro.";
        } else {
            amountDescription.textContent = impactDescriptions[document.querySelector('.freq-btn.active').dataset.freq === 'mensuel' ? 'default_mensuel' : 'default_unique'];
        }
    });

    // --- 4. Initialisation ---
    // S'assurer que le bouton "Don Unique" est actif au chargement
    document.querySelector('.freq-btn[data-freq="unique"]').classList.add('active');
    amountDescription.textContent = impactDescriptions['default_unique'];