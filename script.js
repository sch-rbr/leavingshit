document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    function createCluster() {
        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        const numImages = Math.floor(Math.random() * 4) + 2; // 2 to 5 images

        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = `img${(i % 3) + 1}.png`; // imgs with names img1.png, img2.png, img3.png

            // Randomly scale the size between 1x to 3x
            const scale = Math.random() * 2 + 1;
            img.style.width = `${50 * scale}px`;

            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;
            cluster.appendChild(img);
        }

        cluster.addEventListener("mouseenter", () => {
            Array.from(cluster.children).forEach((img, index) => {
                const randomX = Math.random() * 2000 - 1000;  // larger range ensures off-screen
                const randomY = Math.random() * 2000 - 1000;
                const randomRotation = Math.random() * 1440 - 720; // more rotation for spin
                const randomSpeed = Math.random() * 3 + 2; // varied speed

                // Final position off-screen
                img.style.setProperty('--x', `${randomX}px`);
                img.style.setProperty('--y', `${randomY}px`);
                img.style.setProperty('--rotation', `${randomRotation}deg`);
                img.style.transition = `none`; // Remove transitions

                // Animation for explosion
                img.style.animation = `explodeAndSpin ${randomSpeed}s ease-out forwards`;
            });

            setTimeout(() => {
                cluster.remove();
                createCluster();
            }, 4000); // Cluster reappears after explosion completes
        });

        body.appendChild(cluster);
        cluster.style.animation = "fadeIn 1s";
    }

    createCluster();
});
