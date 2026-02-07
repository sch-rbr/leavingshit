document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let clusterInProgress = false;

    // Function to create a new cluster
    function createCluster() {
        if (clusterInProgress) return;

        clusterInProgress = true;
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

        cluster.addEventListener('mouseenter', () => {
            explodeCluster(cluster);
        });

        body.appendChild(cluster);
    }

    // Function to handle the explosion of a cluster
    function explodeCluster(cluster) {
        Array.from(cluster.children).forEach((img) => {
            img.style.pointerEvents = 'none'; // Disable further interactions

            const randomX = Math.random() * window.innerWidth * 2 - window.innerWidth;
            const randomY = Math.random() * window.innerHeight * 2 - window.innerHeight;
            const randomRotation = Math.random() * 1440 - 720;
            const randomSpeed = Math.random() * 3 + 2;

            img.style.transition = `transform ${randomSpeed}s linear`;
            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
            
            img.addEventListener('transitionend', () => {
                img.style.display = 'none'; // Hide the image once off-screen

                if (Array.from(cluster.children).every(isOffScreen)) {
                    cluster.remove();
                    setTimeout(createCluster, 500); // Allow time and create new cluster
                }
            });
        });
    }

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

    // Initial call to create the first cluster
    createCluster();

});
