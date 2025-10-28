document.addEventListener('DOMContentLoaded', () => {
    // ========================
    // 1. HAMBURGER MENU (vetëm mobile)
    // ========================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    const isMobile = () => window.innerWidth <= 768;

    hamburger.addEventListener('click', () => {
        if (isMobile()) {
            navMenu.classList.toggle('active');
            hamburger.textContent = navMenu.classList.contains('active') ? '✖' : '☰';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile()) {
                navMenu.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
    });

    window.addEventListener('resize', () => {
        if (!isMobile()) {
            navMenu.classList.remove('active');
            hamburger.textContent = '☰';
        }
    });

    // ========================
    // 2. SCROLLREVEAL ANIMATIONS
    // ========================
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

    // ========================
    // 3. TYPING EFFECT ME KURSOR TË PËRHERSHËM
    // ========================
    const typingContainer = document.querySelector('.profession-typing-text');
    const typingText = document.querySelector('.typing');
    let currentLang = localStorage.getItem('language') || 'sq';
    let currentIndex = 0;

    // Kohët
    const TYPE_SPEED = 100;
    const DELETE_SPEED = 50;
    const PAUSE_AFTER_TYPE = 2000;
    const PAUSE_AFTER_DELETE = 500;

    const professions = {
        sq: ['Zhvillues i Aplikacioneve', 'Programues', 'Inxhinjer Softueri', 'Vullnetar', 'Multi-instrumentalist'],
        en: ['Web Developer', 'Programmer', 'Software Engineer', 'Volunteer', 'Multi-instrumentalist']
    };

    // Variablat për intervale
    let typeInterval = null;
    let deleteInterval = null;
    let pauseTimeout = null;

    // Krijon kursorin një herë dhe e mban përgjithmonë
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    typingText.after(cursor); // vendos kursorin pas .typing

    function clearAllTypingIntervals() {
        if (typeInterval) clearInterval(typeInterval);
        if (deleteInterval) clearInterval(deleteInterval);
        if (pauseTimeout) clearTimeout(pauseTimeout);
        typeInterval = deleteInterval = pauseTimeout = null;
    }

    function updateTypingDisplay(textSoFar) {
        typingText.textContent = textSoFar;
        // Kursor mbetet gjithmonë pas tekstit
        typingText.after(cursor);
    }

    function startTyping() {
        clearAllTypingIntervals();

        const text = professions[currentLang][currentIndex % professions[currentLang].length];
        let charIndex = 0;
        updateTypingDisplay('');

        typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                charIndex++;
                updateTypingDisplay(text.substring(0, charIndex));
            } else {
                clearInterval(typeInterval);
                typeInterval = null;
                pauseTimeout = setTimeout(startDeleting, PAUSE_AFTER_TYPE);
            }
        }, TYPE_SPEED);
    }

    function startDeleting() {
        const fullText = typingText.textContent;
        let deleteIndex = fullText.length;

        deleteInterval = setInterval(() => {
            if (deleteIndex > 0) {
                deleteIndex--;
                updateTypingDisplay(fullText.substring(0, deleteIndex));
            } else {
                clearInterval(deleteInterval);
                deleteInterval = null;
                currentIndex++;
                pauseTimeout = setTimeout(startTyping, PAUSE_AFTER_DELETE);
            }
        }, DELETE_SPEED);
    }

    // Fillo typing
    startTyping();

    // Rifillo kur ndryshon gjuha
    window.updateTyping = function () {
        currentIndex = 0;
        clearAllTypingIntervals();
        setTimeout(() => {
            startTyping();
        }, 100);
    };

    // ========================
    // 4. DARK MODE TOGGLE
    // ========================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    if (isDarkMode) {
        document.body.classList.add('dark');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });

    // ========================
    // 5. CERTIFICATE MODAL
    // ========================
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.cert-img, .view-cert-btn').forEach(item => {
        item.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImg.src = this.dataset.large || this.src;
            modalCaption.textContent = this.alt || 'Certificate';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ========================
    // 6. LANGUAGE TOGGLE
    // ========================
    const langOptions = document.querySelectorAll('.lang-option');
    const elements = document.querySelectorAll('[data-sq]');

    elements.forEach(el => {
        if (!el.dataset.original) {
            el.dataset.original = el.textContent.trim();
        }
    });

    const savedLang = localStorage.getItem('language') || 'sq';
    langOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === savedLang);
    });
    updateLanguage(savedLang);

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            updateLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });

    function updateLanguage(lang) {
        currentLang = lang;
        elements.forEach(el => {
            el.textContent = lang === 'en' ? (el.dataset.en || el.dataset.original) : el.dataset.original;
        });
        document.documentElement.lang = lang;

        if (typeof window.updateTyping === 'function') {
            window.updateTyping();
        }
    }

    // ========================
    // 7. PROFILE BACKGROUND SLIDESHOW
    // ========================
    const profileSection = document.querySelector('#profile');
    if (profileSection) {
        const backgrounds = [
            'images/image1.jpg',
            'images/image2.jpg',
            'images/image3.jpg',
            'images/image4.jpg',
            'images/image5.jpg',
        ];
        let index = 0;

        profileSection.style.backgroundImage = `url(${backgrounds[index]})`;

        const changeBackground = () => {
            index = (index + 1) % backgrounds.length;
            profileSection.style.backgroundImage = `url(${backgrounds[index]})`;
        };

        setInterval(changeBackground, 5000);
    }
});
