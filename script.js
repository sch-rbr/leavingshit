document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let canCreateNewCluster = true;

    function createCluster() {
        if (!canCreateNewCluster) return;

        canCreateNewCluster = false;

        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.position = 'absolute';
        cluster.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        const numImages = Math.floor(Math.random() * 4) + 2; // 2 to 5 images

        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = `img${(i % 3) + 1}.png`; // Assuming images are img1.png, img2.png, img3.png

            const scale = Math.random() * 2.5 + 0.5;
            img.style.width = `${50 * scale}px`;
            img.style.position = 'absolute';
            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;
            cluster.appendChild(img);
        }

        cluster.addEventListener('mouseenter', () => {
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
            
            img.addEventListener('transitionend', () => {
                img.style.display = 'none';
                if (Array.from(cluster.children).every(isOffScreen)) {
                    cluster.remove();
                }
            });
        });

        // Set a timeout to create a new cluster, ensuring the current one has exploded thoroughly
        setTimeout(() => {
            canCreateNewCluster = true;
            createCluster(); // Create a new cluster
        }, 2000); // Adjust timeout based on the slowest possible transition
    }

    // Helper function to check if an element is off the screen
    function isOffScreen(element) {
        const rect = element.getBoundingClientRect();
        return rect.top > window.innerHeight || rect.left > window.innerWidth || rect.bottom < 0 || rect.right < 0;
    }

    // Initial call to create the first cluster
    createCluster();
});

