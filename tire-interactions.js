// Interações dos blocos de pneus
document.addEventListener('DOMContentLoaded', function() {
    const tireCards = document.querySelectorAll('.tire-card');

    // Elementos do modal
    const modalOverlay = document.getElementById('tire-modal-overlay');
    const modalCloseBtn = document.getElementById('tire-modal-close');
    const modalImage = document.getElementById('tire-modal-image');
    const modalTitle = document.getElementById('tire-modal-title');
    const modalSize = document.getElementById('tire-modal-size');
    const modalSpecs = document.getElementById('tire-modal-specs');
    const modalOrcamento = document.getElementById('tire-modal-orcamento');

    function openModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // foco para acessibilidade
        if (modalCloseBtn) modalCloseBtn.focus();
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Fechamentos
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) closeModal();
        });
    }
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function() { closeModal(); });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    tireCards.forEach(card => {
        // Efeito de hover com animação suave
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Efeito de clique
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });

        // Botões de ação
        const primaryBtn = card.querySelector('.action-btn.primary');
        const secondaryBtn = card.querySelector('.action-btn.secondary');

        // Abrir modal com os dados do card
        if (primaryBtn) {
            primaryBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const tireName = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
                const tireSize = card.querySelector('.tire-size') ? card.querySelector('.tire-size').textContent : '';
                const tireImg = card.querySelector('.tire-image');
                const specTags = card.querySelectorAll('.tire-specs .spec-tag');

                if (modalTitle) modalTitle.textContent = tireName;
                if (modalSize) modalSize.textContent = tireSize;
                if (modalImage && tireImg) {
                    modalImage.src = tireImg.src;
                    modalImage.alt = `Imagem ampliada do ${tireName} ${tireSize}`.trim();
                }
                if (modalSpecs) {
                    modalSpecs.innerHTML = '';
                    specTags.forEach(tag => {
                        const li = document.createElement('li');
                        li.textContent = tag.textContent;
                        modalSpecs.appendChild(li);
                    });
                }

                openModal();
            });
        }

        // Orçamento: mantém comportamento atual de redirecionar para contato
        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                window.location.href = 'contato.html';
            });
        }
    });

    // Animação de entrada dos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    tireCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
