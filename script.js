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
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.innerHTML = document.body.classList.contains('light-theme') ? '<path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8z"/>' : '<path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm0-14a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6z"/>';
}

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
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Draggable Scroll Bar
const scrollNav = document.querySelector('.scroll-nav');
const scrollBar = document.querySelector('.scroll-bar');
let isDragging = false;

scrollBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    scrollBar.style.background = '#666666';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = scrollNav.getBoundingClientRect();
    const y = e.clientY - rect.top - (scrollBar.offsetHeight / 2);
    const maxY = rect.height - scrollBar.offsetHeight;
    const scrollFraction = Math.max(0, Math.min(1, y / maxY));
    const scrollPosition = scrollFraction * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: scrollPosition, behavior: 'auto' });
    scrollBar.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        scrollBar.style.background = '#1A1A1A';
    }
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollFraction = scrollPosition / (documentHeight - windowHeight);
    const maxY = scrollNav.offsetHeight - scrollBar.offsetHeight;
    scrollBar.style.top = `${scrollFraction * maxY}px`;
});

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
});