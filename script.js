// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".welcome-text", { opacity: 0, y: 20, duration: 1, delay: 0.5 });
gsap.from(".main-title", { opacity: 0, y: 30, duration: 1.2, delay: 0.8 });
gsap.from(".profile-section", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1,
    scrollTrigger: { trigger: ".profile-section", start: "top 80%" }
});
gsap.from(".games-section", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.2,
    scrollTrigger: { trigger: ".games-section", start: "top 80%" }
});
gsap.from(".game-card", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: { trigger: ".games-grid", start: "top 80%" }
});
gsap.from(".contact-section", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.4,
    scrollTrigger: { trigger: ".contact-section", start: "top 80%" }
});

// Sound Management
let soundEnabled = true;
const clickSound = new Audio('assets/sounds/click.mp3');
const pongHitSound = new Audio('assets/sounds/pong-hit.mp3');
const snakeEatSound = new Audio('assets/sounds/snake-eat.mp3');

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if (soundEnabled) clickSound.play();
});

// Sound Toggle
const soundToggle = document.getElementById("soundToggle");
soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundToggle.querySelector("svg").innerHTML = soundEnabled ?
        `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>` :
        `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
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

// Scrollbar
const scrollThumb = document.getElementById("scrollThumb");
window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const thumbHeight = 40;
    const trackHeight = 200;
    const maxThumbTop = trackHeight - thumbHeight;
    const thumbPosition = (scrollPosition / scrollHeight) * maxThumbTop;
    scrollThumb.style.top = thumbPosition + "px";
});

// Three.js Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("background-canvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const particles = new THREE.Group();
const particleCount = 200;
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

// Profile Image Tilt
const profileImage = document.querySelector(".profile-image-container");
profileImage.addEventListener("mousemove", (e) => {
    const rect = profileImage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = y / rect.height * 30;
    const rotateY = -x / rect.width * 30;
    profileImage.querySelector(".profile-image").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
profileImage.addEventListener("mouseleave", () => {
    profileImage.querySelector(".profile-image").style.transform = `rotateX(0deg) rotateY(0deg)`;
});

// About Details Toggle
const checkButton = document.getElementById("checkButton");
const aboutDetails = document.getElementById("aboutDetails");
const closeDetails = document.getElementById("closeDetails");

checkButton.addEventListener("click", () => {
    aboutDetails.style.display = "flex";
    gsap.fromTo(".detail-box", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
    );
    if (soundEnabled) clickSound.play();
});

closeDetails.addEventListener("click", () => {
    gsap.to(".detail-box", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.2,
        onComplete: () => {
            aboutDetails.style.display = "none";
        }
    });
    if (soundEnabled) clickSound.play();
});

// Contact Form (Placeholder)
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! (This is a demo; integrate with a backend for real functionality.)");
    contactForm.reset();
    if (soundEnabled) clickSound.play();
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
        if (game === "tictactoe") initTicTacToe();
        if (game === "snake") initSnake();
        if (soundEnabled) clickSound.play();
    });
});

closeModals.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.dataset.modal;
        document.getElementById(`${modal}Modal`).classList.remove("active");
        if (soundEnabled) clickSound.play();
    });
});

// Invite Friend Buttons
document.querySelectorAll(".invite-friend").forEach(btn => {
    btn.addEventListener("click", () => {
        if (navigator.share && soundEnabled) {
            navigator.share({
                title: "Play with Nobody Knows!",
                text: "Join me in a neon-lit game adventure!",
                url: window.location.href
            });
        } else {
            alert("Sharing not supported. Copy the link to invite a friend!");
        }
        if (soundEnabled) clickSound.play();
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

        // Draw grid lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        // Draw paddles
        ctx.fillStyle = "var(--accent-color)";
        ctx.fillRect(20, leftPaddleY, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - 30, rightPaddleY, paddleWidth, paddleHeight);

        // Draw ball
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

        if (ballY <= 0 || ballY >= canvas.height) {
            ballSpeedY = -ballSpeedY;
            if (soundEnabled) pongHitSound.play();
        }

        if (
            (ballX <= 30 && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) ||
            (ballX >= canvas.width - 30 && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight)
        ) {
            ballSpeedX = -ballSpeedX * 1.05; // Slight speed increase
            if (soundEnabled) pongHitSound.play();
        }

        if (ballX <= 0) {
            rightScore++;
            resetBall();
        } else if (ballX >= canvas.width) {
            leftScore++;
            resetBall();
        }

        // AI for right paddle
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
        ballSpeedX = (Math.random() > 0.5 ? 5 : -5) * 1;
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

// Tic-Tac-Toe Game
function initTicTacToe() {
    const board = document.getElementById("ticTacToeBoard");
    const status = document.getElementById("ticTacToeStatus");
    const resetButton = document.getElementById("resetTicTacToe");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    function renderBoard() {
        board.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.textContent = gameBoard[i];
            board.appendChild(cell);
        }

        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const index = cell.dataset.index;
                if (gameBoard[index] === "" && gameActive) {
                    gameBoard[index] = currentPlayer;
                    cell.textContent = currentPlayer;
                    if (soundEnabled) clickSound.play();
                    if (checkWin()) {
                        status.textContent = `Player ${currentPlayer} Wins!`;
                        gameActive = false;
                    } else if (gameBoard.every(cell => cell !== "")) {
                        status.textContent = "It's a Draw!";
                        gameActive = false;
                    } else {
                        currentPlayer = currentPlayer === "X" ? "O" : "X";
                        status.textContent = `Player ${currentPlayer}'s Turn`;
                    }
                }
            });
        });
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => gameBoard[index] === currentPlayer)
        );
    }

    resetButton.addEventListener("click", () => {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s Turn`;
        renderBoard();
        if (soundEnabled) clickSound.play();
    });

    renderBoard();
}

// Snake Game
function initSnake() {
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;

    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0, dy = 0;
    let score = 0;
    let gameActive = true;

    function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        for (let i = 0; i < canvas.width; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        // Draw snake
        snake.forEach(segment => {
            ctx.fillStyle = "var(--accent-color)";
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });

        // Draw food
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        document.getElementById("snakeStatus").textContent = `Score: ${score}`;
    }

    function update() {
        if (!gameActive) return;

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameActive = false;
            document.getElementById("snakeStatus").textContent = `Game Over! Score: ${score}`;
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            if (soundEnabled) snakeEatSound.play();
            food = {
                x: Math.floor(Math.random() * (canvas.width / gridSize)),
                y: Math.floor(Math.random() * (canvas.height / gridSize))
            };
        } else {
            snake.pop();
        }

        draw();
    }

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                if (dy !== 1) { dx = 0; dy = -1; }
                break;
            case "ArrowDown":
                if (dy !== -1) { dx = 0; dy = 1; }
                break;
            case "ArrowLeft":
                if (dx !== 1) { dx = -1; dy = 0; }
                break;
            case "ArrowRight":
                if (dx !== -1) { dx = 1; dy = 0; }
                break;
        }
    });

    setInterval(update, 100);
}
