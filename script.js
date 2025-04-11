// script.js
// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// Custom Scrollbar
const scrollbarThumb = document.querySelector('.scrollbar-thumb');
window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollTop = window.scrollY;
  const thumbHeight = 50; // Height of the thumb
  const trackHeight = 200; // Height of the scrollbar track
  const maxTranslate = trackHeight - thumbHeight;
  const translateY = (scrollTop / scrollHeight) * maxTranslate;
  scrollbarThumb.style.transform = `translateY(${translateY}px)`;
});

// GSAP Curvy Scroll Animation
gsap.registerPlugin(ScrollTrigger);
gsap.to('.about', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: true,
  },
  x: 100,
  ease: 'power2.out',
});

// Three.js for 3D Box Animations
const checkItBtn = document.querySelector('.check-it-btn');
const infoBoxes = document.querySelector('.info-boxes');

checkItBtn.addEventListener('click', () => {
  infoBoxes.innerHTML = `
    <div class="info-box">
      <i class="fas fa-user"></i>
      <h3>Name</h3>
      <p>NOBODY KNOWS</p>
    </div>
    <div class="info-box">
      <i class="fas fa-globe"></i>
      <h3>Country, State</h3>
      <p>India, Haryana</p>
    </div>
    <div class="info-box">
      <i class="fas fa-calendar"></i>
      <h3>Age</h3>
      <p>18</p>
      <i class="fas fa-times close-box"></i>
    </div>
  `;

  // Animate boxes with GSAP
  gsap.fromTo(
    '.info-box',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
  );

  // Close button functionality
  document.querySelectorAll('.close-box').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.target.parentElement.remove();
    });
  });
});

// Three.js Background Animation (Simple Particle Effect)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const particles = new THREE.BufferGeometry();
const particleCount = 1000;
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 2000;
}

particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMaterial = new THREE.PointsMaterial({
  color: 0x00ffcc,
  size: 5,
  transparent: true,
  opacity: 0.5,
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);
camera.position.z = 1000;

function animate() {
  requestAnimationFrame(animate);
  particleSystem.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();
