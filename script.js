ocument.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let allowNewCluster = true;

    // Helper function to check if an element is off the screen
    function isOffScreen(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top > window.innerHeight ||
            rect.left > window.innerWidth ||
            rect.bottom < 0 ||
            rect.right < 0
        );
    }

    function createCluster() {
        if (!allowNewCluster) return;
        allowNewCluster = false;

        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        const numImages = Math.floor(Math.random() * 4) + 2; // 2 to 5 images

        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = `img${(i % 3) + 1}.png`; // Assuming images are img1.png, img2.png, img3.png

            // Randomly scale the size between 0.5x and 3x
            const scale = Math.random() * 2.5 + 0.5;
            img.style.width = `${50 * scale}px`;

            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;
            cluster.appendChild(img);
        }

        // Immediate cluster creation on explosion
        cluster.addEventListener("mouseenter", explodeCluster);

        body.appendChild(cluster);
    }

    function explodeCluster() {
        const cluster = this;
        cluster.removeEventListener("mouseenter", explodeCluster); // Prevent additional interactions

        // Start the explosion process
        Array.from(cluster.children).forEach((img, index) => {
            // Disable further mouse interactions for this cluster
            img.style.pointerEvents = 'none';

            const randomX = Math.random() * 2000 - 1000;  // Larger range for off-screen movement
            const randomY = Math.random() * 2000 - 1000;
            const randomRotation = Math.random() * 1440 - 720; // More rotation for spin
            const randomSpeed = Math.random() * 3 + 2; // Varied speed

            // Set final positions off-screen and spin values using CSS variables
            img.style.setProperty('--x', `${randomX}px`);
            img.style.setProperty('--y', `${randomY}px`);
            img.style.setProperty('--rotation', `${randomRotation}deg`);

            // Start the animation
            img.style.animation = `explodeAndSpin ${randomSpeed}s linear forwards`;
            
            // Ensure images continue moving off-screen
            const continueMoving = setInterval(() => {
                if (isOffScreen(img)) {
                    clearInterval(continueMoving);
                    img.style.display = 'none'; // Hide the image once off-screen
                } else {
                    img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
                }
            }, 16); // Roughly 60 frames per second
        });

        setTimeout(() => {
            // Clean up the old cluster after it has moved off-screen
            cluster.remove();

            // Allow creation of a new cluster
            allowNewCluster = true;
            createCluster();
        }, 4000); // Ensure objects leave the screen
    }

    createCluster();
});
