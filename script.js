document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let clusterInProgress = false; // Flag to check if a cluster is in progress

    function createCluster() {
        if (clusterInProgress) return; // If a cluster is in progress, do not create a new one

        clusterInProgress = true;
        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.position = 'absolute';
        cluster.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        const numImages = Math.floor(Math.random() * 4) + 2; // 2 to 5 images

        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = `img${(i % 3) + 1}.png`; // Assuming images are img1.png, img2.png, img3.png

            // Randomly scale the size between 0.5x and 3x
            const scale = Math.random() * 2.5 + 0.5;
            img.style.width = `${50 * scale}px`;
            img.style.position = 'absolute';
            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;

            cluster.appendChild(img);
        }

        cluster.addEventListener('mouseenter', () => {
            if (!clusterInProgress) return; // Prevent multiple triggers

            explodeCluster(cluster);
        });

        body.appendChild(cluster);
    }

    function explodeCluster(cluster) {
        Array.from(cluster.children).forEach((img) => {
            img.style.pointerEvents = 'none'; // Disable interaction for each image

            const randomX = Math.random() * 2000 - 1000;
            const randomY = Math.random() * 2000 - 1000;
            const randomRotation = Math.random() * 1440 - 720;
            const randomSpeed = Math.random() * 3 + 2;

            img.style.transition = `transform ${randomSpeed}s linear`;
            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
            
            // Ensure images are removed after the transition
            img.addEventListener('transitionend', () => {
                img.remove();
            });
        });

        // Remove the cluster after the longest transition time ends
        setTimeout(() => {
            cluster.remove();
            clusterInProgress = false; // Allow a new cluster to be created
            createCluster(); // Create a new cluster immediately after the explosion
        }, 5000); // Using a duration longer than any random speed for safety
    }

    // Initial call to create the first cluster
    createCluster();
});
