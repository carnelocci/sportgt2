// Galeria de Produtos JavaScript para página "Serviços"
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.products-gallery');
    const products = document.querySelectorAll('.product-card');
    const prevBtn = document.getElementById('prev-gallery');
    const nextBtn = document.getElementById('next-gallery');
    const indicators = document.querySelectorAll('.gallery-indicator');
    
    let currentProduct = 0;
    const totalProducts = products.length;
    
    // Função para atualizar a galeria
    function updateGallery() {
        // Remove classe active de todos os produtos
        products.forEach(product => product.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Adiciona classe active ao produto atual
        products[currentProduct].classList.add('active');
        indicators[currentProduct].classList.add('active');
        
        // Scroll suave para o produto ativo
        if (gallery) {
            const productWidth = products[0].offsetWidth + 30; // largura + gap
            const scrollPosition = currentProduct * productWidth;
            gallery.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Função para ir para o próximo produto
    function nextProduct() {
        currentProduct = (currentProduct + 1) % totalProducts;
        updateGallery();
    }
    
    // Função para ir para o produto anterior
    function prevProduct() {
        currentProduct = (currentProduct - 1 + totalProducts) % totalProducts;
        updateGallery();
    }
    
    // Função para ir para um produto específico
    function goToProduct(productIndex) {
        currentProduct = productIndex;
        updateGallery();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextProduct);
    if (prevBtn) prevBtn.addEventListener('click', prevProduct);
    
    // Event listeners para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToProduct(index));
    });
    
    // Auto-play da galeria
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextProduct, 4000); // Muda a cada 4 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Inicia o auto-play
    startAutoPlay();
    
    // Pausa o auto-play quando o mouse está sobre a galeria
    if (gallery) {
        gallery.addEventListener('mouseenter', stopAutoPlay);
        gallery.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Pausa o auto-play quando a página não está visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevProduct();
        } else if (e.key === 'ArrowRight') {
            nextProduct();
        }
    });
    
    // Touch/swipe support para dispositivos móveis
    let startX = 0;
    let endX = 0;
    
    if (gallery) {
        gallery.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        gallery.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const threshold = 50; // Mínimo de movimento para considerar um swipe
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextProduct(); // Swipe para a esquerda = próximo produto
            } else {
                prevProduct(); // Swipe para a direita = produto anterior
            }
        }
    }
    
    // Inicializa a galeria
    updateGallery();
    
    // Adiciona animações suaves aos produtos
    products.forEach((product, index) => {
        product.style.transition = 'all 0.3s ease';
        
        // Adiciona delay escalonado para animação de entrada
        setTimeout(() => {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Detecta scroll manual e atualiza o produto ativo
    if (gallery) {
        gallery.addEventListener('scroll', function() {
            const productWidth = products[0].offsetWidth + 30;
            const scrollPosition = gallery.scrollLeft;
            const newActiveProduct = Math.round(scrollPosition / productWidth);
            
            if (newActiveProduct !== currentProduct && newActiveProduct >= 0 && newActiveProduct < totalProducts) {
                currentProduct = newActiveProduct;
                indicators.forEach(indicator => indicator.classList.remove('active'));
                indicators[currentProduct].classList.add('active');
            }
        });
    }
});
