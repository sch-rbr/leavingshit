document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let zIndexCounter = 1000; 

    // PHYSICS CONFIGURATION
    const config = {
        padding: 100,
        imgCountMin: 3,
        imgCountMax: 6,
        images: ['img1.png', 'img2.png', 'img3.png'],
        
        // Physics Variables
        gravity: 0.8,       // How strong is the downward pull? (Higher = heavier)
        power: 15,          // How hard is the initial explosion?
        drag: 0.99,         // Air resistance (0.99 = 1% slowdown per frame on X axis)
        rotationSpeed: 10   // How fast they spin
    };

    function createCluster() {
        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        
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

            // Center them in the cluster
            img.style.left = '0px';
            img.style.top = '0px';

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

        children.forEach((img) => {
            // 1. Set Initial Velocities
            // Random angle for explosion (0 to 360 degrees)
            const angle = Math.random() * Math.PI * 2;
            // Random force
            const force = Math.random() * config.power + (config.power / 2);

            // Calculate X and Y velocity based on angle
            let velocityX = Math.cos(angle) * force;
            let velocityY = Math.sin(angle) * force;

            // Make the explosion feel like it pops UP first (-Y is up in CSS)
            // We bias the random angle slightly upwards or just ensure pure random chaos?
            // Let's add an explicit "Upward Pop" bias to fight gravity initially
            velocityY -= 5; 

            let posX = 0;
            let posY = 0;
            
            let rotation = 0;
            const rotSpeed = (Math.random() - 0.5) * config.rotationSpeed;

            // 2. The Animation Loop (Per Particle)
            function animate() {
                // Apply Gravity
                velocityY += config.gravity;
                
                // Apply Air Resistance to sideways movement (optional, stops them floating forever)
                velocityX *= config.drag;

                // Update Position
                posX += velocityX;
                posY += velocityY;
                rotation += rotSpeed;

                // Apply Styles
                img.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;

                // 3. Check Bounds (Kill particle if it falls off screen)
                // Get the cluster's absolute position to calculate relative screen drop
                const clusterRect = cluster.getBoundingClientRect();
                const absoluteY = clusterRect.top + posY;

                if (absoluteY < window.innerHeight + 200) {
                    // Keep animating if still on screen
                    requestAnimationFrame(animate);
                } else {
                    // Remove particle
                    img.remove();
                    activeParticles--;
                    if (activeParticles === 0) {
                        cluster.remove();
                    }
                }
            }

            // Kick off the loop
            requestAnimationFrame(animate);
        });
    }

    createCluster();
});
