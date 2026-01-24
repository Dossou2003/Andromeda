/**
 * Fichier JavaScript principal pour le site Momentum Media
 * Gère les interactions utilisateur, animations et composants dynamiques
 */

// Données des témoignages
/**
 * Liste des témoignages clients
 * Chaque témoignage contient : nom, localisation, rôle, texte et initiales
 */
const testimonials = [
    {
        name: "Jean D.",
        location: "Côte d'Ivoire",
        role: "E-commerçant",
        text: "Je pensais que Facebook me volait. Après avoir lu le chapitre sur les 'Clients Oiseaux', j'ai compris. Mon taux de livraison est passé de 30% à 75%.",
        initials: "JD"
    },
    {
        name: "Sarah K.",
        location: "Sénégal",
        role: "Marque Cosmétique",
        text: "Le concept CBO + Broad a tout changé. Je passais ma vie à couper des adsets, maintenant je laisse l'IA bosser pour moi.",
        initials: "SK"
    },
    {
        name: "Marc A.",
        location: "Cameroun",
        role: "Dropshipper",
        text: "Le manuel est brutal mais vrai. Le chapitre sur la 'Fatigue Publicitaire' m'a ouvert les yeux. Momentum Media connaît vraiment le marché.",
        initials: "MA"
    },
    {
        name: "Paul T.",
        location: "Bénin",
        role: "Vendeur en ligne",
        text: "J'étais sur le point d'abandonner. Ce guide m'a montré comment arrêter de perdre de l'argent bêtement avec des pubs mal ciblées.",
        initials: "PT"
    },
    {
        name: "Amina M.",
        location: "Mali",
        role: "Boutique Mode",
        text: "Merci pour l'astuce de nettoyage du pixel. Je n'ai plus de touristes qui commandent pour rien. Mes ventes sont enfin réelles.",
        initials: "AM"
    }
];

/**
 * Charge et affiche les témoignages dans le carousel Swiper
 * Génère dynamiquement les slides HTML pour chaque témoignage
 */
function loadTestimonials() {
    const wrapper = document.getElementById('testimonials-wrapper');
    
    testimonials.forEach(t => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide h-auto';
        slide.innerHTML = `
            <div class="bg-momentum-card p-8 rounded-2xl border border-white/5 h-full flex flex-col justify-between hover:border-blue-500/30 transition-colors">
                <div>
                    <div class="flex text-yellow-400 mb-4 gap-1">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    </div>
                    <p class="text-slate-300 italic mb-6">"${t.text}"</p>
                </div>
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border border-white/10">
                        ${t.initials}
                    </div>
                    <div>
                        <div class="font-bold text-white">${t.name}</div>
                        <div class="text-xs text-slate-500">${t.role} - ${t.location}</div>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
    });
}

/**
 * Initialisation au chargement de la page
 * Configure tous les composants interactifs et événements
 */
document.addEventListener('DOMContentLoaded', () => {
    // Chargement des témoignages
    loadTestimonials();
    
    // Initialisation du carousel Swiper pour les témoignages
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
    
    // Gestion du menu mobile
    gererMenuMobile();
    
    // Gestion de la FAQ (accordion)
    gererFAQ();
    
    // Gestion du bouton retour en haut
    gererBoutonRetourHaut();
    
    // Animations au scroll
    gererAnimationsScroll();
    
    // Gestion de l'affichage progressif des images lazy load
    gererChargementImages();
    
    // Animation des compteurs de statistiques
    animerCompteurs();
    
    // Simulation du compteur de téléchargements en temps réel
    simulerActiviteEnTempsReel();
    
    // Afficher les notifications de téléchargement récent
    afficherNotificationsTelechargement();
});

/**
 * Gère l'ouverture et la fermeture du menu mobile
 * Toggle la visibilité du menu overlay
 */
function gererMenuMobile() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menuLinks = mobileMenu.querySelectorAll('a');
    
    const ouvrirMenu = () => {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };
    
    const fermerMenu = () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.style.overflow = '';
    };
    
    // Toggle via le bouton hamburger
    menuBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('flex')) {
            fermerMenu();
        } else {
            ouvrirMenu();
        }
    });
    
    // Fermer le menu
    closeBtn.addEventListener('click', fermerMenu);
    
    // Fermer le menu lors du clic sur un lien
    menuLinks.forEach(link => {
        link.addEventListener('click', fermerMenu);
    });
}

/**
 * Gère le système d'accordion pour la FAQ
 * Permet d'ouvrir/fermer les réponses au clic
 */
function gererFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle de la réponse
            answer.classList.toggle('hidden');
            
            // Rotation de l'icône
            icon.classList.toggle('rotate-180');
        });
    });
}

/**
 * Gère l'affichage du bouton retour en haut
 * Affiche le bouton après un scroll de 300px
 */
function gererBoutonRetourHaut() {
    const scrollBtn = document.getElementById('scroll-to-top');
    
    // Afficher/masquer le bouton selon la position de scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            scrollBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollBtn.classList.remove('opacity-100', 'pointer-events-auto');
        }
    });
    
    // Scroll vers le haut au clic
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Gère les animations au scroll pour les éléments
 * Ajoute une classe 'visible' aux éléments lors de leur apparition
 */
function gererAnimationsScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observer les sections principales
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Assure l'affichage progressif des images avec loading="lazy"
 * Ajoute la classe 'loaded' lorsque l'image est prête ou en erreur
 */
function gererChargementImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(image => {
        const marquerCommeChargee = () => image.classList.add('loaded');
        
        if (image.complete) {
            marquerCommeChargee();
        } else {
            image.addEventListener('load', marquerCommeChargee);
            image.addEventListener('error', marquerCommeChargee);
        }
    });
}

/**
 * Anime les compteurs de statistiques avec un effet de comptage progressif
 * Utilise l'Intersection Observer pour déclencher l'animation au scroll
 */
function animerCompteurs() {
    const compteurs = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                        entry.target.classList.add('counted');
                    }
                };
                
                updateCounter();
            }
        });
    }, observerOptions);
    
    compteurs.forEach(compteur => observer.observe(compteur));
}

/**
 * Simule l'activité en temps réel sur le site
 * Incrémente le compteur de téléchargements et varie le nombre d'utilisateurs actifs
 */
function simulerActiviteEnTempsReel() {
    const downloadCounter = document.getElementById('download-counter');
    const activeUsers = document.getElementById('active-users');
    
    let downloads = 1247;
    let users = 23;
    
    // Incrémenter les téléchargements toutes les 8-15 secondes
    setInterval(() => {
        downloads += Math.floor(Math.random() * 3) + 1;
        downloadCounter.textContent = downloads.toLocaleString('fr-FR');
        
        // Animation de pulse sur le changement
        downloadCounter.parentElement.classList.add('animate-pulse');
        setTimeout(() => {
            downloadCounter.parentElement.classList.remove('animate-pulse');
        }, 500);
    }, Math.random() * 7000 + 8000);
    
    // Varier le nombre d'utilisateurs actifs toutes les 3-6 secondes
    setInterval(() => {
        const variation = Math.floor(Math.random() * 7) - 3;
        users = Math.max(15, Math.min(35, users + variation));
        activeUsers.textContent = users;
    }, Math.random() * 3000 + 3000);
}

/**
 * Affiche des notifications popup de téléchargements récents
 * Crée un effet de preuve sociale en montrant que d'autres téléchargent le guide
 */
function afficherNotificationsTelechargement() {
    const notification = document.getElementById('recent-download');
    const nameEl = document.getElementById('notification-name');
    const locationEl = document.getElementById('notification-location');
    const timeEl = document.getElementById('notification-time');
    
    const noms = [
        { name: 'Jean D.', location: 'Côte d\'Ivoire' },
        { name: 'Sarah K.', location: 'Sénégal' },
        { name: 'Marc A.', location: 'Cameroun' },
        { name: 'Amina M.', location: 'Mali' },
        { name: 'Paul T.', location: 'Bénin' },
        { name: 'Fatou S.', location: 'Burkina Faso' },
        { name: 'Ibrahim K.', location: 'Niger' },
        { name: 'Aïcha B.', location: 'Togo' }
    ];
    
    const temps = ['Il y a 2 min', 'Il y a 5 min', 'Il y a 8 min', 'Il y a 12 min'];
    
    function afficherNotification() {
        const personne = noms[Math.floor(Math.random() * noms.length)];
        const temps_aleatoire = temps[Math.floor(Math.random() * temps.length)];
        
        nameEl.textContent = personne.name;
        locationEl.textContent = personne.location;
        timeEl.textContent = temps_aleatoire;
        
        // Afficher la notification
        notification.classList.remove('opacity-0', 'pointer-events-none');
        notification.classList.add('opacity-100', 'pointer-events-auto');
        
        // Masquer après 5 secondes
        setTimeout(() => {
            notification.classList.add('opacity-0', 'pointer-events-none');
            notification.classList.remove('opacity-100', 'pointer-events-auto');
        }, 5000);
    }
    
    // Première notification après 10 secondes
    setTimeout(afficherNotification, 10000);
    
    // Notifications suivantes toutes les 20-40 secondes
    setInterval(afficherNotification, Math.random() * 20000 + 20000);
}