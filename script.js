// Loading Animation
window.onload = function() {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 3000);
};

function showLoading(modalId) {
    const loading = document.getElementById('loading');
    if (modalId === 'shadow-squad') {
        document.getElementById(modalId).style.display = 'block';
        return;
    }
    loading.style.display = 'flex';
    setTimeout(() => {
        loading.style.display = 'none';
        document.getElementById(modalId).style.display = 'flex';
    }, 1000);
}

// Theme Toggle
function toggleThemeMenu() {
    const themeMenu = document.getElementById('theme-menu');
    themeMenu.classList.toggle('active');
}

function setTheme(theme) {
    const body = document.body;
    body.classList.remove('bright-theme', 'dark-theme', 'system-theme');
    body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
    document.getElementById('theme-menu').classList.remove('active');
}

// Apply saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Modal Functions
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Creations Filter
function filterCreations(category) {
    const creations = document.querySelectorAll('.creation');
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    creations.forEach(creation => {
        if (category === 'all' || creation.getAttribute('data-category').includes(category)) {
            creation.style.display = 'block';
        } else {
            creation.style.display = 'none';
        }
    });
}

// Scroll to Section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    updateActiveNav();
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateActiveNav();
}

// Update Active Navigation Item
function updateActiveNav() {
    const navItems = document.querySelectorAll('.vertical-nav .nav-item');
    const sections = ['home', 'about', 'creations', 'shadow-squad'];
    let currentSection = 'home';

    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
            currentSection = section;
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
}

// Fade-In on Scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            section.classList.add('visible');
        }
    });
    const bottomNav = document.querySelector('.bottom-nav');
    bottomNav.style.transform = `translateX(-50%) translateY(${window.scrollY * 0.1}px)`;
    updateActiveNav();
});
