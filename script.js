// Loading Animation with Three.js
window.onload = function() {
    initLoadingAnimation();
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 3000);
};

function initLoadingAnimation() {
    const canvas = document.getElementById('rope-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.width, canvas.height);

    const ropes = [];
    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
        const material = new THREE.MeshBasicMaterial({ color: i === 0 ? 0x00f7ff : i === 1 ? 0xa100ff : 0xe0e0e0 });
        const rope = new THREE.Mesh(geometry, material);
        rope.rotation.x = Math.PI / 2;
        rope.position.z = -2;
        scene.add(rope);
        ropes.push(rope);
    }

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        ropes.forEach((rope, i) => {
            rope.rotation.y += 0.02 * (i + 1);
            rope.rotation.x += 0.01 * (i + 1);
        });
        renderer.render(scene, camera);
    }
    animate();
}

// 3D Background with Three.js
function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    const particles = new THREE.Group();
    for (let i = 0; i < 200; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x00f7ff });
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        particles.add(particle);
    }
    scene.add(particles);

    camera.position.z = 20;

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();
}
initBackground();

// Show Loading for Modals
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
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '☼' : '☾';
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

// Shadow Squad 3D Carousel
let currentMember = 0;
const members = document.querySelectorAll('.member-3d');
function updateCarousel() {
    members.forEach((member, index) => {
        const angle = (index - currentMember) * 120;
        member.style.transform = `translateX(-50%) rotateY(${angle}deg) translateZ(400px)`;
        member.style.opacity = index === currentMember ? 1 : 0.5;
    });
}
updateCarousel();
setInterval(() => {
    currentMember = (currentMember + 1) % members.length;
    updateCarousel();
}, 5000);

// Scroll to Section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll Navigation Orb
const scrollOrb = document.querySelector('.scroll-orb');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const orbRange = 200 - 16; // Scroll-nav height minus orb height
    const scrollFraction = scrollPosition / (documentHeight - windowHeight);
    scrollOrb.style.transform = `translateY(${scrollFraction * orbRange}px)`;
});

scrollOrb.addEventListener('click', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollPosition > 100) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (scrollPosition + windowHeight < documentHeight - 100) {
        window.scrollTo({ top: documentHeight, behavior: 'smooth' });
    }
});

// Parallax and Fade-In
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            section.classList.add('visible');
        }
    });
});

// GSAP Animations
gsap.from('.header-text', { y: 100, opacity: 0, duration: 1, ease: 'power3.out' });
sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});