document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let clusterExploded = false;

    // Helper function to check if all elements are off the screen
    function allOffScreen(elements) {
        return elements.every(element => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top > window.innerHeight ||
                rect.left > window.innerWidth ||
                rect.bottom < 0 ||
                rect.right < 0
            );
        });
    }

    function createCluster() {
        if (clusterExploded) return;

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

        const images = Array.from(cluster.children);

        images.forEach((img) => {
            img.style.pointerEvents = 'none'; // Disable interaction for each image

            const randomX = Math.random() * window.innerWidth * 2 - window.innerWidth;  // Ensure off-screen movement
            const randomY = Math.random() * window.innerHeight * 2 - window.innerHeight;
            const randomRotation = Math.random() * 1440 - 720; // More rotation for spin

            // Apply transformation and transition
            img.style.transition = `transform 4s linear`;
            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
        });

        // Wait until all animations are supposed to have finished
        setTimeout(() => {
            // Remove images and cluster if all are off-screen
            if (allOffScreen(images)) {
                images.forEach(img => img.remove());
                cluster.remove();

                clusterExploded = false;
                setTimeout(createCluster, 500); // Create a new cluster after a short delay
            }
        }, 4000); // 4 seconds matches the transition duration
    }

    // Initial call to create the first cluster
    createCluster();
});
