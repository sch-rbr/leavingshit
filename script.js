document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let clusterExploded = false;

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

        cluster.hasExploded = false;
        cluster.addEventListener('mouseenter', function() {
            if (!cluster.hasExploded) {
                cluster.hasExploded = true;
                explodeCluster(cluster);
            }
        });

        body.appendChild(cluster);
    }

    function explodeCluster(cluster) {
        clusterExploded = true;

        Array.from(cluster.children).forEach((img, index) => {
            img.style.pointerEvents = 'none'; // Disable interaction for each image
            
            const randomX = Math.random() * 4000 - 2000;  // Larger range for off-screen movement
            const randomY = Math.random() * 4000 - 2000;
            const randomRotation = Math.random() * 1440 - 720; // More rotation for spin
            const randomSpeed = Math.random() * 3 + 2; // Varied speed

            // Set final positions off-screen and spin values using CSS variables
            img.style.setProperty('--x', `${randomX}px`);
            img.style.setProperty('--y', `${randomY}px`);
            img.style.setProperty('--rotation', `${randomRotation}deg`);

            // Start the animation
            img.style.animation = `explodeAndSpin ${randomSpeed}s linear forwards`;

            // Ensure images continue moving off-screen
            img.addEventListener('animationend', () => {
                img.style.display = 'none'; // Hide the image once off-screen

                // If all images are off-screen, remove the cluster and create a new one
                if (Array.from(cluster.children).every(child => isOffScreen(child))) {
                    cluster.remove();
                    setTimeout(() => {
                        clusterExploded = false;
                        createCluster();
                    }, 500); // Create a new cluster after a short delay
                }
            });
        });
    }

    // Initial call to create the first cluster
    createCluster();
});
