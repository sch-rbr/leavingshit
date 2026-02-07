document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let clusterExploding = false;

    // Helper function to create a cluster and append it to the body
    function createCluster() {
        if (clusterExploding) return;

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

        cluster.addEventListener('mouseenter', function () {
            if (!clusterExploding) {
                clusterExploding = true;
                explodeCluster(cluster);
            }
        });

        body.appendChild(cluster);
    }

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

    // Handle cluster explosion
    function explodeCluster(cluster) {
        console.log("Cluster exploding");

        Array.from(cluster.children).forEach((img) => {
            img.style.pointerEvents = 'none'; // Disable interaction for each image

            const randomX = Math.random() * 2000 - 1000;
            const randomY = Math.random() * 2000 - 1000;
            const randomRotation = Math.random() * 1440 - 720;

            // Set final positions off-screen and spin values using CSS variables
            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
            img.style.transition = `transform 2s linear`;

            // Ensure images continue moving off-screen and are hidden afterwards
            img.addEventListener('transitionend', () => {
                img.style.display = 'none'; // Hide the image once off-screen

                if (allOffScreen(Array.from(cluster.children))) {
                    console.log("Cluster fully off-screen, removing");
                    cluster.remove();
                    clusterExploding = false;
                    setTimeout(createCluster, 500); // Create a new cluster after a short delay
                }
            });
        });
    }

    // Initial call to create the first cluster
    createCluster();
});
