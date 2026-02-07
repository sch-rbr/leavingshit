document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');

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
                const randomX = (Math.random() * 2000 - 1000); // wider range to ensure goes off-screen
                const randomY = (Math.random() * 2000 - 1000);
                const randomRotation = (Math.random() * 1440 - 720); // spin more
                const randomSpeed = Math.random() * 3 + 2; // slower to see the effect
                
                img.style.setProperty('--x', `${randomX}px`);
                img.style.setProperty('--y`, `${randomY}px`);
                img.style.setProperty('--rotation', `${randomRotation}deg`);
                img.style.transition = `transform ${randomSpeed}s linear, top ${randomSpeed}s linear, left ${randomSpeed}s linear`;
                img.style.animation = `explode ${randomSpeed}s linear forwards`;

                // Manually set the final transform to ensure the objects go off-screen
                setTimeout(() => {
                    img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
                }, 0);
            });

            setTimeout(() => {
                cluster.remove();
                createCluster();
            }, 4000); // Wait for the explosion animation to complete before creating a new cluster
        });

        body.appendChild(cluster);
        cluster.style.animation = "fadeIn 1s";
    }

    createCluster();
});
