document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-hamburger');
    const mainNav = document.getElementById('main-nav');

    if (!menuButton || !mainNav) return;

    menuButton.setAttribute('aria-expanded', 'false');

    const toggleMenu = () => {
        const isOpen = mainNav.classList.toggle('open');
        
        // Altera o símbolo para 'X' quando aberto e '☰' quando fechado[cite: 1]
        menuButton.textContent = isOpen ? 'X' : '☰';
        menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    // Fecha o menu ao clicar fora dele no ecrã do telemóvel
    document.addEventListener('click', (event) => {
        if (!mainNav.contains(event.target) && !menuButton.contains(event.target) && mainNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Fecha automaticamente se o ecrã for redimensionado para o formato de computador
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            menuButton.textContent = '☰';
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
});