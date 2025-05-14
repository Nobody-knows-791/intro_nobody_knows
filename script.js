// Loading Animation
window.onload = function() {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 3000);
    applyStoredTheme();
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
    const menu = document.getElementById('theme-menu');
    const icon = document.querySelector('.theme-icon');
    menu.classList.toggle('active');
    icon.classList.toggle('rotate');
}

function setTheme(theme) {
    const body = document.body;
    body.classList.remove('bright-theme', 'dark-theme');
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.add(prefersDark ? 'dark-theme' : 'bright-theme');
    } else {
        body.classList.add(`${theme}-theme`);
    }
    localStorage.setItem('theme', theme);
    document.getElementById('theme-menu').classList.remove('active');
    document.querySelector('.theme-icon').classList.remove('rotate');
}

function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
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
    scrollBar.style.transform = 'scale(1.1)';
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = scrollNav.getBoundingClientRect();
    let y = e.clientY - rect.top - (scrollBar.offsetHeight / 2);
    const maxY = rect.height - scrollBar.offsetHeight;
    y = Math.max(0, Math.min(maxY, y));
    const scrollFraction = y / maxY;
    const scrollPosition = scrollFraction * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: scrollPosition, behavior: 'auto' });
    scrollBar.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        scrollBar.style.transform = 'scale(1)';
    }
});

window.addEventListener('scroll', () => {
    if (isDragging) return;
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

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const errorMessage = document.getElementById('contact-error');
    const telegramBotToken = '7012929916:AAH1Y87yM9xHPWLm09bcER9XSib0lGHQCIY';
    const chatId = '-1002063963254';
    const text = `New Contact Form Submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    errorMessage.style.display = 'none';

    try {
        const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text })
        });
        if (response.ok) {
            alert('Message sent successfully!');
            closeModal('contact-modal');
            document.getElementById('contact-form').reset();
        } else {
            errorMessage.textContent = 'Failed to send message. Please try again.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.style.display = 'block';
    }
});
