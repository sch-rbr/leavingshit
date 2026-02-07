document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let clusterInProgress = false; // Flag to track if a cluster can be created

    // Function to log messages for debugging
    function logMessage(message) {
        console.log(message);
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

    function createCluster() {
        if (clusterInProgress) {
            logMessage("Cluster is already in progress");
            return;
        }

        clusterInProgress = true;
        logMessage("Creating a new cluster");

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
            logMessage("Cluster mouseenter: triggering explosion");
            explodeCluster(cluster);
        });

        body.appendChild(cluster);
    }

    function explodeCluster(cluster) {
        logMessage("Exploding cluster");

        Array.from(cluster.children).forEach((img) => {
            img.style.pointerEvents = 'none';

            const randomX = Math.random() * 2000 - 1000;
            const randomY = Math.random() * 2000 - 1000;
            const randomRotation = Math.random() * 1440 - 720;
            const randomSpeed = Math.random() * 3 + 2;

            img.style.transition = `transform ${randomSpeed}s linear`;
            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;

            img.addEventListener('transitionend', () => {
                img.style.display = 'none';
                logMessage("Image transition ended and removed");

                if (Array.from(cluster.children).every(isOffScreen)) {
                    cluster.remove();
                    logMessage("Cluster removed");

                    setTimeout(() => {
                        clusterInProgress = false;
                        logMessage("Creating new cluster after explosion");
                        createCluster();
                    }, 100); // Short delay before creating a new cluster
                }
            });
        });

        setTimeout(() => {
            if (clusterInProgress) {
                logMessage("Fallback: Cluster removal");
                cluster.remove();
                clusterInProgress = false;
                createCluster();
            }
        }, 5000); // Fallback duration longer than any random speed
    }

    // Initial call to create the first cluster
    createCluster();
});
