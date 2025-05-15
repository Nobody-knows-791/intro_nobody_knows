// Loading Animation
window.onload = function() {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 3000);
    applyStoredTheme();
};

// Show Modal with Loading
function showLoading(modalId) {
    if (!modalId || modalId === 'shadow-squad') {
        document.getElementById(modalId).style.display = 'flex';
        return;
    }
    const loading = document.getElementById('loading');
    const modal = document.getElementById(modalId);
    if (modal) {
        loading.style.display = 'flex';
        setTimeout(() => {
            loading.style.display = 'none';
            modal.style.display = 'flex';
        }, 1000);
    }
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
    const themeIcon = document.querySelector('.theme-icon');
    body.classList.remove('bright-theme', 'dark-theme');
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.add(prefersDark ? 'dark-theme' : 'bright-theme');
        themeIcon.src = prefersDark ? 'https://cdn-icons-png.flaticon.com/512/547/547433.png' : 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png';
    } else {
        body.classList.add(`${theme}-theme`);
        themeIcon.src = theme === 'dark' ? 'https://cdn-icons-png.flaticon.com/512/547/547433.png' : 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png';
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
    const telegramBotToken = '7433197315:AAFFMezqvRFGgWtwk5AMkoFrjpnShG3q8Bw'; // Replace with your valid bot token
    const chatId = '-1002273852179'; // Replace with your valid chat ID
    const text = `New Contact Form Submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    errorMessage.style.display = 'none';

    try {
        const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text })
        });
        const result = await response.json();
        if (result.ok) {
            alert('Message sent successfully!');
            closeModal('contact-modal');
            document.getElementById('contact-form').reset();
        } else {
            console.error('Telegram API error:', result);
            errorMessage.textContent = 'Failed to send message. Please check bot settings.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.style.display = 'block';
    }
});
