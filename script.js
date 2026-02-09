document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let zIndexCounter = 1000; 

    // PHYSICS CONFIGURATION
    const config = {
        padding: 100,
        imgCountMin: 3,
        imgCountMax: 6,
        images: ['img1.png', 'img2.png', 'img3.png'], // Ensure these exist
        
        // --- PHYSICS TWEAKS ---
        gravity: 1.5,       // High gravity (1.5 is heavy)
        drag: 0.98,         // Air resistance (slows down sideways movement)
        
        // Initial Explosion Force
        horizontalSpeed: 25, // Powerful sideways blast
        verticalLift: 5,     // Very low upward lift (prevents flying to top of screen)
        
        rotationSpeed: 15    // Fast spin
    };

    function createCluster() {
        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        
        // Keep spawn area slightly higher so they have room to fall
        const x = Math.random() * (window.innerWidth - config.padding * 2) + config.padding;
        const y = Math.random() * (window.innerHeight / 1.5) + config.padding; // Restrict spawn to top 2/3rds
        
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

            // Center images in the cluster initially
            img.style.left = '0px';
            img.style.top = '0px';
            img.style.transform = 'translate(-50%, -50%)'; // Ensure true centering

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
        let activeParticles = children.length;
        
        // Get the cluster's absolute starting position
        const rect = cluster.getBoundingClientRect();
        const startX = rect.left;
        const startY = rect.top;

        children.forEach((img) => {
            // 1. Set Initial Velocities
            
            // X: Strong random push left or right
            let velocityX = (Math.random() - 0.5) * config.horizontalSpeed * 2;
            
            // Y: Mostly flat, with a tiny bit of random up/down variation
            // This ensures they don't fly up, they just burst out and fall
            let velocityY = (Math.random() * -config.verticalLift); 

            let posX = 0;
            let posY = 0;
            let rotation = 0;
            const rotSpeed = (Math.random() - 0.5) * config.rotationSpeed;

            // 2. Animation Loop
            function animate() {
                // Apply Gravity (constant downward acceleration)
                velocityY += config.gravity;
                
                // Apply Drag (slows X speed over time)
                velocityX *= config.drag;

                // Update Position
                posX += velocityX;
                posY += velocityY;
                rotation += rotSpeed;

                // Apply Visuals
                img.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;

                // 3. Cleanup Check
                // Calculate absolute Y position to see if it's off-screen
                if ((startY + posY) < window.innerHeight + 100) {
                    requestAnimationFrame(animate);
                } else {
                    // It has fallen off the bottom
                    img.remove();
                    activeParticles--;
                    if (activeParticles === 0) {
                        cluster.remove();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        });
    }

    createCluster();
});
