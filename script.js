document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const target = document.getElementById('target');
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('high-score');
    
    let timeLeft = 30;
    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let gameActive = false;
    let timer;
    
    // Set high score display
    highScoreDisplay.textContent = highScore;
    
    // Start game
    startBtn.addEventListener('click', startGame);
    
    // Reset game
    resetBtn.addEventListener('click', resetGame);
    
    // Target click event
    target.addEventListener('click', () => {
        if (!gameActive) return;
        
        score++;
        scoreDisplay.textContent = score;
        moveTarget();
    });
    
    function startGame() {
        gameActive = true;
        score = 0;
        timeLeft = 30;
        
        scoreDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        
        startScreen.style.display = 'none';
        target.style.display = 'block';
        
        moveTarget();
        
        // Start timer
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    function endGame() {
        gameActive = false;
        clearInterval(timer);
        target.style.display = 'none';
        
        // Update high score
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
            localStorage.setItem('highScore', highScore);
        }
        
        // Show start screen with game over message
        startScreen.innerHTML = `
            <h2>Game Over!</h2>
            <p>Skor Anda: ${score}</p>
            <p>Rekor Tertinggi: ${highScore}</p>
            <button id="start-btn">Main Lagi</button>
        `;
        startScreen.style.display = 'flex';
        
        // Reattach event listener to new button
        document.getElementById('start-btn').addEventListener('click', startGame);
    }
    
    function resetGame() {
        clearInterval(timer);
        gameActive = false;
        target.style.display = 'none';
        startScreen.style.display = 'flex';
        startScreen.innerHTML = `
            <h2>Klik Target Secepat Mungkin!</h2>
            <p>Target akan muncul di berbagai posisi. Klik secepat mungkin sebelum waktu habis!</p>
            <button id="start-btn">Mulai Game</button>
        `;
        
        // Reattach event listener
        document.getElementById('start-btn').addEventListener('click', startGame);
        
        // Reset displays
        timeDisplay.textContent = '30';
        scoreDisplay.textContent = '0';
    }
    
    function moveTarget() {
        if (!gameActive) return;
        
        const gameAreaRect = gameArea.getBoundingClientRect();
        const maxX = gameAreaRect.width - target.offsetWidth;
        const maxY = gameAreaRect.height - target.offsetHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
        
        // Random size between 40px and 80px
        const size = 40 + Math.random() * 40;
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        
        // Random color variation
        const hue = 350 + Math.random() * 20; // Red/pink range
        target.style.background = `linear-gradient(135deg, hsl(${hue}, 100%, 70%), hsl(${hue + 10}, 100%, 75%))`;
    }
});