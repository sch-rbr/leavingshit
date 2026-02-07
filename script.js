document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');
  
    function createCluster() {
        const cluster = document.createElement('div');
        cluster.classList.add('img-container');
        cluster.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
        cluster.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        const numImages = Math.floor(Math.random() * 4) + 2;

        for(let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = `img${(i%3) + 1}.png`; // Assuming you have 3 PNGs named img1.png, img2.png, img3.png
            img.style.position = 'absolute';
            img.style.top = `${Math.random() * 50}px`;
            img.style.left = `${Math.random() * 50}px`;
            cluster.appendChild(img);
        }

        cluster.addEventListener("mouseenter", () => {
            Array.from(cluster.children).forEach((img, index) => {
                setTimeout(() => {
                    img.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
                    img.style.top = `${window.innerHeight + 100}px`; // fall off the screen
                }, index * 100);
            });

            setTimeout(() => {
                cluster.remove();
                createCluster();
            }, numImages * 100 + 1000);
        });

        body.appendChild(cluster);
        cluster.style.animation = "fadeIn 1s";
    }
    
    createCluster();
});
