// Додаємо інтерактивність до елементів з класом "interactive"
document.querySelectorAll('.interactive').forEach(item => {
    item.addEventListener('click', () => {
        item.style.backgroundColor = item.style.backgroundColor === 'rgb(255, 242, 229)' ? '#ffab3d' : '#fff2e5';
        item.style.color = item.style.color === 'rgb(255, 171, 61)' ? '#333' : '#ffab3d';
    });
});

// Ефект анімації для центрального зображення
const centerImage = document.querySelector('.center-image');
if (centerImage) {
    centerImage.addEventListener('mouseenter', () => {
        centerImage.style.transform = 'scale(1.1)';
        centerImage.style.transition = 'transform 0.3s ease-in-out';
    });

    centerImage.addEventListener('mouseleave', () => {
        centerImage.style.transform = 'scale(1)';
    });
}
