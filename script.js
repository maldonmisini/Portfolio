document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Smooth Scroll për Nav Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            navMenu.classList.remove('active');
            hamburger.textContent = '☰';
        });
    });

    // ScrollReveal Animacione
    ScrollReveal().reveal('.hero-content', {
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        duration: 1000
    });

    ScrollReveal().reveal('.skill-card', {
        delay: 300,
        distance: '30px',
        origin: 'bottom',
        interval: 200
    });

    ScrollReveal().reveal('.timeline-item', {
        delay: 300,
        distance: '30px',
        origin: 'left',
        interval: 200
    });

    ScrollReveal().reveal('.cert-card', {
        delay: 300,
        distance: '30px',
        origin: 'right',
        interval: 200
    });

    ScrollReveal().reveal('.hobby-card', {
        delay: 300,
        distance: '30px',
        origin: 'bottom',
        interval: 200
    });

    ScrollReveal().reveal('.contact-info', {
        delay: 300,
        distance: '50px',
        origin: 'bottom',
        duration: 1000
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        darkModeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });

    // Certificate Modal
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.cert-img, .view-cert-btn').forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.dataset.large || this.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Language Toggle
    const langOptions = document.querySelectorAll('.lang-option');
    const elements = document.querySelectorAll('[data-sq]');
    elements.forEach(el => {
        el.dataset.original = el.textContent;
    });

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            elements.forEach(el => {
                el.textContent = lang === 'en' ? el.dataset.en : el.dataset.original;
            });
            document.documentElement.lang = lang;
        });
    });
});
