document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');

    function createCluster() {
        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        const numImages = Math.floor(Math.random() * 4) + 2; // 2 to 5 images

        for(let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = `img${(i % 3) + 1}.png`; // imgs with names img1.png, img2.png, img3.png

            // Randomly scale the size between 1x to 3x
            const scale = Math.random() * 2 + 1;
            img.style.width = `${50 * scale}px`;

            img.style.position = 'absolute';
            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;
            cluster.appendChild(img);
        }

        cluster.addEventListener("mouseenter", () => {
            Array.from(cluster.children).forEach((img, index) => {
                const randomX = (Math.random() * 2000 - 1000) + "px";
                const randomY = (Math.random() * 2000 - 1000) + "px";
                const randomRotation = (Math.random() * 720 - 360) + "deg";
                const randomSpeed = Math.random() * 1 + 1;

                img.style.setProperty('--x', randomX);
                img.style.setProperty('--y', randomY);
                img.style.setProperty('--rotation', randomRotation);
                img.style.transition = `transform ${randomSpeed}s ease-out`;
                img.style.animation = `explode 2s ease-out`;
            });

            setTimeout(() => {
                cluster.remove();
                createCluster();
            }, 2000); // Wait for explode animation to complete before creating a new cluster
        });

        body.appendChild(cluster);
        cluster.style.animation = "fadeIn 1s";
    }
    
    createCluster();
});

