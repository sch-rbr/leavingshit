document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let zIndexCounter = 1000; 

    const config = {
        padding: 100,
        imgCountMin: 3,
        imgCountMax: 6,
        images: ['img1.png', 'img2.png', 'img3.png'], 
        
        // --- GRAVITY SETTINGS ---
        gravity: 0.8,        // Adds 0.8px of downward speed EVERY frame
        horizontalPower: 15, // How hard they blast sideways
        drag: 0.99,          // 1% air resistance on horizontal movement
        rotationSpeed: 10
    };

    function createCluster() {
        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        
        // Spawn anywhere on screen (kept inside padding)
        const x = Math.random() * (window.innerWidth - config.padding * 2) + config.padding;
        const y = Math.random() * (window.innerHeight - config.padding * 2) + config.padding;
        
        cluster.style.left = `${x}px`;
        cluster.style.top = `${y}px`;
        cluster.style.zIndex = zIndexCounter++; 

        const numImages = Math.floor(Math.random() * (config.imgCountMax - config.imgCountMin + 1)) + config.imgCountMin;

        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = config.images[i % config.images.length]; 
            img.classList.add('cluster-img');

            const scale = Math.random() * 2.5 + 0.5;
            img.style.width = `${50 * scale}px`;

            // Start at center of cluster
            img.style.left = '0px';
            img.style.top = '0px';
            img.style.transform = 'translate(-50%, -50%)'; 

            cluster.appendChild(img);
        }

        cluster.addEventListener('mouseenter', () => {
            if (!cluster.dataset.exploding) {
                cluster.dataset.exploding = 'true';
                explodeCluster(cluster);
                createCluster(); 
            }
        });

        body.appendChild(cluster);
    }

    function explodeCluster(cluster) {
        cluster.style.pointerEvents = 'none';
        const children = Array.from(cluster.children);
        
        // Get initial position for bounds checking
        const rect = cluster.getBoundingClientRect();
        const startY = rect.top;

        let activeParticles = children.length;

        children.forEach((img) => {
            // CRITICAL: Force remove any CSS transitions that might fight the physics
            img.style.transition = 'none'; 

            // 1. Initial Velocity
            // Random sideways burst (positive or negative)
            let velocityX = (Math.random() - 0.5) * config.horizontalPower * 2;
            
            // Start with a small random drop speed (no upward toss)
            let velocityY = Math.random() * 2; 

            let posX = 0;
            let posY = 0;
            let rotation = 0;
            let rotSpeed = (Math.random() - 0.5) * config.rotationSpeed;

            // 2. Physics Loop
            function frame() {
                // GRAVITY: Increase downward speed
                velocityY += config.gravity;
                
                // DRAG: Decrease sideways speed slightly
                velocityX *= config.drag;

                // UPDATE POSITIONS
                posX += velocityX;
                posY += velocityY;
                rotation += rotSpeed;

                // APPLY TRANSFORM
                img.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;

                // 3. BOUNDS CHECK
                // Calculate actual screen position
                const currentScreenY = startY + posY;

                // If it hasn't fallen off the bottom yet...
                if (currentScreenY < window.innerHeight + 200) {
                    requestAnimationFrame(frame);
                } else {
                    // It fell off. Kill it.
                    img.remove();
                    activeParticles--;
                    if (activeParticles === 0) {
                        cluster.remove();
                    }
                }
            }

            requestAnimationFrame(frame);
        });
    }

    // Start
    createCluster();
});
