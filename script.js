document.addEventListener('DOMContentLoaded', function () {
    const candlesContainer = document.getElementById('candles');
    const blowArea = document.getElementById('blowArea');
    const instructionsEl = document.querySelector('.instructions');
    const blowButton = document.getElementById('blowButton');

    // Initially hide candles, instructions and button
    candlesContainer.style.opacity = '0';
    blowArea.style.pointerEvents = 'none';
    instructionsEl.style.opacity = '0';
    blowButton.style.opacity = '0';

    // Create 9 candles with flames
    for (let i = 0; i < 9; i++) {
        const candle = document.createElement('div');
        candle.className = 'velas';
        candle.style.opacity = '0';

        // Create 5 flames for each candle
        for (let j = 0; j < 5; j++) {
            const flame = document.createElement('div');
            flame.className = 'fuego';
            candle.appendChild(flame);
        }

        candlesContainer.appendChild(candle);
    }

    // Wait for the final cake animation to complete
    const cremaAnimation = document.getElementById('crema');
    cremaAnimation.addEventListener('endEvent', function () {
        // Show candles container
        candlesContainer.style.opacity = '1';

        // Animate candles one by one
        const candles = document.querySelectorAll('.velas');
        candles.forEach((candle, index) => {
            setTimeout(() => {
                candle.style.opacity = '1';
                candle.style.animation = `candle-appear 0.4s ease-out forwards`;
                candle.style.animationDelay = `${index * 0.15}s`;
            }, 0);
        });

        // Show instructions
        setTimeout(() => {
            instructionsEl.style.opacity = '1';
        }, 300);

        // Show button after all candles appear
        setTimeout(() => {
            blowButton.style.opacity = '1';
            blowButton.style.pointerEvents = 'auto';
        }, candles.length * 150 + 400);
    });

    let blownCandles = 0;
    const totalCandles = 9;

    // Attach click handler to button
    blowButton.addEventListener('click', blowCandles);
    blowButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        blowCandles();
    });

    function blowCandles() {
        if (blownCandles >= totalCandles) return;
        blownCandles = totalCandles;

        // Haptic feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }

        // Disable button during animation
        blowButton.disabled = true;
        blowButton.style.pointerEvents = 'none';

        // Group flames by candle for more realistic blowing
        const candles = document.querySelectorAll('.velas');

        candles.forEach((candle, candleIndex) => {
            const flames = candle.querySelectorAll('.fuego');

            // Add a slight delay between candles
            setTimeout(() => {
                // First make the flame flicker
                flames.forEach(flame => {
                    flame.style.animation = 'flicker 0.2s 2 alternate';
                });

                // Then extinguish after flickering
                setTimeout(() => {
                    flames.forEach(flame => {
                        flame.style.opacity = '0';
                        flame.style.transform = 'scale(0)';
                        flame.style.transition = 'all 0.1s ease-out';
                    });
                }, 400);

            }, candleIndex * 50);
        });

        // Start confetti after all candles are blown
        setTimeout(createConfetti, candles.length * 80 + 500);

        // Update instructions
        setTimeout(() => {
            instructionsEl.textContent = "🎉 Your wish will come true! 🎉";
            instructionsEl.style.animation = 'bounce-in 0.6s ease-out';
        }, candles.length * 80 + 300);
    }

    function createConfetti() {
        const colors = ['#ff1493', '#ff69b4', '#ffa6d5', '#ff8c00', '#ffd700', '#00bfff', '#7b68ee', '#32cd32', '#ff6347'];

        for (let i = 0; i < 120; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            confetti.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3200);
        }

        // Additional celebratory haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 100]);
        }

        setTimeout(onConfettiEnd, 3200);
    }
});

function onConfettiEnd() {
    document.getElementById('gifContainer').style.display = 'block';
}
