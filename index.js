document.addEventListener('DOMContentLoaded', function() {
	// Navegação por botões
	const btnContato = document.getElementById('btn-contato');
	const btnServicos = document.getElementById('btn-servicos');
	const btnHistoria = document.getElementById('btn-historia');
	const btnOrcamento = document.getElementById('btn-orcamento');
	const btnContatoFinal = document.getElementById('btn-contato-final');

	// Attach behavior to specific IDs (preserve existing logic)
	if (btnContato) {
		btnContato.addEventListener('click', function() { window.location.href = 'contato.html'; });
	}
	if (btnServicos) {
		btnServicos.addEventListener('click', function() { window.location.href = 'servicos.html'; });
	}
	if (btnHistoria) {
		btnHistoria.addEventListener('click', function() {
			const historiaSection = document.getElementById('nossa-historia');
			if (historiaSection) {
				historiaSection.scrollIntoView({ behavior: 'smooth' });
			}
		});
	}

	// Orçamento: redireciona sempre para contato
	if (btnOrcamento) {
		btnOrcamento.addEventListener('click', function() { window.location.href = 'contato.html'; });
	}
	if (btnContatoFinal) {
		btnContatoFinal.addEventListener('click', function() { window.location.href = 'contato.html'; });
	}

	// Attach handlers to any .contact-btn in case other pages include them without IDs
	document.querySelectorAll('.contact-btn').forEach(function(btn) {
		btn.addEventListener('click', function(e) {
			// If button has an id we let the specific handlers run; otherwise default to contato
			if (btn.id && (btn.id === 'btn-contato' || btn.id === 'btn-servicos' || btn.id === 'btn-historia')) return;
			window.location.href = 'contato.html';
		});
	});

	// Fallback amplo: qualquer botão/link com texto de orçamento leva a contato
	document.querySelectorAll('button, a').forEach(function(el) {
		const label = (el.textContent || '').trim().toLowerCase();
		if (label && label.includes('solicit') && label.includes('orçamento')) {
			el.addEventListener('click', function(e) {
				// evita comportamento padrão (ex.: # ou outro link)
				e.preventDefault();
				window.location.href = 'contato.html';
			});
		}
	});

	// Rolagem suave para links no nav (se houver links internos)
	document.querySelectorAll('nav a').forEach(function(anchor) {
		anchor.addEventListener('click', function(e) {
			const href = this.getAttribute('href');
			if (href && href.startsWith('#')) {
				e.preventDefault();
				const el = document.querySelector(href);
				if (el) el.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	// Ano dinâmico no rodapé
	const yearSpan = document.getElementById('footer-year');
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}

		// Menu hamburguer
		const burger = document.getElementById('burger');
		const mainNav = document.getElementById('main-nav');

		if (burger && mainNav) {
				const firstNavLink = mainNav.querySelector('a');

					// Off-canvas behavior
					// cria overlay (se ainda não existir)
					let overlay = document.querySelector('.offcanvas-overlay');
					if (!overlay) {
						overlay = document.createElement('div');
						overlay.className = 'offcanvas-overlay';
						document.body.appendChild(overlay);
					}

					function openMenu() {
						mainNav.classList.add('off-open');
						overlay.classList.add('active');
						document.body.style.overflow = 'hidden'; // evita scroll por trás
						burger.setAttribute('aria-expanded', 'true');
						if (firstNavLink) firstNavLink.focus();
					}

					function closeMenu() {
						mainNav.classList.remove('off-open');
						overlay.classList.remove('active');
						document.body.style.overflow = ''; // restaura scroll
						burger.setAttribute('aria-expanded', 'false');
						burger.focus();
					}

				burger.addEventListener('click', function(e) {
					e.stopPropagation();
					// toggle off-canvas state
					if (mainNav.classList.contains('off-open')) closeMenu(); else openMenu();
				});

					// fechar ao clicar fora (overlay)
					overlay.addEventListener('click', function() {
						closeMenu();
					});

					// fechar com Esc
					document.addEventListener('keydown', function(e) {
						if (e.key === 'Escape') closeMenu();
					});

					// fechar ao redimensionar para evitar estado inconsistente
					window.addEventListener('resize', function() {
						if (window.innerWidth > 768 && mainNav.classList.contains('off-open')) {
							// garantir que nav volte ao estado padrão em desktop
							mainNav.classList.remove('off-open');
							overlay.classList.remove('active');
							burger.setAttribute('aria-expanded', 'false');
							document.body.style.overflow = '';
						}
					});
		}

	// ===== ANIMAÇÕES DE SCROLL PARA PÁGINA SOBRE =====
	
	// Intersection Observer para animações de entrada
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate-in');
			}
		});
	}, observerOptions);

	// Observar elementos que devem ser animados
	document.addEventListener('DOMContentLoaded', function() {
		const animatedElements = document.querySelectorAll('.about-block, .feature-card, .about-header');
		animatedElements.forEach(el => {
			observer.observe(el);
		});
	});

	// Efeito parallax para backgrounds
	window.addEventListener('scroll', function() {
		const scrolled = window.pageYOffset;
		const parallaxElements = document.querySelectorAll('.sobre-historia, .sobre-missao, .sobre-diferenciais');
		
		parallaxElements.forEach(element => {
			const speed = 0.5;
			element.style.transform = `translateY(${scrolled * speed}px)`;
		});
	});

	// Animação de contador para números (se houver)
	function animateCounter(element, target, duration = 2000) {
		let start = 0;
		const increment = target / (duration / 16);
		
		function updateCounter() {
			start += increment;
			if (start < target) {
				element.textContent = Math.floor(start);
				requestAnimationFrame(updateCounter);
			} else {
				element.textContent = target;
			}
		}
		updateCounter();
	}

	// Efeito de hover suave para cards
	document.querySelectorAll('.feature-card').forEach(card => {
		card.addEventListener('mousemove', function(e) {
			const rect = this.getBoundingClientRect();
			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;
			
			this.style.transform = `translateY(-8px) scale(1.02) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`;
		});
		
		card.addEventListener('mouseleave', function() {
			this.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
		});
	});

	// Efeito de typing mais suave para títulos principais
	function typeWriter(element, text, speed = 80) {
		let i = 0;
		element.innerHTML = '';
		
		function type() {
			if (i < text.length) {
				element.innerHTML += text.charAt(i);
				i++;
				setTimeout(type, speed);
			}
		}
		type();
	}

	// Aplicar efeito de typing aos títulos quando visíveis
	const titleObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const title = entry.target;
				const originalText = title.textContent;
				typeWriter(title, originalText, 60);
				titleObserver.unobserve(title);
			}
		});
	}, { threshold: 0.5 });

	document.addEventListener('DOMContentLoaded', function() {
		const titles = document.querySelectorAll('.about h1');
		titles.forEach(title => {
			titleObserver.observe(title);
		});
	});
});
