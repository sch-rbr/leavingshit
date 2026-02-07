document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

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

    // Function to create a new cluster
    function createCluster() {
        if (document.querySelectorAll('.img-container').length > 0) return; // Ensure only one active cluster exists

        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        const numImages = Math.floor(Math.random() * 4) + 2; // 2 to 5 images

        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = `img${(i % 3) + 1}.png`; // img1.png, img2.png, img3.png

            // Randomly scale the size between 0.5x and 3x
            const scale = Math.random() * 2.5 + 0.5;
            img.style.width = `${50 * scale}px`;

            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;
            cluster.appendChild(img);
        }

        // Add a flag to the cluster indicating whether it has exploded
        cluster.hasExploded = false;
        cluster.addEventListener("mouseenter", explodeCluster);

        body.appendChild(cluster);
    }

    // Function to handle exploding the cluster
    function explodeCluster() {
        const cluster = this;

        // Check if the cluster has already exploded
        if (cluster.hasExploded) return;
        cluster.hasExploded = true;

        cluster.style.pointerEvents = 'none'; // Disable further interactions with this cluster

        // Start the explosion process
        Array.from(cluster.children).forEach((img) => {
            img.style.pointerEvents = 'none'; // Disable interaction for each image

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

                    // Check if all images are off-screen and removed
                    if (Array.from(cluster.children).every(isOffScreen)) {
                        cluster.remove();
                        createCluster(); // Create a new cluster after the explosion finishes
                    }
                } else {
                    img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
                }
            }, 16); // Roughly 60 frames per second
        });
    }

    // Initial call to create the first cluster
    createCluster();
});
