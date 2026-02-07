document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let clusterInProgress = false;

    // Check if an element is off the screen
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
        // Create a new cluster only if there is no current cluster in progress
        if (clusterInProgress) return;

        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        const numImages = Math.floor(Math.random() * 4) + 2; // 2 to 5 images

        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = `img${(i % 3) + 1}.png`; // Assume images are img1.png, img2.png, img3.png

            // Randomly scale the image between 0.5x and 3x
            const scale = Math.random() * 2.5 + 0.5;
            img.style.width = `${50 * scale}px`;

            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;
            cluster.appendChild(img);
        }

        cluster.addEventListener('mouseenter', function() {
            if (!clusterInProgress) {
                clusterInProgress = true;
                explodeCluster(cluster);
                setTimeout(createCluster, 10); // Trigger a new cluster immediately
            }
        });

        body.appendChild(cluster);
    }

    function explodeCluster(cluster) {
        Array.from(cluster.children).forEach((img) => {
            img.style.pointerEvents = 'none'; // Disable interaction for each image

            const randomX = Math.random() * 2000 - 1000;
            const randomY = Math.random() * 2000 - 1000;
            const randomRotation = Math.random() * 1440 - 720;

            // Apply transformation and transition
            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
            img.style.transition = 'transform 2s linear';
        });

        setTimeout(() => {
            cluster.remove(); // Remove the cluster after 2 seconds (usually after the transition ends)
            clusterInProgress = false; // Allow a new cluster to be created
        }, 2000); // Match the transition duration
    }

    // Initial call to create the first cluster
    createCluster();
});
