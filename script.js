document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let allowNewCluster = true;

    function createCluster() {
        if (!allowNewCluster) return;

        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        const numImages = Math.floor(Math.random() * 4) + 2; // 2 to 5 images

        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = `img${(i % 3) + 1}.png`; // Assuming images are img1.png, img2.png, img3.png

            // Randomly scale the size between 0.5x to 3x
            const scale = Math.random() * 2.5 + 0.5;
            img.style.width = `${50 * scale}px`;

            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;
            cluster.appendChild(img);
        }

        cluster.addEventListener('mouseenter', function(e) {
            if (allowNewCluster) {
                allowNewCluster = false;
                explodeCluster(cluster);
                setTimeout(createCluster, 100); // Create a new cluster immediately after explosion start
            }
        });

        body.appendChild(cluster);
    }

    function explodeCluster(cluster) {
        Array.from(cluster.children).forEach(img => {
            img.style.pointerEvents = 'none'; // Disable interaction for each image to prevent re-trigger

            const randomX = Math.random() * 2000 - 1000; // Movement range
            const randomY = Math.random() * 2000 - 1000;
            const randomRotation = Math.random() * 1440 - 720; // Rotation range
            const transitionDuration = Math.random() * 3 + 2; // Duration between 2 to 5 seconds

            // Apply the transformations
            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
            img.style.transition = `transform ${transitionDuration}s linear`;

            img.addEventListener('transitionend', () => {
                img.remove(); // Remove the image once the transition ends
            });
        });

        // Remove the cluster after a delay to wait for all transitions to end
        setTimeout(() => {
            cluster.remove();
            allowNewCluster = true; // Allow creation of new cluster after the previous one has been removed
        }, 3000); // Use a time slightly longer than any transition duration
    }

    // Initial call to create the first cluster
    createCluster();
});

