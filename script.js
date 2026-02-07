document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    function createCluster() {
        console.log("Creating a new cluster");

        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.position = 'absolute';
        cluster.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        const numImages = Math.floor(Math.random() * 4) + 2; // Create 2 to 5 images

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
            createCluster(); // Create a new cluster immediately when the explosion starts
        });

        body.appendChild(cluster);
    }

    function explodeCluster(cluster) {
        console.log("Exploding cluster");

        Array.from(cluster.children).forEach((img) => {
            img.style.pointerEvents = 'none';

            const randomX = Math.random() * 2000 - 1000;
            const randomY = Math.random() * 2000 - 1000;
            const randomRotation = Math.random() * 1440 - 720;
            const randomSpeed = Math.random() * 3 + 2;

            img.style.transition = `transform ${randomSpeed}s linear`;
            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;

            // Remove images after they transition off-screen
            // Instead of `display: none`, directly remove the image
            img.addEventListener('transitionend', () => {
                img.remove();
            });
        });

        // Remove the cluster after a short delay to allow images to start transitioning
        setTimeout(() => {
            cluster.remove();
            console.log("Cluster removed");
        }, 100); // Very short delay
    }

    // Initial call to create the first cluster
    createCluster();
});
