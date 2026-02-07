document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');

    function createCluster() {
        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 100)}px`;

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
                const randomX = (Math.random() * 400 - 200) + "px";
                const randomY = (Math.random() * 400 - 200) + "px";
                img.style.setProperty('--x', randomX);
                img.style.setProperty('--y', randomY);
                img.style.animation = `explode 1s ease-out`;

                setTimeout(() => {
                    img.style.transform = `translate(0, ${window.innerHeight + 100}px)`; // fall off the screen
                }, 1000); // After explode animation
            });

            setTimeout(() => {
                cluster.remove();
                createCluster();
            }, 3000); // Wait for fall animation to complete before creating a new cluster
        });

        body.appendChild(cluster);
        cluster.style.animation = "fadeIn 1s";
    }
    
    createCluster();
});

