document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let zIndexCounter = 1000; // Ensures new clusters appear on top

    // Configuration
    const config = {
        padding: 200, // Keep clusters away from the very edge
        imgCountMin: 2,
        imgCountMax: 5,
        scatterDistance: 1500, // How far pieces fly
        rotationMax: 720,
        speedMin: 2, // Seconds
        speedMax: 4, // Seconds
        images: ['img1.png', 'img2.png', 'img3.png'] // Your image files
    };

    function createCluster() {
        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        
        // Position cluster within safe bounds
        const x = Math.random() * (window.innerWidth - config.padding);
        const y = Math.random() * (window.innerHeight - config.padding);
        
        cluster.style.left = `${x}px`;
        cluster.style.top = `${y}px`;
        cluster.style.zIndex = zIndexCounter++; // Increment Z-index for stacking

        // Generate Images
        const numImages = Math.floor(Math.random() * (config.imgCountMax - config.imgCountMin + 1)) + config.imgCountMin;

        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = config.images[i % config.images.length]; 
            img.classList.add('cluster-img');

            // Random Scale
            const scale = Math.random() * 2.5 + 0.5;
            img.style.width = `${50 * scale}px`;

            // Random slight offset within the cluster center
            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;

            cluster.appendChild(img);
        }

        // Interaction Listener
        cluster.addEventListener('mouseenter', () => {
            if (!cluster.dataset.exploding) {
                cluster.dataset.exploding = 'true';
                explodeCluster(cluster);
                createCluster(); // Immediate respawn
            }
        });

        body.appendChild(cluster);
    }

    function explodeCluster(cluster) {
        // Prevent interaction with exploding pieces
        cluster.style.pointerEvents = 'none';

        const children = Array.from(cluster.children);
        let completedAnimations = 0;

        children.forEach((img) => {
            // Physics calculations
            const randomX = (Math.random() - 0.5) * config.scatterDistance * 2;
            const randomY = (Math.random() - 0.5) * config.scatterDistance * 2;
            const randomRotation = (Math.random() - 0.5) * config.rotationMax * 2;
            const duration = Math.random() * (config.speedMax - config.speedMin) + config.speedMin;

            // Apply transition using Ease-Out (Fast start, slow end)
            img.style.transition = `transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`;
            
            // Force reflow to ensure transition registers (rare browser quirk fix)
            void img.offsetWidth; 

            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;

            // Cleanup Logic
            const cleanup = () => {
                img.remove();
                completedAnimations++;
                // Remove parent cluster only when empty
                if (completedAnimations === children.length) {
                    cluster.remove();
                }
            };

            // Primary cleanup trigger
            img.addEventListener('transitionend', cleanup, { once: true });

            // Failsafe: Force cleanup if transitionend misses (browser tab inactive, etc)
            setTimeout(cleanup, (duration * 1000) + 100); 
        });
    }

    // Start the loop
    createCluster();
});
