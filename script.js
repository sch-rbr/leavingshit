document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.art-img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            alert(`You clicked on ${img.alt}`);
        });
    });
});
