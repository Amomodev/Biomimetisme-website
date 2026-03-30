// 1. Initialisation des animations au scroll (AOS)
AOS.init({
    duration: 1000, // L'animation dure 1 seconde
    once: false,    // Les animations se rejouent si on remonte
    offset: 100     // Déclenche l'animation un peu avant que l'élément n'apparaisse
});

// 2. Correction du titre : on le fait disparaître quand on descend
window.addEventListener('scroll', () => {
    let scrollValue = window.scrollY;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        let opacity = 1 - (scrollValue / 400);
        if (opacity < 0) opacity = 0;
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(-${scrollValue * 0.3}px)`;
    }
});

// 3. Logique de la Modale (Lightbox)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.grid-card');
    const modal = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close-btn');
    const modalImageContainer = document.getElementById('modal-image-container');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    // Ouvrir la modale
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Récupérer les données de la carte
            const title = card.getAttribute('data-title');
            const descHtml = card.querySelector('.hidden-content').innerHTML;
            const imagesHtml = card.querySelector('.card-images').innerHTML;

            // Remplir la modale
            modalTitle.textContent = title;
            modalDesc.innerHTML = descHtml;
            modalImageContainer.innerHTML = imagesHtml;

            // Afficher la modale et empêcher le scroll de l'arrière-plan
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermer la modale (bouton X)
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Réactiver le scroll
    };

    closeBtn.addEventListener('click', closeModal);

    // Fermer la modale en cliquant en dehors du contenu
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Événement délégué pour le bouton "Lire le texte complet" à l'intérieur de la modale
    modalDesc.addEventListener('click', (e) => {
        if (e.target.classList.contains('show-full-text-btn')) {
            const btn = e.target;
            const fullText = btn.nextElementSibling; // div.full-text
            
            if (fullText.style.display === 'none') {
                fullText.style.display = 'block';
                btn.textContent = 'Masquer le texte';
                // optionnel : scroll dans la modale
                fullText.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                fullText.style.display = 'none';
                btn.textContent = 'Lire le texte complet';
            }
        }
    });

    // Fermer la modale avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});