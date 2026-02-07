function explodeCluster() {
    const cluster = this;
    cluster.style.pointerEvents = 'none'; // Disable further interactions with this cluster
    cluster.removeEventListener("mouseenter", explodeCluster); // Prevent additional interactions

    // Start the explosion process
    Array.from(cluster.children).forEach((img, index) => {
        // Disable further mouse interactions for this cluster
        img.style.pointerEvents = 'none';

        const randomX = Math.random() * 2000 - 1000;  // Larger range for off-screen movement
        const randomY = Math.random() * 2000 - 1000;
        const randomRotation = Math.random() * 1440 - 720; // More rotation for spin
        const randomSpeed = Math.random() * 3 + 2; // Varied speed

        // Set final positions off-screen and spin values using CSS variables
        img.style.setProperty('--x', `${randomX}px`);
        img.style.setProperty('--y', `${randomY}px`);
        img.style.setProperty('--rotation', `${randomRotation}deg`);

        // Start the animation
        img.style.animation = `explodeAndSpin ${randomSpeed}s linear forwards`;
        
        // Ensure images continue moving off-screen
        const continueMoving = setInterval(() => {
            if (isOffScreen(img)) {
                clearInterval(continueMoving);
                img.style.display = 'none'; // Hide the image once off-screen
            } else {
                img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
            }
        }, 16); // Roughly 60 frames per second
    });

    setTimeout(() => {
        // Clean up the old cluster after it has moved off-screen
        cluster.remove();

        // Allow creation of a new cluster
        allowNewCluster = true;
        createCluster();
    }, 4000); // Ensure objects leave the screen
}
