// GSAP Animations
gsap.from(".main-title", { opacity: 0, y: 30, duration: 1.2, delay: 0.8 });
gsap.from(".profile-section", { opacity: 0, y: 30, duration: 1, delay: 1, scrollTrigger: { trigger: ".profile-section", start: "top 80%" } });
gsap.from(".games-section", { opacity: 0, y: 30, duration: 1, delay: 1.2, scrollTrigger: { trigger: ".games-section", start: "top 80%" } });

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
});

// Custom Cursor
const cursor = document.getElementById("custom-cursor");
const trail = document.getElementById("cursor-trail");

document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

    gsap.to(trail, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: () => {
            trail.style.left = mouseX + "px";
            trail.style.top = mouseY + "px";
        }
    });
});

// Three.js Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("background-canvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const particles = new THREE.Group();
const particleCount = 100;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ color: 0x00ffe1, size: 0.5, transparent: true, opacity: 0.6 });
const particleSystem = new THREE.Points(geometry, material);
particles.add(particleSystem);
scene.add(particles);

camera.position.z = 50;

function animateParticles() {
    requestAnimationFrame(animateParticles);
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animateParticles();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Game Modals
const playButtons = document.querySelectorAll(".play-button");
const modals = document.querySelectorAll(".game-modal");
const closeModals = document.querySelectorAll(".close-modal");

playButtons.forEach(button => {
    button.addEventListener("click", () => {
        const game = button.dataset.game;
        document.getElementById(`${game}Modal`).classList.add("active");
        if (game === "pong") initPong();
    });
});

closeModals.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.dataset.modal;
        document.getElementById(`${modal}Modal`).classList.remove("active");
    });
});

// Pong Game
function initPong() {
    const canvas = document.getElementById("pongCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;

    const paddleWidth = 10, paddleHeight = 100, ballSize = 15;
    let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2, ballY = canvas.height / 2;
    let ballSpeedX = 5, ballSpeedY = 5;
    let leftScore = 0, rightScore = 0;

    function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "var(--accent-color)";
        ctx.fillRect(20, leftPaddleY, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - 30, rightPaddleY, paddleWidth, paddleHeight);

        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();

        document.getElementById("pongScore").textContent = `${leftScore} - ${rightScore}`;
    }

    function update() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY <= 0 || ballY >= canvas.height) ballSpeedY = -ballSpeedY;

        if (
            (ballX <= 30 && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) ||
            (ballX >= canvas.width - 30 && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        if (ballX <= 0) {
            rightScore++;
            resetBall();
        } else if (ballX >= canvas.width) {
            leftScore++;
            resetBall();
        }

        // Simple AI for right paddle
        const paddleCenter = rightPaddleY + paddleHeight / 2;
        if (paddleCenter < ballY - 35) {
            rightPaddleY += 4;
        } else if (paddleCenter > ballY + 35) {
            rightPaddleY -= 4;
        }

        if (rightPaddleY < 0) rightPaddleY = 0;
        if (rightPaddleY > canvas.height - paddleHeight) rightPaddleY = canvas.height - paddleHeight;

        draw();
    }

    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
        ballSpeedY = Math.random() * 10 - 5;
    }

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        leftPaddleY = e.clientY - rect.top - paddleHeight / 2;
        if (leftPaddleY < 0) leftPaddleY = 0;
        if (leftPaddleY > canvas.height - paddleHeight) leftPaddleY = canvas.height - paddleHeight;
    });

    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
